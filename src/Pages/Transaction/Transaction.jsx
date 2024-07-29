import { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('access-token');
        const response = await axios.get('http://localhost:5000/transactions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className='w:80% md:max-w-4xl ml-0 md:ml-64 mx-auto p-4'>
      <div>
        <h1 className=' text-center bg-black font-serif text-white p-2 w-full md:p-3 text-2xl md:text-4xl  mt-1 mr-16  '>Transaction History</h1>
      </div>
      {loading ? (
        <div className='text-center mt-12 text-xl'>Loading...</div>
      ) : error ? (
        <div className='text-center mt-12 text-red-500 text-xl'>{error}</div>
      ) : (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-12'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>Type</th>
                <th scope='col' className='px-6 py-3'>Amount</th>
                <th scope='col' className='px-6 py-3 hidden md:table-cell'>Fee</th>
                <th scope='col' className='px-6 py-3'>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? 'bg-white dark:bg-gray-900'
                      : 'bg-gray-50 dark:bg-gray-800'
                  } border-b dark:border-gray-700`}
                >
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {transaction.type}
                  </td>
                  <td className='px-6 py-4'>{transaction.amount} Taka</td>
                  <td className='px-6 py-4 hidden md:table-cell'>{transaction.fee} Taka</td>
                  <td className='px-6 py-4'>
                    {new Date(transaction.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;


// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import LoadingSpinner from '../../Layout/LoadingSpinner';

// const Transaction = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const token = localStorage.getItem('access-token');
//         const response = await axios.get('http://localhost:5000/transactions', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setTransactions(response.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   return (
//     <div className='max-w-4xl ml-16 md:ml-64 h-screen'>
//       <div>
//         <h1 className='text-center bg-black font-serif text-white p-3 text-2xl md:text-4xl'>Transaction History</h1>
//       </div>
//       {loading ? (
//         <div className='text-center mt-12 text-xl'><LoadingSpinner></LoadingSpinner></div>
//       ) : error ? (
//         <div className='text-center mt-12 text-red-500 text-xl'>{error}</div>
//       ) : (
//         <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-12'>
//           <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
//             <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
//               <tr>
//                 <th scope='col' className='px-6 py-3'>Type</th>
//                 <th scope='col' className='px-6 py-3'>Amount</th>
//                 <th scope='col' className='px-6 py-3'>Fee</th>
//                 <th scope='col' className='px-6 py-3'>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((transaction, index) => (
//                 <tr
//                   key={index}
//                   className={`${
//                     index % 2 === 0
//                       ? 'bg-white dark:bg-gray-900'
//                       : 'bg-gray-50 dark:bg-gray-800'
//                   } border-b dark:border-gray-700`}
//                 >
//                   <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
//                     {transaction.type}
//                   </td>
//                   <td className='px-6 py-4'>{transaction.amount} Taka</td>
//                   <td className='px-6 py-4'>{transaction.fee} Taka</td>
//                   <td className='px-6 py-4'>
//                     {new Date(transaction.timestamp).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Transaction;
