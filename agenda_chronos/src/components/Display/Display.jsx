import { useState } from 'react';
import './Display.css';
import { useList } from '../../context/ListProvider';

const Display = ({ setOpenModal }) => {
  const { tasks, removeTask, search, changeStatus , showPendentes, showConcluidas} = useList();


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
                  <select value={task.status} onChange={(e) => changeStatus(task.id, e.target.value)}>
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
