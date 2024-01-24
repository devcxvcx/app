import { useState, useEffect } from 'react';
import { googleApiKey, googleApiCx } from '../constants/globalConfig.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-regular-svg-icons';

import axios from 'axios';

export default function GoogleCustomSearchApi(props) {
    const [imgSrc, setImgSrc] = useState();
    const [loading, setLoading] = useState(true);

    // console.log('props',props);
    const searchKeyword = `football ${props.data.name}`;
    // console.log('searchKeyword',searchKeyword);

    const getImageApi = () => {
        axios({
            method: 'GET',
            url: `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${googleApiCx}&sort=date&searchType=image&num=1&q=${searchKeyword}`,
            
        }).then((response) => {
            // console.log("getImageApi",response.data.items[0].link);

            const imgSrc = response.data.items[0].link;
            setImgSrc(imgSrc);
            setLoading(false);

        }).catch((Error) => {
            console.log(Error);
        });
    }


    useEffect(() => {
        getImageApi();
    });

    if (loading === true) return (
        <div className='loading'>
            <FontAwesomeIcon icon={faFutbol} spin />
        </div>
    );

    return (<img src={imgSrc} alt=''/>);

  }