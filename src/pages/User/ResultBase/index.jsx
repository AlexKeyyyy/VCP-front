import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Удалил фигурные скобки
import axios from "axios";
import styles from "./ResultBase.module.scss";

const ResultBase = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Декодируем токен, чтобы получить информацию о пользователе
      const decodedToken = jwtDecode(token);
      // Извлекаем userId из декодированного токена
      const userId = decodedToken._id;
      setUserId(userId);
      console.log(userId)
      axios.get(`/get-done-tasks/${userId}`)
        .then(response => {
          console.log(response)
          setUserTasks(response.data);
        })
        .catch(error => console.error(error));
    }
  }, [userId]);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        {userTasks.map((task) => (
          <div key={task._id} className={styles.content}>
            <h1>Задание №{task}</h1>
            <Link to={`/results/${task}`}>
              <button>Посмотреть результат</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultBase;
