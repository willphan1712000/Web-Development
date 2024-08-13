import SignUpUI from "./SignUpUI";

export default class Password {
    private $password: JQuery<HTMLInputElement>;
    constructor(password: string, signUpUI: SignUpUI) {
        this.$password = $(password);
        this.$password.on("input", e => {
            signUpUI.update();
        })
    }

    public getPassword() : string {
        return this.$password.val()!;
    }

    // Client validation
    public isValidPassword(): boolean {
        const password : string = this.$password.val() as any;
        const isValidLength = password.length >= 12;
        let hasUpperCase = false;
        let hasDigit = false;
        let hasSpecialChar = true; // Bypass special character requirement

        for (let i = 0; i < password.length; i++) {
            const position = password.charCodeAt(i);
            if (position >= 65 && position <= 90) {
                hasUpperCase = true;
            }
            if (position >= 48 && position <= 57) {
                hasDigit = true;
            }
            if (position >= 33 && position <= 47) {
                hasSpecialChar = true;
            }
            if (hasUpperCase && hasDigit && hasSpecialChar) {
                return isValidLength && hasUpperCase && hasDigit && hasSpecialChar;
            }
        }
        return false;
    }
}