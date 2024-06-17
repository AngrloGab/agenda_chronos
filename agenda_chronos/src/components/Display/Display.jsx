import { useState, useEffect } from 'react';
import './Display.css';
import { useList } from '../../context/ListProvider';
import axios from 'axios'

const Display = ({ setOpenModal }) => {
  const { search, showPendentes, showConcluidas} = useList();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:8081/')
      .then(res => setTasks(extractTasks(res.data)))
      .catch(err => console.log(err));
  };

  const extractTasks = (list) => {
    return list.map(item => ({
      id: item.id,
      text: item.titulo,
      status: item.status,
      prioridade: item.prioridade,
      prazo_de_entrega: item.data
    }));
  }

  useEffect(() => {
    axios.get('http://localhost:8081/')
    .then(res => setTasks(extractTasks(res.data)))
    .catch(err => console.log(err));
  }, []);
  

  const getColorClass = (prioridade) => {
    switch (prioridade) {
      case 'Alta':
        return 'prioridade-alta';
      case 'Média':
        return 'prioridade-media';
      case 'Baixa':
        return 'prioridade-baixa';
      default:
        return '';
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    // Atualizar o status no frontend imediatamente
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // Enviar a solicitação para atualizar o status no backend
    axios.put(`http://localhost:8081/task/${taskId}`, { status: newStatus })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const removeTask = (taskId) => {
    // Remover a tarefa do estado local
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);

    // Enviar uma solicitação DELETE para remover a tarefa do servidor
    axios.delete(`http://localhost:8081/task/${taskId}`)
      .then(res => {
        console.log(res.data);
        // Atualizar a lista de tarefas após a remoção
        fetchTasks();
      })
      .catch(err => console.log(err));
  };


  const filteredTasks = () => {
    if (showPendentes) {
      return tasks.filter(task => task.status !== 'Feito');
    } else if (showConcluidas) {
      return tasks.filter(task => task.status === 'Feito');
    } else {
      return tasks;
    }
  };

  return (
    <div className='Display'>
      <div className="task-list">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Status</th>
              <th>Prioridade</th>
              <th>Prazo de entrega</th> 
              <th>Apagar tarefa</th>
            </tr>
          </thead>
          <tbody>
          {filteredTasks().filter((task) => task.text.toLowerCase().includes(search.toLowerCase()))
              .map((task) => (
              <tr className="item" key={task.id}>
                <td>{task.text}</td>
                <td className='status-display'>
                  <select value={task.status} onChange={(e) => handleStatusChange(task.id, e.target.value)}>
                    <option value="">Selecione um status</option>
                    <option value="Parado">Parado</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Suspenso">Suspenso</option>
                    <option value="Feito">Feito</option>
                  </select>
                </td>
                <td className={getColorClass(task.prioridade)}>{task.prioridade}</td>
                <td>{task.prazo_de_entrega}</td>
                <td className='botao-apagar'><button onClick={() => removeTask(task.id)}>X</button></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5">
                <button className='create-task' onClick={() => setOpenModal(true)}>+</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Display;
