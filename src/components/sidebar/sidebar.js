import React from 'react';
import './index.css';
import { useHistory } from "react-router-dom";
import {SideMenu} from "../sideMenu/sideMenu";

export const SideBar = ({ classname, sidebarName, mainClassname }) => {

    const history = useHistory();

    function redirect(path){
        history.push('/' + path);
        sidebarName('sidebar-content');
        mainClassname('main');
    }

    const getSidebarName = (value) => {
        sidebarName(value);
    }
    const getMainClassname = (value) => {
        mainClassname(value);
    }

    return(
        <div className={classname}>
            <SideMenu componentName={'sidebar'} sidebarClassname={getSidebarName} mainClassname={getMainClassname}/>
            <img id='logo' src={'/images/Logo.png'} alt={'logo'}/>
            <h2 id='hi-intern'>Hi there!</h2>
            <h4 id='welcome'>Welcome to the beautiful dog app</h4>
            <h4 id='start'>Lets start using The Dogs API</h4>
            <div id='grid'>
                <div>
                    <img  className='images' src={'/images/Mask Group voting.png'} alt={'Voting'}/>
                </div>
                <div>
                    <img className='images' src={'/images/Mask Group breeds.png'} alt={'Breeds'}/>
                </div>
                <div>
                    <img className='images' src={'/images/Mask Group gallery.png'} alt={'Gallery'}/>
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
