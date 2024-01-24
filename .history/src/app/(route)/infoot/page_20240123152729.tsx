const axios = require('axios');

const apiKey = 'RGAPI-5ae1858b-8ac4-4a97-9403-68767b3cc0e9';
const summonerName = '꾸까찌꾸';

async function getSummonerData() {
  try {
    const response = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`);
    
    if (response.status === 200) {
      const summonerData = response.data;
      console.log(summonerData);
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

getSummonerData();