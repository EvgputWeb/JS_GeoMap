import { loadDataFromStorage } from './storage';
import unixToDateStr from './date';

const popup = document.querySelector('#review');
const popupForm = document.querySelector('#popup-form');
const title = popup.querySelector('#popup-header');
const popupContent = document.querySelector('#popup-content');

function clearPopup() {
    title.childNodes[0].textContent = '-';
    popupContent.innerText = '';
    document.querySelector('#popup-form input[name="name"]').value = '';
    document.querySelector('#popup-form input[name="place"]').value = '';
    document.querySelector('#popup-form textarea').value = '';
}

function showEmptyPopup(point, address = '') {
    clearPopup();
    title.childNodes[0].textContent = address;
    popupContent.innerText = 'Отзывов пока нет ...';
    popup.classList.remove('hidden');
    popupForm.point = point;
}

function showPopupWithReviews(point) {
    clearPopup();

    let markers = loadDataFromStorage();
    let addressFilled = false;
    let innerHTML = '<ul>';

    markers.forEach(marker => {
        if (equalCoords(marker.point, point)) {
            innerHTML += `<li><p><span>${marker.name}</span>${unixToDateStr(marker.timestamp)}</p>`;
            innerHTML += `<p>${marker.place}</p>`;
            innerHTML += `<p><i>${marker.comment}</i></p></li>`;
            if (!addressFilled) {
                title.childNodes[0].textContent = marker.address;
                addressFilled = true;
            }
        }
    });
    innerHTML += '</ul>';

    popupContent.innerHTML = innerHTML;
    popup.classList.remove('hidden');
    popupForm.point = point;
}

function hidePopup() {
    popup.classList.add('hidden');
}

function equalCoords(point1, point2) {
    return ((Math.abs(point1[0] - point2[0]) < 0.000000001) && (Math.abs(point1[1] - point2[1]) < 0.000000001));
}

export {
    showEmptyPopup,
    showPopupWithReviews,
    hidePopup
};
