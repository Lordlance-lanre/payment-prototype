import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Webhook() {
    const { reference, status } = useParams();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (status === 'true') {
            setMessage('Payment successful!');
        } else if (status === 'false') {
            setMessage('Payment failed. Please try again.');
        }
    }, [status]);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>{message}</h1>
            <p>Reference: {reference}</p>
        </div>
    );
}