import { useState } from 'react'
import "./App.css"

import BarraNavegacao from './components/BarraNavegacao/BarraNavegacao'
import Display from './components/Display/Display'
import MenuSelecao from './components/MenuSelecao/MenuSelecao'


function App() {


  return (
    <div className="app">
      <BarraNavegacao></BarraNavegacao>
      <div className="content">
        <MenuSelecao/>
        <Display/>
      </div>
      
    </div>
   
  )
}

export default App
