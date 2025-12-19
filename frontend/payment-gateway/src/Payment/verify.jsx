import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'


export default function PaymentVerify() {
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');
    const [data, setData] = useState(null);
    const verifyUrl = import.meta.env.VITE_API_VERIFY_URL;
    const [searchParams] = useSearchParams();
    const reference = searchParams.get('reference');
    const trxRef = searchParams.get('trxref');
    const navigate = useNavigate();


    useEffect(() => {

        if (!reference) {
            setStatus('error');
            setMessage('No payment reference found.');
            return;
        }

        const verifyPayment = async () => {
            try {
                // console.log('PaymentVerify reference>>', reference);
                // console.log('PaymentVerify trxRef>>', trxRef);

                const response = await axios.get(`${verifyUrl}/${reference}`);

                if (response.data?.data?.status === 'success') {
                    setStatus('success');
                    setMessage('Payment verified successfully!');
                    setData(response.data.data);
                } else {
                    setStatus('error');
                    setMessage('Payment was not successful.');
                }
            } catch (error) {
                setStatus('error');
                setMessage(
                    error.response?.data?.error || 'Payment verification failed.'
                );
            }
        };

        verifyPayment();
    }, [reference]);

    return (
        <>
            <div>
                {
                    !reference && (
                        <Oval
                            height={80}
                            width={80}
                            color="#4fa94d"
                            visible={true}
                            ariaLabel="oval-loading"
                            secondaryColor="#4fa94d"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                        />
                    )
                }
                {
                    status === 'success' && (<div style={styles.container}>
                        <span class="loader"></span>
                        <div style={styles.card}>
                            {status === 'loading' && <p style={styles.loading}>Verifying payment...</p>}

                            {status === 'success' && (
                                <div style={styles.success}>
                                    <h2 style={styles.successTitle}>✓ Success</h2>
                                    <p style={styles.message}>{message}</p>
                                    {data && <pre style={styles.data}>{JSON.stringify(data, null, 2)}</pre>}
                                </div>
                            )}

                            {status === 'error' && (
                                <div style={styles.error}>
                                    <h2 style={styles.errorTitle}>✗ Error</h2>
                                    <p style={styles.message}>{message}</p>
                                </div>
                            )}
                            <button onClick={() => navigate('/payments')} style={styles.button}>Go Home</button>
                        </div>

                    </div>)
                }
            </div>
        </>
    );
}


const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
    },
    loading: {
        textAlign: 'center',
        fontSize: '16px',
        color: '#666',
    },
    success: {
        textAlign: 'center',
    },
    successTitle: {
        color: '#4caf50',
        marginBottom: '10px',
    },
    error: {
        textAlign: 'center',
    },
    errorTitle: {
        color: '#f44336',
        marginBottom: '10px',
    },
    message: {
        fontSize: '16px',
        color: '#333',
        marginBottom: '20px',
    },
    data: {
        backgroundColor: '#f5f5f5',
        padding: '15px',
        borderRadius: '4px',
        overflow: 'auto',
        textAlign: 'left',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },

};