import addMarkerToMap from './marker';
import { addDataToStorage } from './storage';
import { showPopupWithReviews } from './popup';

export default function submitHandler(e) {
    e.preventDefault();

    let reviewData = {
        point: this.point,
        name: document.querySelector('#popup-form input[name="name"]').value.trim(),
        place: document.querySelector('#popup-form input[name="place"]').value.trim(),
        comment: document.querySelector('#popup-form textarea[name="comment"]').value.trim(),
        address: document.querySelector('#popup-header').childNodes[0].textContent.trim(),
        timestamp: Date.now()
    };

    if ((!reviewData.name) || (!reviewData.place) || (!reviewData.comment)) {
        alert('Заполните поля формы');

        return;
    }

    addMarkerToMap(this.map, this.clusterer, reviewData);

    addDataToStorage(reviewData);

    showPopupWithReviews(this.point);
}
