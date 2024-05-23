import React from "react";
import Header from "../../../components/HeaderAdmin";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import src from "../../../assets/NEWEllipses.png";
import src_tasks from "../../../assets/NEWTasks.png";
import src_acc from "../../../assets/NEWAcc.png";
import src_res from "../../../assets/NEWRes.png";
const Home = () => {
  return (
    <div>
      <Header/>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <div>

            <div className={`${styles['account-container']}`}>
                <div className={styles['image-container-acc']}>
                  <img src={src_acc} alt="account" />
                </div>
                <Link to="/admin/candidates">
                  <div className={styles["account-block"]}>
                    <p>
                      КАНДИДАТЫ
                    </p>
                  </div>
                </Link>
              </div>

              <div className={`${styles['task-container']}`}>
                <div className={styles['image-container-task']}>
                  <img src={src_tasks} alt="tasks" />
                </div>
                <Link to="/admin/tasks">
                  <div className={styles["task-block"]}>
                    <p>ЗАДАНИЯ</p>
                  </div>
                </Link>
              </div>

              <div className={`${styles['results-container']}`}>
                <div className={styles['image-container-res']}>
                  <img src={src_res} alt="results" />
                </div>
                <Link to="/admin/results">
                  <div className={styles["results-block"]}>
                    <p>ПРОВЕРКА</p>
                  </div>
                </Link>
              </div>
            </div>


            <span className={styles.ell}>
              <img src={src} alt="" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
//форму сделай общую + и используй в логине и регистрации.
//форму в отдельный компонент!!!
