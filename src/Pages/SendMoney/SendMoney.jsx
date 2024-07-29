import { useState } from 'react';
import axios from 'axios';

const SendMoney = () => {
    const [recipientMobile, setRecipientMobile] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        // Convert amount to number
        const amountNumber = parseFloat(amount);
    
        if (isNaN(amountNumber) || amountNumber < 50) {
            setError('Please enter a valid amount (minimum transaction amount is 50 Taka)');
            return;
        }
    
        try {
            const token = localStorage.getItem('access-token');
            const response = await axios.post('http://localhost:5000/send', 
                { recipientMobile, amount: amountNumber, pin },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response.amount);
            // Update recipient's balance if transaction is successful
            setSuccess('Transaction successful');
            updateRecipientBalance();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };
    

    const updateRecipientBalance = async () => {
        try {
            const token = localStorage.getItem('access-token');
            await axios.patch('http://localhost:5000/update-balance', 
                { recipientMobile, amount },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (err) {
            console.error('Failed to update recipient balance:', err);
        }
    };

    return (
        <div className='max-w-4xl mx-autot ml-16 md:ml-64 h-screen'>
            <div>
                <h1 className='text-center bg-black font-serif text-white  p-3 dark:text-white  text-xl md:text-4xl '>Welcome to  Send Money</h1>
            </div>
            <form className="space-y-4 md:space-y-6 mt-12" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipient Phone Number</label>
                    <input 
                        type="text" 
                        value={recipientMobile} 
                        onChange={(e) => setRecipientMobile(e.target.value)} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Recipient phone number" 
                        required 
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Amount in Taka" 
                        required 
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PIN</label>
                    <input 
                        type="password" 
                        value={pin} 
                        onChange={(e) => setPin(e.target.value)} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="••••••••" 
                        required 
                    />
                </div>
                <button type="submit" className="w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send Money</button>
                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                {success && <p className="text-sm text-green-500 mt-2">{success}</p>}
                
            </form>
        </div>
    );
};

export default SendMoney;
