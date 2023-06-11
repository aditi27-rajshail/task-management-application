import React, { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignUpContainer = styled.div`
  width: 20rem;
  height: 35rem;
  border-radius: 2rem;
  padding: 20px;
  background-color: #3450a1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

const Heading = styled.h1`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 1rem;
  align-self: flex-start;
`;

const TextLabel = styled.label`
  color: #fff;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const StyledInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const SignInLink = styled(Link)`
  color: #b020e4;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  color: #fff;
  background-color: #b020e4;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
  &:hover {
    background-color: #9a12c6;
  }
`;

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const signUp = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password Do not Match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Set the user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
      });
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <SignUpContainer>
        <Heading>Sign Up</Heading>
        <FormContainer onSubmit={signUp}>
          <TextLabel>Email</TextLabel>
          <StyledInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextLabel>Password</TextLabel>
          <StyledInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextLabel>Confirm Password</TextLabel>
          <StyledInput
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <StyledButton type="submit">Sign Up</StyledButton>
          <TextLabel>
            Go Back to
            <SignInLink to="/"> Login Page</SignInLink>
          </TextLabel>
        </FormContainer>
      </SignUpContainer>
    </Container>
  );
};

export default SignUp;
