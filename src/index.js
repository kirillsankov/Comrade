import './styles/index.scss';
import Maps from './scripts/maps';
import ValidateForm from "./scripts/validateForm";
import Menu from  "./scripts/menu";
import Slider from "./scripts/slider";



document.addEventListener('DOMContentLoaded', () => {
    [...document.querySelectorAll('.map')].forEach((elem) => new Maps(elem));
    [...document.querySelectorAll('.form')].forEach((elem) => new ValidateForm(elem));
    [...document.querySelectorAll('.header')].forEach((elem) => new Menu(elem));
    [...document.querySelectorAll('.swiper')].forEach((elem) => new Slider(elem));
})