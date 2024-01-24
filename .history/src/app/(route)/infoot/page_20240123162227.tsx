"use client";

import React, { useEffect } from 'react';
import axios from 'axios';

export default function Test(){

    const getLol = async() => {

        const apiKey = 'RGAPI-5ae1858b-8ac4-4a97-9403-68767b3cc0e9';
        const summonerName = '꾸까찌꾸';

        axios({
            method: 'GET',
            url: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`,
            headers: {
                'Content-type': 'application/json', 
                'Accept': 'application/json' 
            }
        }).then((response) => {
            console.log("getNote", response);
            
        }).catch((Error)=>{

            console.log(Error);

        });

    }

    useEffect(() => {
        getLol()
    },[]); 

}
