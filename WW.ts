// WW.js is module created by Will - Thanh Nha Phan - Kennesaw State University
// This module helps backend development to be easily deployed
import $ from 'jquery'
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

    formValidate(): FormValidate {
        return new FormValidate(this.ele1, this.ele2, this.ele3);
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

class FormValidate extends WW3 {
    private inputElement: HTMLElement;
    private feedbackElement: HTMLElement;
    private regex: string;
    private isValid: boolean;

    constructor(inputElement: HTMLElement, feedbackElement: HTMLElement, regex: string) {
        super(inputElement, feedbackElement, regex);
        this.inputElement = inputElement;
        this.feedbackElement = feedbackElement;
        this.regex = regex;
        this.isValid = true;

        if(this.inputElement === null) {
            throw new Error("Input Element is not defined or rendered")
        }

        if(this.feedbackElement === null) {
            throw new Error("Feedback Element is not defined or rendered")
        }

        this.execute()
    }

    setValidity(value: boolean): void {
        this.isValid = value;
    }

    getValidity(): boolean {
        return this.isValid;
    }

    private eventFunction = (e: any) => {
        const regex: RegExp = new RegExp(this.regex)
        const target = e.target as HTMLInputElement;
        if (target.value !== '') {
            if (regex.test(target.value)) {
                this.setValidity(true);
                this.feedbackElement.innerHTML = `<i style="color: green;" class="fa-solid fa-check"></i>`
            } else {
                this.setValidity(false);
                this.feedbackElement.innerHTML = `<i style="color: red;" class="fa-solid fa-x"></i>`
            }
        } else {
            this.feedbackElement.innerHTML = '';
            this.setValidity(true);
        }
    }

    execute(): this {
        this.inputElement.addEventListener("input", this.eventFunction)
        return this;
    }

    cleanup(): this {
        this.inputElement.removeEventListener('input', this.eventFunction)
        return this
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
        signup: string
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

class API extends WW2 {
    constructor(src: string, data?: object) {
        super(src, data);
    }

    public get() : Promise<any> {
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
                    rej({'error': 'Request failed due to network connection failed'});
                    throw new Error(`AJAX request failed: ${textStatus}, ${errorThrown}`)
                }
            })
        })
    }

    public post() : Promise<any> {
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
                    rej({'error': 'Request failed due to network connection failed'});
                    throw new Error(`AJAX request failed: ${textStatus}, ${errorThrown}`)
                }
            })
        })
    }

    public postTry() {
        return this.try(this.post())
    }

    public try<T>(promise: Promise<T>): Promise<[undefined, T]| [Error | any]> {
        return promise.then(data => {
            return [undefined, data] as [undefined, T]
        }).catch(error => {
            return [error] as [Error | any]
        })
    }
}