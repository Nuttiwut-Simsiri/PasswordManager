import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getVersion } from '@tauri-apps/api/app';
import { useEffect } from 'react';
import { PasswordContext } from '../PasswordContext';
import { Link } from "react-router-dom";

import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';


const HomePage = () => {
    const { genPassword, setGenPassword } = useContext(PasswordContext)
    const [pwLen, setPwLen] = useState(16)
    const [spChar, setSpChar] = useState("={@%+!#$/^?&~-_")
    const [appVersion, setAppVersion] = useState("0.X.X")

    useEffect(() => {
        const handle_get_version = async () => {
            const _version = await getVersion();
            setAppVersion(_version)
            console.log("set version")
        }

        handle_get_version();
       
    }, []);

    const create_pw = (pw_len, characters) => {
        var password = '';
        var charactersLength = characters.length;
        for (var i = 0; i < pw_len; i++) {
            password += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        // Validate Password at least 1 number and 1 special character
        const number_check = [...password.matchAll("[0-9]")];
        const lowercase_check = [...password.matchAll("[a-z]")];
        const special_char_check = [...password.matchAll("[^A-Za-z0-9]")]
        const limit = pw_len < 10 ? 1 : 2
        const sm_limit = pw_len < 10 ? 2 : 5
        if (number_check.length >= limit && special_char_check.length >= limit && lowercase_check.length >= sm_limit) {
            return password
        } else {
            return create_pw(pw_len, characters)
        }

    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(genPassword);
        toast.success('Copy Sucessfully!', {
            position: "top-right",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        let permissionGranted = await isPermissionGranted();
        if (!permissionGranted) {
            const permission = await requestPermission();
            permissionGranted = permission === 'granted';
        }
        if (permissionGranted) {
            sendNotification('Tauri is awesome!');
            sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' });
        }
    }

    const generatePassword = () => {
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = lowercase.toLocaleUpperCase();
        const number = "0123456789";
        setGenPassword(create_pw(pwLen, lowercase + number + uppercase + spChar));
    }

    return (
        <div className='flex flex-col justify-center bg-gray-900 w-full h-screen text-white'>
            <div className='flex justify-center text-white'>
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

                <div className='flex flex-col w-10/12 items-center'>
                    <h1 className='text-center font-extrabold text-4xl text-green-400 mb-12'> Password Generator </h1>
                    <div className='flex w-full justify-center items-center py-2 mt-5'>
                        <div className='w-8/12'>
                            <label className="block text-gray-300 font-bold pb-4 ml-10"> Password Length : </label>
                        </div>
                        <div className='w-8/12'>
                            <input onChange={(event) => setPwLen(event.target.value)} className="w-2/5 bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" type="number" defaultValue={pwLen} />
                        </div>
                    </div>
                    <div className='flex w-full justify-center items-center py-2'>
                        <div className='w-8/12'>
                            <label className="block text-gray-300 font-bold self-start pb-4 ml-10"> Special Character :</label>
                        </div>
                        <div className='w-8/12'>
                            <input onChange={(event) => setSpChar(event.target.value)} className="w-5/5 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" type="text" defaultValue={spChar} />
                        </div>
                    </div>

                    <div className='flex w-full justify-center items-center py-2 mt-5'>
                        <button onClick={generatePassword} className="w-3/6 bg-green-500 hover:bg-green-500 text-white font-extrabold text-xl hover:text-white py-3 px-4 border border-green-500 hover:border-transparent rounded">Generate</button>
                    </div>

                    <div className='flex w-full justify-center items-center py-6 mt-5 shadow-inner'>
                        <input className="bg-gray-800 appearance-none rounded w-9/12 py-8 px-4 text-green-500 font-bold text-2xl text-center focus:outline-none" type="text" readOnly={true} defaultValue={genPassword} />
                    </div>
                    <div className='flex flex-col w-full justify-center items-center'>
                        <button className="py-3 w-9/12 rounded hover:bg-gray-700 bg-transparent border border-gray-500" onClick={handleCopy} disabled={!genPassword}>Copy </button>
                        <Link to="/register" className="py-3 mt-2 w-3/12 text-center underline" state={genPassword}> Register </Link>
                        <a href="/mypassword" className='underline'> Show My Password </a>

                    </div>
                </div>
            </div>
            <div className='flex text-sm justify-end pr-5'>
                version : <div className='underline '> {appVersion}</div>
            </div>

        </div>

    )
}

export default HomePage