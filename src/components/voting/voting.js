import React, {useEffect, useState} from 'react';
import { Input } from 'antd';
import {
    SearchOutlined,
    SmileOutlined,
    HeartOutlined,
    FrownOutlined,
    LeftOutlined,
    LoadingOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import './voting.css';
import Action from "../action/action";
import UpperPanel from "../upperPanel/upperPanel";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { addImageToDislikes, addImageToLikes, addImageToFavourites } from "../../functions/api";
import SideMenu from "../sideMenu/sideMenu";
import Loader from "../loader/loader";

export default function Voting ({sidebarClassname, mainClassname}) {
    const [actions ,setActions] = useState([])
    const [image, setImage] = useState({});
    const [isImageLoading, setIsImageLoading] = useState(true);

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const config = {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    }

    const refreshImage = async () => {
        try{
            const resp = await axios.get(`${process.env.REACT_APP_API_URL}images/search/`, config);
            setImage({
                id: resp.data[0].id,
                url: resp.data[0].url
            });
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(async () => {
            await refreshImage();
            setIsImageLoading(false)
    }, []);

    const addToLikes = () => {
        let current = new Date();
        const hours = current.getHours();
        const minutes = current.getMinutes();
        const time = minutes.length === 1 ? `${hours} : 0${minutes}` : `${hours} : ${minutes}`;
        const action = {
            name: 'Likes',
            imageId: image.id,
            time: time
        }
        console.log("imageId", image.id)

        addImageToLikes(image.id)
            .then(resp => {
                refreshImage();
            });

        setActions([...actions, action]);
    }

    const addToFavourites = () => {
        let current = new Date();
        const hours = current.getHours();
        const minutes = current.getMinutes();
        const time = minutes < 10 ? `${hours} : 0${minutes}` : `${hours} : ${minutes}`;
        const action = {
            name: 'Favourites',
            imageId: image.id,
            time: time
        }

        addImageToFavourites(image.id)
            .then(resp => {
                refreshImage();
            });
        setActions([...actions, action]);
    }

    const addToDislikes = () => {
        let current = new Date();
        const hours = current.getHours();
        const minutes = current.getMinutes();
        console.log('minutes', minutes)
        let time = ''
        console.log('length', minutes.length)
        minutes.length  < 2 ? time = `${hours} : 0${minutes}` : time = `${hours} : ${minutes}`;
        console.log('time', time)
        const action = {
            name: 'Dislikes',
            imageId: image.id,
            time: time
        }

        addImageToDislikes(image.id)
            .then(resp => {
                refreshImage();
            });

        setActions([...actions, action]);
    }

    const getSidebarClassname = (value) => {
        sidebarClassname(value);
    }
    const getMainClassname = (value) => {
        mainClassname(value);
    }

    return (
        <div className='voting'>
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
                                VOTING
                            </div>
                        </div>
                        {isImageLoading ?  <Loader/> :
                            (<div id='votingArea'>
                                <img className='main-img' alt={image.id} src={image.url}/>
                            <div id='action-panel'>
                            <div className='emoji smile' onClick={addToLikes} >
                                <SmileOutlined className='emj' style={{color: "#FFFFFF"}}/>
                            </div>
                            <div className='emoji like' onClick={addToFavourites}>
                                <HeartOutlined className='emj' style={{color: "#FFFFFF"}}/>
                            </div>
                            <div className='emoji frown' onClick={addToDislikes}>
                                <FrownOutlined className='emj' style={{color: "#FFFFFF"}}/>
                            </div>
                            </div>
                            </div>)}
                        {actions.map(action =>
                            <Action action={action.name} imageId={action.imageId} time={action.time}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}
