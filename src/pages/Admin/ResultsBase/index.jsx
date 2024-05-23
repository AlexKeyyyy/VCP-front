import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../../components/HeaderAdmin";
import styles from "./ResultsBase.module.scss";

const ResultsBase = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("/get-result-admin");
        
        setResults(response.data);
        
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchResults();
  }, []);

  const handleReport = async () => {
    try {
      const response = await axios.get("/make-report", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Ошибка при скачивании отчета:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h1> РЕШЕНИЯ. БАЗА ДАННЫХ</h1>
        <div className={styles.base}>
          <div className={styles.layout}>
            <span className={styles.line}></span>
            <div className={styles.listContainer}>
              {results.map((result) => (
                <div key={result.user_id} className={styles.list}>
                  <p>
                    {new Date(result.doneAt).toLocaleString()} - {result.fullName}: задание №{result.taskNumber}
                  </p>
                  <Link to={`/admin/results/${result.user_id}/${result.taskNumber}`}>
                    <button className={styles.more}>Подробнее</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.action}>
            <button className={styles.report} onClick={handleReport}>
              Отчет за месяц
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsBase;
