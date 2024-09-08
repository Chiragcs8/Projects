import Axios from 'axios';

const APP_ID = 'APP_ID';
const APP_KEY = 'APP_KEY';

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
