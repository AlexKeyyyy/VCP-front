import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Библиотека для декодирования JWT
import Header from "../../../components/Header";
import styles from "./Account.module.scss";

const Account = () => {
  const data = [
    { label: "ФИО", stateKey: "fullName" },
    { label: "Пароль", stateKey: "password" },
    { label: "E-mail", stateKey: "email" },
  ];

  const initialState = Object.fromEntries(
    data.map(({ stateKey }) => [stateKey, ""])
  );

  const [formData, setFormData] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null); // Стейт для хранения userId

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (token) {
      // Декодируем токен, чтобы получить информацию о пользователе
      const decodedToken = jwtDecode(token);
      // Извлекаем userId из декодированного токена
      const userId = decodedToken._id;
      setUserId(userId);

      // Функция для загрузки данных пользователя
      const loadUserData = async () => {
        try {
          const response = await fetch(`/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Ошибка загрузки данных пользователя");
          }

          const userData = await response.json();
          setFormData({
            fullName: userData.fullName || "",
            password: "", // Пароль обычно не передается, можно оставить пустым
            email: userData.email || "",
          });
        } catch (error) {
          console.error(error);
          // Обработка ошибки при загрузке данных
        }
      };

      loadUserData();
    }

    // Загрузка сохраненных данных из localStorage
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleInputChange = (e, stateKey) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, [stateKey]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    console.log("User ID:", userId);
    console.log("Form Data:", formData);
    
    const response = await fetch(`/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    
    console.log("Response:", response);

    if (!response.ok) {
      throw new Error("Ошибка обновления данных пользователя");
    }
    setIsEditing(false);
  } catch (error) {
    console.error(error);
    // Обработка ошибки при обновлении данных
  }
};


  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h1>ЛИЧНЫЙ КАБИНЕТ</h1>
        {isEditing ? (
          <form onSubmit={handleSubmit} className={styles.account}>
            {data.map(({ label, stateKey }) => (
              <div key={stateKey} className={styles.inputs}>
                <p>{label}</p>
                <input
                  type={stateKey === "email" ? "email" : "text"}
                  value={formData[stateKey]}
                  onChange={(e) => handleInputChange(e, stateKey)}
                />
              </div>
            ))}
            <div className={styles["btn-container"]}>
              <button className={styles.btn} type="submit">
                <span>Сохранить</span>
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.account}>
            {data.map(({ label, stateKey }) => (
              <div key={stateKey} className={styles.inputs}>
                <p>{label}</p>
                <span>{formData[stateKey]}</span>
              </div>
            ))}
            <div className={styles["btn-container"]}>
              <button className={styles.btn} onClick={() => setIsEditing(true)}>
                <span>Редактировать</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default Account;
