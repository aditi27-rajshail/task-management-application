import styled from "styled-components";
import { useState } from "react";
import { Task } from "../types";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

interface Props {
  task: Task;
  taskCompleted: (task: Task) => void;
  deleteTask: (task: Task) => void;
  updateTaskContent: (id: string, newContent: string) => Promise<void>;
}

const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.8rem;
  border-radius: 0.5rem;
  background-color: #3450a1;
  @media (max-width: 768px) {
    width: 70%;
  }
`;

const TaskText = styled.p`
  margin: 0;
  margin-left: 1rem;
  flex-grow: 1;
  font-size: 1rem;
  color: #fff;
`;

const Input = styled.input`
  margin: 0.5em;
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 3px;
  width: 100%;
`;

const TaskButton = styled.button`
  margin: 0 0.5rem;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;
const EditContainer = styled.div`
  display: flex;
`;

const SaveButton = styled.button`
  background-color: #b020e4;
  border: none;
  margin-left: 2px;
  color: white;
  padding: 0.1rem 1rem;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #9a12c6;
  }
`;
const SingleTask = ({
  task,
  taskCompleted,
  deleteTask,
  updateTaskContent,
}: Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editInputValue, setEditInputValue] = useState<string>("");
  const handleEdit = (task: Task) => {
    setIsEditMode(true);
    setEditInputValue(task.task);
  };

  const handleSave = () => {
    updateTaskContent(task.id, editInputValue);
    setIsEditMode(false);
  };
  return (
    <TaskContainer>
      <input
        type="checkbox"
        checked={task.is_done}
        onChange={() => taskCompleted(task)}
        style={{
          transform: "scale(1.5)",
        }}
      />

      {isEditMode ? (
        <>
          <EditContainer>
            <Input
              type="text"
              value={editInputValue}
              onChange={(e) => setEditInputValue(e.target.value)}
            />
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </EditContainer>
        </>
      ) : (
        <>
          <TaskText>{task.task}</TaskText>
          <TaskButton onClick={() => handleEdit(task)}>
            <AiFillEdit size={22} color="#b020e4" />
          </TaskButton>
        </>
      )}

      <TaskButton onClick={() => deleteTask(task)}>
        <AiFillDelete size={22} color="#b020e4" />
      </TaskButton>
    </TaskContainer>
  );
};

export default SingleTask;
