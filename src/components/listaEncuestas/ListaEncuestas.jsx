import React from 'react';
import { Link } from 'react-router-dom';
import './listaEncuestas.css';

const ListaEncuestas = ({ lista }) => {

    return (
        <div className="listaEncuestasContainer">
            <h2>Encuestas Disponibles</h2>
            {
                lista.map((encuesta, index) => (
                    <Link to={`/encuesta/${encuesta.id}`} key={index} className="encuestaLink">
                        <div className="encuestaCard">
                            <h3 className="encuestaTitulo">{encuesta.titulo}</h3>
                            <p className="encuestaDescripcion">{encuesta.descripcion}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default ListaEncuestas;
