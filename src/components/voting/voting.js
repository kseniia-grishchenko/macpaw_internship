import React, {useEffect, useState} from 'react';
import { Input } from 'antd';
import { SearchOutlined, SmileOutlined, HeartOutlined, FrownOutlined, LeftOutlined } from '@ant-design/icons';
import './voting.css';
import Action from "../action/action";
import UpperPanel from "../upperPanel/upperPanel";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { addImageToDislikes, addImageToLikes, addImageToFavourites } from "../../functions/api";

export default function Voting () {
    const [actions ,setActions] = useState([])
    const [likes, setLikes] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const [image, setImage] = useState({});

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const config = {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    }

    useEffect(async () => {
        try{
            const resp = await axios.get(`${process.env.REACT_APP_API_URL}images/search/`, config);
            console.log('respp', resp)
            setImage({
                id: resp.data[0].id,
                url: resp.data[0].url
            });
        } catch(err) {
            console.error(err);
        }
    }, [likes, favourites, dislikes]);

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
            .then(resp => console.log(resp));

        setActions([...actions, action]);
    }

    const addToFavourites = () => {
        let current = new Date();
        const hours = current.getHours();
        const minutes = current.getMinutes();
        const time = minutes.length === 1 ? `${hours} : 0${minutes}` : `${hours} : ${minutes}`;
        const action = {
            name: 'Favourites',
            imageId: image.id,
            time: time
        }

        addImageToFavourites(image.id)
            .then(resp => console.log(resp));
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
            .then(resp => console.log(resp));

        setActions([...actions, action]);
    }

    console.log("image", image)

    return (
        <div className='voting'>
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
                        {actions.map(action =>
                            <Action action={action.name} imageId={action.imageId} time={action.time}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}
