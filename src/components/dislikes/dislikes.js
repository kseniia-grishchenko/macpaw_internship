import React, {useEffect, useState} from 'react';
import UpperPanel from "../upperPanel/upperPanel";
import {LeftOutlined} from "@ant-design/icons";
import Image from "../image/image";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getVotes } from "../../functions/api";
import {SideMenu} from "../sideMenu/sideMenu";
import {Loader} from "../loader/loader";

export const Dislikes = ({sidebarClassname, mainClassname}) => {
    const [deleteImage, setDeleteImage] = useState(false);
    const [images, setImages] = useState([])
    const [isInfoLoading, setIsInfoLoading] = useState(true);

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const deleteClicked = (value) => {
        if (value === true) {
            setDeleteImage(value);
        }
    }

    const getDislikedImages = async() => {
        const response = await getVotes(0)
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
        localStorage.setItem('dislikes', JSON.stringify(newImages));
        return newImages;
    }

    useEffect(() => {
        getDislikedImages()
            .then(respImages => setImages(respImages))
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        setIsInfoLoading(true);
        getDislikedImages()
            .then(respImages => {
                setImages(respImages)
                setIsInfoLoading(false);
            })
            .catch(error => console.log(error));


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
                                DISLIKES
                            </div>
                        </div>
                        {isInfoLoading ? <Loader/> :
                        <div className="photo-grid">
                            {images?.map((like, index) => (
                                    <Image image={like.image} index={index} componentName={'dislikes'}
                                           deleteClicked={deleteClicked}/>
                                )
                            )}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}