import React, { createContext, useState, useEffect } from "react";
import { createDir, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { join, configDir } from '@tauri-apps/api/path';
export const PasswordStorageContext = createContext(null);
import localForage from "localforage";

export const PasswordStorageProvider = ({ children }) => {
    const [myPassword, setMyPassword] = useState([])
    const [allPassword, setAllPassword] = useState([])
    const [registerDoneSignal, setRegisterDoneSignal] = useState(false)
    const [removeDoneSignal, setRemoveDoneSignal] = useState(false)
    const store = localForage.createInstance({
        name: "Password Storage"
    });

    useEffect(() => {
        getallPw()
    }, [])

    
    const encrypt_password = (raw_pw) => {
        // const encryptedText = encryptRsa.encryptStringWithRsaPublicKey({
        //     text: raw_pw,
        //     publicKey,
        // });
        return raw_pw
    }

    const decrypt_password = (encryptedText) => {
        // const decryptedText = encryptRsa.decryptStringWithRsaPrivateKey({ 
        //     text: encryptedText, 
        //     privateKey
        //   });
        return encryptedText
    }

    const register = (PwObj) => {
        store.setItem(PwObj.id, PwObj).then(function (value) {
            setRegisterDoneSignal(true)
        }).catch(function (err) {
            // This code runs if there were any errors
            console.log(err)
            setRegisterDoneSignal(false)
        });
        
    }

    const getallPw = () => {
        let temp = []
        store.iterate(function (value, key, iterationNumber) {
            temp.push(value)
        }).then(function () {
            setAllPassword(temp)
            setMyPassword(temp)
        }).catch(function (err) {
            console.log(err);
        });
    }

    const getPw = async (id) => {
        store.getItem(id).then(function(value) {
            return value
        }).catch(function(err) {
            console.log(err);
            return false
        });
       
    }

    const removePassword = (id) => {
        store.removeItem(id).then(function () {
            setRemoveDoneSignal(true)
            getallPw()
        }).catch(function (err) {
            console.log(err);
            setRemoveDoneSignal(false)
        });
    }


    const value = {
        register,
        getPw,
        myPassword,
        setMyPassword,
        allPassword,
        setAllPassword,
        removePassword,
        encrypt_password,
        decrypt_password,
        registerDoneSignal, 
        setRegisterDoneSignal,
        removeDoneSignal, 
        setRemoveDoneSignal
    };

    return (
        <PasswordStorageContext.Provider value={value}>
            {children}
        </PasswordStorageContext.Provider>
    );
};