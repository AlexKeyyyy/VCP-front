import React, { useState, useEffect } from "react";
import Header from "../../../components/HeaderAdmin";
import styles from "./Tasks.module.scss";
import axios from "axios";
import Modal from "../../../components/ModalTask";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/tasksAll");
        setTasks(response.data);
      } catch (error) {
        console.error("Ошибка при получении задач:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h1>ЗАДАНИЯ. БАЗА ДАННЫХ</h1>
        <div className={styles.base}>
          <div className={styles.layout}>
            {tasks.map((task) => (
              <div className={styles.list} key={task._id}>
                <p>
                  <span style={{ fontWeight: "bold" }}>Задание {task.taskNumber}.</span> {task.taskText}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.action}>
            <button className={styles.edit} onClick={handleEditClick}>Редактировать</button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <TaskModalContent tasks={tasks} setTasks={setTasks} />
        </Modal>
      )}
    </div>
  );
};

const TaskModalContent = ({ tasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({ taskNumber: '', taskText: '', reference: '', inputData: '', outputData: '' });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [error, setError] = useState(null);

  const handleEditChange = (e, task) => {
    const { name, value } = e.target;
    setEditingTask({ ...editingTask, [name]: value });
  };

  const handleSaveEdit = async (taskId) => {
    try {
      await axios.put(`/tasks/${taskId}`, editingTask);
      setTasks((prevTasks) => prevTasks.map(task => task._id === taskId ? { ...task, ...editingTask } : task));
      setEditingTask(null);
    } catch (error) {
      console.error("Ошибка при обновлении задания:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Ошибка при удалении задания:", error);
    }
  };

  const handleAddNewTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/tasks-create", newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      setTasks([...tasks, response.data]);
      setNewTask({ taskNumber: '', taskText: '', reference: '', inputData: '', outputData: '' });
      setIsAddingNew(false); // Скрываем добавление новой задачи после сохранения
      setError(null); // Сброс ошибки после успешного запроса
    } catch (error) {
      console.error("Ошибка при добавлении задания:", error);
      setError(error.response?.data || "Неизвестная ошибка"); // Устанавливаем сообщение об ошибке
    }
  };

  return (
    <div className={styles.modallayoout}>
      <table className={styles.modaltable}>
        <thead>
          <tr>
            <th>Номер задания</th>
            <th>Текст задания</th>
            <th>Изменение</th>
            <th>Удаление</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>
                {editingTask && editingTask._id === task._id ? (
                  <input
                    type="number"
                    name="taskNumber"
                    value={editingTask.taskNumber}
                    onChange={(e) => handleEditChange(e, task)}
                  />
                ) : (
                  task.taskNumber
                )}
              </td>
              <td>
                {editingTask && editingTask._id === task._id ? (
                  <input
                    type="text"
                    name="taskText"
                    value={editingTask.taskText}
                    onChange={(e) => handleEditChange(e, task)}
                  />
                ) : (
                  task.taskText
                )}
              </td>
              <td>
                {editingTask && editingTask._id === task._id ? (
                  <button onClick={() => handleSaveEdit(task._id)}>ОК</button>
                ) : (
                  <button onClick={() => setEditingTask(task)}>ИЗМ</button>
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(task._id)}>Х</button>
              </td>
            </tr>
          ))}
          {isAddingNew && (
            <tr>
              <td>
                <input
                  type="number"
                  name="taskNumber"
                  value={newTask.taskNumber}
                  onChange={(e) => setNewTask({ ...newTask, taskNumber: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="taskText"
                  value={newTask.taskText}
                  onChange={(e) => setNewTask({ ...newTask, taskText: e.target.value })}
                />
              </td>
              <td colSpan="2">
                <button onClick={handleAddNewTask}>ОК</button>
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="4">
              <button onClick={() => setIsAddingNew(true)}>+</button>
            </td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className={styles.err}>
          Ошибка: {Array.isArray(error) ? error.map(err => <div key={err.msg}>{err.msg}</div>) : error.message}
        </div>
      )}
    </div>
  );
};

export default Tasks;
