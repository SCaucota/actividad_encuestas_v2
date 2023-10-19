import React from 'react';
import './navBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {

    return (
        <div className='navBar'>
            <h2>Encuestas</h2>
            <div className='listaButton'>
                <Link to='/'>
                    <button className='lista' >Lista de encuestas</button>
                </Link>
                <Link to='/crearEncuesta' >
                    <button className='button'>Crear Encuesta</button>
                </Link>
            </div>
        </div>
    )
}

export default NavBar
