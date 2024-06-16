import {useState} from 'react'
import "./ModalTask.css"
import Datepicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns';
import { useList } from '../../context/ListProvider';

function ModalTask({setOpenModal}) {

  const { addTask } = useList();

  const [selectedDate, setDate] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!selectedDate || !titulo || !status || !prioridade) return;
    const formattedDate = selectedDate ? format(selectedDate, "dd 'de' MMMM, yyyy") : null;
    console.log(titulo,status,prioridade,formattedDate);
    //adicionar task
    addTask(titulo,status,prioridade,formattedDate); 
    //limpar os campos
    setDate(null);
    setTitulo("");
    setStatus("");
    setPrioridade("");
    setOpenModal(false);
  }
  
  return (
    <div className='modal-background'>
        <div className='modalContainer'>

            <div className="task-form">
                
                <h2 className='task-modal-title' >Criar tarefa:</h2>
                <form onSubmit={handleSubmit} className='formulario'>

                    <table className='tabela'>

                        <tr>
                            <th>Título</th>
                            <th>Status</th>
                            <th>Prioridade</th>
                            <th>Prazo</th>
                        </tr>

                        <tr>
                            <td> <input className='arredondado' value={titulo} type="text" placeholder='Digite o título' onChange={(e) => setTitulo(e.target.value)} /> </td>
                            <td>
                                <select className='arredondado' value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">Selecione um status</option>
                                    <option value="Parado">Parado</option>
                                    <option value="Em andamento">Em andamento</option>
                                    <option value="Suspenso">Suspenso</option>
                                    <option value="Feito">Feito</option>
                                </select>
                            </td>

                            <td>
                                <select className='arredondado' value={prioridade} onChange={(e) => setPrioridade(e.target.value)} >
                                    <option value="">Selecione a prioridade</option>
                                    <option value="Alta">Alta</option>
                                    <option value="Média">Média</option>
                                    <option value="Baixa">Baixa</option>
                                </select>
                            </td>

                            <td>
                                <Datepicker className='arredondado' value={selectedDate} selected={selectedDate} onChange={date=>setDate(date)} dateFormat="dd 'de' MM, yyyy"/>
                            </td>
                           

                           
                        </tr>

                       
                    </table>
                    <button type="submit" className='button-create-task'> Criar tarefa</button>
                    <button type="cancel" onClick={()=> setOpenModal(false)} className='cancelButton'> Cancelar</button>
                    
                </form>
                
            </div>
        </div>
    </div>
  )
}

export default ModalTask