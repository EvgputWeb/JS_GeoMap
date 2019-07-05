import { API_KEY } from './settings';

export default function getGeoObject(coords) {
    let url = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${coords[1]},${coords[0]}`;

    return new Promise( (resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(res => resolve( res.response.GeoObjectCollection.featureMember[0].GeoObject ) )
            .catch(() => reject());
    });
}
