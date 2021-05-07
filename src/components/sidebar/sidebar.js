import React from 'react';
import './sidebar.css';
import { useHistory } from "react-router-dom";


function SideBar({ classname }) {

    const history = useHistory();

    function redirect(path){
        history.push('/' + path)
    }

    return(
        <div className={classname}>
            <img id='logo' src={'/images/Logo.png'}/>
            <h2 id='hi-intern'>Hi intern!</h2>
            <h4 id='welcome'>Welcome to MSI 2021 Front-end test</h4>
            <h4 id='start'>Lets start using The Dogs API</h4>
            <div id='grid'>
                <div>
                    <img  className='images' src={'/images/Mask Group voting.png'}/>
                </div>
                <div>
                    <img className='images' src={'/images/Mask Group breeds.png'}/>
                </div>
                <div>
                    <img className='images' src={'/images/Mask Group gallery.png'}/>
                </div>
                <div className='rectangle'>
                    <p className='btn-name' onClick={() => redirect('voting')}>VOTING</p>
                </div>
                <div className='rectangle'>
                    <p className='btn-name' onClick={() => redirect('breeds')}>BREEDS</p>
                </div>
                <div className='rectangle'>
                    <p className='btn-name' onClick={() => redirect('gallery')}>GALLERY</p>
                </div>
            </div>
        </div>
    )

}

export default SideBar