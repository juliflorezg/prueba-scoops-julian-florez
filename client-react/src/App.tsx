import './index.css'
import MultiStepForm, { Steps } from './components/MultiStepForm';

const stepsConfig: Steps = [
  {
    text: [
      {
        type: "inline-paragraph",
        content: "Muchas gracias por tu interés en conocer "
      },
      {
        type: "span-bold",
        content: "customerScoops, "
      },
      {
        type: "inline-paragraph",
        content: "que a través de Formularios Conversacionales Inteligente te ayudamos a aumentar el revenue y rentabilidad de tu negocio. "
      },
      {
        type: "paragraph",
        content: "Queremos conocerte, ¿cuál es tu nombre?"
      },
    ],
    options: {
      type: "input",
      list: ["Nombre"]
    },
    isMultipleChoice: false
  },
  {
    text: [
      {
        type: "span-bold",
        content: "Genial ${name}, "
      },
      {
        type: "inline-paragraph",
        content: "ahora nos gustaría tener cierta info para diseñar una gran propuesta de valor para ti:"
      },
      {
        type: "paragraph",
        content: "¿Cuál es tu cargo/posición dentro de tu empresa?"
      },
    ],
    options: {
      type: "check",
      list: ["Board member", "C-level", "Gerente", "Subgerente", "Jefe area", "Líder de area", "Ejecutivo / Analista", "Other"],
    },
    isMultipleChoice: false
  },
  {
    text: [
      {
        type: "paragraph",
        content: "¿Cuáles son tus principales desafíos para 2024?"
      },
    ],
    options: {
      type: "check",
      list: [
        { bullet: "A", text: "Aumentar conversión de leads a clientes" },
        { bullet: "B", text: "Reducir customer churn" },
        { bullet: "C", text: "Implementar un programa VoC" },
        { bullet: "D", text: "Reducir costos en gestión de reclamos" },
        { bullet: "E", text: "Optimizar procesos comerciales" },
        { bullet: "F", text: "Optimizar procesos operativos" },
        { bullet: "G", text: "Otro" }
      ],
    },
    isMultipleChoice: true
  },
  {
    text: [
      {
        type: "paragraph",
        content: "¿Cuál CRM están utilizando en tu empresa? CRM:"
      },
    ],
    options: {
      type: "check",
      list: ["SAP", "Microsoft Dynamics", "Salesforce", "Hubspot", "Zoho", "Netsuite", "Monday", "CRM propio", "No tengo CRM"],
    },
    isMultipleChoice: false
  },
  {
    text: [
      {
        type: "paragraph-bold",
        content: "Ahora te vamos a sorprender..."
      },
      {
        type: "paragraph",
        content: "¿A cuál industria pertenece tu empresa?"
      },
    ],
    options: {
      type: "check",
      list: ["Tecnología", "Software", "Servicios", "Financiera", "Telecomunicaciones", "Producción/Fabricación", "Logística", "Consumo Masivo", "Mayorista", "Retail"],
    },
    isMultipleChoice: false
  },
  {
    text: [
      {
        type: "paragraph-bold",
        content: "Muchas Gracias"
      },
      {
        type: "paragraph",
        content: "por querer ser parte"
      },
      {
        type: "paragraph",
        content: "de la familia Scoopers"
      },
      {
        type: "paragraph",
        content: "nos vemos pronto!"
      },
    ],
    isMultipleChoice: false
  },
];


const App = () => {
  return <MultiStepForm steps={stepsConfig} />;
};

export default App;
