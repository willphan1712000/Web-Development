import { $$$ } from "../../WW";
import Response from "../Response";
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

const key = process.env.SYSTEM_SECRET_KEY

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
        const userExist = await $$$(this.url.userExist, {
            username: this.usernameBox.getUsername(),
            key
        }).api().post() as Response;

        const validEmail = await $$$(this.url.validEmail, {
            email: this.emailBox.getEmail(),
            key
        }).api().post() as Response;

        const validPassword = await $$$(this.url.validPassword, {
            password: this.passwordBox.getPassword(),
            key
        }).api().post() as Response;
        
        // Real time error message update
        if(!userExist.success) {
            this.error.setError(userExist.error!);
        } else if(!this.usernameBox.isFilled()) {
            this.error.setError("Please enter username");
        } else if(!validEmail.success) {
            this.error.setError(validEmail.error!);
        } else if(!validPassword.success) {
            this.error.setError(validPassword.error!);
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
        this.register.enabled(userExist.success && this.usernameBox.isFilled() && validPassword.success && validEmail.success && this.checkBox.isChecked());
    }

    public async signup(): Promise<void> {

        const r = await $$$(this.url.signup, {
            username: this.usernameBox.getUsername(),
            password: this.passwordBox.getPassword(),
            email: this.emailBox.getEmail(),
            key
        }).api().post();
        if(r) {
            $(this.success.before).addClass(this.success.beforeClass);
            $(this.success.after).addClass(this.success.afterClass);
            setTimeout(() => {
                window.location.href = '/' + this.usernameBox.getUsername() + '/admin' // redirect user to admin page
            }, 2000)
        }
    }
}