import { cryptoData, cryptoAssets } from './data';

export function fakeFetchCrypto() {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': 'U0SXNbsJbkXlCno48dp9o+kOeYolncgiB2ItS/BcTk4='
        }
    };

    return fetch('https://openapiv1.coinstats.app/coins', options)
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(err => console.error(err));
}

export function fetchAssets() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 10)
    })
}
