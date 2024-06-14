import React from 'react';
import './MenuSelecao.css';
import { useList } from '../../context/ListProvider';

const MenuSelecao = () => {
  const { handleShowPendentes, handleShowConcluidas , handleShowTodas } = useList();

  
  return (
    <div className='MenuSelecao'>
      <button onClick={handleShowPendentes}>Tarefas pendentes</button>
      <button onClick={handleShowConcluidas}>Tarefas concluídas</button>
      <button onClick={handleShowTodas}>Todas as tarefas</button>
    </div>
  );
};

export default MenuSelecao;
