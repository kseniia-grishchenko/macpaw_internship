import React from 'react';
import axios from "axios";

async function getImages(params) {
    const respImages = await axios.get(`${process.env.REACT_APP_API_URL}images/search`,
        {
            /*headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
            },*/
            params: params
        })
    return respImages.data;
}

async function getBreeds(){
    const respBreeds = await axios.get(`${process.env.REACT_APP_API_URL}breeds/`,
        {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        });
    return respBreeds.data;
}

export {getImages, getBreeds};