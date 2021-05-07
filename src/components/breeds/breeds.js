import React, {useEffect, useState, useRef} from 'react';
import UpperPanel from "../upperPanel/upperPanel";
import './index.css';
import Image from "../image/image";
import {LeftOutlined, SortAscendingOutlined, SortDescendingOutlined} from "@ant-design/icons";
import { Select } from 'antd';
import {getImages, getBreeds} from "../../functions/api";
import {useHistory} from "react-router-dom";

export default function Breeds(){
    const [images, setImages] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [limit, setLimit] = useState(10);

    const [selectedBreed, setSelectedBreed] = useState({});

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const { Option } = Select;

    const handleChangeBreed = (value)  => {
        if(value === 'all'){
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

    function handleChangeLimit(value){
        setLimit(value);
    }

    const sortBy = (order) => {
        const params = {
                limit: limit,
                order: order
            }
        getAllImages(params);
    }

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
                            <LeftOutlined className='back' style={{color: "#FF868E", fontSize: '25px'}}
                                          onClick={goToPreviousPath}/>
                        </div>
                        <div id='label'>
                            BREEDS
                        </div>
                        <div id='select-breed'>
                            <Select placeholder="All breeds" style={{ width: 240 }} onChange={handleChangeBreed}>
                                <Option value="all">All breeds</Option>
                                {breeds.map(breed => <Option value={breed.name}>{breed.name}</Option>)}
                            </Select>
                        </div>
                        <div id='select-limit'>
                            <Select placeholder="Limit: " defaultValue="10" style={{ width: 185 }} onChange={handleChangeLimit}>
                                <Option value="5">Limit: 5</Option>
                                <Option value="10">Limit: 10</Option>
                                <Option value="15">Limit: 15</Option>
                                <Option value="20">Limit: 20</Option>
                            </Select>
                        </div>
                        <div className='sort-descending'>
                            <SortDescendingOutlined style={{color: '#8C8C8C', fontSize: '23px', backgroundColor: '#F8F8F7', padding: '4px', borderRadius: '9px'}}
                                                    onClick={() => sortBy('desc')}
                            />
                        </div>
                        <div className='sort-ascending'>
                            <SortAscendingOutlined style={{color: '#8C8C8C', fontSize: '23px', backgroundColor: '#F8F8F7', padding: '4px', borderRadius: '9px'}}
                                                   onClick={() => sortBy('asc')}
                            />
                        </div>

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
    )

}