import React, {useEffect, useState} from 'react';
import UpperPanel from "../upperPanel/upperPanel";
import {LeftOutlined} from "@ant-design/icons";
import Image from "../image/image";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {getFavourites, getLikes} from "../../functions/api";

export default function Likes() {
    const [likes, setLikes] = useState([]);
    const [deleteImage, setDeleteImage] = useState(false);
    const [images, setImages] = useState([])

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const deleteClicked = (value) => {
        if (value === true) {
            setDeleteImage(value);
        }
    }

    useEffect(() => {
        getLikes()
            .then(resp => {
                let newImages = [];
                resp.map(like => {
                    console.log('like', like.image_id)
                    axios.get(`${process.env.REACT_APP_API_URL}images/${like.image_id}`)
                        .then(resp => {
                            const image = resp.data;
                            console.log(image);
                            newImages.push(image);
                        })
                    console.log('images', newImages)
                })
                setImages(newImages);
                setLikes(likes)
            })

    }, [])

    useEffect(() => {
        getLikes()
            .then(resp => {
                setLikes(resp)
                setDeleteImage(false)
            })

    }, [deleteImage])


    return (
        <div>
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
                                LIKES
                            </div>
                            <div className="photo-grid">
                                {images?.map((like, index) => (
                                        <Image image={like} index={index} componentName={'favourites'}
                                               deleteClicked={deleteClicked}/>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}