import React, {useEffect, useState} from 'react';
import { Input } from 'antd';
import { SearchOutlined, SmileOutlined, HeartOutlined, FrownOutlined, LeftOutlined } from '@ant-design/icons';
import './voting.css';
import Action from "../action/action";
import UpperPanel from "../upperPanel/upperPanel";
import axios from "axios";

export default function Voting () {
    const [actions ,setActions] = useState([])
    const [likes, setLikes] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const [image, setImage] = useState('')
    const [id, setId] = useState('')

    const config = {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    }

    useEffect(async () => {
        try{
            const resp = await axios.get(`${process.env.REACT_APP_API_URL}images/search/`, config);
            setImage(resp.data[0].url);
            setId(resp.data[0].id);
        } catch(err) {
            console.error(err);
        }
    }, [likes, favourites, dislikes]);

    const addToLikes = () => {
        const temp_likes = likes.filter(like => like !== id);
        setLikes([...temp_likes, id]);
        localStorage.setItem('likes', JSON.stringify(likes));
        let current = new Date();
        const hours = current.getHours();
        const minutes = current.getMinutes();
        const time = minutes.length === 1 ? `${hours} : 0${minutes}` : `${hours} : ${minutes}`;
        const action = {
            name: 'Likes',
            imageId: id,
            time: time
        }

        setActions([...actions, action]);
    }

    const addToFavourites = () => {
        const temp_favourites = favourites.filter(favourite => favourite !== id);
        setFavourites([...temp_favourites, id]);
        localStorage.setItem('favourites', JSON.stringify(favourites));

        let current = new Date();
        const hours = current.getHours();
        const minutes = current.getMinutes();
        const time = minutes.length === 1 ? `${hours} : 0${minutes}` : `${hours} : ${minutes}`;
        const action = {
            name: 'Favourites',
            imageId: id,
            time: time
        }

        setActions([...actions, action]);
    }

    const addToDislikes = () => {
        const temp_dislikes = dislikes.filter(dislike => dislike !== id);
        setDislikes([...temp_dislikes, id]);
        localStorage.setItem('dislikes', JSON.stringify(dislikes));

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
            imageId: id,
            time: time
        }

        setActions([...actions, action]);
    }

    return (
        <div className='voting'>
            <UpperPanel/>
            <div>
                <div id='flexbox2'>
                    <div className='main-content'>
                        <div id='upper-actions'>
                            <div>
                                <LeftOutlined className='back' style={{color: "#FF868E", fontSize: '25px'}}/>
                            </div>
                            <div id='voting'>
                                VOTING
                            </div>
                        </div>
                        <img className='main-img' src={image}/>
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
