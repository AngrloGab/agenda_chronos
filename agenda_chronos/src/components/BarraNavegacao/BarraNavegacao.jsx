import React from 'react'
import "./BarraNavegacao.css"

import iconeAampulheta from '../../assets/ampulheta.png';
import { useList } from '../../context/ListProvider';



const BarraNavegacao = () => {
  const {  setSearch } = useList();
  
  return (
    
    <div className='BarraNavegacao'>
        <img src={iconeAampulheta} alt="Example" className='iconeAmpulheta'/>
        <h1>Chronos</h1>
        <input type="text"  placeholder="Digite para pesquisar..." id='pesquisa' onChange={(e) => setSearch(e.target.value)}/>
    </div>
  )
}

export default BarraNavegacao