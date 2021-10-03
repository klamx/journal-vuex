import axios from 'axios';

const journalApi = axios.create({
  baseURL: 'https://vue-demos-edff1-default-rtdb.firebaseio.com',
});

export default journalApi;
