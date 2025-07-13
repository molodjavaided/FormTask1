import { useState, useRef } from "react";
import styles from "./App.module.css";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const useStore = () => {
  const [state, setState] = useState(initialState);

  return {
    getState: () => state,
    updateState: (fieldName, newValue) => {
      setState({ ...state, [fieldName]: newValue });
    },
  };
};

function App() {
  const { getState, updateState } = useStore();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitButtonRef = useRef(null);

  const { email, password, confirmPassword } = getState();

  const validateEmail = (value) => {
    if (!value) return "Необходимо ввести email";
    if (!/^\S+@\S+\.\S+$/.test(value))
      return "Недопустимый email используйте другой";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Необходимо придумать пароль";
    if (value.length < 6) return "Минимальное колличество 6 символов";
    // if (/^$/.test(value)) return "Недопустимые символы";
    return "";
  };

  const validateMatchPassword = (value) => {
    if (!value) return "Подтвердите пароль";
    if (value !== password) return "Пароли не совпадают";
    return "";
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    updateState(name, value);

    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
    if (name === "password") {
      const passwordError = validatePassword(value);
      setErrors((prev) => ({
        ...prev,
        password: passwordError,
        confirmPassword: passwordError
          ? prev.confirmPassword
          : validateMatchPassword(confirmPassword),
      }));
    }
    if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateMatchPassword(value),
      }));
    }

    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateMatchPassword(confirmPassword),
    };

    const isFormValid = Object.values(errors).every((error) => error === "");

    if (isFormValid) {
      submitButtonRef.current.focus();
    }
  };

  const isFormValid = () => {
    return (
      Object.values(errors).every((error) => error === "") &&
      email &&
      password &&
      confirmPassword
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      console.log(getState());
    }
  };

  return (
    <>
      <div className={styles.app}>
        <form className={styles.form} onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={onChange}
          />
          {errors.email && (
            <div className={styles.errorLabel}>{errors.email}</div>
          )}
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Придумайте пароль"
            onChange={onChange}
          />
          {errors.password && (
            <div className={styles.errorLabel}>{errors.password}</div>
          )}
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Повторите пароль"
            onChange={onChange}
          />
          {errors.confirmPassword && (
            <div className={styles.errorLabel}>{errors.confirmPassword}</div>
          )}
          <button
            className={styles["form-button"]}
            type="submit"
            disabled={!isFormValid}
            ref={submitButtonRef}
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
