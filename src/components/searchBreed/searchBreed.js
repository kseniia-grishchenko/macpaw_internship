import React, {useEffect, useState} from 'react';
import UpperPanel from "../upperPanel/upperPanel";
import {LeftOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {getImages} from "../../functions/api";
import Image from "../image/image";
import './index.css';
import SideMenu from "../sideMenu/sideMenu";


export default function Search({match, sidebarClassname, mainClassname}){
    const [currentBreedId, setCurrentBreedId] = useState(1);
    const [images, setImages] = useState([]);
    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const breedName = match.params.breedName.toLowerCase();
    console.log(breedName);

    const getSpecificBreed = () => {
        const breeds = JSON.parse(localStorage.getItem('breeds'));
        const currentBreed = breeds.filter(breed => breed.name.toLowerCase() === breedName)
        return currentBreed[0].id
    }

    useEffect(() => {
        const id = getSpecificBreed();
        setCurrentBreedId(id)
        const params = {
            breed_id: id,
            limit: 10
        }

        getAllImages(params)
    }, [currentBreedId, breedName])


    const  getAllImages = (params) => {
        getImages(params)
            .then(resp => {
                setImages(resp.map(image => ({
                    id: image.id,
                    url: image.url,
                    breed_name: image.breeds[0]?.name,
                    breed_id: image.breeds[0]?.id,
                })))
            })
    }


    const getSidebarClassname = (value) => {
        sidebarClassname(value);
    }
    const getMainClassname = (value) => {
        mainClassname(value);
    }



    return(
        <div className='searchBreed'>
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
                                SEARCH
                            </div>
                        </div>
                        <div id='search-breed'>
                            Search results for: <strong style={{color: 'black'}}>{match.params.breedName}</strong>
                        </div>
                        <div className="photo-grid">
                            {images.map((image, index) => (
                                    <Image image={image} index={index} componentName={'breeds'}/>
                                )
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
