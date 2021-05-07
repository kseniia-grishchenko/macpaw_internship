import React, {useEffect, useState} from 'react';
import UpperPanel from "../upperPanel/upperPanel";
import {LeftOutlined} from "@ant-design/icons";
import Image from "../image/image";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {deleteImageFromFavourites, getFavourites} from "../../functions/api";

export default function Favourites(){
    const [favourites, setFavorites] = useState([]);
    const [deleteImage, setDeleteImage] = useState(false);

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const deleteClicked = (value) => {
        if(value === true){
            setDeleteImage(value);
        }
    }



    useEffect(() =>{
        getFavourites()
            .then(resp => {
                setFavorites(resp)
                setDeleteImage(false)
            })

    }, [])

    useEffect(() =>{
        getFavourites()
            .then(resp => {
                setFavorites(resp)
                setDeleteImage(false)
            })

    }, [deleteImage])


    return(
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
                                FAVOURITES
                            </div>
                        </div>
                        <div className="photo-grid">
                            {favourites?.map((favourite, index) => (
                                    <Image image={favourite.image} index={index} componentName={'favourites'}
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