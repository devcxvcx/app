export const favorCookieMaxAge = 24*60*60;

export const screenModeCookieMaxAge = 24*60*60;

export type leagesType = {
    id: number
    code: string
    name: string
    img: string
}
export const leages:any = [
    // {
    //     id: 2001,
    //     code: 'CL',
    //     name: '"UEFA Champions League"',
    //     img: 'https://crests.football-data.org/CL.png'
    // },
    {
        id: 2021,
        code: 'PL',
        name: 'EPL',
        img: 'https://crests.football-data.org/PL.png'
    },
    {
        id: 2014,
        code: 'PD',
        name: 'Primera',
        img: 'https://crests.football-data.org/PD.png'
    },
    {
        id: 2019,
        code: 'SA',
        name: 'Serie A',
        img: 'https://crests.football-data.org/SA.png'
    },
    {
        id: 2002,
        code: 'BL1',
        name: 'Bundesliga',
        img: 'https://crests.football-data.org/BL1.png'
    },
    {
        id: 2015,
        code: 'FL1',
        name: 'Ligue 1',
        img: 'https://crests.football-data.org/FL1.png'
    },
    {
        id: 2003,
        code: 'NLD',
        name: 'Eredivisie',
        img: 'https://crests.football-data.org/ED.png'
    },
    {
        id: 2016,
        code: 'ELC',
        name: 'Championship',
        img: 'https://crests.football-data.org/ELC.png'
    }
];

export const accessToken = 'ffd0a68e06fb49b3824673ad5029b926';

export const googleApiKey = 'AIzaSyAGYT29Ld8BztLLgkgVrQtr68vFwPMKmrk';
export const googleApiCx = '663b2c6fbd0f74aff';

export const apiErrorCheck = (e) => {
    // console.log(Error);
    // console.log(Error.response.status);
    const code = e.response.status;
    if(code === 429)
    {
        alert("데이터 요청한도는 1분에 10번 입니다.");
    }
    else if(code === 400)
    {
        alert("잘못된 요청입니다.");
    }
}