import React, { useState, useEffect, useRef, useContext } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PasswordContext } from '../PasswordContext';
import { PasswordStorageContext } from '../PasswordStorageContext';
import { nanoid } from 'nanoid'

const RegisterPage = () => {
    const { genPassword, setGenPassword } = useContext(PasswordContext)
    const { encrypt_password, register, getPw, registerDoneSignal, 
        setRegisterDoneSignal } = useContext(PasswordStorageContext)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(genPassword);
    const [website, setWebsite] = useState("");

    const handleError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    useEffect(() => {
        if (registerDoneSignal){
            setUsername("")
            toast.success('Register Sucessfully!', {
                position: "top-right",
                autoClose: 700,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setRegisterDoneSignal(prev => !prev)
        }
    }, [registerDoneSignal])

    const handleRegister = async () => {

        if (!username) return handleError("Please enter username")
        if (!password) return handleError("Please enter password")

        // let result = await window.Api.register(data)
        // handleAck(result);
        const id = nanoid(18)
        const encrypt_pw = encrypt_password(password)
        const data = {
            id,
            username,
            password: encrypt_pw,
            website
        }
        register(data);
    }

    return (
        <div className='flex flex-col w-full h-screen bg-slate-900 text-white' >
            <ToastContainer
                position="top-right"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="dark"
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className='flex justify-between px-8 mt-5 w-full'>
                <a href='/' className='underline'> Password Generator </a>
                <a href='/mypassword' className='underline'> See All Password </a>
            </div>
            <div className='flex flex-col items-center mt-10'>
                <div className='font-extrabold text-2xl py-10'> Register New Password </div>

                <div className='flex w-10/12 justify-center items-center py-2'>
                    <div className='w-4/12'>
                        <label className="block text-gray-300 font-bold"> Username : </label>
                    </div>
                    <div className='w-6/12'>
                        <input onChange={(ev) => setUsername(ev.target.value)} className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" type="text" defaultValue={username} />
                    </div>
                </div>
                <div className='flex w-10/12 justify-center items-center py-2'>
                    <div className='w-4/12'>
                        <label className="block text-gray-300 font-bold"> Password : </label>
                    </div>
                    <div className='w-6/12'>
                        <input onChange={(ev) => setPassword(ev.target.value)} className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" type="text" defaultValue={password} />
                    </div>
                </div>
                <div className='flex w-10/12 justify-center items-center py-2'>
                    <div className='w-4/12'>
                        <label className="block text-gray-300 font-bold"> Website : </label>
                    </div>
                    <div className='w-6/12'>
                        <input onChange={(ev) => setWebsite(ev.target.value)} className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" type="url" defaultValue={website} />
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center w-10/12 py-4'>
                    <button onClick={handleRegister} className="my-2 w-3/5 bg-green-800 hover:bg-green-500 text-white font-bold text-xl hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"> register </button>
                    <a href="/" className=" text-center w-3/5 bg-transparent hover:bg-gray-800 text-white font-bold text-xl hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded"> cancel</a>
                </div>

            </div>
        </div>
    )
}

export default RegisterPage