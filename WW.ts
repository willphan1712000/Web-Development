// WW.js is module created by Will - Thanh Nha Phan - Kennesaw State University
// This module helps backend development to be easily deployed

import SignUpUI from "./components/signup/SignUpUI";

// Method overloads
export function $$$(ele1: any): WW1;
export function $$$(ele1: any, ele2: any): WW2;
export function $$$(ele1: any, ele2: any, ele3: any): WW3;
export function $$$(ele1: any, ele2: any, ele3: any, ele4: any): WW4;
export function $$$(ele1: any, ele2: any, ele3: any, ele4: any, ele5: any): WW5;
export function $$$(ele1: any, ele2: any, ele3: any, ele4: any, ele5: any, ele6: any): WW6;
export function $$$(ele1: any, ele2?: any, ele3?: any, ele4?: any, ele5?: any, ele6?: any) {
    if(ele2 !== undefined && ele3 !== undefined && ele4 !== undefined && ele5 !== undefined && ele6 !== undefined) {
        // Handle 6 arguments
        return new WW6(ele1, ele2, ele3, ele4, ele5, ele6);
    } else if(ele2 !== undefined && ele3 !== undefined && ele4 !== undefined && ele5 !== undefined) {
        // Handle 5 arguments
        return new WW5(ele1, ele2, ele3, ele4, ele5);
    } else if (ele2 !== undefined && ele3 !== undefined && ele4 !== undefined) {
        // Handle 4 arguments
        return new WW4(ele1, ele2, ele3, ele4);
    } else if (ele2 !== undefined && ele3 !== undefined) {
        // Handle 3 arguments
        return new WW3(ele1, ele2, ele3);
    } else if (ele2 !== undefined) {
        // Handle 2 arguments
        return new WW2(ele1, ele2);
    } else {
        // Handle 1 argument
        return new WW1(ele1);
    }
}

class WW1 {
 protected ele1: any;

    constructor(ele1: any) {
        this.ele1 = ele1;
    }
}

class WW2 {
    protected ele1: any;
    protected ele2: any;

    constructor(ele1: any, ele2: any) {
        this.ele1 = ele1;
        this.ele2 = ele2;
    }

    api() : API {
        return new API(this.ele1, this.ele2);
    }
}

class WW3 {
    protected ele1: any;
    protected ele2: any;
    protected ele3: any;

    constructor(ele1: any, ele2: any, ele3: any) {
        this.ele1 = ele1;
        this.ele2 = ele2;
        this.ele3 = ele3;
    }

    signup(): Signup {
        return new Signup(this.ele1, this.ele2, this.ele3);
    }
}

class WW4 {
    protected ele1: any;
    protected ele2: any;
    protected ele3: any;
    protected ele4: any;

    constructor(ele1: any, ele2: any, ele3: any, ele4: any) {
        this.ele1 = ele1;
        this.ele2 = ele2;
        this.ele3 = ele3;
        this.ele4 = ele4;
    }
}

class WW5 {
    protected ele1: any;
    protected ele2: any;
    protected ele3: any;
    protected ele4: any;
    protected ele5: any;

    constructor(ele1: any, ele2: any, ele3: any, ele4: any, ele5: any) {
        this.ele1 = ele1;
        this.ele2 = ele2;
        this.ele3 = ele3;
        this.ele4 = ele4;
        this.ele5 = ele5;
    }

    formValidate(): FormValidate {
        return new FormValidate(this.ele1, this.ele2, this.ele3, this.ele4, this.ele5);
    }
}

class WW6 {
    protected ele1: any;
    protected ele2: any;
    protected ele3: any;
    protected ele4: any;
    protected ele5: any;
    protected ele6: any;

    constructor(ele1: any, ele2: any, ele3: any, ele4: any, ele5: any, ele6: any) {
        this.ele1 = ele1;
        this.ele2 = ele2;
        this.ele3 = ele3;
        this.ele4 = ele4;
        this.ele5 = ele5;
        this.ele6 = ele6;
    }
}

