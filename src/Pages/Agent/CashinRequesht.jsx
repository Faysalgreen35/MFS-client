import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../Layout/LoadingSpinner';

const CashinRequest = () => {
  const [cashInRequests, setCashInRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCashInRequests = async () => {
      try {
        const token = localStorage.getItem('access-token');
        const response = await axios.get('http://localhost:5000/cashin-requests', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCashInRequests(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCashInRequests();
  }, []);

  const approveRequest = async (requestId) => {
    try {
      const token = localStorage.getItem('access-token');
      await axios.post('http://localhost:5000/cashin/approve', { requestId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCashInRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status: 'approved' } : request
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='w:50% md:max-w-4xl ml-0 md:ml-64 mx-auto p-4'>
      <h1 className='text-center bg-black font-serif text-white p-3 text-2xl md:text-4xl'>Cash-In Requests</h1>
      {loading ? (
       <LoadingSpinner/>
      ) : error ? (
        <div className='text-center mt-12 text-red-500 text-xl'>{error}</div>
      ) : (
        <div className='relative overflow-x-auto mt-12'>
          <table className='min-w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
              <th scope='col' className='px-6 py-3'>Requester Mobile</th>
                <th scope='col' className='px-6 py-3'>Amount</th>
                <th scope='col' className='px-6 py-3 hidden md:table-cell'>Status</th>
                <th scope='col' className='px-6 py-3  hidden md:table-cell '>Date</th>
                <th scope='col' className='px-6 py-3'>Action</th>
              </tr>
            </thead>
            <tbody>
              {cashInRequests.map((request, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? 'bg-white dark:bg-gray-900'
                      : 'bg-gray-50 dark:bg-gray-800'
                  } border-b dark:border-gray-700`}
                >
                  <td className='px-6 py-4'>{request.requesterMobile}</td> 
                  <td className='px-6 py-4'>{request.amount.toFixed(2)} Taka</td>
                  <td className='px-6 py-4 hidden md:table-cell'>{request.status}</td>
                  
                  <td className='px-6 py-4 hidden md:table-cell '>
                    {new Date(request.timestamp).toLocaleString()}
                  </td>
                  <td className='px-6 py-4 '>
                    <button
                      onClick={() => approveRequest(request._id)}
                      disabled={request.status !== 'pending'}
                      className={`px-2 py-2 rounded ${
                        request.status === 'pending' ? 'bg-green-500 text-white' : 'bg-red-500 text-white cursor-not-allowed'
                      }`}
                    >
                      {request.status === 'pending' ? 'Approve' : 'Approved'}
                    </button>
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

export default CashinRequest;



// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const CashinRequest = () => {
//   const [cashInRequests, setCashInRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCashInRequests = async () => {
//       try {
//         const token = localStorage.getItem('access-token');
//         const response = await axios.get('http://localhost:5000/cashin-requests', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setCashInRequests(response.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCashInRequests();
//   }, []);

//   return (
//     <div className='max-w-4xl mx-auto p-4'>
//       <h1 className='text-center bg-black font-serif text-white p-3 text-2xl md:text-4xl'>Cash-In Requests</h1>
//       {loading ? (
//         <div className='text-center mt-12 text-xl'>Loading...</div>
//       ) : error ? (
//         <div className='text-center mt-12 text-red-500 text-xl'>{error}</div>
//       ) : (
//         <div className='relative overflow-x-auto mt-12'>
//           <table className='min-w-full text-sm text-left text-gray-500 dark:text-gray-400'>
//             <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
//               <tr>
//                 <th scope='col' className='px-6 py-3'>Agent Mobile</th>
//                 <th scope='col' className='px-6 py-3'>Amount</th>
//                 <th scope='col' className='px-6 py-3'>Status</th>
//                 <th scope='col' className='px-6 py-3'>Date</th>
//               </tr>
//             </thead>
           
//             <tbody>
//               {cashInRequests.map((request, index) => (
//                 <tr
//                   key={index}
//                   className={`${
//                     index % 2 === 0
//                       ? 'bg-white dark:bg-gray-900'
//                       : 'bg-gray-50 dark:bg-gray-800'
//                   } border-b dark:border-gray-700`}
//                 >
//                   <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
//                     {request.agentMobile}
//                   </td>
//                   <td className='px-6 py-4'>{request.amount} Taka</td>
//                   <td className='px-6 py-4'>{request.status}</td>
//                   <td className='px-6 py-4'>
//                     {new Date(request.timestamp).toLocaleString()}
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

// export default CashinRequest;
