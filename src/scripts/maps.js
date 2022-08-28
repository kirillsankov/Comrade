const loadGoogleMapsApi = require('load-google-maps-api')
const settings = require('../json/settingsMaps.json');
import img from '../images/marker.svg';

const SELECTORS = {
    button: '.location__button',
    header: '.header',
    map: '.map',
}

export default class Maps {
    constructor(block) {
        this.addressButton = document.querySelectorAll(SELECTORS.button);
        this.settings = settings;
        this.pos = {
            lat: +this.settings.pos.lat,
            lng: +this.settings.pos.lng,
        };
        this.mapStyle = this.settings.style;
        this.zoom = +this.settings.zoom;
        this.key = this.settings.key;
        this.init(block);
    }

    init(block) {
        this.createMap(block);
    }

    createMap(block) {
        loadGoogleMapsApi({ key: this.key}).then( (googleMaps) => {
            let myMap = new googleMaps.Map(block, {
                center: this.pos,
                zoom: this.zoom,
                styles: this.mapStyle,
            })
            this.createMarker(myMap, googleMaps);
            this.addListenerForButton(myMap);
        }).catch(function (error) {
            console.error(error)
        });
    }

    createMarker(myMap, googleMaps) {
        for(let address of this.addressButton) {
            new googleMaps.Marker(
                {
                    position: {
                        lat: +address.dataset.lat,
                        lng: +address.dataset.lng,
                    },
                    map: myMap,
                    icon: img,
                }
            );
        }

    }

    addListenerForButton(myMap) {
        const headerHeight = document.querySelector(SELECTORS.header).offsetHeight;
        const map =  document.querySelector(SELECTORS.map)

        for(let address of this.addressButton) {
            address.addEventListener('click', (e) => {
                e.preventDefault();
                myMap.setCenter({
                    lat: +address.dataset.lat,
                    lng: +address.dataset.lng,
                });
                myMap.setZoom(17);
                this.moveScroll(address, headerHeight, map);
            });
        }
    }

    moveScroll(address, headerHeight, map) {

        const offsetPosition = map.getBoundingClientRect().top - headerHeight;
        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

}



