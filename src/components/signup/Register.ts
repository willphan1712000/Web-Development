import SignUpUI from "./SignUpUI";

export default class Register {
    private $register : JQuery<HTMLButtonElement>;
    private isEnabled: boolean;

    constructor(register: string, signUpUI: SignUpUI) {
        this.$register = $(register);
        this.isEnabled = false;
        this.isDisabledHandling();
        this.$register.click((e: JQuery.Event) => {
            e.preventDefault();
            signUpUI.signup();
        })
    }

    public enabled(is: boolean): void {
        this.isEnabled = is;
        if(this.isEnabled) {
            this.isEnabledHandling();
        } else {
            this.isDisabledHandling();
        }
    }

    private isEnabledHandling(): void {
        this.$register.prop('disabled', false);
        this.$register.css({
            "backgroundColor": "#cec3e7"
        });
    }

    private isDisabledHandling(): void {
        this.$register.prop('disabled', true);
        this.$register.css({
            "backgroundColor": "#c6c6c6"
        });
    }
}