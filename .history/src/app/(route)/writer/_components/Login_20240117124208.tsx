import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { registerForm, sessionState} from '@store/Atoms';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

interface authType {
    id: string;
    pw: string;
}

const idValid = {
    required: '아이디를 입력해 주세요.', 
    pattern: {
        value: /^\S+@\S+$/i, 
        message: '올바른 이메일이 아닙니다.'
    }
};

const pwValid = {
    required: '비밀번호를 입력해 주세요.', 
    minLength:{
        value: 4, 
        message:'올바른 비밀번호가 아닙니다.'
    }
}

export default function Login(){
    const [regFrom, setRegForm] = useRecoilState(registerForm);
    const [session, setSession] = useRecoilState(sessionState);
    const { register, handleSubmit, formState, formState:{ errors } } = useForm<authType>({mode: 'onBlur'});

    const loginAuth = async(data: any) => {
        axios({
            method: 'POST',
            url: '/local/note/auth',
            headers: {
                'Content-type': 'application/json', 
                'Accept': 'application/json' 
            },
            data: {
                id: data.id, 
                pw: data.pw, 
            },
        }).then((response) => { 
            console.log('login auth',response);
            if(response.status === 200)
            {
                if(response.data)
                {
                    alert(`${response.data}님 안녕하세요`);
    
                    const session = JSON.stringify({id: data.id, pw: data.pw, name: data.name});
                    localStorage.setItem('session', session);
                    setSession(session);
                } 
                else
                {
                    alert('계정정보를 확인해주세요.');
                }
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
        loginAuth(data);
    }
    
    return (
        <div className='auth-wrap'>

            <div className='box'>

                <div className='title'>
                    <p>로그인</p>
                    <button className='login-reg-btn' onClick={() => setRegForm(true)} type='button'>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <input defaultValue='vcxorof@naver.com' type="text" className={errors.id ? 'valid-error':''} {...register("id", idValid)} placeholder='아이디(이메일)'/>
                    <p className='valid-msg'>{errors?.id?.message}</p>

                    <input defaultValue='1234' type="password" className={errors.pw ? 'valid-error':''} {...register("pw", pwValid)} placeholder='비밀번호'/>
                    <p className='valid-msg'>{errors?.pw?.message}</p>

                    <button className='submit-btn' type="submit" disabled={!formState.isValid}>로그인</button>
                    
                </form>

            </div>

        </div>
    );
}

