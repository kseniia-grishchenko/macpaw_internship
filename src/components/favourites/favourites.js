import React, {useEffect, useState} from 'react';
import UpperPanel from "../upperPanel/upperPanel";
import {LeftOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import Image from "../image/image";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {deleteImageFromFavourites, getFavourites} from "../../functions/api";
import SideMenu from "../sideMenu/sideMenu";
import Loader from "../loader/loader";

export default function Favourites({sidebarClassname, mainClassname}){
    const [favourites, setFavorites] = useState([]);
    const [deleteImage, setDeleteImage] = useState(false);
    const [isInfoLoading, setIsInfoLoading] = useState(true);

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
        setIsInfoLoading(false);

    }, [])

    useEffect(() =>{
        getFavourites()
            .then(resp => {
                setFavorites(resp)
                setDeleteImage(false)
            })

    }, [deleteImage])

    const getSidebarClassname = (value) => {
        sidebarClassname(value);
    }
    const getMainClassname = (value) => {
        mainClassname(value);
    }


    return(
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
                                FAVOURITES
                            </div>
                        </div>
                        {isInfoLoading ? <Loader/> :
                        <div className="photo-grid">
                            {favourites?.map((favourite, index) => (
                                    <Image image={favourite.image} index={index} componentName={'favourites'}
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