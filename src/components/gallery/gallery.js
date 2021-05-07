import React, {useEffect, useState} from 'react'
import UpperPanel from "../upperPanel/upperPanel";
import {LeftOutlined, ReloadOutlined, UploadOutlined} from "@ant-design/icons";
import './index.css'
import {Select} from "antd";
import Image from "../image/image";
import {getBreeds, getImages} from "../../functions/api";

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [selectedBreed, setSelectedBreed] = useState({});

    const { Option } = Select;

    const sortBy = (order) => {
        const params = {
            limit: limit,
            order: order
        }
        getAllImages(params);
    }

    const handleChangeType = (value) => {
        let params;
        if(value === 'static'){
            params = {
                limit: limit,
                mime_types: 'jpg, png'
            }
        } else if(value === 'animated'){
            params = {
                limit: limit,
                mime_types: 'gif'
            }
        } else{
            params = {
                limit: limit
            }
        }
        getAllImages(params);
    }

    const handleChangeBreed = (value) => {
        if(value === 'none'){
            setSelectedBreed(() => {});
            const params = {
                limit: limit
            }
            getAllImages(params);
            return;
        }
        const tempBreed = breeds.filter(breed => breed.name === value)
        const obj = {
            id: tempBreed[0].id,
            name: tempBreed[0].name
        }
        setSelectedBreed(() => obj);
        const params = {
            breed_id: obj.id,
            limit: limit
        }
        getAllImages(params);
    }

    const handleChangeLimit = (value) =>{
        setLimit(value);
    }

    const reload = () => {
        let params;
        if(Object.entries(selectedBreed).length === 0 && selectedBreed.constructor === Object){
            params = {
                limit: limit
            }
        } else {
            params = {
                breed_id: selectedBreed.id,
                limit: limit
            }
        }
        getAllImages(params);
    }

    const  getAllImages = (params) => {
        getImages(params)
            .then(resp => {
                console.log(resp)
                setImages(resp.map(image => ({
                    id: image.id,
                    url: image.url
                })))
            })
    }

    const getAllBreeds = () => {
        getBreeds()
            .then(resp => {
                setBreeds(resp.map(breed => ({
                    id: breed.id,
                    name: breed.name
                })))
            })
    }

    useEffect( () => {
        try{
            const params = {
                limit: limit
            }

            getAllImages(params);
            getAllBreeds();
        } catch(err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        let params;
        if(Object.entries(selectedBreed).length === 0 && selectedBreed.constructor === Object){
            params = {
                limit: limit
            }
        } else {
            params = {
                breed_id: selectedBreed.id,
                limit: limit
            }
        }
        getAllImages(params)
    }, [limit])

    return(
        <div className='breeds'>
            <UpperPanel/>
            <div id='flexbox2'>
                <div className='main-content'>
                    <div id='upper-actions'>
                        <div>
                            <LeftOutlined className='back' style={{color: "#FF868E", fontSize: '25px'}}/>
                        </div>
                        <div id='gallery'>
                            GALLERY
                        </div>
                        <div id='upload'>
                            <UploadOutlined className='upload' style={{color: "#FF868E", fontSize: '0.9rem' , padding: '6px'}}/>
                            UPLOAD
                        </div>
                    </div>
                    <div id='settings'>
                        <div className='selector' id='order'>
                            <div className='selector-label'>ORDER</div>
                            <Select className='select' defaultValue='random' style={{ width: '98%' }}
                                    onChange={sortBy}>
                                <Option value="random">Random</Option>
                                <Option value="desc">Desc</Option>
                                <Option value="asc">Asc</Option>
                            </Select>
                        </div>
                        <div className='selector' id='type'>
                            <div className='selector-label'>TYPE</div>
                            <Select className='select' defaultValue='all' style={{ width: '98%' }}
                                    onChange={handleChangeType}>
                                <Option value="all">All</Option>
                                <Option value="static">Static</Option>
                                <Option value="animated">Animated</Option>
                            </Select>
                        </div>
                        <div className='selector' id='breed'>
                            <div className='selector-label'>BREED</div>
                            <Select className='select' defaultValue='none' style={{ width: '98%' }}
                                    onChange={handleChangeBreed}>
                                <Option value="none">None</Option>
                                {breeds.map(breed => <Option value={breed.name}>{breed.name}</Option>)}
                            </Select>
                        </div>
                        <div className='selector' id='limit'>
                            <div className='selector-label'>LIMIT</div>
                            <Select className='select' defaultValue='10' style={{ width: '85%' }}
                            onChange={handleChangeLimit}>
                                <Option value="5">5 items per page</Option>
                                <Option value="10">10 items per page</Option>
                                <Option value="15">15 items per page</Option>
                                <Option value="20">20 items per page</Option>
                            </Select>
                            <span onClick={reload}><ReloadOutlined style={{color: '#FF868E', backgroundColor: '#FFFFFF', padding: 9, borderRadius: 9, marginLeft: 5}}/></span>
                        </div>
                    </div>
                    <div className="photo-grid">
                        {images.map((image, index) =>
                            <Image image={image} index={index}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}