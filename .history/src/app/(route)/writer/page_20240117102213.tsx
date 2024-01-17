import '@styles/global.css';
import '../_style/writer.css';

import React, { useEffect } from 'react';
import { registerForm, sessionState} from '../store/Atoms'
import { useRecoilState, useRecoilValue } from 'recoil';

import Editor from '../components/Editor';
import Register from '../components/Register';
import Login from '../components/Login';

export default function Writer(){
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

