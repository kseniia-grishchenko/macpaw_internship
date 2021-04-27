import React from 'react';
import {Input} from "antd";
import {FrownOutlined, HeartOutlined, SearchOutlined, SmileOutlined} from "@ant-design/icons";
import './index.css';

export default function UpperPanel(){
    return(
            <div id='flexbox1'>
                <div className='upper-panel'>
                    <div id='search'>
                        <Input id='search-input' bordered placeholder="Search for breeds by name" suffix={<SearchOutlined className='search-icon' style={{color: "#FF868E"}}/>} />
                    </div>
                    <div className='emoji'>
                        <SmileOutlined className='emj' style={{color: "#FF868E"}}/>
                    </div>
                    <div className='emoji'>
                        <HeartOutlined className='emj' style={{color: "#FF868E"}}/>
                    </div>
                    <div className='emoji'>
                        <FrownOutlined className='emj' style={{color: "#FF868E"}}/>
                    </div>
                </div>
            </div>
    )
}