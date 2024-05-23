import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/HeaderAdmin";
import Modal from "../../../components/Modal";
import styles from "./Candidates.module.scss";
import {
  fetchUsers,
  selectAllUsers,
  selectUsersStatus,
} from "../../../redux/slices/users";
import { fetchTasks, selectAllTasks } from "../../../redux/slices/tasks";
import axios from 'axios';


const Candidates = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const usersStatus = useSelector(selectUsersStatus);
  const tasks = useSelector(selectAllTasks);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
    dispatch(fetchTasks());
  }, [usersStatus, dispatch]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
    setSelectedUser(null);
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const token = localStorage.getItem("token");

  const handleSelectUser = async (user) => {
    const payload = {
        fullName: user.fullName
    };
    const response = await axios.post('/user-id-by-fullname', payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
    }).then(function (res) {return res});
    console.log(response)
    var tmp = JSON.parse(JSON.stringify(user))
    tmp.user_id = response.data.user_id;
    // user.user_id = response.user_id;
    // console.log(user);
    setSelectedUser(tmp);
    handleOpenModal();
  };

  // const token = localStorage.getItem("token");
 const handleSubmit = async () => {
  if (selectedTask && selectedUser) {
    try {
      
      const payload = {
        task_id: selectedTask._id,
        user_id: selectedUser.user_id,
      };

      console.log('Отправляемый payload:', payload);

      const response = await axios.post('/user-tasks', payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      if (response.status === 201) {
        handleCloseModal();
      } else {
        throw new Error(`Ошибка при создании записи в БД UserTasks: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Ошибка при создании записи в БД UserTasks:', error.response ? error.response.data : error.message);
      // Добавляем alert для отображения ошибки в пользовательском интерфейсе
      alert(error.response ? error.response.data.message : error.message);
    }
  }
};
      
      
      
//       = await fetch("/user-tasks", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           task_id: selectedTask._id,
//           user_id: selectedUser.user_id,
//         }),
//       });
//       console.log(localStorage.getItem("token"));
//       if (response.ok) {
//         handleCloseModal();
//       } else {
//         const errorMessage = await response.text();
//         throw new Error(`Ошибка при создании записи в БД UserTasks: ${errorMessage}`);
//       }
//     } catch (error) {
//       console.error(error);
//       // Добавляем alert для отображения ошибки в пользовательском интерфейсе
//       alert(error.message);
//     }
//   }
// };

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h1>КАНДИДАТЫ. БАЗА ДАННЫХ</h1>
        <div className={styles.base}>
          <div className={styles.layout}>
            {users.map((user, index) => (
              <div key={index} className={styles.list}>
                <p>{user.fullName}</p>
                <button onClick={() => handleSelectUser(user)}>Назначить</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h2 style={{fontWeight:"bold"}}>Выберите задание: </h2>
          <div className={styles.taskList}>
            {tasks.map((task) => (
              <button
                key={task._id}
                onClick={() => handleSelectTask(task)}
                className={selectedTask?._id === task._id ? styles.selected : ""}
              >
                {task.taskNumber}
              </button>
            ))}
          </div>

          {selectedTask && (
            <div className={styles.taskDetails}>
              <h3 style={{fontWeight:"bold",marginBottom:"5px"}}>Задание {selectedTask.taskNumber}: </h3>
              <p style={{marginBottom:"5px"}}>{selectedTask.taskText}</p>
              <button onClick={handleSubmit} className={styles.submitButton}>
                Отправить
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Candidates;