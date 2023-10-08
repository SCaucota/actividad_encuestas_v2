import React, {useState} from 'react';
import './navBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {

    const [styleButton, setStyleButton] = useState('button');
    const [disable, setDisable] = useState(false)

    const changeStyleButtonNew = () => {
        setStyleButton('buttonActive');
        setDisable(true);
    };

    const changeStyleButtonList = () => {
        setStyleButton('button');
        setDisable(false);
    }

    return (
        <div className='navBar'>
            <h2>Encuestas</h2>
            <div className='listaButton'>
                <Link to='/'>
                    <button className='lista' onClick={changeStyleButtonList} >Lista de encuestas</button>
                </Link>
                <Link to='/crearEncuesta'>
                    <button disabled={disable} className={styleButton} onClick={changeStyleButtonNew} >Crear Encuesta</button>
                </Link>
            </div>
        </div>
    )
}

export default NavBar
