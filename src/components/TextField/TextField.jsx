import React from "react";
import styles from "./TextField.module.css";

const TextField = ({ name, label, error, ...props }) => {
  return (
    <div className={styles.FieldContainer}>
      <label htmlFor={name}>{label}</label>
      <input className={styles.Field} name={name} {...props} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default TextField;
