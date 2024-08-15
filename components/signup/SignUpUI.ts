import { $$$ } from "../../WW";
import CheckBox from "./CheckBox";
import Email from "./Email";
import Error from "./Error";
import Password from "./Password";
import Register from "./Register";
import Username from "./Username";

interface UI {
    username: string,
    password: string,
    email: string,
    checkbox: string,
    register: string,
    error: string
}
interface Success {
    before: string,
    after: string,
    beforeClass: string,
    afterClass: string
}

export default class SignUpUI {
    private usernameBox: Username;
    private passwordBox: Password;
    private emailBox: Email;
    private checkBox: CheckBox;
    private error: Error;
    private register: Register;
    private url: any;
    private success: Success;

    constructor(ui: UI, url: any, success: Success) {
        this.usernameBox = new Username(ui['username'], this);
        this.passwordBox = new Password(ui['password'], this);
        this.emailBox = new Email(ui['email'], this);
        this.checkBox = new CheckBox(ui['checkbox'], this);
        this.error = new Error(ui['error']);
        this.register = new Register(ui['register'], this);
        this.url = url;
        this.success = success;
    }

    public async update(): Promise<void> {
        const r = await $$$(this.url.userExist, {
            username: this.usernameBox.getUsername()
        }).api().post();
        // Real time error message update
        if(r) {
            this.error.setError("Username exists");
        } else if(!this.usernameBox.isFilled()) {
            this.error.setError("Please enter username");
        } else if(!this.emailBox.isValidEmail()) {
            this.error.setError("Email is not valid");
        } else if(!this.passwordBox.isValidPassword()) {
            this.error.setError("Password is not valid");
        } else if(!this.checkBox.isChecked()) {
            this.error.setError("Please check terms and conditions");
        } else {
            this.error.setError(`<i style="color: green;
                                border: solid green 1px;
                                border-radius: 50%;
                                padding: 10px;
                                width: 30px;
                                height: 30px;
                                display: flex;
                                justify-content: center;
                                align-items: center;" class="fa-solid fa-check"></i>`);
        }

        // Handle logic, when user fill all information and all information should be valid before submitting to database
        this.register.enabled(!r && this.usernameBox.isFilled() && this.passwordBox.isValidPassword() && this.emailBox.isValidEmail() && this.checkBox.isChecked());
    }

    public async signup(): Promise<void> {

        const r = await $$$(this.url.signup, {
            username: this.usernameBox.getUsername(),
            password: this.passwordBox.getPassword(),
            email: this.emailBox.getEmail()
        }).api().post();
        if(r) {
            $(this.success.before).addClass(this.success.beforeClass);
            $(this.success.after).addClass(this.success.afterClass);
        }
    }
}