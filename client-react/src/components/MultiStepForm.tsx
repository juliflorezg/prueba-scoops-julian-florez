import { useEffect, useState } from "react";
import compLogo from "../assets/logo.svg"
import ProgressBar from "./ProgressBar";
import StepCounter from "./StepCounter";
import styles from './MultiStepForm.module.css'


export type Step = {
  text: {
    type: string,
    content: string
  }[],
  options?: {
    type: string,
    list: { bullet: string, text: string }[] | string[],
  },
  isMultipleChoice: boolean
}

export type Steps = Step[]

const MultiStepForm = ({ steps }: { steps: Steps }) => {
  const responsesMap: Record<string, number> = {
    "name": 0,
    "cargo": 1,
    "desafios": 2,
    "crm": 3,
    "industria": 4,
    "": 5,
  }

  const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2 .... 
  const [responses, setResponses] = useState<Record<any, any[]>>({}); // {0: ["opt1"]}
  const [isNextEnabled, setIsNextEnabled] = useState(false)

  useEffect(() => {
    setIsNextEnabled(responses[currentStep] && responses[currentStep].length > 0)

  }, [responses, currentStep])

  const totalSteps = steps.length;
  const step = steps[currentStep];

  const handleSelect = (choice: string) => {
    setResponses((prev) => {
      const newResponses = { ...prev };
      const foundItem = newResponses[currentStep]?.find(item => item === choice)
      if (!foundItem) {
        newResponses[currentStep] = step.isMultipleChoice
          ? [...(newResponses[currentStep] || []), choice]
          : [choice];
        return newResponses;
      } else {
        newResponses[currentStep] = step.isMultipleChoice
          ? (newResponses[currentStep].filter(item => item != choice) || [])
          : [choice];
        return newResponses;

      }
    });
  };

  const handleInput = (input: any) => {
    setResponses((prev) => {
      const newResponses = { ...prev };
      newResponses[currentStep] = input.value.length > 0
        ? [input.value]
        : [];
      return newResponses;
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const processTextContent = (text: string): string => {
    const regex = /\$\{([^}]+)\}/g;
    const matches = [...text.matchAll(regex)];

    if (matches.length === 0) return text

    let result = text

    // replace variables in text with their value
    matches.forEach(match => {
      result = result.replace(match[0], responses[responsesMap[match[1]]][0] as string)
    });

    return result
  }

  const handleFinishBtn = () => {
    window.location.href = "https://www.customerscoops.com/"
  }

  return (
    <main className={styles["form-container"]}>
      <ProgressBar currentStep={currentStep + 1} totalSteps={totalSteps} />
      <StepCounter currentStep={currentStep + 1} totalSteps={totalSteps} />


      <section className={styles["step-content"]}>
        <header className={styles["form-header-background"]}>
          <img src={compLogo} alt="logo for company" className={styles["form-header-background__logo"]} />
        </header>

        <div className={styles["step-content__text-buttons"]}>
          <img src={compLogo} alt="logo for company" className={styles["step-content__text-buttons-logo"]} />

          {step.text &&
            <div className={styles["step-content__text-container"]}>
              {
                step.text.map((obj: { type: string, content: string }) => {
                  if (obj.type == "paragraph") {
                    return (<p className={styles["step-content_paragraph"]} key={obj.type + obj.content}>
                      {processTextContent(obj.content)}
                    </p>)
                  }

                  if (obj.type == "paragraph-bold") {
                    return (<p className={styles["step-content_paragraph-bold"]} key={obj.type + obj.content}>
                      {processTextContent(obj.content)}
                    </p>)
                  }

                  if (obj.type == "inline-paragraph") {
                    return (<p className={styles["step-content_inline-paragraph"]} key={obj.type + obj.content}>{processTextContent(obj.content)}</p>)
                  }

                  if (obj.type == "span") {
                    return (<span>{processTextContent(obj.content)}</span>)
                  }

                  if (obj.type == "span-bold") {
                    return (<span className={styles["step-content_bold-span"]} key={obj.type + obj.content}>{processTextContent(obj.content)}</span>)
                  }
                })
              }
            </div>
          }
          {step.options &&

            <div className={`${styles["options"]} ${typeof step.options.list[0] === "object" && styles["options-column"]}`}>
              {step.options.type == "check" && Array.isArray(step.options.list) && step.options.list.map((option: any, index: number) => (
                <button
                  key={index}
                  className={`${styles.option} ${responses[currentStep]?.includes(option) ? styles.selected : ''
                    }`}
                  onClick={() => handleSelect(option)}
                >
                  {typeof option === "string"
                    ? option
                    : typeof option === "object"
                      ? (<>
                        <span className={styles["option__bullet"]}>{option.bullet}</span><span>{option.text}</span>
                      </>
                      ) : null}
                </button>
              ))}

              {step.options.type == "input" && Array.isArray(step.options.list) && step.options.list.map((option: any, index: number) => (
                <input
                  key={index}
                  placeholder={option}
                  className={`${styles.option} ${responses[currentStep]?.includes(option) ? styles.selected : ''
                    }`}
                  onInput={(e) => handleInput(e.target)}

                />
              ))}
            </div>
          }

          <div className={styles.navigation}>
            {currentStep > 0 && currentStep != steps.length - 1 && (
              <button onClick={handleBack} className={styles["back-button"]}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
              </button>
            )}
            {currentStep != steps.length - 1 &&
              <button
                onClick={handleNext}
                disabled={!isNextEnabled}
                className={`${styles["next-button"]} ${isNextEnabled ? `${styles.enabled}` : ''}`}
              >
                Siguiente
              </button>
            }
            {currentStep === totalSteps - 1 &&
              <button className={styles["submit-button"]} onClick={() => handleFinishBtn()}>Finalizar</button>
            }
          </div>
        </div>

      </section>
    </main >
  );
};

export default MultiStepForm