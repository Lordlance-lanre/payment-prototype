import { useState } from "react";

const InitializePayment = () => {
    const [email, setEmail] = useState('')
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const apiUrl = import.meta.env.VITE_API_URL

    const handlePayment = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, amount: parseFloat(amount) }),
            })
            console.log('Response status>>', response);

            const data = await response.json()

            console.log('Response data>>', data);
            if (response.ok) {
                setMessage('Payment initialized successfully!')
                window.location.href = data.data.authorization_url
                // Optionally redirect to Paystack payment page: window.location.href = data.data.authorization_url
            } else {
                setMessage(data.error || 'Failed to initialize payment')
            }
        } catch (error) {
            setMessage('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">Payment Gateway Prototype</h1>
                <form onSubmit={handlePayment}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (NGN)</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            min="1"
                            step="0.01"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Initialize Payment'}
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
            </div>
        </>
    )
}

export default InitializePayment;