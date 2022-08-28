const SELECTORS = {
    icon: ".header__icon",
    menu: ".header__menu",
}


export default class Menu {
    constructor(block) {
        this.block = block;
        this.icon = this.block.querySelector(SELECTORS.icon);
        this.menuBurger = this.block.querySelector(SELECTORS.menu);

        this.init();
    }

    init() {

        this.icon.addEventListener('click', () => {
            this.addPaddingBody();
            this.toggleClassToElements();
        });
    }

    toggleClassToElements() {
        this.icon.classList.toggle('active');
        this.menuBurger.classList.toggle('active');
        document.body.classList.toggle("lock");
    }

    addPaddingBody() {
        document.body.style.paddingRight = this.getWidthScrollBar() + "px";
    }

    getWidthScrollBar() {
        return window.innerWidth - document.body.clientWidth;
    }
}