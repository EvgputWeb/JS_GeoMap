import { showPopupWithReviews } from './popup';
import unixToDateStr from './date';

export default function addMarkerToMap(map, clusterer, reviewData) {

    const marker = new ymaps.Placemark(reviewData.point, {
        openBalloonOnClick: false,
        balloonContentPlace: reviewData.place,
        balloonContentComment: reviewData.comment,
        balloonContentName: reviewData.name,
        balloonContentDate: unixToDateStr(reviewData.timestamp),
        balloonContentPoint: reviewData.point.toString(),
        balloonContentAddress: reviewData.address
    });

    map.geoObjects.add(marker);

    clusterer.add(marker);

    marker.events.add('click', (e) => {
        e.preventDefault();
        showPopupWithReviews(reviewData.point);
    });
}
