import React from 'react';
import './index.css';
import {SideMenu} from "../sideMenu/sideMenu";

export const Home = ({sidebarClassname, mainClassname}) => {

    const getSidebarClassname = (value) => {
        sidebarClassname(value);
    }
    const getMainClassname = (value) => {
        mainClassname(value);
    }

    return (
        <div className='home'>
            <SideMenu sidebarClassname={getSidebarClassname} mainClassname={getMainClassname}/>
            <img className='img home-img' src={'/images/girl-and-pet.png'} alt={'Main'}/>
        </div>
    )

}