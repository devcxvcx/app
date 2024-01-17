"use client";

import React, { useEffect } from 'react';
import { registerForm, sessionState} from '@store/Atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

import Editor from './_components/Editor';
import Register from './_components/Register';
import Login from './_components/Login';

export default function Writer(){
    const regForm = useRecoilValue(registerForm);
    const session = useRecoilState(sessionState);


    if(session && localStorage.getItem('session'))
    {
        return <Editor />;
    }
    else
    {
        return (<>{regForm ? (<Register />):(<Login />)}</>);
    }
    
}

