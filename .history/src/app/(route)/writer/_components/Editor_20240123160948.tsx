import '../_style/writer.css';

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import Moment from 'moment';
import { useRecoilState } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCircleCheck, faCircleExclamation, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { deviceInfoState, registerForm, sessionState } from '@store/Atoms';

interface NoteResponse {
  n_wrt_date: number;
  n_text: string;
}

interface SetNoteResponse {
  status: number;
  data: {
    edtDate: number;
  };
}

export default function Editor() {
  const [deviceInfo, setDeviceInfo] = useRecoilState(deviceInfoState);
  const [regForm, setRegForm] = useRecoilState(registerForm);
  const [session, setSession] = useRecoilState(sessionState);
  const [saveState, setSaveState] = useState<'normal' | 'ing' | 'complete' | 'error'>('normal');
  const [userId, setUserId] = useState<string | undefined>();
  const [edtDate, setEdtDate] = useState<string>('');
  const [note, setNote] = useState<string | undefined>();
  const [textLength, setTextLength] = useState<number>(0);
  const [wordBreak, setWordBreak] = useState<'A' | 'B'>('A');
  const timer = useRef<number | null>(null);

  const logout = () => {
    localStorage.clear();
    setRegForm(false);
    setSession('');
  };

  const handleApiRequest = async <T>(url: string, method: string, data?: Record<string, any>): Promise<T> => {
    try {
      const response = await axios({
        method,
        url,
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
        },
        data,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getNote = async () => {
    const data = { key: userId };

    try {
      const response = await handleApiRequest<NoteResponse[]>('http://localhost:4000/note/getNote', 'POST', data);
      const objNote = response[0];

      if (objNote) {
        const lastEditTime = Moment.unix(objNote.n_wrt_date).format("YYYY.MM.DD HH:mm:ss");
        setEdtDate(lastEditTime);
        setNote(objNote.n_text);
        setTextLength(objNote.n_text.length);
      }
    } catch (error) {
      setSaveState('error');
    }
  };

  const wrtNote = (memo: string) => {
    const data = { key: userId, text: memo };

    handleApiRequest<SetNoteResponse>('http://localhost:4000/note/setNote', 'POST', data)
      .then((response) => {
        if (response.status === 200) {
          const lastEditTime = Moment.unix(response.data.edtDate).format("YYYY.MM.DD HH:mm:ss");
          setEdtDate(lastEditTime);
          setSaveState('complete');
        } else {
          setSaveState('error');
        }
      })
      .catch(() => {
        setSaveState('error');
      });
  };

  const timerSetting = (text: string) => {
    timer.current = window.setTimeout(() => {
      wrtNote(text);
    }, 1500);
  };

  const onKeyUpHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const text = e.currentTarget.value;

    setTextLength(text.length);
    setSaveState('ing');

    if (timer.current === null) {
      timerSetting(text);
      return;
    }

    window.clearTimeout(timer.current);
    timerSetting(text);
  };

  const saveData = () => (
    <ul className={`saving-wrap ${saveState}`}>
      <li><FontAwesomeIcon icon={faCircleNotch} spin /> 저장중</li>
      <li><FontAwesomeIcon icon={faCircleCheck} />{edtDate}</li>
      <li><FontAwesomeIcon icon={faCircleExclamation} /> 네트워크 오류</li>
      <li><FontAwesomeIcon icon={faClock} />{edtDate}</li>
    </ul>
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSession(localStorage.getItem('session'));
    }

    if (session != null) {
      const parSession = JSON.parse(session);
      setUserId(parSession.id);

      if (userId) getNote();
    }
  }, [userId, session]);

  return (
    <div className='device'>
      <textarea
        className={`textarea ${wordBreak === 'B' ? 'keep' : ''}`}
        style={{ width: `${deviceInfo.width}px`, height: `${deviceInfo.height}px` }}
        onKeyUp={onKeyUpHandler}
        defaultValue={note}
      ></textarea>
      <ul className='editor-info-wrap' style={{ width: `${deviceInfo.width}px` }}>
        <li>{saveData()}</li>
        <li>글자수: {textLength}</li>
      </ul>
    </div>
  );
}
