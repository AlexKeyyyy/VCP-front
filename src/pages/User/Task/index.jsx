import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Task.module.scss";
import { jwtDecode } from "jwt-decode";
import Console from "../../../components/Console";
import axios from "axios";

const Task = () => {
  const [task, setTask] = useState(null);
  const { taskNumber } = useParams();
  const [userId, setUserId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken._id);
    }

    const fetchTask = async () => {
      try {
        const response = await fetch(`/task/${taskNumber}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const taskData = await response.json();
        setTask(taskData);
      } catch (error) {
        console.error("Fetch task failed:", error);
      }
    };

    fetchTask();
    
    axios.get(`/user-task-getDone/${userId}/${taskNumber}`)
      .then(response => {
        setIsSubmitted(response.data); // Проверяем, равно ли поле done 1
      })
      .catch(error => console.error(error));
  }, [taskNumber, userId]);

  if (!task) return null;

  const handleFinish = () => {
    navigate("/tasks");
  };

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h1>Задание №{task.taskNumber}</h1>
        <div className={styles.text}>
          <p>
            <span className={styles.bb}>Задача:</span> {task.taskText}
          </p>
          <p style={{ fontStyle: "italic", fontSize: "20px" }}>
            Не забудьте после завершения задания отправить его на проверку!
          </p>
        </div>
        {isSubmitted === 0 ? (
          <Console userId={userId} taskNumber={taskNumber} />
        ) : (
          <div>
            <p>Решение успешно отправлено!</p>
            <button onClick={handleFinish}>Завершить</button>
          </div>
        )
        }
      </div>
    </div>
  );
};

export default Task;
