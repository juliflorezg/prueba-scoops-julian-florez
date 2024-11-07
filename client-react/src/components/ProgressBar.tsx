import styles from "./ProgressBar.module.css"

const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className={styles["progress-bar"]}>
      <div className={styles["progress"]} style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar