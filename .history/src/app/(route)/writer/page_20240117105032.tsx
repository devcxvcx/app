"use client";
import './_style/writer.css';

import React, { useEffect } from 'react';
import { registerForm, sessionState} from 'Store/Atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

import Editor from './_components/Editor';
import Register from './_components/Register';
import Login from './_components/Login';

export default function Writer(){
    return 1;
    const regForm = useRecoilValue(registerForm);
    const session = useRecoilState(sessionState);

    useEffect(() => {
        // console.log("session",session);
        // console.log("localStorage",localStorage.getItem('session'));
    },[session]); 


    if(session && localStorage.getItem('session'))
    {
        return <Editor />;
    }
    else
    {
        return (<>{regForm ? (<Register />):(<Login />)}</>);
    }

    
}

