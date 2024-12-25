import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../apis/userApi";
import { loginUser } from "../slices/authSlice";
import { Link } from "react-router-dom";
import LoaderComponent from "./LoaderComponent";

export default function Login() {
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login({
        email,
        password,
      }).unwrap();

      dispatch(loginUser(result));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Войти</h2>
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
          <button type="submit">Войти</button>
          <Link className="center" to="/signup">
            Нету аккаунта? Зарегистрируйся!
          </Link>
        </form>
      )}
    </div>
  );
}
