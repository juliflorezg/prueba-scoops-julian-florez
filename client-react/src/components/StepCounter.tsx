import styles from "./StepCounter.module.css"

const StepCounter = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => {
  return (
    <div className={styles["step-counter"]}>
      <span className={styles["step-counter__text-md"]}>0{currentStep} |</span>
      <span className={styles["step-counter__text-sm"]}>0{totalSteps}</span>
    </div>
  );
};

export default StepCounter