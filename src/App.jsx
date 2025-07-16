import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useRef } from "react";
import styles from "./App.module.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email обязателен")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
      "Введите корректный email"
    ),
  password: yup
    .string()
    .required("Пароль обязателен")
    .min(6, "Должно быть больше 6 символов"),

  passwordConfirm: yup
    .string()
    .required("Подтвердите пароль")
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
});

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitButtonRef = useRef(null);

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    if (isValid) {
      submitButtonRef.current.focus();
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input
        className={styles.inputForm}
        type="email"
        placeholder="Введите email"
        {...register("email")}
      />
      <p className={styles.error}>{errors.email?.message}</p>

      <label htmlFor="password">Пароль</label>
      <input
        className={styles.inputForm}
        type="password"
        placeholder="Придумайте пароль"
        {...register("password")}
      />
      <p className={styles.error}>{errors.password?.message}</p>

      <label htmlFor="passwordConfirm">Подтвердите пароль</label>
      <input
        className={styles.inputForm}
        type="password"
        placeholder="Повторите пароль"
        {...register("passwordConfirm")}
      />
      <p className={styles.error}>{errors.passwordConfirm?.message}</p>

      <button type="submit" ref={submitButtonRef}>
        Зарегистрироваться
      </button>
    </form>
  );
}
