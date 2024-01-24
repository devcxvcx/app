"use client";

import React, { useEffect } from 'react';
import axios from 'axios';

export default function Test(){

    const getLol = async() => {

        axios({
            method: 'POST',
            url: 'http://localhost:4000/note/getNote',
            headers: {
                'Content-type': 'application/json', 
                'Accept': 'application/json' 
            },
            data: {
                key: userId, // user id
            },
        }).then((response) => {
            const objNote = response.data[0];
            // console.log("getNote", objNote);
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

    useEffect(() => {
        getLol()
    },[]); 

}
