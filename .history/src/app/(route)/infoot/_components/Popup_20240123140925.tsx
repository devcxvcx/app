import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { accessToken, apiErrorCheck } from '../constants/globalConfig.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-regular-svg-icons';
import GoogleCustomSearchApi from '../services/GoogleCustomSearchApi.jsx';
import Flag from './Flag.jsx';

export default function Popup(props) {
    const [playerDetail, setPlayerDetail] = useState()
    const [loading, setLoading] = useState(true);
    const key = props.data;

    const playerDetailApi = async() => {
        axios({
            method: 'GET',
            url: `/football/v4/persons/${key}`,
            headers: {
                'X-Auth-Token' : accessToken,
            }
        }).then((response) => {

            // console.log("playersDetail",response.data);
            const playerDetail = response.data;
            setPlayerDetail(playerDetail);
            setLoading(false);

        }).catch((Error) => {
            apiErrorCheck(Error);
        });
    }

    useEffect(() => {
        playerDetailApi();
    });

    return (
      <div className='modal-overlay' onClick={() => props.popupCloseCallback('close')}>
            {loading === true ? (
                <div className='popup_loading'>
                    <FontAwesomeIcon icon={faFutbol} spin />
                </div>
            ) : (
                <div className='modal' onClick={(e) => e.stopPropagation()}>
                    <div className='title'>Player Detail</div>
                    <div className='contents'>
                        <dl>
                            <dt>
                                <GoogleCustomSearchApi data={playerDetail}/>
                            </dt>
                            <dd>
                                <span>Current team</span>
                                <div>
                                    <img src={playerDetail.currentTeam.crest} alt=''/>
                                    <p>{playerDetail.currentTeam.name}</p>
                                </div>
                            </dd>
                            <dd><span>Name</span><p>{playerDetail.name}</p></dd>
                            <dd><span>Birth</span><p>{playerDetail.dateOfBirth}</p></dd>
                            <dd>
                                <span>Nationality</span>
                                <div>
                                    {Flag(playerDetail.nationality)}
                                    <p>{playerDetail.nationality}</p>
                                </div>
                            </dd>
                            <dd><span>Position</span><p>{playerDetail.position}</p></dd>
                            
                        </dl>
                    </div>
                </div>
            )}
      </div>
    );

  }