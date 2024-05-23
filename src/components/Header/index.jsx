import React from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectIsAuth } from "../../redux/slices/auth";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Вы точно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <img height={60} width={216} src={logo} alt="" />
        </Link>
        <div className={styles.buttonContainer}>
          <Link to="/">
            <button>ГЛАВНАЯ</button>
          </Link>
          <button onClick={onClickLogout}>
            ВЫЙТИ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
