import React from 'react';
import './index.css'

export default function Image({image, index}){
        let className = 'card';
        if([0, 7, 10, 17].includes(index)){
            className ='card card-tall'
        } else if([3, 8, 13, 18].includes(index)) {
            className='card card-tall-wide'
        }
        return(
            <div key={image.id} className={className}>
                <img src={image.url} className='breeds-img'/>
                <div className='label'>{image.breed_name}</div>
            </div>
        )
}