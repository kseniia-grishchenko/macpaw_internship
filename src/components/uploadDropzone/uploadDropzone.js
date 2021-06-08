import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './index.css';

const baseStyle = {
    backgroundColor: '#FFFFFF',
    margin: '3% 3% 0 3%',
    paddingBottom: '3%',
    borderRadius: '20px',
    borderStyle: 'dashed',
    borderColor: '#FBE0DC'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function DropzoneArea({uploaded, getImage}) {
    const [files, setFiles] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);


    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => (Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))));
        setIsUploaded(true);
        uploaded(true)
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png'
    });


    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const thumbs = files.length > 0 ? files.map(file => {
        getImage(file);
        return <img
            src={file.preview}
            alt={file.name}
            className='input-image'
        />
    }) : (
            <img
                src={'/images/Vector.png'}
                alt={'/images/Vector.png'}
                className='input-image'
            />
    );

    // clean up
    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
        uploaded(false);
    }, [files]);

    return (
            <div  className='dropzone' {...getRootProps({style})}>
                <input {...getInputProps()} />
                {thumbs}
                { !isUploaded && (
                <div id='instructions'><strong>Drag here</strong> your file or <strong>Click here</strong> to upload</div>
                )}
            </div>
    )
}

export default DropzoneArea;