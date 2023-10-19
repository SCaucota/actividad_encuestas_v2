import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import ListaEncuestas from './components/listaEncuestas/ListaEncuestas';
import Encuesta from './components/encuesta/Encuesta';
import CrearEncuesta from './components/crearEncuesta/CrearEncuesta';
import NotFound from './components/notFound/NotFound';
import { encuestas } from './data/encuestas'

function App() {

  const [listaEncuestas, setListaEncuestas ] = useState(encuestas);

  const agregarEncuesta = (nuevaEncuesta) => {
    const ultimaEncuesta = listaEncuestas[listaEncuestas.length - 1];
    nuevaEncuesta.id = ultimaEncuesta.id + 1;
    setListaEncuestas([nuevaEncuesta, ...listaEncuestas]);
  };

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<ListaEncuestas lista={listaEncuestas} />}/>
        <Route path='/encuesta/:id' element={<Encuesta lista={listaEncuestas}/>}/>
        <Route path='/crearEncuesta' element={<CrearEncuesta agregarEncuesta={agregarEncuesta}/>} />

        <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