class FormValidate extends WW5 {
    input: string;
    msg: string;
    success: string;
    error: string;
    regex: string;
    isValid: boolean;

    constructor(input: string, msg: string, success: string, error: string, regex: string) {
        super(input, msg, success, error, regex);
        this.input = input;
        this.msg = msg;
        this.success = success;
        this.error = error;
        this.regex = regex;
        this.isValid = true;
    }

    setValidity(value: boolean): void {
        this.isValid = value;
    }

    getValidity(): boolean {
        return this.isValid;
    }

    phoneFormat(): void {
        $(this.input).on("input", (event) => {
            const inputValue = (event.target as HTMLInputElement).value.replace(/\D/g, '');
            let formattedValue = '';

            // Apply the formatting
            for (let i = 0; i < inputValue.length; i++) {
                if (i === 3 || i === 6) {
                    formattedValue += '-';
                }
                formattedValue += inputValue[i];
            }

            // Update the input value
            (event.target as HTMLInputElement).value = formattedValue;
        });
    }

    run(): this {
        const regex: RegExp = new RegExp(this.regex);
        $(this.input).on("input", (e) => {
            const target = e.target as HTMLInputElement;
            if (target.value !== '') {
                if (regex.test(target.value)) {
                    this.setValidity(true);
                    $(this.msg).html(this.success);
                } else {
                    this.setValidity(false);
                    $(this.msg).html(this.error);
                }
            } else {
                $(this.msg).html('');
                this.setValidity(true);
            }
        });
        return this;
    }
}

class Signup extends WW3 {
    private signUpUI: SignUpUI;
    constructor(ui: {
        username: string,
        password: string,
        email: string,
        checkbox: string,
        register: string,
        error: string
    }, url: {
        signup: string,
        create?: string
    }, success: {
        before: string,
        after: string,
        beforeClass: string,
        afterClass: string
    }) {
        super(ui, url, success);
        this.signUpUI = new SignUpUI(ui, url, success);
    }
    
}

// class Signups extends WW6 {
//     username: string;
//     email: string;
//     password: string;
//     error: string;
//     submit: string;
//     url: {
//         signup: string,
//         create: string
//     };
//     $username: JQuery<HTMLElement>;
//     $email: JQuery<HTMLElement>;
//     $password: JQuery<HTMLElement>;
//     $error: JQuery<HTMLElement>;
//     $submit: JQuery<HTMLElement>;

//     constructor(username: string, email: string, password: string, error: string, submit: string, url: {
//         signup: string,
//         create: string
//     }) {
//         super(username, email, password, error, submit, url);
//         this.username = username;
//         this.email = email;
//         this.password = password;
//         this.error = error;
//         this.submit = submit;
//         this.url = url;
//         this.$username = $(this.username);
//         this.$email = $(this.email);
//         this.$password = $(this.password);
//         this.$error = $(this.error);
//         this.$submit = $(this.submit);
//     }

//     run(): void {
//         this.$submit.on("click", (e: JQuery.Event) => {
//             e.preventDefault();
//             if (this.isFillAll(this.$username.val() as string, this.$email.val() as string, this.$password.val() as string)) {
//                 this.$error.html("Please fill in all information!");
//                 this.shakingErrorMsg(this.$error);
//             } else {
//                 if (!this.isValidEmail(this.$email.val() as string)) {
//                     this.$error.html("The email is not valid!");
//                     this.shakingErrorMsg(this.$error);
//                 } else {
//                     if (!this.isValidPassword(this.$password.val() as string)) {
//                         this.$error.html("The password is not valid!");
//                         this.shakingErrorMsg(this.$error);
//                     } else {
//                         this.$error.html("");
//                         $.ajax({
//                             url: this.url.signup,
//                             method: "POST",
//                             dataType: "json",
//                             data: {
//                                 username: this.removeSpace(this.$username.val() as string),
//                                 email: this.$email.val() as string,
//                                 password: this.$password.val() as string
//                             },
//                             success: (e: any) => {
//                                 if (e[0]) {
//                                     this.$error.html("The username has already been taken!");
//                                     this.shakingErrorMsg(this.$error);
//                                 } else {
//                                     if (!e[1]) {
//                                         this.$error.html("The email is not valid!");
//                                         this.shakingErrorMsg(this.$error);
//                                     } else {
//                                         if (!(e[2] && e[3] && e[4] && e[5])) {
//                                             this.$error.html("There is an error, try again!");
//                                             this.shakingErrorMsg(this.$error);
//                                         } else {
//                                             this.signUpSuccess(".signupChild", "inactive", ".signupSuccess", "active");
//                                             // Optional operation
//                                             this.createFiles(this.removeSpace(this.$username.val() as string));
//                                         }
//                                     }
//                                 }
//                             },
//                             error: () => {
//                                 this.$error.html("The server has internal error!");
//                                 this.shakingErrorMsg(this.$error);
//                             }
//                         });
//                     }
//                 }
//             }
//         });
//     }

