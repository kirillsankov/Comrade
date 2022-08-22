import JustValidate from 'just-validate';
import "@enp/inputmask/lib/inputmask";

const SELECTORS = {
    tel: 'input[type="tel"]',
}


export default class ValidateForm {
    constructor(block) {
        this.block = block;
        this.telBlock = block.querySelector(SELECTORS.tel);
        this.init();
    }

    init() {
        this.addTelMask();
        this.JustValidate();
    }
    addTelMask() {
        const inputMasks = new Inputmask('(999) 999-999', {showMaskOnHover: false});
        inputMasks.mask(this.telBlock);
    }

    JustValidate() {
        const validate = new JustValidate(this.block, {
            errorLabelCssClass: 'form__error',
            testingMode: true,
        });
        validate.addField("#name", [
            {
                rule: "required",
                errorMessage: 'This field is required',
            },
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'The field must not be shorter than 2 characters',
            },
            {
                rule: 'maxLength',
                value: 30,
                errorMessage: 'The field must not be longer than 30 characters',

            },
        ]).addField('#phone', [
            {
                rule: "required",
                errorMessage: 'This field is required',
            },
            {
                validator: () => {
                    const phone = this.telBlock.inputmask.unmaskedvalue();
                    return Boolean(phone.length === 9 && Number(phone));
                },
                errorMessage: 'The phone number is invalid!'
            }
        ]).addField("#email", [
            {
                rule: 'required',
                errorMessage: 'This field is required',
            },
            {
                rule: 'email',
                errorMessage: 'Email is invalid!',
            },
        ]).onSuccess(() => {
            this.submitForm();
            alert("The form has been submitted");
            this.block.reset();
        });
    }

    submitForm() {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: new FormData(this.block),
        })
            .then(response => response.json())
            .then(json => console.log(json));
    }
}