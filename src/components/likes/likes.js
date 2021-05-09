import React, {useEffect, useState} from 'react';
import UpperPanel from "../upperPanel/upperPanel";
import {LeftOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import Image from "../image/image";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getVotes } from "../../functions/api";
import SideMenu from "../sideMenu/sideMenu";

export default function Likes({sidebarClassname, mainClassname}) {
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

    const getVotedImages = async() => {
        const response = await getVotes(1)
        let newImages = [];
        for(let index = 0; index < response.length; index++) {
            const resp = await axios.get(`${process.env.REACT_APP_API_URL}images/${response[index].image_id}`)
            const image = {
                vote_id: response[index].id,
                image: resp.data
            };
            newImages.push(image);
        }
        setImages(newImages);
        localStorage.setItem('likes', JSON.stringify(newImages));
        return newImages;
    }

    useEffect(() => {
        getVotedImages()
            .then(respImages => setImages(respImages));

    }, [])

    useEffect(() => {
        getVotedImages()
            .then(respImages => setImages(respImages));

    }, [deleteImage])

    const getSidebarClassname = (value) => {
        sidebarClassname(value);
    }
    const getMainClassname = (value) => {
        mainClassname(value);
    }


    return (
        <div>
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
                                LIKES
                            </div>
                        </div>
                            <div className="photo-grid">
                                {images?.map((like, index) => (
                                        <Image image={like.image} index={index} componentName={'likes'}
                                               deleteClicked={deleteClicked}/>
                                    )
                                )}
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}