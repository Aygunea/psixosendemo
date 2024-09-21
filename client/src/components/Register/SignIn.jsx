import CloseEye from "../../icons/CloseEye.jsx";
import OpenEye from "../../icons/OpenEye.jsx";
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../slices/userSlice.js';
import { setListener } from '../../slices/listener.slice.js';
import Input from '../Input/Input.jsx';
import Button from '../Button/Button.jsx';
import Popup from '../Popup/Popup.jsx';
import ForgotPasswordPopup from './ForgotPasswordPopup.jsx';
import { MdOutlineMailOutline } from 'react-icons/md';
import { IoMdLock } from 'react-icons/io';
import { GrLinkPrevious } from "react-icons/gr";
import GoogleIcon from "../../icons/GoogleIcon.tsx";
import RightIcon from "../../icons/RightIcon.tsx";

const SignIn = () => {
    const role = useSelector((state) => state.role.role);
    const [showPassword, setShowPassword] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [popupVisible, setPopupVisible] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const closePopup = () => {
        setPopupVisible(false);
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
        passwordRef.current.type = passwordRef.current.type === 'text' ? "password" : "text";
    };
    const prev = () => {
        sessionStorage.setItem('role', JSON.stringify(''))
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('listener')
    }
    const [user, setUserState] = useState(null);
    const [listener, setListenerState] = useState(null);
    const submitForm = async (requestBody) => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (!response.ok) {
                setPopupType('failed');
                setPopupMessage(data.message);
                setPopupVisible(true);
                return;
            }

            if (role === 'user') {
                dispatch(setUser(data));
                setUserState(data);
            } else if (role === "listener") {
                dispatch(setListener(data));
                setListenerState(data);
            }

            if (emailRef.current) {
                emailRef.current.value = "";
            }

            if (passwordRef.current) {
                passwordRef.current.value = "";
            }

        } catch (error) {
            console.error("Fetch error", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        await submitForm({ email, password, role });
    };

    const handleForgotPasswordModal = () => {
        setIsPopupOpen(true);
    };

    const handlePopupSubmit = async (email) => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (!response.ok) {
                setPopupType('failed');
                setPopupMessage(data.message);
                setPopupVisible(true);
                return;
            }
            if (response.ok) {
                setIsPopupOpen(false);
                setPopupType('success');
                setPopupMessage(data.message);
                setPopupVisible(true);
                return;
            }
        } catch (error) {
            console.error("Error sending password reset email:", error);
            setPopupType('failed');
            setPopupMessage("Failed to send password reset email.");
            setPopupVisible(true);
            return;
        }
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    useEffect(() => {
        if ((user && user._id) || (listener && listener._id)) {
            navigate("/home");
        }
    }, [user, listener, navigate]);


    return (
        <>
            <button onClick={prev}
                className="absolute left-10 top-10 text-text100 text-lg">
                <GrLinkPrevious />
            </button>
            <div className="min-h-screen h-full bg-dark bg-fixed flex items-center flex-col justify-center">
                <div className="py-[100px] w-[500px] xs:px-6 xs:w-full flex items-center justify-center flex-col">
                    <div className="w-full text-center">
                        <h1 className="text-[32px] xs:text-2xl sm:text-4xl mb-16 xs:mb-12 text-medium text-text100">Daxil Olun</h1>
                    </div>
                    {/* Signup with Google */}
                    <button className="flex items-center justify-between px-6 w-full h-13 text-sm bg-transparent border border-text100 text-text100 rounded10 ">
                        <GoogleIcon />
                        <span className="text-lg xs:text-sm">Google ilə daxil olun</span>
                        <RightIcon />
                    </button>

                    <div className="w-full lg:my-[72px] my-14 flex justify-center items-center gap-8">
                        <span className="inline-block w-full h-[1px] bg-text500"></span>
                        <p className="text-xl xs:text-base text-text100 text-center ">Və ya</p>
                        <span className="inline-block w-full h-[1px] bg-text500"></span>
                    </div>

                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="relative h-13 mb-10 xs:mb-8 xxs:mb-4">
                            <MdOutlineMailOutline className="xs:text-xs mr-4 absolute top-1/2 -translate-y-1/2 left-6 xs:left-4 text-text100" />
                            <Input ref={emailRef} type="email" placeholder="Email" />
                        </div>
                        <div className="relative h-13 mb-6 xs:mb-4">
                            <IoMdLock className="xs:text-xs mr-4 absolute top-1/2 -translate-y-1/2 left-6 xs:left-4 text-text100" />
                            <button type="button" onClick={toggleShowPassword} className="w-4 h-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-4 z-10">
                                {!showPassword ? <CloseEye color="#EBEBEB" /> : <OpenEye color="#EBEBEB" />}
                            </button>
                            <Input ref={passwordRef} type="password" placeholder="Password" autoComplete="current-password" />
                        </div>
                        <Link onClick={handleForgotPasswordModal} className="text-dark70 mb-16 text-base xs:text-xs text-end w-full block">
                            Şifrənizi  unutmusunuz?
                        </Link>
                        <Button>Daxil Ol</Button>
                        <div className="text-center text-base xs:text-xs xxs:text-[10px]">
                            <p className="text-dark70 inline-block mr-1">Don't have an account?</p>
                            <Link className="text-text100 underline" to="/sign-up">Sign Up</Link>
                        </div>
                    </form>
                </div>
                <ForgotPasswordPopup isOpen={isPopupOpen} onClose={handleClosePopup} onSubmit={handlePopupSubmit} />
            </div>
            {popupVisible && <Popup message={popupMessage} type={popupType} onClose={closePopup} />}
        </>
    );
};

export default SignIn;
