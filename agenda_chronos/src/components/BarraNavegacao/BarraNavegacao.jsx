import React from 'react'
import "./BarraNavegacao.css"

import iconeAampulheta from '../../assets/ampulheta.png';

const BarraNavegacao = () => {
  return (
    <div className='BarraNavegacao'>
        <img src={iconeAampulheta} alt="Example" className='iconeAmpulheta'/>
        <h1>Chronos</h1>
        <input type="text"  placeholder="Digite para pesquisar..." id='pesquisa'/>
    </div>
  )
}

export default BarraNavegacao