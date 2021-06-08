import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import './index.css';

export const Loader = () => {
    return(
        <div id='loader'>
            <LoadingOutlined style={{ fontSize: '10vh', color: '#FBE0DC' }} spin />
        </div>
    )
}