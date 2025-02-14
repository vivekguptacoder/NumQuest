import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Game from './pages/Game'

export default function App(){
  
  return(

    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Auth /> }/>
          <Route path='/game' element={ <Game /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}