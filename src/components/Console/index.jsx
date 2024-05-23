import React from "react";
import styles from "./Console.module.scss";
import BSLConsole from "../bslConsole";

const Console = ({ userId, taskNumber }) => {
  return (
    <form className={styles.console}>
      <div className={styles.textAreaContainer}>
        <BSLConsole userId={userId} taskNumber={taskNumber} />
      </div>
    </form>
  );
};

export default Console;