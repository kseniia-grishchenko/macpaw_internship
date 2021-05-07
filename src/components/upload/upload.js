import React, {useEffect, useState} from 'react';
import {CheckCircleOutlined, CloseCircleOutlined, CloseOutlined} from "@ant-design/icons";
import  './index.css';
import { useHistory } from "react-router-dom";
import DropzoneArea from "../uploadDropzone/uploadDropzone";
import axios from "axios";

export default function Upload({ sendData }){
    const [isUploaded, setIsUploaded] = useState(false);
    const [image, setImage] = useState({});
    const [successfullyUploaded, setSuccessfullyUploaded] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('')
    const history = useHistory();

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    }

    sendData('sidebar-content-disabled');

    const handleClose = () => {
        history.push('/gallery');
        sendData('sidebar-content');
    }

    const checkIfUploaded = (value) => {
        setIsUploaded(value);
    }

    const getImage = (value) => {
        setImage(value);
    }

    const uploadPhoto =  async () => {
        const formData = new FormData();

        formData.append('file', image)
        console.log('formdata', formData)

        try{
            const resp = await axios.post('https://api.thedogapi.com/v1/images/upload', formData, config);
            if(resp.status === 201){
                setSuccessfullyUploaded(true);
                setSuccess(true);
                setError('');
            }

        }
        catch(err){
            setError('No Dog found - try a different one');
        }
    }

    useEffect(() => {
        if(successfullyUploaded){
            setSuccessfullyUploaded(false)

        }
    }, [successfullyUploaded])

    useEffect(() => {
        if(isUploaded){
            setSuccess(false);
            setError('')
        }
    }, [isUploaded])



    return(
        <div id='upload' style={{height: "90vh", paddingBottom: 40, marginBottom: "6vh"}}>
            <div id='close'>
                <CloseOutlined style={{fontSize: 22, color: '#FF868E', backgroundColor: '#FFFFFF', padding: 5, borderRadius: 9}}
                onClick={handleClose}/>
            </div>
            <div id='uploadTitle'>Upload a .jpg or .png Dog Image</div>
            <div id='uploadDescription'>Any uploads must comply with the <a style={{color: '#FF868E'}}
            href='https://www.thedogapi.com/privacy' target='_blank'>upload guidelines</a> or face deletion.</div>
            {!successfullyUploaded &&
            <DropzoneArea checkIfUploaded={checkIfUploaded} getImage={getImage}
                          />
            }
            { !isUploaded &&
            <div id='image-label'>
                No file selected
            </div>
            }
            { isUploaded && error === '' &&
                <div>
                    <div id='image-label'>
                        Image File Name: {image.name}
                    </div>
                    <div id='label' onClick={uploadPhoto}>
                        UPLOAD PHOTO
                    </div>
                </div>
            }
            {success &&
            <div id='upload-response'>
                <CheckCircleOutlined style={{color: '#97EAB9', padding: '0 1vw'}}/>
                <span>Thanks for the Upload - Dog found!</span>
            </div>
            }
            {  error !== '' &&
            <div id='upload-response'>
                <CloseCircleOutlined style={{color: '#FF868E', padding: '0 1vw'}}/>
                <span>No Dog found - try a different one</span>
            </div>
            }
        </div>
    )
}