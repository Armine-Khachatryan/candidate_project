export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const toBase64 = async (files) => {
    const filePathsPromises = [];
    for (let i = 0; i < files.length; i++) {
        const _FILE = files[i];
        filePathsPromises.push(getBase64(_FILE));
    }
    const filePaths = await Promise.all(filePathsPromises);
    return filePaths.map((base64File) => base64File);
};

import React, { useState, useEffect } from 'react';

const Base64ImageComponent = ({ base64ImageData }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        // Decode Base64 to binary
        const binaryData = atob(base64ImageData);

        // Create a Blob object
        const blob = new Blob([new Uint8Array([...binaryData].map(char => char.charCodeAt(0)))]);

        // Create a data URL
        const url = URL.createObjectURL(blob);

        setImageUrl(url);

        // Clean up the URL when the component unmounts
        return () => URL.revokeObjectURL(url);
    }, [base64ImageData]);

    if (!imageUrl) {
        return <div>Loading...</div>;
    }

    return <img src={imageUrl} alt="Base64 Image" />;
};

export default Base64ImageComponent;
