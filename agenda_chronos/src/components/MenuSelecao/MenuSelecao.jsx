import React from 'react'
import "./MenuSelecao.css"

const MenuSelecao = () => {
  return (
    <div className='MenuSelecao'>
      <button>Tarefas pendentes</button>
      <button>Tarefas concluidas</button>
      <button>Tarefas com praso proximo</button>
    </div>
  )
}

export default MenuSelecao