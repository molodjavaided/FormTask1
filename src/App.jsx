import React, { useEffect, useState, useRef } from "react";
import styles from "./App.module.css";
import TextField from "./components/TextField/TextField";
import { validator } from "./utils/validator";

function App() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitButtonRef = useRef(null);

  const userShema = {
    email: {
      isRequired: { message: "Обязательное поле" },
      isEmail: { message: "Введите корректный email" },
    },
    password: {
      isRequired: { message: "Обязательное поле" },
      min: { message: "Минимум 6 символов", value: 6 },
    },
    confirmPassword: {
      checkPassword: {
        message: "Пароли не совпадают",
        ref: "password",
      },
    },
  };

  const validate = () => {
    const error = validator(userData, userShema);
    setError(error);
    return Object.keys(error).length === 0;
  };

  const isValid = Object.keys(error).length === 0;

  useEffect(() => {
    if (isValid) {
      submitButtonRef.current.focus();
    }
  });

  useEffect(() => {
    validate();
  }, [userData]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    if (isValid) console.log(userData);
  };

  return (
    <>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Адрес электронной почты"
          placeholder="Введите email"
          value={userData.email}
          onChange={handleChange}
          type="email"
          error={error?.email}
        />
        <TextField
          name="password"
          label="Пароль"
          placeholder="Введите пароль"
          value={userData.password}
          onChange={handleChange}
          type="password"
          error={error?.password}
        />
        <TextField
          name="confirmPassword"
          label="Пароль для подтверждения"
          placeholder="Введите пароль для подтверждения"
          value={userData.confirmPassword}
          onChange={handleChange}
          type="password"
          error={error?.confirmPassword}
        />
        <button
          className={styles.formButton}
          type="submit"
          disabled={!isValid}
          ref={submitButtonRef}
        >
          Регистрация
        </button>
      </form>
    </>
  );
}

export default App;
