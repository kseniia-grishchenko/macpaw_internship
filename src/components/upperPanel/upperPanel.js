import React, {useState} from 'react';
import {Input} from "antd";
import {FrownOutlined, HeartOutlined, SearchOutlined, SmileOutlined} from "@ant-design/icons";
import './index.css';
import { useHistory } from 'react-router-dom';

export default function UpperPanel(){
    const [breed, setBreed] = useState('');

    const history = useHistory();

    const handleBreedName = () => {
        history.push(`/searchBreed/${breed}`);
    }

    const redirect = (path) => {
        history.push(`/${path}`)
    }

    return(
            <div id='flexbox1'>
                <div className='upper-panel'>
                    <div id='search'>
                        <Input id='search-input' bordered placeholder="Search for breeds by name"   onChange={event => setBreed(event.target.value)} onPressEnter={handleBreedName} suffix={<SearchOutlined className='search-icon' onClick={handleBreedName} style={{color: "#FF868E"}}/>} />
                    </div>
                    <div className='upEmoji'>
                        <SmileOutlined className='upEmj' onClick={() => redirect('likes')} style={{color: "#FF868E"}}/>
                    </div>
                    <div className='upEmoji'>
                        <HeartOutlined className='upEmj' onClick={() => redirect('favourites')} style={{color: "#FF868E"}}/>
                    </div>
                    <div className='upEmoji'>
                        <FrownOutlined className='upEmj'  onClick={() => redirect('dislikes')} style={{color: "#FF868E"}}/>
                    </div>
                </div>
            </div>
    )
}