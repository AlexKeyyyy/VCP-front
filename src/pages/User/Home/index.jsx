// import React from "react";
// import Header from "../../../components/Header";
// import styles from "./Home.module.scss";
// import { Link, useNavigate } from "react-router-dom";
// import src from "../../../assets/NEWEllipses.png";
// import { useSelector } from "react-redux";
// import { selectIsAuth } from "../../../redux/slices/auth";
// const Home = () => {
//   const isAuth = useSelector(selectIsAuth);
//   const navigate = useNavigate();
//   if(!isAuth){
//     navigate("/login");
//   }
//   return (
//     <div>
//       <Header />
//       <div className={styles.content}>
//         <div className={styles.container}>
//           <div className={styles.layout}>
//             <span className={styles.ell}>
//               <img src={src} alt=""/>
//             </span>

//             <div class="container-tasks">
//               <div class="image-container-tasks">
//                 <img src="../../../assets/NEWTasks.png" alt="tasks"/>
//               </div>
//               <Link to="/tasks"> 
//                 <div className={styles.tasks}>
//                   <p>
//                     ЗАДАНИЯ
//                   </p>
//                 </div>
//               </Link>
//             </div>

//             <Link to="/account">
//               <div className={styles.account}>
//                 <p>
//                   ЛИЧНЫЙ<br />
//                   КАБИНЕТ
//                 </p>
//               </div>
//             </Link>
//             <Link to="/results">
//               <div className={styles.results}>
//                 <p>
//                   РЕЗУЛЬТАТЫ
//                 </p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import Header from "../../../components/Header";
import styles from "./Home.module.scss";
import { Link, useNavigate } from "react-router-dom";
import src from "../../../assets/NEWEllipses.png";
import src_tasks from "../../../assets/NEWTasks.png";
import src_acc from "../../../assets/NEWAcc.png";
import src_res from "../../../assets/NEWRes.png";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../../redux/slices/auth";

const Home = () => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  if (!isAuth) {
    navigate("/login");
  }
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <div>

            <div className={`${styles['account-container']}`}>
                <div className={styles['image-container-acc']}>
                  <img src={src_acc} alt="account" />
                </div>
                <Link to="/account">
                  <div className={styles["account-block"]}>
                    <p>
                      ЛИЧНЫЙ КАБИНЕТ
                    </p>
                  </div>
                </Link>
              </div>

              <div className={`${styles['task-container']}`}>
                <div className={styles['image-container-task']}>
                  <img src={src_tasks} alt="tasks" />
                </div>
                <Link to="/tasks">
                  <div className={styles["task-block"]}>
                    <p>ЗАДАНИЯ</p>
                  </div>
                </Link>
              </div>

              <div className={`${styles['results-container']}`}>
                <div className={styles['image-container-res']}>
                  <img src={src_res} alt="results" />
                </div>
                <Link to="/results">
                  <div className={styles["results-block"]}>
                    <p>РЕЗУЛЬТАТЫ</p>
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

