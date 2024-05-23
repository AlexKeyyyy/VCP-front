import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.modalContent}>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
