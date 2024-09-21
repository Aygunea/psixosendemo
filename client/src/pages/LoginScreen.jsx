import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../slices/role.slice';
import ListenerIcon from '../icons/ListenerIcon.tsx';
import UserIcon from '../icons/UserIcon.tsx';

const LoginScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = useSelector((state) => state.role.role);

    const handleRoleSelection = (selectedRole) => {
        console.log(`Selected Role: ${selectedRole}`);
        dispatch(setRole(selectedRole));
    };
    useEffect(() => {
        if (role === 'user' || role === 'listener') {
            navigate('/sign-in');
        }
    }, [role, navigate]);



    return (
        <div className="text-text100 h-screen bg-dark flex items-center justify-center">
            <div className='flex justify-center items-center'>
                <div className="flex flex-col items-center">
                    <div className="text-center xs:text-2xl text-[32px] mb-16 xs:mb-14 flex flex-col flex-wrap justify-center">
                        <p> Anonim dinləyici çatına</p>
                        <p className="font-medium"> Xoş Gəlmisiniz</p>
                    </div>
                    <button
                        onClick={() => handleRoleSelection('user')}
                        className='justify-center gap-4 items-center hover:scale-95 transition duration-300 h-16 lg:w-[350px] w-full flex text-lg xs:text-base border border-text100 rounded10 mb-9'>
                        <div className='w-8 h-8 xs:w-6 xs:h-6 bg-text100 rounded-full flex justify-center items-center'>
                            <UserIcon />
                        </div>
                        <div>
                            <span className='font-medium'> Danışan </span>
                            <span>olaraq davam et</span>
                        </div>
                    </button>
                    <button
                        onClick={() => handleRoleSelection('listener')}
                        className='justify-center gap-4 items-center hover:scale-95 transition duration-300 h-16 lg:w-[350px] w-full flex text-lg xs:text-base border border-text100 rounded10'>
                        <div className='w-8 h-8 xs:w-6 xs:h-6 bg-text100 rounded-full flex justify-center items-center'>
                            <ListenerIcon />
                        </div>
                        <div>
                            <span className='font-medium'> Dinləyici </span>
                            <span>olaraq davam et</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;
