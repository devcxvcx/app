import '../_style/Infoot.css';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { accessToken, apiErrorCheck } from '@constants/globalConfig';

import Flag from './Flag.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faFutbol } from '@fortawesome/free-regular-svg-icons';

// Player
export default function Player(props){
    const [players, setPlayers] = useState();
    const [loading, setLoading] = useState(true);

    const teamKey = props.data;

    const playerApi = useCallback(async() => {
        setLoading(true);
        axios({
            method: 'GET',
            url: `/football/v4/teams/${teamKey}`,
            headers: {
                'X-Auth-Token' : accessToken,
            }
        }).then((response) => {

            // console.log("players",response.data.squad);
            if(response.status === 200)
            {
                setPlayers(response.data.squad);
                setLoading(false);
            }

        }).catch((Error) => {
            apiErrorCheck(Error);
        });

    }, [teamKey]);

    // API가 등번호를 제공하지 않아 임의제작
    const shirtRandom = () => {
        // return Math.floor(Math.random() * 50);
        return '?';
    }

    const iconPosition = (position) => {

        let icon = (position === 'Offence') ? 'F'
        : (position === 'Midfield') ? 'M'
        : (position === 'Defence' || position === 'Defender') ? 'D'
        : (position === 'Goalkeeper') ? 'G'
        : '-';
        return <span className={`position-icon ${icon}`}>{icon}</span>;
    }

    const playerList = players && players.map((p) => (
        <dd key={p.id} onClick={() => props.playerKeyCallback(p.id)}> 
            <div className='shirt-wrap'>
                <div className='shirt'><FontAwesomeIcon icon={faShirt} /></div>
                <span>{shirtRandom()}</span>
            </div>
            {Flag(p.nationality)}
            {iconPosition(p.position)}
            <p>{p.name}</p>
            <span className='player-detail'><FontAwesomeIcon icon={faUserPlus} /></span>
        </dd>
    ));

    useEffect(() => {
        playerApi();
    },[playerApi]);

    if (loading === true) return (
        <div className='loading'>
            <FontAwesomeIcon icon={faFutbol} spin />
        </div>
    );
    return (
        <div className='player-wrap box-style'>
            <dl className='player-list list'>
                <dt className='title'>
                    <span>Player</span>
                </dt>
                {playerList}
            </dl>
        </div>
    );
}

