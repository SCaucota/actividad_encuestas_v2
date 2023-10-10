import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Encuesta = ({ lista }) => {

    const { id } = useParams();

    const [preguntaActualId, setPreguntaActualId] = useState(0);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState({});

    const encuestaSeleccionada = lista.find((enc) => enc.id === parseInt(id));
    const preguntaActual = encuestaSeleccionada.preguntas[preguntaActualId];

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

    const handleOptionsState = (questionId, optionId) => {
        setOpcionSeleccionada({
            ...opcionSeleccionada,
            [questionId]: optionId,
        });
    };


    return (
        <div>
            <h2>{encuestaSeleccionada.titulo}: </h2>
            <h3>{encuestaSeleccionada.descripcion}</h3>
            <div>
                {
                    preguntaActual ? (
                        <div>
                            <h3>Pregunta {preguntaActual.id}</h3>
                            <h4>{preguntaActual.preguntas}</h4>
                            <div>
                                {
                                    preguntaActual.opciones.map((opcion) => (
                                        <div key={opcion.id}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`pregunta${preguntaActual.id}`}
                                                    value={opcion.id}
                                                    checked={opcionSeleccionada[preguntaActual.id] === opcion.id}
                                                    onChange={() => handleOptionsState(preguntaActual.id, opcion.id)}
                                                />
                                                {opcion.texto}
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                            <button onClick={handlePreguntaAnterior} disabled={preguntaActualId === 0}>
                                Pregunta Anterior
                            </button>
                            <button onClick={handleSiguientePregunta} disabled={preguntaActualId === encuestaSeleccionada.preguntas.length - 1}>
                                Siguiente Pregunta
                            </button>
                        </div>
                    ) :
                        (
                            <h1>Encuesta Inexistente</h1>
                        )
                }

            </div>
        </div >
    )
}

export default Encuesta