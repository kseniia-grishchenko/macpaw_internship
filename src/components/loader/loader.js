import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './index.css';

export default function Loader(){
    return(
        <div id='loader'>
            <LoadingOutlined style={{ fontSize: '10vh', color: '#FBE0DC' }} spin />;
        </div>
    )
}