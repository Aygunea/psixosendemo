import React, { useEffect, useState } from 'react';

const Suggest = () => {
  const [suggests, setSuggests] = useState([]);

  useEffect(() => {
    const fetchSuggests = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/suggest');
        const data = await response.json();
        setSuggests(data);
      } catch (error) {
        console.error('Error fetching suggests:', error);
      }
    };

    fetchSuggests();
  }, []);
  const formatDate = (time) => {
    if (!time) return { dateString: '', timeString: '' };
    const formattedTime = new Date(time);
    const day = formattedTime.getDate().toString().padStart(2, '0');
    const month = (formattedTime.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedTime.getFullYear().toString().slice(-2);
    const dateString = `${day}.${month}.${year}`;
    const timeString = formattedTime.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', hour12: false });
    return { dateString, timeString };
  };
  return (
    <div className='py-6 flex flex-col gap-8 xs:gap-6'>
      {suggests.length > 0 ? (
        suggests.map((suggest) => {
          const { dateString, timeString } = formatDate(suggest.createdAt);
          return (
            <div
              key={suggest._id}
              className='bg-lightgray py-4 px-8 rounded-[10px] flex justify-between transition duration-1000'
            >
              <div className='w-full'>
                <div className="flex items-center justify-end">
                  <p className='text-dark50 text-sm'>
                  {`${timeString} | ${dateString}`}
                  </p>
                </div>
                <p className='text-gray10 text-lg'>
                  {suggest.description}
                </p>
                <p className='text-sm text-light50'>
                  İstifadəçi adı: {suggest.userId?.username}
                </p>
              </div>
            </div>
          )
        })
      ) : (
        <p className='text-xl dark:text-dark100 text-gray10'>
          Təklif yoxdur
        </p>
      )}
    </div>
  );
};

export default Suggest;
