import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "../apis/userApi";
import { nanoid } from "nanoid";
import { signupUser } from "../slices/authSlice";
import { Link } from "react-router-dom";
import LoaderComponent from "./LoaderComponent";

export default function Signup() {
  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log({
        name: username,
        email,
        password,
        id: nanoid(),
        date: new Date().getDate(),
      });

      const result = await signup({
        name: username,
        email,
        password,
        id: nanoid(),
        date: new Date().getDate(),
      }).unwrap();

      dispatch(signupUser(result));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Зарегистрироваться</h2>
          <label htmlFor="username">Имя*:</label>
          <input
            autoComplete="true"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="email">Электронная почта*:</label>
          <input
            autoComplete="true"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Пароль*:</label>
          <input
            autoComplete="true"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Зарегистрироваться</button>
          <Link className="center" to="/login">
            Уже есть аккаунт? Войти в аккаунт!
          </Link>
        </form>
      )}
    </div>
  );
}
