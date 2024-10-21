"use client";
import { useEffect, useState } from 'react';
import Notification from './Notification'; // Import Notification component

function ImageManager() {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('/api/images/list');
                const imageList = await response.json();
                setImages(imageList);
            } catch (error) {
                showNotification('Error fetching images', 'error');
            }
        };
        fetchImages();
    }, []);

    const showNotification = (message, type) => {
        setNotification({ message, type });
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/images/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            showNotification('Image uploaded successfully', 'success');
            const newResponse = await fetch('/api/images/list');
            const newImageList = await newResponse.json();
            setImages(newImageList);
        } else {
            showNotification('Error uploading image', 'error');
        }
    };

    const handleDelete = async (imageName) => {
        const response = await fetch(`/api/images/delete/${imageName}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            showNotification('Image deleted successfully', 'success');
            const updatedResponse = await fetch('/api/images/list');
            const updatedImageList = await updatedResponse.json();
            setImages(updatedImageList);
        } else {
            showNotification('Error deleting image', 'error');
        }
    };

    const handleCopyURL = (imageName) => {
        const url = `${window.location.origin}/api/images/${imageName}`;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('URL copied to clipboard', 'success');
        });
    };

    const handleCloseNotification = () => {
        setNotification({ message: '', type: '' });
    };

    return (
        <div className="container mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
            {notification.message && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={handleCloseNotification}
                />
            )}

            <div className="mb-4">
                <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])} 
                    className="mb-2 border border-gray-300 rounded p-2"
                />
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={handleUpload}
                >
                    Upload Image
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image) => (
                    <div key={image} className="flex flex-col items-center border border-gray-200 rounded-lg p-2 bg-gray-50">
                        <img src={`/api/images/${image}`} alt={image} className="w-full h-auto rounded" />
                        <div className="flex space-x-2 mt-2">
                            <button 
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                                onClick={() => handleDelete(image)}
                            >
                                Delete
                            </button>
                            <button 
                                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                                onClick={() => handleCopyURL(image)}
                            >
                                Copy URL
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageManager;
