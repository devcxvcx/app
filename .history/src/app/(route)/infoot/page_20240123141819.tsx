import '../styles/reset.css';
import '../styles/Infoot.css';
import React, { useState, useEffect } from 'react';

import { leages, screenModeCookieMaxAge } from '@constants/globalConfig';
import { useCookies } from 'react-cookie';
import { Tooltip } from 'react-tooltip';

import Team from './_components/Team';
import Player from './_components/Player';
import Matches from './_components/Matches';
import Popup from './_components/Popup';
import Info from './_components/Info';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faStar, faInfo } from '@fortawesome/free-solid-svg-icons';


export default function Infoot(){
    const [leageKey, setLeageKey] = useState();
    const [teamKey, setTeamKey] = useState();
    const [active, setActive] = useState(null);
    const [darkMode, setDarkMode] = useState();
    const [favorLeage, setFavorLeage] = useState();
    const [cookies, setCookie] = useCookies();
    // const [popupState, setPopupState] = useState();
    const [playerKey, setPlayerKey] = useState<number>();
    const [infoPopup, setInfoPopup] = useState(false);

    const teamKeyCallback = (key:any) => {
        setTeamKey(key);
    }
    
    const teamFavorCallback = (obj: { leage: (prevState: undefined) => undefined; }) => {
        setFavorLeage(obj.leage);
    };
    
    const playerKeyCallback = (key: (prevState: undefined) => undefined) => {
        // alert('선수 레이어팝업 준비중 - ID: '+key);
        setPlayerKey(key);
    };

    const popupCloseCallback = (close: string) => {
        // close === 'close' ? setPlayerKey() : '';
        if(close === 'close')
        {
            setPlayerKey(0);
        }
    };

    const InfoPopupCloseCallback = (close: boolean) => {
        // close === 'close' ? setPlayerKey() : '';
        setInfoPopup(close);
    };
    

    const leageClickHandler = (key: number) => {
        setLeageKey(key);
        setTeamKey(null);
        setActive(key);
    }

    const darkModeHandler = (mode: string) => {
        setDarkMode(mode);
        setCookie('screenMode', mode, {
            path: '/',
            secure: '/',
            maxAge: screenModeCookieMaxAge
        });
    }

    const leageList = leages && leages.map((l) => (
        <li key={l.id}> 
            {favorLeage === l.id ? (<span className='favor-leage'><FontAwesomeIcon icon={faStar} /></span>):''}
            <button className={`box-style ${active === l.id ? "active" : ""}`} onClick={() => leageClickHandler(l.id)}>
                {<img src={l.img} alt=''/>}
            </button>
        </li>
    ));

    useEffect(() => {

        if(cookies.favorites)
        {
            const leageKey = cookies.favorites.leage;
            setFavorLeage(leageKey);
            setLeageKey(leageKey);
            setActive(leageKey);
        }   
        if(cookies.screenMode)  setDarkMode(cookies.screenMode);
        
    },[cookies]);

    return (
        <div id='wrap' className={darkMode}>
            <ul id='leage-list'>{leageList}</ul>
            <div className='info-wrap'>
                {leageKey && <Team data={leageKey} teamKeyCallback={teamKeyCallback} teamFavorCallback={teamFavorCallback}/>}
                {teamKey && <Player data={teamKey} playerKeyCallback={playerKeyCallback}/>}
                {teamKey && <Matches data={teamKey} />}
                {playerKey && <Popup data={playerKey} popupCloseCallback={popupCloseCallback}/>}
                {infoPopup && <Info InfoPopupCloseCallback={InfoPopupCloseCallback}/>}
            </div>
            <ul id='config-wrap'>

                {cookies.favorites ? (
                    <li 
                        onClick={() => window.location.reload()}
                        className='config-favor config-button'
                        data-tooltip-id="config-tooltip2" 
                        data-tooltip-content={cookies.favorites.team.name}
                    >
                        <img src={cookies.favorites.team.crest} height='36' alt=''/>
                    </li>
                ) : null}
                
                <li
                    data-tooltip-id="config-tooltip1" 
                    data-tooltip-content="다크/라이트 모드"
                >
                {darkMode === 'dark' ? (
                    <div className='light-mode config-button' onClick={() => darkModeHandler('light')}>
                        <FontAwesomeIcon icon={faSun} />
                    </div>
                ) : (
                    <div className='dark-mode config-button' onClick={() => darkModeHandler('dark')}>
                        <FontAwesomeIcon icon={faMoon} />
                    </div>
                )}
                </li>

                <li
                    className='config-button config-info'
                    data-tooltip-id="config-tooltip1" 
                    data-tooltip-content="정보"
                    onClick={() => setInfoPopup(true)}
                >
                    <div>
                        <FontAwesomeIcon icon={faInfo} />
                    </div>
                </li>

            </ul>
            <Tooltip id="config-tooltip1" place='left'/>
            <Tooltip id="config-tooltip2" place='left'
                render={({ content }) => (
                    <div className='config-tooltip2-custom'>
                        <span><FontAwesomeIcon icon={faStar} /></span> 즐겨찾는 팀
                        <p>{content}</p>
                    </div>
                )}
            />
        </div>
    );
}

