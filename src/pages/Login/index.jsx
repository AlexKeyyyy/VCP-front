import React from "react";
import logo from "../../assets/logo.png";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchAuth,
  selectIsAuth,
  selectUserRole
} from "../../redux/slices/auth";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const role = useSelector(selectUserRole);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/" />;
  }

  return (
    <div className={styles.login}>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Войти</label>
        <input
          placeholder="Почта"
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
          type="email"
        />
        <input
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
          fullWidth
          type="password"
          placeholder="Пароль"
        />
        <button disabled={!isValid} type="submit">
          Войти
        </button>
        <Link to="/register">Зарегистрироваться</Link>
      </form>
    </div>
  );
};

export default Login;
