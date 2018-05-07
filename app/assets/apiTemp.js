const apiEndpoint = 'https://api.dribbble.com/v1/shots';

export const fetchShotsAndComments = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(require('./dataTemp')), 1000);
    });

