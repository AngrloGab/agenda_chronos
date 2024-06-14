import { useState, createContext, useContext } from 'react'

const ListContext = createContext(undefined);

export default function ListProvider({ children }) {

  const [search, setSearch] = useState("");
  

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

  return (
    <ListContext.Provider value={{ tasks, addTask, removeTask, search, setSearch}}>
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