function addDataToStorage(newData) {

    let markers = [];
    let curData = localStorage.getItem('markers');

    if (curData) {
        markers = JSON.parse(curData);
    }
    markers.push(newData);

    localStorage.setItem('markers', JSON.stringify(markers));
}

function loadDataFromStorage() {
    let markers = [];
    let curData = localStorage.getItem('markers');

    if (curData) {
        markers = JSON.parse(curData);
    }

    return markers;
}

export {
    addDataToStorage,
    loadDataFromStorage
};
