import { $$$ } from "../../WW";
import SignUpUI from "./SignUpUI";

export default class Username {
    private $username: JQuery<HTMLInputElement>;
    constructor(username: string, signUpUI: SignUpUI) {
        this.$username = $(username);
        this.$username.on("input", e => {
            signUpUI.update();
        })
    }

    public getUsername(): string {
        return this.removeSpace(this.$username.val()!);
    }

    // Client validation
    public isFilled() {
        return this.$username.val() !== "";
    }

    private removeSpace(text: string): string {
        return text.replace(/\s+/g, '');
    }
}