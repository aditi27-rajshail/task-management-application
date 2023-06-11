import React, { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginContainer = styled.div`
  width: 20rem;
  height: 30rem;
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

const SignInLink = styled(Link)`
  color: #b020e4;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
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
  margin-bottom: 0.5rem;
  &:hover {
    background-color: #9a12c6;
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("check res", res);
      navigate("/dashboard");
    } catch (error: any) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <LoginContainer>
        <Heading>Login</Heading>
        <FormContainer onSubmit={signIn}>
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
          <StyledButton type="submit">Sign In</StyledButton>
        </FormContainer>
        <TextLabel>
          Don't have an account?
          <SignInLink to="/register"> Sign up!</SignInLink>
        </TextLabel>
      </LoginContainer>
    </Container>
  );
};

export default Login;
