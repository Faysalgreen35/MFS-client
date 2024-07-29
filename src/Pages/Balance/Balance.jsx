import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../Layout/LoadingSpinner'; 

const Balance = () => {
  const [balance, setBalance] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('access-token');
        const response = await axios.get('http://localhost:5000/balance', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBalance(response.data.balance);
        setUsername(response.data.name);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className='max-w-4xl ml-16 md:ml-64 h-screen'>
      <div>
        <h1 className='text-center bg-black font-serif text-white p-3 text-2xl md:text-4xl'>Your Balance</h1>
      </div>
      {loading ? (
        <div className='text-center mt-12 text-xl'><LoadingSpinner></LoadingSpinner></div>
      ) : error ? (
        <div className='text-center mt-12 text-red-500 text-xl'>{error}</div>
      ) : (
        <div className='text-center mt-12'>
          <p className='text-2xl md:text-3xl text-green-700 dark:text-white'>{username}</p>
          <p className='text-4xl'>{balance} Taka</p>
        </div>
      )}
    </div>
  );
};

export default Balance;



// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import LoadingSpinner from '../../Layout/LoadingSpinner'; 

// const Balance = () => {
//   const [balance, setBalance] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
  

//   useEffect(() => {
//     const fetchBalance = async () => {
//       try {
//         const token = localStorage.getItem('access-token');
//         const response = await axios.get('http://localhost:5000/balance', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setBalance(response.data.balance);
//       } catch (err) {
//         setError(err.response?.data?.message || 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBalance();
//   }, []);

//   return (
//     <div className='max-w-4xl ml-16 md:ml-64'>
//       <div>
//         <h1 className='text-center bg-black font-serif text-white p-3 text-2xl md:text-4xl'>Your Balance</h1>
//       </div>
//       {loading ? (
//         <div className='text-center mt-12 text-xl'><LoadingSpinner></LoadingSpinner></div>
//       ) : error ? (
//         <div className='text-center mt-12 text-red-500 text-xl'>{error}</div>
//       ) : (
//         <div className='text-center mt-12 text-4xl'>
             
//             { balance} Taka
            
//             </div>
//       )}
//     </div>
//   );
// };

// export default Balance;
