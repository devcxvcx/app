// import '../styles/reset.css';
// import '../styles/style.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Moment from 'moment';
import { useRecoilState } from 'recoil';

import { deviceInfoState, registerForm, sessionState} from '../../../../../../store/Atoms'

// import { screenModeCookieMaxAge } from '../constants/globalConfig';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faCircleCheck, faCircleExclamation, faCircleNotch } from '@fortawesome/free-solid-svg-icons';


export default function Editor(){
    const [deviceInfo, setDiviceInfo] = useRecoilState(deviceInfoState); 
    const [regFrom, setRegForm] = useRecoilState(registerForm);
    const [session, setSession] = useRecoilState(sessionState);
    const [saveView, setSaveView] = useState(false);
    const [saveState, setSaveState] = useState('ing');
    const [userId, setUserId] = useState<string>();
    const [edtDate, setEdtDate] = useState<string>('-');
    const [note, setNote] = useState<string>();
    const [textLength, setTextLength] = useState<number>(0);
    const [wordBreak, setWordBreak] = useState<string>('A');


    const timer = useRef<number | null>(null);

    const logout = () => {
        localStorage.clear();
        setRegForm(false);
        setSession('');
    }

    const getNote = async() => {

        axios({
            method: 'POST',
            url: '/local/note/getNote',
            headers: {
                'Content-type': 'application/json', 
                'Accept': 'application/json' 
            },
            data: {
                key: userId, // user id
            },
        }).then((response) => {
            const objNote = response.data[0];
            console.log("getNote", objNote);
            if(objNote)
            {
                const lastEditTime = Moment.unix(objNote.n_wrt_date).format("YYYY.MM.DD HH:mm:ss");
                setEdtDate(lastEditTime);
                setNote(objNote.n_text);
                setTextLength(objNote.n_text.length);
            }
            
        }).catch((Error)=>{

            setSaveState('error');
            console.log(Error);

        });

    }

    const wrtNote = async(memo :string) => {
        // console.log("api memo",memo);

        axios({
            method: 'POST',
            url: '/local/note/setNote',
            headers: {
                'Content-type': 'application/json', 
                'Accept': 'application/json' 
            },
            data: {
                key: userId, // user id
                text: memo, // text
            },
        }).then((response) => {
            console.log(response);
            if(response.status === 200)
            {
                const lastEditTime = Moment.unix(response.data.edtDate).format("YYYY.MM.DD HH:mm:ss");
                setEdtDate(lastEditTime);
                setSaveState('complete');
                // window.setTimeout(() => {
                setSaveView(false);
                // }, 500);
            }
            else
            {
                setSaveState('error');
            }
            
        }).catch((Error)=>{

            setSaveState('error');
            console.log(Error);

        });
    };

    const timerSetting = (text: string) => {
        setSaveView(true);
        timer.current = window.setTimeout(() => {
            wrtNote(text);
        }, 1500);
    }

    const onKeyUpHandler = (e:React.KeyboardEvent<HTMLTextAreaElement>):void => {
        const text = e.currentTarget.value;

        setTextLength(text.length);
        setSaveState('ing');
        
        if (timer.current === null)
        {
            timerSetting(text);
            return;
        }
        window.clearTimeout(timer.current);
        timerSetting(text);
    }

    const lineBreak = () =>{
        wordBreak === 'A' ? setWordBreak('B') : setWordBreak('A');
    }

    const saveData = () => {
        return (
            <div className={`saving-wrap ${saveView === true ? 'active' : ''} ${saveState}`}>
                <ul>
                    <li>
                        <FontAwesomeIcon icon={faCircleNotch} spin />
                        <p>저장중</p>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faCircleCheck}/>
                        <p>완료</p>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        <p>네트워크 오류</p>
                    </li>
                </ul>
            </div>
        )
    }

    useEffect(() => {
        if(session != null)
        {
            const parSession = JSON.parse(session);
            setUserId(parSession.id);
            if(userId) getNote();
        }
    },[userId]); 

    return (
        <div className='device'>
            <textarea 
                className= {`textarea ${wordBreak === 'B' ? "keep" : ""}`}
                style={{width:`${deviceInfo.width}px`,height:`${deviceInfo.height}px`}}
                onKeyUp = {onKeyUpHandler}
                defaultValue = {note}
            >
            </textarea>
            {saveData()}
            <p>수정시간: {edtDate}</p>
            <p>글자수: {textLength}</p>
            <button onClick={() => lineBreak()}>줄바꿈: {wordBreak}</button>
            <button onClick={() => logout()}>logout</button>
        </div>
    );
}

