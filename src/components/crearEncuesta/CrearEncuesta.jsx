import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './crearEncuesta.css';

const CrearEncuesta = ({ agregarEncuesta }) => {
    const [preguntas, setPreguntas] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const minimoDeOpciones = () => {
        for (const pregunta of preguntas) {
            if (pregunta.opciones.length < 2) {
                return false;
            }
        }
        return true;
    };

    const onSubmit = (data) => {
        
        setError('');

        if (!data.preguntas || data.preguntas.length === 0) {
            setError('Debes agregar al menos una pregunta a la encuesta');
            return;
        }

        const todasLasPreguntasCumplen = data.preguntas.every(minimoDeOpciones);

        if (!todasLasPreguntasCumplen) {
            setError('Todas las preguntas deben tener al menos 2 opciones');
            return;
        } else {
            let preguntaId = 1;
            const encuestaNueva = {
                titulo: data.titulo,
                descripcion: data.descripcion,
                preguntas: data.preguntas.map((pregunta) => {
                    let opcionId = 1;
                    const preguntaNueva = {
                        id: preguntaId++,
                        preguntas: pregunta.pregunta,
                        opciones: pregunta.opciones.map((opcion) => ({
                            id: opcionId++,
                            texto: opcion.texto,
                        })),
                    };
                    return preguntaNueva;
                }),
            };
            agregarEncuesta(encuestaNueva);
            navigate('/');
        }
    };

    const agregarNuevaPregunta = () => {
        setError('');
        setPreguntas([
            ...preguntas,
            {
                preguntas: '',
                opciones: [],
            }
        ])
    };

    const agregarOpcion = (preguntaIndex) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[preguntaIndex].opciones.push({
            texto: '',
        });
        setPreguntas(nuevasPreguntas);

    };

    return (
        <div className='crearEncuestaContainer'>
            <h2 className='titulo'>Nueva Encuesta</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && (
                    <div className="mensajeError">
                        <h4>{error}</h4>
                    </div>
                )}
                <label>Título:</label>
                <input
                    type="text"
                    id='titulo'
                    name='titulo'
                    {...register('titulo', { required: 'Campo obligatorio', maxLength: { value: 50, message: 'Superaste el máximo de 50 caractéres' } })}
                />
                {errors.titulo && <p className='mensajeError'>{errors.titulo.message}</p>}
                <label>Descripción:</label>
                <textarea
                    name="descripcion"
                    id="descripcion"
                    cols="30"
                    rows="5"
                    {...register('descripcion', { required: 'Campo Obligatorio', maxLength: { value: 150, message: 'Superaste el máximo de 150 caractéres' } })}
                />
                {errors.descripcion && <p className='mensajeError' >{errors.descripcion.message}</p>}
                <label className='tituloPreguntasContainer'>Preguntas:</label>
                {
                    preguntas.map((pregunta, preguntaIndex) => (
                        <div className='preguntaSection' key={preguntaIndex}>
                            <input
                                type="text"
                                placeholder='Pregunta'
                                id={`pregunta${pregunta.id}`}
                                name={`preguntas[${preguntaIndex}].pregunta`}
                                {...register(`preguntas[${preguntaIndex}].pregunta`, {
                                    required: 'Campo obligatorio',
                                    maxLength: { value: 50, message: 'Superaste el máximo de 50 caracteres' },
                                })}
                            />
                            {errors.preguntas?.[preguntaIndex]?.pregunta && (
                                <p className='mensajeError'>{errors.preguntas[preguntaIndex].pregunta.message}</p>
                            )}
                            <div className='opcionSection'>
                                {pregunta.opciones.map((opcion, opcionIndex) => (
                                    <div className='inputOptionButton' key={opcionIndex}>
                                        <input
                                            type="text"
                                            id={`opcion${opcion.id}`}
                                            name={`preguntas[${preguntaIndex}].opciones[${opcionIndex}].texto`}
                                            {...register(`preguntas[${preguntaIndex}].opciones[${opcionIndex}].texto`, {
                                                required: 'Campo obligatorio',
                                                maxLength: { value: 20, message: 'Superaste el máximo de 20 caracteres' },
                                            })}
                                        />
                                        {errors.preguntas?.[preguntaIndex]?.opciones?.[opcionIndex]?.texto && (
                                            <p className='mensajeError'>{errors.preguntas[preguntaIndex].opciones[opcionIndex].texto.message}</p>
                                        )}
                                    </div>
                                ))}
                                <button className='boton' type="button" onClick={() => agregarOpcion(preguntaIndex)}>
                                    Agregar Opción
                                </button>
                            </div>
                        </div>
                    ))
                }
                <div className='agregarCrearContainer'>
                    <button className='boton botonAC' type='button' onClick={agregarNuevaPregunta}>Agregar Pregunta</button>
                    <button className='boton botonAC' type='submit' >CrearEncuesta</button>
                </div>

            </form>
        </div >
    )
}

export default CrearEncuesta