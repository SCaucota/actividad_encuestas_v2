import React from 'react';
import { Link } from 'react-router-dom';

const ListaEncuestas = ({lista}) => {

    return (
        <div>
            <h2>Encuestas Disponibles</h2>
            {
                lista.map((encuesta, index) => (
                    <Link to={`/encuesta/${encuesta.id}`} key={index}>
                        <div>
                            <h3>{encuesta.titulo}</h3>
                            <p>{encuesta.descripcion}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default ListaEncuestas