import { useState } from 'react'
import "./Display.css"

import { useList } from '../../context/ListProvider';


const Display = ({setOpenModal}) => {

  const { tasks } = useList();

  // const[tasks, setTasks] = useState([
  //   {
  //     id: 1,
  //     text: "Fazer agenda chronos",
  //     status: "Em andamento",
  //     prioridade: "alta",
  //     prazo_de_entrega: "2 de Jun, 2024"
  //   },
  //   {
  //     id: 2,
  //     text: "Criar sprites do jogo",
  //     status: "Suspenso",
  //     prioridade: "baixa",
  //     prazo_de_entrega: "10 de Dez, 2024"
  //   },
  //   {
  //     id: 3,
  //     text: "Estudar lógica",
  //     status: "Feito",
  //     prioridade: "Média",
  //     prazo_de_entrega: "8 de Jul, 2024"
  //   },
  // ]);



  return (
    <div className='Display'>
      <div className="task-list">
        <table>

          <tr>
            <th>Item</th>
            <th>Status</th>
            <th>Prioridade</th>
            <th colSpan="2">Prazo de entrega</th>
          </tr>
        
          {tasks.map((task) => (
          
            <tr className="item">
             
                <td>{task.text}</td>
                <td>{task.status}</td>
                <td>{task.prioridade}</td>
                <td>{task.prazo_de_entrega}</td>
            
            </tr>
        ))}

        <tr>
          <th>
            <button className='create-task' onClick={() => {
              setOpenModal(true);
            }}>+</button>
          </th>
        </tr>
        </table>
        
      </div>
    
    </div>
   
  )
}

export default Display