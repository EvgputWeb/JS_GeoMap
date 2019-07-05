import makeBalloonTemplate from '../templates/makeBalloonTemplate.hbs';
import { hidePopup, showPopupWithReviews } from './popup';

export default function createClusterer(map) {

    const customClusterBalloonContent = ymaps.templateLayoutFactory.createClass(
        makeBalloonTemplate('$[(properties)]')
    );

    const clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        openBalloonOnClick: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: customClusterBalloonContent,
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 160,
        clusterBalloonPagerSize: 10
    });

    map.geoObjects.add(clusterer);

    clusterer.events.add('balloonopen', hidePopup);

    const onBalloonLinkClick = (e) => {
        if ((e.target.id) && (e.target.id === 'balloon-link')) {
            e.preventDefault();
            map.balloon.close();
            let pointData = e.target.dataset.point.split(',');
            let point = pointData.map(Number);

            showPopupWithReviews(point);
        }
    };

    document.addEventListener('click', onBalloonLinkClick);

    return clusterer;
}
