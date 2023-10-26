import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './encuesta.css';

const Encuesta = ({ lista }) => {

    const { id } = useParams();

    const [preguntaActualId, setPreguntaActualId] = useState(0);

    const encuestaSeleccionada = lista.find((enc) => enc.id === parseInt(id));

    if (!encuestaSeleccionada) {
        return <h1 className='error'>Encuesta no encontrada</h1>;
    }

    const preguntaActual = encuestaSeleccionada && encuestaSeleccionada.preguntas ? encuestaSeleccionada.preguntas[preguntaActualId] : null;

    const handleSiguientePregunta = () => {
        if (preguntaActual.id === preguntaActualId + 1) {
            setPreguntaActualId(preguntaActualId + 1);
        }
    };

    const handlePreguntaAnterior = () => {
        if (preguntaActual.id > 1) {
            setPreguntaActualId(preguntaActualId - 1);
        }
    };

    return (
        <div className="encuestaContainer">
            {
                !encuestaSeleccionada ?
                    <h1>Encuesta no encontrada</h1> :
                    <div>
                        <h2 className="encuestaTitulo">{encuestaSeleccionada.titulo}: </h2>
                        <h3 className="encuestaDescripcion">{encuestaSeleccionada.descripcion}</h3>
                        <div>
                            {
                                preguntaActual ? (
                                    <div>
                                        <h3>Pregunta {preguntaActual.id}</h3>
                                        <h4 className="preguntaTexto">{preguntaActual.preguntas}</h4>
                                        <div className="opcionesContainer">
                                            {
                                                preguntaActual.opciones.map((opcion) => (
                                                    <div key={opcion.id} className="opcion-item">
                                                        <label>
                                                            <li>{opcion.texto}</li>
                                                        </label>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="botonesNavegacion">
                                            <button
                                                onClick={handlePreguntaAnterior}
                                                disabled={preguntaActualId === 0}
                                                className="botonNavegacion"
                                            >
                                                Pregunta Anterior
                                            </button>

                                            <button
                                                onClick={handleSiguientePregunta}
                                                disabled={preguntaActualId === encuestaSeleccionada.preguntas.length - 1}
                                                className="botonNavegacion"
                                            >
                                                Siguiente Pregunta
                                            </button>

                                        </div>
                                        <div className='volverContainer'>
                                            <Link to={'/'}>
                                                <button className="volverBoton">Volver Atrás</button>
                                            </Link>
                                        </div>

                                    </div>
                                ) :
                                    (
                                        <h1>Encuesta Inexistente</h1>
                                    )
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

export default Encuesta;
