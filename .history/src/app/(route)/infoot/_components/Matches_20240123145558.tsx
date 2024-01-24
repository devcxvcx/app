import '../_style/Infoot.css';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { accessToken, apiErrorCheck } from '@constants/globalConfig';

import Dday from './Dday';

import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCircleCheck, faHourglassStart, faHourglassEnd, faListUl } from '@fortawesome/free-solid-svg-icons';
import { faFutbol } from '@fortawesome/free-regular-svg-icons';
import { Tooltip } from 'react-tooltip';

// matches
export default function Matches(props: any){
    const [matches, setMatches] = useState();
    const [finishedMatch, setFinishedMatch] = useState();
    const [timedMatch, setTimedMatch] = useState();
    const [allMatch, setAllMatch] = useState();
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState('B');
    const teamKey = props.data;

    console.log(teamKey);

    const matcheApi = useCallback(async() => {
        setLoading(true);
        axios({
            method: 'GET',
            url: `/football/v4/teams/${teamKey}/matches?season=2023`,
            headers: {
                'X-Auth-Token' : accessToken,
            }
        }).then((response) => {

            console.log("matches",response.data.matches);
            if(response.status === 200)
            {
                // all matchs
                const matchData = response.data.matches;
                setAllMatch(matchData);

                // playing match
                //"IN_PLAY"

                // finished matches
                const finished = matchData.filter((matchData: { status: string; }) => matchData.status === 'FINISHED');
                setFinishedMatch(finished);

                // timed matches
                const timed = matchData.filter((matchData: { status: string; }) => matchData.status === 'TIMED' || matchData.status === "SCHEDULED");
                timed.sort((a: { utcDate: string | number | Date; }, b: { utcDate: string | number | Date; }) => new Date(b.utcDate) - new Date(a.utcDate)); // utc 날짜 반대정렬
                setTimedMatch(timed);
    
                setMatches(timed);
                setActive('B');
                setLoading(false);
            }

        }).catch((Error) => {
            apiErrorCheck(Error);
        });

    }, [teamKey]);

    // utc to kr time
    const timeConvert = (utctime : any) => {
        return moment(utctime).format('YYYY.MM.DD HH:mm');
    }

    // styling config for match status
    const matchStatus = (status : any, utctime : any, index : any) => {

        let time = timeConvert(utctime);
        let icon1;
        let icon2;
        let style;

        if(status === "FINISHED")
        {
            icon1 = faClock;
            icon2 = faCircleCheck;
            style = 'match-finished';
        }
        else if(status === "TIMED")
        {
            icon1 = faClock;
            icon2 = faHourglassEnd;
            style = 'match-timed';
        }
        else if(status === "SCHEDULED")
        {
            icon1 = faClock;
            time = '미정';
            icon2 = faHourglassStart;
        }

        return (
            <>
                <div className={`time-wrap ${style}`}>
                    <FontAwesomeIcon icon={icon1} />
                    <p className='match-time'>{time}</p>
                    <span><FontAwesomeIcon icon={icon2} /></span>
                </div>
                {active === 'B' && index === 0 ? (<Dday time = {time}/>) : ''}
            </>
        );
    }

    // win / draw / lose export
    const winnerDivision = (div : string, winner : string, score : string) => {
        
        let scoreStatus = 
        (winner === 'HOME_TEAM') ? (div === 'home') ? 'WIN' : (div === 'away') ? 'LOSE' : 'DRAW'
        : (winner === 'AWAY_TEAM') ? (div === 'away') ? 'WIN' : (div === 'home') ? 'LOSE' : 'DRAW'
        : (winner === 'DRAW') ? 'DRAW'
        : '';

        return (
            <div className='score-wrap'>
                <span className={scoreStatus}>{scoreStatus}</span>
                <span className='score focus'>{score}</span>
            </div>
        );

    }

    // win & lose focus
    const matchResultFocusing = (homeKey : string, awayKey : string, winner : string) => {

        let matchResult = 
        (winner === 'HOME_TEAM') ? (homeKey === teamKey) ? 'WIN' : 'LOSE'
        : (winner === 'AWAY_TEAM') ? (awayKey === teamKey) ? 'WIN' : 'LOSE'
        : (winner === 'DRAW') ? 'DRAW'
        : '';
        
        return (<div className={`match-result-focus ${matchResult}`}></div>);
    }

    // match filter button handling
    const matchTypeHandler = (key : string) => {
        setActive(key);

        if(key === 'A') setMatches(finishedMatch); // 결과
        else if(key === 'B') setMatches(timedMatch); // 일정
        else if(key === 'C') setMatches(allMatch); // 모두
    }

    const matcheList = matches && matches.slice(0).reverse().map((m: { id: React.Key; homeTeam: { id: string; crest: any; shortName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode; }; awayTeam: { id: string; crest: any; shortName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode; }; score: { winner: string; fullTime: { home: string; away: string; }; }; competition: { emblem: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode; }; status: any; utcDate: any; }, index: any) => (
        
        <dd key={m.id}> 
            {matchResultFocusing(m.homeTeam.id, m.awayTeam.id, m.score.winner)}
            <div className='leage-title'>
                {<div><Image src={m.competition.emblem} width='16' height='16' alt=''/></div>}
                {m.competition.name}
            </div>
            <div className='vs-wrap home'>
                <div>
                    <span className='ico-home'>H</span>
                    {<Image src={m.homeTeam.crest} width='16' alt=''/>}
                    <p className='focus'>{m.homeTeam.shortName}</p>
                </div>
                {winnerDivision('home', m.score.winner, m.score.fullTime.home)}
            </div>
            <div className='vs-wrap away'>
                <div>
                    <span className='ico-away'>A</span>
                    {<Image src={m.awayTeam.crest} width='16' height='16' alt=''/>}
                    <p className='focus'>{m.awayTeam.shortName}</p>
                </div>
                {winnerDivision('away', m.score.winner, m.score.fullTime.away)}
            </div>
            {matchStatus(m.status, m.utcDate, index)}
        </dd>   

    ));

    useEffect(() => {
        matcheApi();
        // props.teamKeyCallback(teamKey);
    },[matcheApi]);

    if (loading === true) return (
        <div className='loading'>
            <FontAwesomeIcon icon={faFutbol} spin />
        </div>
    );

    return (
        <div className='match-wrap box-style'>
            <dt className='title'>
                <span>Matches</span>
                <Tooltip id="match-filter-tooltip" className='tool-tip-style'/>
                <ul className='type match-type'>
                    <li>
                        <button 
                            data-tooltip-id="match-filter-tooltip" 
                            data-tooltip-html="경기 일정"
                            className={active === 'B' ? "active" : ""} onClick={()=>matchTypeHandler('B')}
                        >
                            <FontAwesomeIcon icon={faClock} />
                        </button>
                    </li>
                    <li>
                        <button
                            data-tooltip-id="match-filter-tooltip" 
                            data-tooltip-content="경기 결과"
                            className={active === 'A' ? "active" : ""} onClick={()=>matchTypeHandler('A')}
                        >
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </button>
                    </li>
                    <li>
                        <button 
                            data-tooltip-id="match-filter-tooltip" 
                            data-tooltip-html="모든 경기"
                            className={active === 'C' ? "active" : ""} onClick={()=>matchTypeHandler('C')}
                        >
                            <FontAwesomeIcon icon={faListUl} />
                        </button>
                    </li>
                </ul>
            </dt>
            <dl className='matche-list'>
                {matcheList}
            </dl>
        </div>
    );
}

