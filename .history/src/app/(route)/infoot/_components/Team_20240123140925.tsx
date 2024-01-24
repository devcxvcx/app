import '../styles/reset.css';
import '../styles/Infoot.css';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { accessToken, apiErrorCheck, favorCookieMaxAge } from '../constants/globalConfig.js';
import { useCookies } from 'react-cookie';
import Flag from './Flag.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faStar } from '@fortawesome/free-solid-svg-icons';
import { faFutbol } from '@fortawesome/free-regular-svg-icons';
import { Tooltip } from 'react-tooltip';

// Team
export default function Team(props){
    const [teams, setTeams] = useState();
    const [scorer, setScorer] = useState();
    const [loadingTeam, setLoadingTeam] = useState(true);
    const [loadingScorer, setLoadingScorer] = useState(true);
    const [teamActive, setTeamActive] = useState();
    const [rankTabActive, setRankTabActive] = useState('A');
    const [favorTeam, setFavorTeam] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies();

    const leageKey = props.data;

    // 득점순위 상위 10 API 호출
    const goalRankingApi = useCallback(async() => {
        setLoadingScorer(true);
        await axios({
            method: 'GET',
            url: `/football/v4/competitions/${leageKey}/scorers`,
            headers: {
                'X-Auth-Token' : accessToken,
            }
        }).then((response) => {
            // console.log("rank",response.data.scorers);
            if(response.status === 200)
            {
                setScorer(response.data.scorers);
                setLoadingScorer(false);
            }

        }).catch((Error) => {
            apiErrorCheck(Error);
        });
    }, [leageKey]);

    // 특정 리그 모든팀 호출
    const teamApi = useCallback(async() => {
        setLoadingTeam(true);
        axios({
            method: 'GET',
            url: `/football/v4/competitions/${leageKey}/standings?season=2023`,
            headers: {
                'X-Auth-Token' : accessToken,
            }
        }).then((response) => {

            // console.log("teams",response.data.standings[0].table);
            if(response.status === 200)
            {
                setTeams(response.data.standings[0].table);
                setRankTabActive('A');
                setLoadingTeam(false);
            }

        }).catch((Error) => {
            apiErrorCheck(Error);
        });

    }, [leageKey]);
    
    // UI converting last 5 game 
    const formMatch = (record) => {
        const formElement = [];
        const arrRecord = record.split(",");
        
        for (let i = 0; i < arrRecord.length; i++){
            formElement.push(<li key={i} className={arrRecord[i]}>{arrRecord[i]}</li>)
        }
        return formElement;
    }

    // rank filter button handling
    const rankTypeHandler = (key) => {
        setRankTabActive(key);
    }

    // team click handling
    const teamClickHandler = (key) => {
        props.teamKeyCallback(key);
        setTeamActive(key);
    }

    // favorTeam handling
    const favorTeamHandler = (teamInfo) => {

        if(cookies.favorites)
        {
            const cookLeage = cookies.favorites.leage;
            const cookTeam = cookies.favorites.team;
            if(cookLeage === leageKey && cookTeam.id === teamInfo.id)
            {
                removeCookie('favorites');
                setFavorTeam('');
                props.teamFavorCallback('');
                return false;
            }
        }

        let objectFavor = {};
        objectFavor.leage = leageKey;
        objectFavor.team = teamInfo;

        setCookie('favorites', objectFavor, {
            path: '/',
            secure: '/',
            maxAge: favorCookieMaxAge
        });

        setFavorTeam(teamInfo.id);
        props.teamFavorCallback(objectFavor);

    }
    
    // rank tab
    const rankTypeTab = () => {
        return(
            <>
                <Tooltip id="rank-filter-tooltip" className='tool-tip-style'/>
                <ul className='type rank-type'>
                    <li>
                        <button
                            data-tooltip-id="rank-filter-tooltip" 
                            data-tooltip-content="팀 순위"
                            className={rankTabActive === 'A' ? "active" : ""} onClick={()=>rankTypeHandler('A')}
                        >
                            <FontAwesomeIcon icon={faTrophy} /> 팀 순위
                        </button>
                    </li>
                    <li>
                        <button
                            data-tooltip-id="rank-filter-tooltip" 
                            data-tooltip-html="득점 순위"
                            className={rankTabActive === 'B' ? "active" : ""} onClick={()=>rankTypeHandler('B')}
                        >
                            <FontAwesomeIcon icon={faFutbol} /> 득점 순위
                        </button>
                    </li>
                </ul>
            </>
        );
    }

    // team rank listing
    const teamList = teams && teams.map((t) => (
        <dd key={t.team.id} onClick={() => teamClickHandler(t.team.id)} className={teamActive === t.team.id ? "active" : ""}> 
            <div 
                onClick={() => favorTeamHandler(t.team)}
                className={favorTeam === t.team.id ? 'active' : ''}
            >
                <FontAwesomeIcon icon={faStar} />
            </div>
            <div>{t.position}</div>
            <div>
                <img src={t.team.crest} height='20' alt=''/>
                {t.team.shortName}
            </div>
            <div>{t.playedGames}</div>
            <div>{t.won}</div>
            <div>{t.draw}</div>
            <div>{t.lost}</div>
            <div>{t.goalsFor}</div>
            <div>{t.goalsAgainst}</div>
            <div>{t.goalDifference}</div>
            <div>{t.points}</div>
            <div>
                <ul className='form-match'>{formMatch(t.form)}</ul>
            </div>
        </dd>
    ));

    // scorer rank listing
    const scorerList = scorer && scorer.map((s, num) => (
        <dd key={s.player.id}> 
            <div>{num + 1}</div>
            <div className='img-wrap focus'>
                {<img src={s.team.crest} height='20' alt=''/>}
                {s.team.shortName}
            </div>
            <div>{Flag(s.player.nationality)}{s.player.name}</div>
            <div>{s.playedMatches}</div>
            <div>{s.goals}</div>
            <div>{s.penalties === null ? s.penalties = 0 : s.penalties}</div>
            <div>{s.assists === null ? s.assists = 0 : s.assists}</div>
        </dd>
    ));

    useEffect(() => {
        
        teamApi();
        goalRankingApi();

        if(cookies.favorites)
        {
            const teamKey = cookies.favorites.team.id;
            setFavorTeam(teamKey);
            setTeamActive(teamKey);

            if(cookies.favorites.leage === leageKey)
            {
                props.teamKeyCallback(teamKey);
            }
        }

    },[teamApi, goalRankingApi, cookies, leageKey]);

    if (loadingTeam === true && loadingScorer === true) return (
        <div className='loading'>
            <FontAwesomeIcon icon={faFutbol} spin />
        </div>
    );
    
    return (
        <div className='team-wrap box-style'>
            {rankTabActive === 'A' ? (
                <dl className='team-list list'>
                    <dt className='title'>
                        <span>Team</span>
                        {rankTypeTab()}
                    </dt>
                    <dd className='th'>
                        <div></div>
                        <div>순위</div>
                        <div></div>
                        <div>경기</div>
                        <div>승</div>
                        <div>무</div>
                        <div>패</div>
                        <div>득점</div>
                        <div>실점</div>
                        <div>득실</div>
                        <div>승점</div>
                        <div>최근</div>
                    </dd>
                    {teamList}
                </dl>
            ) : (
                <dl className='scorer-list'>
                    <dt className='title'>
                        <span>Score</span>
                        {rankTypeTab()}
                    </dt>
                    <dd className='th'>
                        <div>순위</div>
                        <div>팀</div>
                        <div>선수</div>
                        <div>경기</div>
                        <div>골</div>
                        <div>PK</div>
                        <div>어시</div>
                    </dd>
                    {scorerList}
                </dl>
            )}

        </div>
    );
}

