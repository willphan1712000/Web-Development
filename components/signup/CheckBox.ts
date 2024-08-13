import SignUpUI from "./SignUpUI";

export default class CheckBox {
    private $checkbox: JQuery<HTMLInputElement>;
    constructor(checkbox: string, signUpUI: SignUpUI) {
        this.$checkbox = $(checkbox);
        this.$checkbox.on("change", e => {
            signUpUI.update();
        })
    }

    public isChecked(): boolean {
        return this.$checkbox.is(':checked');
    }
}