const SELECTORS = {
    icon: ".header__icon",
    menu: ".header__menu",
}


export default class Menu {
    constructor(block) {
        this.block = block;
        this.icon = this.block.querySelector(SELECTORS.icon);
        this.menuBurger = this.block.querySelector(SELECTORS.menu);

        this.addClassToElements = this.addClassToElements.bind(this);

        this.init();
    }

    init() {

        this.setListener(this.icon, this.addClassToElements);
    }

    setListener(el, method) {
        el.addEventListener('click', method);
    }

    addClassToElements() {
        this.icon.classList.toggle('active');
        this.menuBurger.classList.toggle('active');
        document.body.classList.toggle("lock");
    }

}