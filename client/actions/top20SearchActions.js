import Axios from 'axios';

const ROOT_URL = 'http://localhost:8000/api';

export default function top20Search(category, cycle) {
  console.log('In top20Search function with: ', category, ' ', cycle);
  const request = Axios.get(`${ROOT_URL}/propublica/top20/${cycle.value}/${category.value}`);

  // const request = Axios.get(`${ROOT_URL}/propublica/top20/${cycle}/${category}`);
  return {
    type: 'Top20_Search',
    payload: request
  };
}
