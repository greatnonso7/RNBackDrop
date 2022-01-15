import ApiHandler from '../ApiHandler';

export default {
  getCats: (data: number) =>
    ApiHandler.get('/images/search?page=' + data + ' &limit=25'),
};
