import React from "react";
import styles from "./FormInput.module.scss";
import { useFormContext } from "react-hook-form";
import { findInputError } from "../../utils/findInputError";
import { isFormInvalid } from "../../utils/isFormInvalid";
export const FormInput = ({ label, type, id, placeholder, validation, name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, label);
  const isInvalid = isFormInvalid(inputError);
  return (
    <div className={styles.inputs}>
      {isInvalid && (
        <FormInputError
          message={inputError.error.message}
          key={inputError.error.message}
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        autoComplete="off"
        required
        {...register(name, validation)}
      />
    </div>
  );
};

export const FormInputError = ({ message }) => {
  return <div className={styles.error}>{message}</div>;
};

