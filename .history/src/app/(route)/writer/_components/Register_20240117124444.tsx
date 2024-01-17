import './../_style/writer.css';

import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { registerForm, sessionState} from '@store/Atoms';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock } from '@fortawesome/free-solid-svg-icons';

interface authType {
    id: string;
    pw: string;
    name: string;
}

const idValid = {
    required: '아이디를 입력해 주세요.', 
    pattern: {
        value: /^\S+@\S+$/i, 
        message: '올바른 이메일이 아닙니다.'
    },
    
};

const pwValid = {
    required: '비밀번호를 입력해 주세요.', 
    minLength:{
        value: 4, 
        message:'올바른 비밀번호가 아닙니다.'
    }
}

const nameValid = {
    required: '이름을 입력해 주세요.' 
}


export default function Register(){
    const [regFrom, setRegForm] = useRecoilState(registerForm);
    const [session, setSession] = useRecoilState(sessionState);
    const { register, handleSubmit, formState, formState:{ errors } } = useForm<authType>({mode: 'onBlur'});

    const duplicateApi = async(data: any) => {
        axios({
            method: 'POST',
            url: '/local/note/duplicate',
            headers: {
                'Content-type': 'application/json', 
                'Accept': 'application/json' 
            },
            data: {
                id: data.id, 
                pw: data.pw, 
                name: data.name, 
            },
        }).then((response) => { 
            console.log('duplicate check',response);
            if(response.data)
            {
                alert(`이미 가입된 아이디 입니다.`);
            }
            else
            {
                registerApi(data);
            }
        }).catch((Error)=>{
            console.log(Error);
        });
    };

    const registerApi = async(data: any) => {

        axios({
            method: 'POST',
            url: '/local/note/register',
            headers: {
                'Content-type': 'application/json', 
                'Accept': 'application/json' 
            },
            data: {
                id: data.id, 
                pw: data.pw, 
                name: data.name, 
            },
        }).then((response) => {
            console.log('registerApi',response);
            if(response.data)
            {
                alert(`${data.name} 님 안녕하세요`);
                const session = JSON.stringify({id: data.id, pw: data.pw, name: data.name});
                localStorage.setItem('session', session);
                setSession(session);
            } 
            else
            {
                alert('네트워크 오류');
            }
        }).catch((Error)=>{
            console.log(Error);
        });
    };

    const onSubmit = (data: any) => {
        duplicateApi(data);
    }
    
    return (
        <div className='auth-wrap'>
            <div className='box'>
                
                <div className='title'>
                    <p>회원가입</p>
                    <button className='login-reg-btn' onClick={() => setRegForm(false)} type='button'>
                        <FontAwesomeIcon icon={faUserLock} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <input type="text" className={errors.id ? 'valid-error':''} {...register("id", idValid)} placeholder='아이디'/>
                    <p className='valid-msg'>{errors?.id?.message}</p>

                    <input type="password" className={errors.pw ? 'valid-error':''} {...register("pw", pwValid)} placeholder='비밀번호'/>
                    <p className='valid-msg'>{errors?.pw?.message}</p>

                    <input type="text" className={errors.name ? 'valid-error':''} {...register("name", nameValid)} placeholder='이름'/>
                    <p className='valid-msg'>{errors?.name?.message}</p>

                    <button className='submit-btn' type="submit" disabled={!formState.isValid}>가입</button>
                    
                </form>

            </div>
        </div>
    );
}

