import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import ListaEncuestas from './components/listaEncuestas/ListaEncuestas';
import Encuesta from './components/encuesta/Encuesta';
import CrearEncuesta from './components/crearEncuesta/CrearEncuesta';
import NotFound from './components/notFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<ListaEncuestas/>}/>
        <Route path='/encuesta/:id' element={<Encuesta/>}/>
        <Route path='/crearEncuesta' element={<CrearEncuesta/>} />

        <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
