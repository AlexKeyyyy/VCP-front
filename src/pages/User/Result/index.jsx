import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Header from "../../../components/Header";
import styles from "./Result.module.scss";

const Result = () => {
  const { taskNumber } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [resultData, setResultData] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken._id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/get-result-data/${userId}/${taskNumber}`);
          setResultData(response.data);
          
          const userComments = response.data.commentUser.map(comment => ({
            ...comment,
            username: response.data.fullName
          }));

          const adminComments = response.data.commentAdmin.map(comment => ({
            ...comment,
            username: "Admin"
          }));

          const allComments = [...userComments, ...adminComments];

          setComments(allComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        } catch (error) {
          console.error("Ошибка при получении данных:", error);
        }
      };

      fetchData();
    }
  }, [userId, taskNumber]);

  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      const currentDate = new Date().toISOString();

      const newCommentObj = {
        message: newComment,
        timestamp: currentDate,
        username: resultData.fullName
      };

      try {
        await axios.patch(`/user-task-comment/${userId}/${taskNumber}`, {
          message: newCommentObj.message
        });

        setComments([newCommentObj, ...comments]);
        setNewComment("");
      } catch (error) {
        console.error("Ошибка при отправке комментария:", error);
      }
    }
  };

  if (!resultData) {
    return <div>Загрузка...</div>;
  }

  const getMarkStyle = (mark) => {
    if (mark === -1) return { backgroundColor: "black" };
    if (mark >= 0 && mark <= 4) return { backgroundColor: 'red' };
    if (mark >= 5 && mark <= 7) return { backgroundColor: 'gray' };
    if (mark >= 8 && mark <= 10) return { backgroundColor: 'green' };
  };

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h1 style={{ fontWeight: "bold" }}>Задание №{taskNumber}</h1>
        <p style={{ fontWeight: "bold" }}>Решение от {resultData.fullName} {new Date(resultData.doneAt).toLocaleString()}</p>
        <p><span style={{ fontWeight: "bold" }}>Текст задания: </span>{resultData.taskText}</p>
        <div className={styles.result}>
          <p className={styles.solutionTitle}>Код решения:</p>
          <div className={styles.code}>
            <pre>{resultData.codeText}</pre>
          </div>
          <br />
          <div className={styles.controlPanelWrapper}>
            <div className={styles.controlPanel}>
              <div className={styles.mark} style={getMarkStyle(resultData.mark)}>
                {resultData.mark === -1 ? "—" : resultData.mark}/10
              </div>
            </div>
            <div className={styles.comments}>
              <div className={styles.comment_f}>
                <input
                  type="text"
                  placeholder="Введите комментарий"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment}>Отправить комментарий</button>
              </div>
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className={`${styles.comment} ${comment.username === "Admin" ? styles.admin : styles.user}`}
                >
                  <p>{comment.message}</p>
                  <p className={styles.outdata}>{comment.username} [{new Date(comment.timestamp).toLocaleString()}]</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
