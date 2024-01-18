"use client";
import type { Metadata } from 'next'
import React, { useEffect } from 'react';
import { registerForm, sessionState} from '@store/Atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

import Editor from './_components/Editor';
import Register from './_components/Register';
import Login from './_components/Login';

export const metadata: Metadata = {
    title: 'My Apps',
    description: '루트',
    icons: {
        icon: "/favicon.png",
    },
}

export default function Writer(){
    const regForm = useRecoilValue(registerForm);
    const session = useRecoilState(sessionState);

    useEffect(() => {
        // console.log("session",session);
        // console.log("localStorage",localStorage.getItem('session'));
    },[session]); 


    if(session)
    {
        return <Editor />;
    }
    else
    {
        return (<>{regForm ? (<Register />):(<Login />)}</>);
    }
    
}

