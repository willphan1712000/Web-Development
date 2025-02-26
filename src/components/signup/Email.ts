import SignUpUI from "./SignUpUI";

export default class Email {
    private $email: JQuery<HTMLInputElement>;
    constructor(email: string, signUpUI: SignUpUI) {
        this.$email = $(email);
        this.$email.on("input", e => {
            signUpUI.update();
        })
    }

    public getEmail(): string {
        return this.$email.val()!;
    }

    // // Client validation
    // public isValidEmail(): boolean {
    //     const email = this.$email.val();
    //     // Regular expression for a basic email validation
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     // Test the email against the regular expression
    //     return emailRegex.test(email!);
    // }
}