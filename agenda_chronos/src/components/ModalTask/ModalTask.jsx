import {useState} from 'react'
import "./ModalTask.css"
import Datepicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns';
import axios from 'axios'

function ModalTask({setOpenModal}) {


  const [values, setValues] = useState({
    titulo: '',
    status: '',
    prioridade: '',
    data: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { titulo, status, prioridade, data } = values;
    if(!data || !titulo || !status || !prioridade) return;
    const formattedDate = data ? format(new Date(data), "dd 'de' MMMM, yyyy") : null;

    // Atualizar o estado de values com a data formatada
    setValues(prevValues => ({
        ...prevValues,
        data: formattedDate
    }));

    // Adicionar task usando axios
    axios.post('http://localhost:8081/task', {
        titulo: values.titulo,
        status: values.status,
        prioridade: values.prioridade,
        data: formattedDate
    })
    .then(res => {
        console.log(res);
        // Limpar os campos após o sucesso
        setValues({
            titulo: '',
            status: '',
            prioridade: '',
            data: ''
        });
        setOpenModal(false);
        // Recarregar a página após fechar o modal
        window.location.reload();
    })
    .catch(err => console.log(err));
}
  
  return (
    <div className='modal-background'>
        <div className='modalContainer'>

            <div className="task-form">
                
                <h2 className='task-modal-title' >Criar tarefa:</h2>
                <form onSubmit={handleSubmit} className='formulario'>

                    <table className='tabela'>

                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Status</th>
                                <th>Prioridade</th>
                                <th>Prazo</th>
                            </tr>
                        </thead>

                        <thead>

                            <tr>
                                <td> <input className='arredondado'  type="text" placeholder='Digite o título' onChange={(e) => setValues({...values, titulo: e.target.value})} /> </td>
                                <td>
                                    <select className='arredondado'  onChange={(e) => setValues({...values, status: e.target.value})}>
                                        <option value="">Selecione um status</option>
                                        <option value="Parado">Parado</option>
                                        <option value="Em andamento">Em andamento</option>
                                        <option value="Suspenso">Suspenso</option>
                                        <option value="Feito">Feito</option>
                                    </select>
                                </td>

                                <td>
                                    <select className='arredondado'  onChange={(e) => setValues({...values, prioridade: e.target.value})} >
                                        <option value="">Selecione a prioridade</option>
                                        <option value="Alta">Alta</option>
                                        <option value="Média">Média</option>
                                        <option value="Baixa">Baixa</option>
                                    </select>
                                </td>

                                <td>
                                    <Datepicker className='arredondado'  selected={values.data}  onChange={data => setValues({ ...values, data: data })} dateFormat="dd 'de' MM, yyyy"/>
                                </td>
                            

                            
                            </tr>
                        </thead>

                       
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