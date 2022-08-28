import Swiper, { Navigation, Pagination, Autoplay} from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay]);
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default class Slider {
    constructor(block) {
        this.block = block;

        this.init();
    }

    init() {
        new Swiper(this.block, {
            slidesPerView: 1,
            loop: true,
            speed: 800,
            spaceBetween: 16,
            autoplay: {
              delay: 5000,
              disableOnInteraction: false,
            },
            pagination: {
              el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                991: {
                    enabled: false,
                },
            }
        })
    }
}