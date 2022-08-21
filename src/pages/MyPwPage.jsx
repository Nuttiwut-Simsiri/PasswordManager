import React, { useContext, useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PasswordStorageContext } from '../PasswordStorageContext';

const PasswordEl = ({ index, my_password, removeFn, decrypt_pw }) => {
    const [password, setPassword] = useState(my_password.password)
    const [show, setShow] = useState(false)
    const element = useRef();

    const handleShowHide = () => {
        setShow(prevState => !prevState)
        show ? setPassword(decrypt_pw) : setPassword(my_password.password)
    }
    const handleRemove = () => {
        removeFn(index);
    }

    return (
        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' ref={element}>

            <td className="py-4 px-6">{my_password.website}</td>
            <td className="py-4 px-6">{my_password.username}</td>
            <td className="py-4 px-6">
                <div>
                    <input readOnly={true} className='bg-transparent focus:outline-gray-900 focus:border-1 focus:bg-transparent focus:border-gray-500' type={show ? "text" : "password"} value={password}></input>
                </div>
            </td>
            <td className="py-4 px-2">
                <a href="#" onClick={handleShowHide} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{show ? "Hide" : "Show"}</a>

            </td>
            <td className="py-4 px-2">
                <a href="#" onClick={handleRemove} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>

            </td>

        </tr>
    )
}

const MyPwPage = () => {
    const [filterMsg, setFilterMsg] = useState("")
    const { myPassword,
        setMyPassword,
        allPassword,
        setAllPassword, removePassword, decrypt_password,
        removeDoneSignal,
        setRemoveDoneSignal } = useContext(PasswordStorageContext)

    useEffect(() => {
        if (!filterMsg) {
            setMyPassword(allPassword);
        } else {
            var filteredData = filterBy(myPassword);
            setMyPassword(filteredData);
        }
    }, [filterMsg])

    useEffect(() => {
        if (removeDoneSignal) {
            toast.success('Remove Sucessfully!', {
                position: "top-right",
                autoClose: 700,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setRemoveDoneSignal(prev => !prev)
        }
    }, [removeDoneSignal])

    const handleSearch = (event) => {
        setFilterMsg(event.target.value)
    }
    const filterBy = (filteredData) => {
        // Avoid filter for null value
        if (!filterMsg) {
            return filteredData;
        }

        const filteredPassword = filteredData.filter(
            (detail) => detail.username.toLowerCase().includes(filterMsg.toLowerCase()) || detail.website.toLowerCase().includes(filterMsg.toLowerCase())
        );
        return filteredPassword;
    };

    const removeItem = async (remove_id) => {
        console.log("Remove item", remove_id)
        removePassword(remove_id)
    }

    const handleRemove = (remove_id) => {
        confirmAlert({
            customUI: ({ onClose }) => {

                return (
                    <div className='flex flex-col w-full bg-slate-700 p-7 text-white'>
                        <h1 className='font-bold text-xl py-2'>Are you sure?</h1>
                        <p className='py-2'>You want to remove this password?</p>
                        <div className='flex w-full mt-3 justify-between'>

                            <button className='mr-3 w-full bg-red-800 hover:bg-red-500 text-white font-bold text-xl hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'
                                onClick={async (event) => {
                                    removeItem(remove_id)
                                    onClose();
                                }}>Remove </button>
                            <button className='w-full bg-gray-500 hover:bg-gray-700 text-white font-bold text-xl hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded'
                                onClick={onClose}>No</button>

                        </div>

                    </div>
                );
            }
        });
    }

    return (
        <div className='flex flex-col w-full h-screen bg-slate-900 text-white'>
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
            <div className='flex p-4 mt-5'>
                <a href='/' className='underline' > Password Generator </a>
            </div>
            <div className='flex justify-center'>
                <div className='font-extrabold text-2xl'> My Password </div>
            </div>
            <div className='flex justify-center '>
                <input onChange={handleSearch} className="w-9/12 mt-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500" type="search" placeholder='search username or website' />
            </div>

            <div className='flex justify-center mt-8 overflow-x-auto relative shadow-md rounded-lg'>
                <table className='w-11/12 text-sm text-left text-gray-200 '>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th scope="col" className="py-3 px-6">Website</th>
                            <th scope="col" className="py-3 px-6">Username</th>
                            <th scope="col" className="py-3 px-6">Password</th>
                            <th scope="col" className="py-3 px-2">  </th>
                            <th scope="col" className="py-3 px-2">  </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myPassword.map((el, i) => {
                                return <PasswordEl key={el.id} index={el.id} my_password={el} removeFn={handleRemove} decrypt_pw={decrypt_password(el.password)}></PasswordEl>
                            })
                        }

                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default MyPwPage