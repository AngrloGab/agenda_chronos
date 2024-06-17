import { useState } from 'react'
import "./Home.css"


import BarraNavegacao from './components/BarraNavegacao/BarraNavegacao'
import Display from './components/Display/Display'
import MenuSelecao from './components/MenuSelecao/MenuSelecao'
import ModalTask from './components/ModalTask/ModalTask'

import ListProvider from './context/ListProvider'



function Home() {

  const [openModal, setOpenModal] = useState(false);

  
  

  return (
    <div className="app">
      <ListProvider >
        {openModal && <ModalTask setOpenModal={setOpenModal} />}
        <BarraNavegacao></BarraNavegacao>
        <div className="content">
          <MenuSelecao/>
          <Display setOpenModal={setOpenModal} />
        </div>
      </ListProvider>
    </div>

  )
}

export default Home
