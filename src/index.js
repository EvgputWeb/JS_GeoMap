import './style/style.css';

import { INIT_MAP } from './scripts/settings';
import getGeoObject from './scripts/geocoder';
import createClusterer from './scripts/clusterer';
import { loadDataFromStorage } from './scripts/storage';
import addMarkerToMap from './scripts/marker';
import { showEmptyPopup, hidePopup } from './scripts/popup';
import submitHandler from './scripts/submit';

/* ------------------------------- */

const init = () => {
    const yaMap = new ymaps.Map('ymaps', INIT_MAP);
    const yaClusterer = createClusterer(yaMap);

    const popupForm = document.querySelector('#popup-form');

    popupForm.map = yaMap;
    popupForm.clusterer = yaClusterer;
    popupForm.addEventListener('submit', submitHandler);

    yaMap.events.add('click', e => {
        const coords = e.get('coords');

        getGeoObject(coords)
            .then( geoObj => {
                popupForm.point = coords;
                showEmptyPopup(coords, geoObj.description+', '+geoObj.name);
            })
            .catch( () => {
                console.error('getGeoObject error');
            });
    });

    let markers = loadDataFromStorage();

    markers.forEach(marker => {
        addMarkerToMap(yaMap, yaClusterer, marker);
    });

    document.querySelector('#close-popup').addEventListener('click', hidePopup);
};

/* ------------------------------- */

ymaps.ready(init);
