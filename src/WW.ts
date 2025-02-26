// WW.js is module created by Will - Thanh Nha Phan - Kennesaw State University
// This module helps backend development to be easily deployed
import $ from 'jquery';
import { default as Response } from './components/Response';
import SignUpUI from "./components/signup/SignUpUI";

// Method overloads
export function $$$(): WW0;
export function $$$(ele1: any): WW1;
export function $$$(ele1: any, ele2: any): WW2;
export function $$$(ele1: any, ele2: any, ele3: any): WW3;
export function $$$(ele1: any, ele2: any, ele3: any, ele4: any): WW4;
export function $$$(ele1: any, ele2: any, ele3: any, ele4: any, ele5: any): WW5;
export function $$$(ele1: any, ele2: any, ele3: any, ele4: any, ele5: any, ele6: any): WW6;
export function $$$(ele1?: any, ele2?: any, ele3?: any, ele4?: any, ele5?: any, ele6?: any) {
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
    } else if (ele2 !== undefined && ele1 !== undefined) {
        // Handle 2 arguments
        return new WW2(ele1, ele2);
    } else if (ele1 !== undefined) {
        // Handle 1 argument
        return new WW1(ele1);
    } else {
        return new WW0();
    }
}

class WW0 {
    wPromise(): WPromise {
        return new WPromise
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

    public get<T>() : Promise<T> {
        return new Promise((res, rej) => {
            $.ajax({
                url: this.ele1,
                method: "GET",
                dataType: "json",
                contentType: "application/json",
                success: (e: T) => {
                    res(e);
                },
                error: (jqXHR: any, textStatus: string, errorThrown: string) => {
                    rej({'error': 'Request failed due to network connection failed'} as T);
                    throw new Error(`AJAX request failed: ${textStatus}, ${errorThrown}`)
                }
            })
        })
    }

    public post<T>() : Promise<T> {
        return new Promise((res, rej) => {
            $.ajax({
                url: this.ele1,
                method: "POST",
                data: JSON.stringify(this.ele2),
                dataType: "json",
                contentType: "application/json",
                success: (e: T) => {
                    res(e);
                },
                error: (jqXHR: any, textStatus: string, errorThrown: string) => {
                    rej({'error': 'Request failed due to network connection failed'} as T);
                    throw new Error(`AJAX request failed: ${textStatus}, ${errorThrown}`)
                }
            })
        })
    }
}

class WPromise extends WW0 {
    static instance: WPromise

    constructor() {
        if(WPromise.instance) {
            return WPromise.instance
        }

        console.log("Instantiated")
        super()

        WPromise.instance = this
    }
    
    /** 
     * @param promiseArray - this is the list of promises
     * @returns - This will return promise all
     */
    public PromiseAll<T>(promiseArray: Array<() => Promise<T>>): Promise<Array<T>> {
        return Promise.all(promiseArray.map(each => each()))
    }
    
    /** 
     * @param promiseArray - this is the list of promises
     * @returns - This will return promise all settled
     */
    public PromiseAllSettled<T>(promiseArray: Array<() => Promise<T>>): Promise<Array<{
        status: | 'fulfilled' | 'rejected',
        reason?: T,
        value?: T
    }>> {
        return Promise.allSettled(promiseArray.map(each => each()))
    }
    
    /** 
     * @param promise - a promise
     * @returns - return [error, data], so we do not have to use try catch, making code more readable
     */
    public Try<T>(promise: Promise<T>): Promise<[undefined, T]| [Error | any]> {
        return promise.then(data => {
            return [undefined, data] as [undefined, T]
        }).catch(error => {
            return [error] as [Error | any]
        })
    }

    /** 
     * @param results - list of resolved promise all settled
     * @param promiseArray - list of promises
     */
    private failedPromise<T>(
        results: Array<{
            status: 'fulfilled' | 'rejected';
            reason?: T;
            value?: T;
        }>,
        promiseArray: Array<() => Promise<T>>
    ): Array<() => Promise<T>> {
        const r = results
            .map((result, index) => {
                if (result.status === 'rejected') return promiseArray[index];
                return undefined; // Explicitly return undefined for clarity
            })
            .filter((item): item is () => Promise<T> => item !== undefined); // Remove undefined entries and assert type
    
        return r.length > 0 ? r : []; // Return an empty array if no rejected promises
    }

    /**
      * This method waits for n seconds
      * @param n second(s)
      * @returns the a promise of type void
      */
    private wait(n: number): Promise<void> {
        return new Promise((res) => {
            setTimeout(() => {
                res()
            }, n * 1000)
        })
    }

    /**
      * This can handle promise all settled using T type
      * @param promiseArray input a list of promises
      * @returns the array of T object
      */
     public handlePromiseAllSettled<T>(promiseArray: Array<() => Promise<T>>, option?: {
        retry?: number
     }): Promise<Array<{
        status: | 'fulfilled' | 'rejected',
        reason?: T,
        value?: T
    }>> {
        return new Promise(async (res, rej) => {
            try {
                const retry = (option?.retry === undefined || option?.retry < 1) ? 0 : option.retry
                const results_init = await this.PromiseAllSettled(promiseArray)
                let failedPromises = this.failedPromise(results_init, promiseArray)
        
                if (failedPromises.length === 0) res(results_init)
        
                let results
                for(let i = 1; i <= retry; i++) {
                    await this.wait(1.5) // wait for 1.5 seconds before the next retry
                    
                    results = await this.PromiseAllSettled(failedPromises)
                    failedPromises = this.failedPromise(results, failedPromises)
        
                    if(failedPromises.length === 0) break

                }
    
                results_init.forEach(result => {
                    if(result.status === 'rejected') {
                        rej(results_init)
                    }
                })

                res(results_init)
            } catch(error) {
                rej(error)
            }
        })
     }

     /**
      * This can handle promise all settled using Response type
      * This method will retry at most 3 times to resolve every failed promises
      * @param promiseArray input a list of promises
      * @returns the array of Response object
      */
    public async handlePromiseAllSettledResponse(promiseArray: Array<() => Promise<Response>>): Promise<(Response | undefined)[]> {
        const [e,r] = await this.Try(this.handlePromiseAllSettled(promiseArray, {retry: 3}))

        return [this.communicationReject(e), this.communicationResolve(r)]
    }

    /**
     * This function takes results param then converts it to type of Response used for rejected request, making sure the communication is consistent
     */
     private communicationReject(results: {
        status: | 'fulfilled' | 'rejected',
        reason?: Response,
        value?: Response
    }[] | undefined): Response | undefined {
        const r: Response = {
            success: false,
            error: ""
        }

        if(!results) return results

        results.forEach((each) => {
            r.error += (each.reason?.error! === undefined) ? "" : each.reason?.error! + ". "
        })

        return r
     }

    /**
     * This function takes results param then converts it to type of Response used for resolved request, making sure the communication is consistent
     */
     private communicationResolve(results: {
        status: | 'fulfilled' | 'rejected',
        reason?: Response,
        value?: Response
    }[] | undefined): Response | undefined {
        const r: Response = {
            success: true,
            error: ""
        }

        if(!results) return results

        const data = [] as any[]

        results.forEach((each) => {
            if(!each.value?.success) {
                r.success = false
            }
            r.error += (each.value?.error! === undefined) ? "" : each.value?.error! + ". "
            data.push(each.value?.data)
        })

        r.data = data

        return r
     }
}