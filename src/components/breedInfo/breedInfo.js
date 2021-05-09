import React, {useEffect, useState} from 'react';
import UpperPanel from "../upperPanel/upperPanel";
import {FrownOutlined, HeartOutlined, LeftOutlined, MenuUnfoldOutlined, SmileOutlined} from "@ant-design/icons";
import './index.css';
import { useHistory } from "react-router-dom";
import SideMenu from "../sideMenu/sideMenu";
import Loader from "../loader/loader";


export default function BreedInfo({ match, sidebarClassname, mainClassname }){
    const [isInfoLoading, setIsInfoLoading] = useState(true);
    const breed_id = match.params.id;
    const image = JSON.parse(localStorage.getItem('image'));
    const breeds = JSON.parse(localStorage.getItem('breeds'));
    const selectedBreed = breeds.filter(breed => breed.name === image.breed_name)
    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const getSidebarClassname = (value) => {
        sidebarClassname(value);
    }
    const getMainClassname = (value) => {
        mainClassname(value);
    }

    useEffect(() => {
        setIsInfoLoading(false);
    })


    return(
        <div className='breedInfo'>
            <SideMenu sidebarClassname={getSidebarClassname} mainClassname={getMainClassname}/>
            <UpperPanel/>
            <div>
                <div id='flexbox2'>
                    <div className='main-content'>
                        <div id='upper-actions'>
                            <div>
                                <LeftOutlined className='back' style={{color: "#FF868E", fontSize: '25px'}}
                                              onClick={goToPreviousPath}/>
                            </div>
                            <div id='label'>
                                BREEDS
                            </div>
                            <div id='id'>
                                {breed_id}
                            </div>
                        </div>
                        {isInfoLoading ? <Loader/> :
                        <div>
                        <div>
                            <img className='main-img' src={image.url}/>
                        </div>
                        <div id='info'>
                            <div id='breedName'>
                                {selectedBreed[0].name}
                            </div>
                            <div id='bredFor'>
                                {selectedBreed[0].bred_for}
                            </div>
                            <div id='flexboxInfo'>
                                <div id='column1'>
                                    <strong>Temperament:</strong> <br/>
                                    {selectedBreed[0].temperament}
                                </div>
                                <div id='column2'>
                                    <div>
                                        <strong>Height:</strong> {selectedBreed[0].height.metric}
                                    </div>
                                    <div>
                                        <strong>Weight:</strong> {selectedBreed[0].weight.metric}
                                    </div>
                                    <div>
                                        <strong>Life span:</strong> {selectedBreed[0].life_span}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}