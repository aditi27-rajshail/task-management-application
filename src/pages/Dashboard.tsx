import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Task } from "../types";
import SingleTask from "../components/SingleTask";
import { auth, db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AppContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  margin-top: 2rem;
`;

const Input = styled.input`
  padding: 0.8em;
  border: 1px solid #ddd;
  border-radius: 3px;
  width: 70%;
  margin-right: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  &:hover,
  &:focus {
    border: 1px solid #b020e4;
    box-shadow: 0px 4px 10px rgba(176, 32, 228, 0.5);
  }
  @media (max-width: 768px) {
    width: 60%;
    margin-right: 2;
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
  padding: 0.7em 0.9em;
  background-color: #b020e4;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #9a12c6;
  }
`;

const LogoutButton = styled.button`
  background-color: #b020e4;
  color: white;
  border: none;
  padding-left: 15px;
  padding-right: 15px;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  @media (max-width: 768px) {
    width: 50%;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  &:hover {
    background-color: #9a12c6;
  }
`;

const WelcomeMessage = styled.p`
  margin-bottom: 1rem;
  color: #fff;
  font-size: 1.2rem;
`;

const UserContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Dashboard = (props: any) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();

  // Create Task
  const addTask = async (e: any) => {
    e.preventDefault(e);
    if (inputValue === "") {
      alert("Please enter value");
      return;
    }
    await addDoc(collection(db, "tasks" + props.user.uid), {
      task: inputValue,
      is_done: false,
    });
    setInputValue("");
  };

  //Delet task
  const deleteTask = async (task: Task) => {
    await deleteDoc(doc(db, "tasks" + props.user.uid, task.id));
  };

  // Read todos from firebase
  useEffect(() => {
    const q = query(collection(db, "tasks" + props.user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let taskArr: Task[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<Task, "id">; // it will have all properties except id
        taskArr.push({ ...data, id: doc.id });
      });
      setTasks(taskArr);
    });
    return () => unsubscribe();
  }, []);

  // Update task if completed
  const taskCompleted = async (task: Task) => {
    await updateDoc(doc(db, "tasks" + props.user.uid, task.id), {
      is_done: !task.is_done,
    });
  };

  // Update task content
  const updateTaskContent = async (id: string, newContent: string) => {
    await updateDoc(doc(db, "tasks" + props.user.uid, id), {
      task: newContent,
    });
  };

  const handleLogoutButton = () => {
    signOut(auth).then(() => {
      // navigate user back to login screen

      setTimeout(() => {
        setTasks([]);
        navigate("/");
      }, 1000);
    });
  };
  return (
    <AppContainer>
      <div>
        <UserContainer>
          <WelcomeMessage>Welcome, {props.user.email}!</WelcomeMessage>
          <LogoutButton onClick={handleLogoutButton}>Logout</LogoutButton>
        </UserContainer>
        <form onSubmit={addTask}>
          <Input
            type="text"
            placeholder="Enter task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="submit">
            <AiOutlinePlus size={15} />
          </Button>
        </form>
        {tasks.map((task, index) => (
          <SingleTask
            key={index}
            task={task}
            taskCompleted={taskCompleted}
            deleteTask={deleteTask}
            updateTaskContent={updateTaskContent}
          />
        ))}
      </div>
    </AppContainer>
  );
};

export default Dashboard;
