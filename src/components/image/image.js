import React, {useState} from 'react';
import './index.css';
import { useHistory } from 'react-router-dom'
import {HeartOutlined} from "@ant-design/icons";
import {addImageToFavourites, deleteImageFromFavourites} from "../../functions/api";

export default function Image({image, index, componentName, deleteClicked}){
    const history = useHistory();
        const handleBreedInfo = () => {
            localStorage.setItem('image', JSON.stringify(image));
            history.push( `/breed/${image.breed_id}`)
        }

        const addToFavourites = () => {
            addImageToFavourites(image.id)
                .then(resp => console.log(resp));
        }

        const deleteFromFavourites = () => {
                deleteImageFromFavourites(image.id)
                    .then(deleteClicked(true))
        }

        let className = 'card';
        if(index % 10 === 0 || index % 10 === 7){
            className ='card card-tall'
        } else if(index % 10 === 3 || index % 10 === 8) {
            className='card card-tall-wide'
        }
        return(
            <div key={image.id} className={className}>
                <img src={image.url} className='breeds-img'/>
                {componentName === 'breeds' &&
                    <div className='label' onClick={handleBreedInfo}>{image.breed_name}</div>
                }
                {componentName === 'gallery' &&
                <span className='favEmoji' onClick={addToFavourites}>
                    <HeartOutlined className='fav' style={{color: "#FF868E"}}/>
                </span>
                }
                {componentName === 'favourites' &&
                <span className='favEmoji' onClick={deleteFromFavourites}>
                    <HeartOutlined className='fav' style={{color: "#FF868E"}}/>
                </span>
                }
            </div>
        )
}