//     isFillAll(username: string, email: string, password: string): boolean {
//         return !(username && email && password);
//     }

//     isValidEmail(email: string): boolean {
//         // Regular expression for a basic email validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         // Test the email against the regular expression
//         return emailRegex.test(email);
//     }

//     isValidPassword(password: string): boolean {
//         const isValidLength = password.length >= 12;
//         let hasUpperCase = false;
//         let hasDigit = false;
//         let hasSpecialChar = true; // Bypass special character requirement

//         for (let i = 0; i < password.length; i++) {
//             const position = password.charCodeAt(i);
//             if (position >= 65 && position <= 90) {
//                 hasUpperCase = true;
//             }
//             if (position >= 48 && position <= 57) {
//                 hasDigit = true;
//             }
//             if (position >= 33 && position <= 47) {
//                 hasSpecialChar = true;
//             }
//             if (hasUpperCase && hasDigit && hasSpecialChar) {
//                 return isValidLength && hasUpperCase && hasDigit && hasSpecialChar;
//             }
//         }
//         return false;
//     }

//     removeSpace(text: string): string {
//         return text.replace(/\s+/g, '');
//     }

//     shakingErrorMsg(error: JQuery<HTMLElement>): void {
//         const requestAnimationFrame = window.requestAnimationFrame;

//         let counter = 0;
//         let x = 0;
//         let dx = -2.5;

//         const shaking = () => {
//             counter++;
//             x += dx;
//             if (x <= -15 || x >= 15) {
//                 dx = -dx;
//             }
//             const runAnimation = requestAnimationFrame(shaking);
//             if (counter === 30) {
//                 cancelAnimationFrame(runAnimation);
//                 x = 0;
//             }
//             error.css({
//                 transform: `translateX(${x}px)`
//             });
//         };
//         shaking();
//     }

//     signUpSuccess(before: string, beforeClass: string, after: string, afterClass: string): void {
//         $(before).addClass(beforeClass);
//         $(after).addClass(afterClass);
//     }

//     createFiles(username: string): void {
//         $$$(this.url.create, {
//             username: username
//         }).api().post();
//     }
// }

class API extends WW2 {
    constructor(src: string, data: object) {
        super(src, data);
    }

    public get() : Promise<object> {
        return new Promise((res, rej) => {
            $.ajax({
                url: this.ele1,
                method: "GET",
                dataType: "json",
                contentType: "application/json",
                success: (e: any) => {
                    res(e);
                },
                error: (jqXHR: any, textStatus: string, errorThrown: string) => {
                    rej(new Error(`AJAX request failed: ${textStatus}, ${errorThrown}`));
                }
            })
        })
    }

    public post() : Promise<object> {
        return new Promise((res, rej) => {
            $.ajax({
                url: this.ele1,
                method: "POST",
                data: JSON.stringify(this.ele2),
                dataType: "json",
                contentType: "application/json",
                success: (e: any) => {
                    res(e);
                },
                error: (jqXHR: any, textStatus: string, errorThrown: string) => {
                    rej(new Error(`AJAX request failed: ${textStatus}, ${errorThrown}`));
                }
            })
        })
    }
}