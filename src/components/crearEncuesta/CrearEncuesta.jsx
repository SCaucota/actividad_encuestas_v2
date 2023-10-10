import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CrearEncuesta = ({ agregarEncuesta}) => {

    const [preguntas, setPreguntas] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {

        let preguntaId = 1;
        let opcionId = 1;

        const encuestaNueva = {
            titulo: data.titulo,
            descripcion: data.descripcion,
            preguntas: data.preguntas.map((pregunta, preguntaIndex) => ({
                id: preguntaId++,
                preguntas: pregunta.pregunta,
                opciones: pregunta.opciones.map((opcion, opcionIndex) =>  ({
                    id: opcionId++,
                    texto: opcion.texto,
                })),
            })),
        };

        agregarEncuesta(encuestaNueva);

        navigate('/');
    };

    const agregarNuevaPregunta = () => {
        setPreguntas([
            ...preguntas,
            {
                preguntas: '',
                opciones: [],
            }
        ])
    };

    const eliminarPregunta = (preguntaIndex) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas.splice(preguntaIndex, 1);
        setPreguntas(nuevasPreguntas);
    };

    const agregarOpcion = (preguntaIndex) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[preguntaIndex].opciones.push({
            texto: '',
        });
        setPreguntas(nuevasPreguntas);
        
    };

    const eliminarOpcion = (preguntaIndex, opcionIndex) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[preguntaIndex].opciones.splice(opcionIndex, 1);
        setPreguntas(nuevasPreguntas);
    };

    return (
        <div>
            <h1>Nueva Encuesta</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Título:</label>
                <input
                    type="text"
                    id='titulo'
                    name='titulo'
                    {...register('titulo', { required: 'Campo obligatorio', maxLength: { value: 50, message: 'Superaste el máximo de 50 caractéres' } })}
                />
                {errors.titulo && <p>{errors.titulo.message}</p>}
                <label>Descripción:</label>
                <textarea
                    name="descripcion"
                    id="descripcion"
                    cols="30"
                    rows="10"
                    {...register('descripcion', { required: 'Campo Obligatorio', maxLength: { value: 150, message: 'Superaste el máximo de 150 caractéres' } })}
                />
                {errors.descripcion && <p>{errors.descripcion.message}</p>}
                <label>Preguntas:</label>
                {
                    preguntas.map((pregunta, preguntaIndex) => (
                            <div key={preguntaIndex}>
                                <input
                                    type="text"
                                    id={`pregunta${pregunta.id}`}
                                    name={`preguntas[${preguntaIndex}].pregunta`}
                                    {...register(`preguntas[${preguntaIndex}].pregunta`, {
                                        required: 'Campo obligatorio',
                                        maxLength: { value: 50, message: 'Superaste el máximo de 50 caracteres' },
                                    })}
                                />
                                {errors.preguntas?.[preguntaIndex]?.pregunta && (
                                    <p>{errors.preguntas[preguntaIndex].pregunta.message}</p>
                                )}
                                <div>
                                    {pregunta.opciones.map((opcion, opcionIndex) => (
                                        <div key={opcionIndex}>
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
                                                <p>{errors.preguntas[preguntaIndex].opciones[opcionIndex].texto.message}</p>
                                            )}
                                            <button type="button" onClick={() => eliminarOpcion(preguntaIndex, opcionIndex)}>
                                                Eliminar Opción
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => agregarOpcion(preguntaIndex)}>
                                        Agregar Opción
                                    </button>
                                </div>
                                <button type="button" onClick={() => eliminarPregunta(preguntaIndex)}>
                                    Eliminar Pregunta
                                </button>
                            </div>
                    ))
                }
                <button type='button' onClick={agregarNuevaPregunta}>Agregar Pregunta</button>
                <button type='submit' >CrearEncuesta</button>
        </form>
        </div >
    )
}

export default CrearEncuesta