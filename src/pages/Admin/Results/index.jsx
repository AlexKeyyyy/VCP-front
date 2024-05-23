import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HeaderAdmin from "../../../components/HeaderAdmin";
import styles from "./Results.module.scss";

const Results = () => {
  const { userId, taskNumber } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [resultData, setResultData] = useState(null);
  const [editMark, setEditMark] = useState(false);
  const [newMark, setNewMark] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/get-result-data-admin/${userId}/${taskNumber}`);
        setResultData(response.data);
        const allComments = [
          ...response.data.commentUser.map(comment => ({ ...comment, type: 'user' })),
          ...response.data.commentAdmin.map(comment => ({ ...comment, type: 'admin' }))
        ];
        setComments(allComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchData();
  }, [userId, taskNumber]);

  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      const currentDate = new Date().toISOString();

      const newCommentObj = {
        message: newComment,
        timestamp: currentDate,
        username: "Admin",
        type: "admin"
      };

      try {
        await axios.patch(`/comment-admin/${userId}/${taskNumber}`, {
          message: newCommentObj.message
        });

        setComments([newCommentObj, ...comments]);
        setNewComment("");
      } catch (error) {
        console.error("Ошибка при отправке комментария:", error);
      }
    }
  };

  const handleEditMark = () => {
    setEditMark(true);
    setNewMark(resultData.mark);
  };

  const handleSaveMark = async () => {
    try {
      await axios.patch(`/set-mark/${userId}/${taskNumber}`, { mark: newMark });
      setResultData({ ...resultData, mark: newMark });
      setEditMark(false);
    } catch (error) {
      console.error("Ошибка при сохранении оценки:", error);
    }
  };

  const getMarkStyle = (mark) => {
    if (mark === -1) return { backgroundColor: "black" };
    if (mark >= 0 && mark <= 4) return { backgroundColor: "red" };
    if (mark >= 5 && mark <= 7) return { backgroundColor: "gray" };
    if (mark >= 8 && mark <= 10) return { backgroundColor: "green" };
  };

  if (!resultData) {
    return <div>Загрузка...</div>;
  }
return (
    <div>
      <HeaderAdmin />
      <div className={styles.content}>
        <h1>Задание №{taskNumber}</h1>
        <p style={{fontWeight:"bold"}}>Решение от {resultData.fullName} {new Date(resultData.doneAt).toLocaleString()}</p>
        <p><span style={{fontWeight:"bold"}}>Текст задания: </span>{resultData.taskText}</p>
        <div className={styles.result}>
          <p className={styles.solutionTitle}>Код решения:</p>
          <div className={styles.code}>
            <pre>{resultData.codeText}</pre>
          </div>
          <div className={styles.controlPanelWrapper}>
            <div className={styles.controlPanel}>
              <div className={styles.mark} style={getMarkStyle(resultData.mark)}>
                {editMark ? (
                  <input
                    type="number"
                    value={newMark}
                    onChange={(e) => setNewMark(e.target.value)}
                    min="0"
                    max="10"
                  />
                ) : (
                  resultData.mark === -1 ? "—" : resultData.mark
                )}
                /10
              </div>
              {editMark ? (
                <button onClick={handleSaveMark}>Сохранить</button>
              ) : (
                <button onClick={handleEditMark}>Изменить оценку</button>
              )}
            </div>
            <div className={styles.comment_f}>
              <input
                type="text"
                placeholder="Введите комментарий"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={handleAddComment}>Отправить комментарий</button>
            </div>
          </div>
          <div className={styles.comments}>
            {comments.map((comment, index) => (
              <div
                key={index}
                className={`${styles.comment} ${comment.type === "admin" ? styles.admin : styles.user}`}
              >
                <p>{comment.message}</p>
                <p className={styles.outdata}>
                  {comment.type === "admin" ? "Admin" : resultData.fullName} [{new Date(comment.timestamp).toLocaleString()}]
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;