import React from 'react';
import UpperPanel from "../upperPanel/upperPanel";
import {FrownOutlined, HeartOutlined, LeftOutlined, SmileOutlined} from "@ant-design/icons";
import './index.css';
import { useHistory } from "react-router-dom";


export default function BreedInfo({ match }){
    const breed_id = match.params.id;
    const image = JSON.parse(localStorage.getItem('image'));
    const breeds = JSON.parse(localStorage.getItem('breeds'));
    const selectedBreed = breeds.filter(breed => breed.name === image.breed_name)
    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    return(
        <div className='breedInfo'>
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
                    </div>
                </div>
            </div>
        </div>
    )
}