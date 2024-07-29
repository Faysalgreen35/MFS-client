import { useState } from 'react';
import axios from 'axios';

const RequestCashIn = () => {
  const [agentMobile, setAgentMobile] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const amountNumber = parseFloat(amount);

    if (isNaN(amountNumber) || amountNumber < 50) {
      setError('Please enter a valid amount (minimum transaction amount is 50 Taka)');
      return;
    }

    try {
      const token = localStorage.getItem('access-token');
      const response = await axios.post('http://localhost:5000/cashin-request',
        { agentMobile, amount: amountNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.amount)
      setSuccess('Cash-in request sent successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='max-w-4xl ml-16 md:ml-64'>
      <div>
        <h1 className='text-center bg-black font-serif text-white p-3 text-2xl md:text-4xl'>Welcome to Cash In</h1>
      </div>
      <form className="space-y-4 md:space-y-6 mt-12" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Agent Phone Number</label>
          <input
            type="text"
            value={agentMobile}
            onChange={(e) => setAgentMobile(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Agent phone number"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Amount in Taka"
            required
          />
        </div>
        <button type="submit" className="w-full text-sm md:text-4xl text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center">
          Request Cash In
        </button>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        {success && <p className="text-sm text-green-500 mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default RequestCashIn;



// import { useState } from 'react';
// import axios from 'axios';

// const CashIn = () => {
//   const [agentMobile, setAgentMobile] = useState('');
//   const [amount, setAmount] = useState('');
//   const [pin, setPin] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     // Convert amount to number
//     const amountNumber = parseFloat(amount);

//     if (isNaN(amountNumber) || amountNumber < 50) {
//       setError('Please enter a valid amount (minimum transaction amount is 50 Taka)');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('access-token');
//       const response = await axios.post('http://localhost:5000/cashout',
//         { agentMobile, amount: amountNumber, pin },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log(response.amount)
//       setSuccess('Cash out successful');
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred');
//     }
//   };

//   return (
//     <div className='max-w-4xl ml-16 md:ml-64'>
//       <div>
//         <h1 className='text-center bg-black font-serif text-white p-3 text-2xl md:text-4xl'>Welcome to CashIn</h1>
//       </div>
//       <form className="space-y-4 md:space-y-6 mt-12" onSubmit={handleSubmit}>
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-900">Agent Phone Number</label>
//           <input
//             type="text"
//             value={agentMobile}
//             onChange={(e) => setAgentMobile(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//             placeholder="Agent phone number"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//             placeholder="Amount in Taka"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-900">PIN</label>
//           <input
//             type="password"
//             value={pin}
//             onChange={(e) => setPin(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//             placeholder="••••••••"
//             required
//           />
//         </div>
//         <button type="submit" className="w-full text-sm md:text-4xl text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center">
//           Send CashIn Request
//         </button>
//         {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
//         {success && <p className="text-sm text-green-500 mt-2">{success}</p>}
//       </form>
//     </div>
//   );
// };

// export default CashIn;





