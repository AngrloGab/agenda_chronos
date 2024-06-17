import { useState, createContext, useContext } from 'react'

const ListContext = createContext(undefined);

export default function ListProvider({ children }) {


  const [search, setSearch] = useState("");
  const [showPendentes, setShowPendentes] = useState(false);
  const [showConcluidas, setShowConcluidas] = useState(false);
  
  const handleShowPendentes = () => {
    setShowPendentes(true);
    setShowConcluidas(false);

    console.log(showPendentes,showConcluidas); 
  };

  const handleShowConcluidas = () => {
    setShowPendentes(false);
    setShowConcluidas(true);
    console.log(showPendentes,showConcluidas);
  };

  const handleShowTodas = () => {
    setShowPendentes(false);
    setShowConcluidas(false);
    console.log(showPendentes,showConcluidas);
  };

  
  const[tasks, setTasks] = useState([
    {
      id: 1,
      text: "Fazer agenda chronos",
      status: "Em andamento",
      prioridade: "Alta",
      prazo_de_entrega: "2 de Jun, 2024"
    },
    {
      id: 2,
      text: "Criar sprites do jogo",
      status: "Suspenso",
      prioridade: "Baixa",
      prazo_de_entrega: "10 de Dez, 2024"
    },
    {
      id: 3,
      text: "Estudar lógica",
      status: "Feito",
      prioridade: "Média",
      prazo_de_entrega: "8 de Jul, 2024"
    },
  ]);

  const addTask =(text,status, prioridade, prazo_de_entrega) => {
    const newTasks = [...tasks, {
      id: Math.floor(Math.random() * 1000),
      text,
      status,
      prioridade,
      prazo_de_entrega,
    },
  ];
    setTasks(newTasks);
  };

  const removeTask = (id) => {
    const newTasks = [...tasks]
    const filteredTasks = newTasks.filter(task => task.id !== id ? task : null);
    setTasks(filteredTasks);
  };

  const changeStatus = (id, e) => {
    setTasks(prevTasks => 
        prevTasks.map(task =>
          task.id === id ? { ...task, status: e } : task
        )
      );
  };

  return (
    <ListContext.Provider value={{ tasks, addTask, removeTask, search, setSearch, changeStatus, handleShowPendentes, handleShowConcluidas , handleShowTodas, showPendentes,showConcluidas}}>
      { children }
    </ListContext.Provider>
  );
}

export function useList() {
  const context = useContext(ListContext);

  if (!context) {
    throw new Error('Para usar o useCart seu componente precisa estar dentro do ListProvider');
  }

  return context;
}