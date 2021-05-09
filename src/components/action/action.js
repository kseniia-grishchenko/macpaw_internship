import React from 'react';
import './action.css'
import { SmileOutlined, HeartOutlined, FrownOutlined } from '@ant-design/icons';

export default function Action({time, imageId, action}) {
    return(
        <div className='action'>
            <span id='time'>{time}</span>
            <span id='description'>Image ID: <strong style={{color: 'black'}}>{imageId}</strong> was added to {action}</span>
            <span id='emoji'>{
                {
                    'Likes': <SmileOutlined style={{color: '#97EAB9'}}/>,
                    'Favourites': <HeartOutlined style={{color: '#FF868E'}}/>,
                    'Dislikes': <FrownOutlined style={{color: '#FFD280'}}/>
                }[action]
            }</span>
        </div>
    )
}