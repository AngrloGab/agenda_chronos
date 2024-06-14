import { useState } from 'react'
import "./Display.css"

import { useList } from '../../context/ListProvider';


const Display = ({setOpenModal}) => {

  const { tasks, removeTask, search, } = useList();

  return (
    <div className='Display'>
      <div className="task-list">
        <table>

          <tr>
            <th>Item</th>
            <th>Status</th>
            <th>Prioridade</th>
            <th >Prazo de entrega</th> 
            <th>Apagar tarefa</th>
          </tr>
        
          {tasks.filter((task) => task.text.toLowerCase().includes(search.toLowerCase())).map((task) => (
          
            <tr className="item" key={task.id}>
             
                <td>{task.text}</td>
                <td>{task.status}</td> 
               
                
                <td>{task.prioridade}</td>
                <td>{task.prazo_de_entrega}</td>
                <td className='botao-apagar'><button onClick={() => removeTask(task.id)} >X</button></td>
            
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