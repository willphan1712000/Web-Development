import SignUpUI from "./SignUpUI";

export default class Error {
    private $error: JQuery<HTMLElement>;

    constructor(error: string, signUpUI: SignUpUI) {
        this.$error = $(error);
    }

    public setError(msg: string) {
        this.$error.html(msg);
    }
}