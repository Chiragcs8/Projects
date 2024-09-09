import Axios from 'axios';

const APP_ID = '3bb602ac'; 
const APP_KEY = 'ea43526d89f74b778b2c67fe19509e86';

export const fetchEdamamResponse = async (searchString) => {
  try {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}&to=100`
    );
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching the recipe data: ', error);
    return [];
  }
};
