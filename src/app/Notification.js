// Notification.js
import { useEffect } from 'react';

function Notification({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Notification will disappear after 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    const notificationClass = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white ${notificationClass}`}>
            {message}
        </div>
    );
}

export default Notification;
