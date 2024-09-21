import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from "react-icons/io";
import { setrequest } from '../../slices/requests.slice';
import AnonymousChat from '../Explore/AnonymousChat';

const RequestUser = () => {
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.request.request);

    const [show, setShow] = useState(null);

    const toggleShow = (index) => {
        setShow(prevShow => (prevShow === index ? null : index));
    };

    const fetchRequests = async (type) => {
        try {
            const response = await fetch(`http://localhost:3000/api/sessions?type=${type}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            dispatch(setrequest(data));
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    useEffect(() => {
        fetchRequests('user');
    }, []);

    const data = [
        'Dinləyici',
        'Seans tarixi',
        'Müddət',
        'Kateqoriya',
        'Məbləğ',
        'Status',
    ];
    const formatDate = (sessionStartTime) => {
        if (!sessionStartTime) return { dateString: '', timeString: '' };
        const formattedTime = new Date(sessionStartTime);
        const day = formattedTime.getDate().toString().padStart(2, '0');
        const month = (formattedTime.getMonth() + 1).toString().padStart(2, '0');
        const year = formattedTime.getFullYear().toString().slice(-2);
        const dateString = `${day}.${month}.${year}`;
        const timeString = formattedTime.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', hour12: false });
        return { dateString, timeString };
    };

    return (
        <div className='flex flex-col gap-8'>
            <AnonymousChat />
            <div>
                {Array.isArray(requests) && requests.length > 0 ? (
                    <>
                        <table className='md:table hidden w-full text-center'>
                            <thead className='w-full'>
                                <tr
                                    style={{ letterSpacing: "0.3px" }}
                                    className='border-b border-light20 dark:border-darkgray w-full grid grid-cols-[1fr_1.5fr_0.8fr_1.5fr_0.8fr_1fr_1fr]'>
                                    {data.map((item, index) => (
                                        <td key={index}
                                            className={`dark:text-text100 text-gray10 text-xs sm:text-sm xl:text-base font-medium py-[10px] border-r border-light20 dark:border-darkgray`}
                                        >
                                            {item}
                                        </td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='text-xs sm:text-sm xl:text-base dark:text-text100 text-gray10 w-full'>
                                {requests.map((request, rowIndex) => {
                                    const { dateString, timeString } = formatDate(request.sessionStartTime);
                                    return (
                                        <tr key={rowIndex} className='w-full grid grid-cols-[1fr_1.5fr_0.8fr_1.5fr_0.8fr_1fr_1fr]'>
                                            <td className=' py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                                            {request.listenerId?.nickname === undefined ? "gözlənilir" : request.listenerId?.nickname}
                                            </td>
                                            <td className=' py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                                                {dateString && timeString ? `${dateString} | ${timeString}` : 'gözlənilir'}
                                            </td>
                                            <td className='py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                                                {request.duration}
                                            </td>
                                            <td className=' py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                                                {request.topic}
                                            </td>
                                            <td className='py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                                                {request.price} Azn
                                            </td>
                                            <td className='py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                                                {request.status === "pending" ? 'gözləyir' : 'qəbul edildi'}
                                            </td>
                                            <td className='py-[11.5px] border-b border-light20 dark:border-darkgray'>
                                                <button className={`${request.status === 'accepted' ? 'opacity-100' : 'opacity-30'} dark:bg-green rounded-[5px] py-2 px-[10px] xl:w-[100px] w-16 text-sm text-text100`}>
                                                    Başla
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className='flex flex-col md:hidden gap-6'>
                            {requests.map((request, rowIndex) => {
                                const { dateString, timeString } = formatDate(request.sessionStartTime);
                                return (
                                    <div key={rowIndex} onClick={() => toggleShow(rowIndex)} className='dark:bg-dark300 bg-lightgray rounded-[5px] flex flex-col lg:hidden gap-[18px] xs:gap-3 py-3 px-4'>
                                        <div className="flex justify-between items-center">
                                            <p className='dark:text-text100 text-gray10 font-medium text-base sm:text-lg border-b border-light20 dark:border-dark20'>
                                                {request.listenerId?.nickname === undefined ? "gözlənilir" : request.listenerId?.nickname}
                                            </p>
                                            <p className='dark:text-dark70 text-light70'>
                                                <IoMdClose />
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-[160px_auto] sm:grid-cols-[200px_auto] xxs:grid-cols-1 dark:text-text100 text-gray10 xs:gap-3">
                                            <div className="flex items-center gap-2">
                                                <p className='font-medium text-sm sm:text-base xxs:text-xs'>Tarix:</p>
                                                <p className='text-xs sm:text-sm'>
                                                    {dateString && timeString ? `${dateString} | ${timeString}` : 'gözlənilir'}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <p className='font-medium text-sm sm:text-base xxs:text-xs'>Mövzu:</p>
                                                <p className='text-xs sm:text-sm'>{request.topic}</p>
                                            </div>
                                        </div>
                                        {show === rowIndex && (
                                            <div className="block">
                                                <div className="grid grid-cols-[160px_auto] sm:grid-cols-[200px_auto] xxs:grid-cols-1 dark:text-text100 text-gray10 xs:gap-3">
                                                    <div className="flex items-center gap-2">
                                                        <p className='font-medium text-sm sm:text-base xxs:text-xs'>Müddət:</p>
                                                        <p className='text-xs sm:text-sm'>{request.duration} dəq</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <p className='font-medium text-sm sm:text-base xxs:text-xs'>Məbləğ:</p>
                                                        <p className='text-xs sm:text-sm'>{request.price} Azn</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center items-center mt-8">
                                                    <button className={`${request.status === 'accepted' ? 'opacity-100' : 'opacity-30'} dark:bg-green rounded-[5px] py-2 px-[10px] w-[100px] text-sm text-text100`}>
                                                        Başla
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <p className='text-lg dark:text-text100 text-gray10'>Müraciət yoxdur</p>
                )}
            </div>
        </div>
    );
};

export default RequestUser;
