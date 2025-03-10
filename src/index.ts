import $ from 'jquery';
import { JSX } from 'react';
import ReactDOM from "react-dom/client";
import SearchUI from "./components/search/SearchUI";
import TextEditor from "./components/textEditor/TextEditor";

// Export WW.ts
export { $$$ } from './WW';

// Export React Components
export { default as Button } from './components/button/Button';
export { default as ColorPickerGradient } from './components/colorPicker/ColorPickerGradient';
export { default as Options } from './components/options/Options';
export { default as ColorType } from './components/options/types/ColorType';
export { default as FontType } from './components/options/types/FontType';
export { default as RangeSlider } from './components/rangeSlider/RangeSlider';
export { default as Select } from './components/select/Select';
export { default as UploadFile } from './components/upload/UploadFile'
export { default as Transform } from './components/Transform/Transform'

// Method overloads
export function $$(ele1: any): W1;
export function $$(ele1: any, ele2: any): W2;
export function $$(ele1: any, ele2: any, ele3: any): W3;
export function $$(ele1: any, ele2: any, ele3: any, ele4: any): W4;
export function $$(ele1: any, ele2?: any, ele3?: any, ele4?: any) {
    if (ele2 !== undefined && ele3 !== undefined && ele4 !== undefined) {
        // Handle 4 arguments
        return new W4(ele1, ele2, ele3, ele4);
    } else if (ele2 !== undefined && ele3 !== undefined) {
        // Handle 3 arguments
        return new W3(ele1, ele2, ele3);
    } else if (ele2 !== undefined) {
        // Handle 2 arguments
        return new W2(ele1, ele2);
    } else {
        // Handle 1 argument
        return new W1(ele1);
    }
}

export class W1 {
    protected ele1: any;

    constructor(ele1: any) {
        this.ele1 = ele1;
    }
    public passShowHide(): PassShowHide {
        return new PassShowHide(this.ele1);
    }

    public addSpinner(): Spinner {
        return new Spinner(this.ele1);
    }

    public share(): Share {
        return new Share(this.ele1);
    }

    public textEditor(cb: (e: any) => void) : TextEditor {
        return new TextEditor(this.ele1, cb)
    }
}
export class W2 {
    protected ele1: any;
    protected ele2: any;

    constructor(ele1: any, ele2: any) {
        this.ele1 = ele1;
        this.ele2 = ele2;
    }

    /**
     * @param String text to bo copied
     * @param HTMLElement element to be clicked on to copy text
     * @returns copy text to clipboard
     */
    public copyToClipboard(): CopyToClipboard {
        return new CopyToClipboard(this.ele1, this.ele2);
    }

    public table(): Table {
        return new Table(this.ele1, this.ele2);
    }

    public search(): Search {
        return new Search(this.ele1, this.ele2);
    }

    // reactMounting uses latest React syntax to mount an element to an already defined element
    public reactMounting(): ReactMounting {
        return new ReactMounting(this.ele1, this.ele2)
    }
}

export class W3 {
    protected ele1: any;
    protected ele2: any;
    protected ele3: any;

    constructor(ele1: any, ele2: any, ele3: any) {
        this.ele1 = ele1;
        this.ele2 = ele2;
        this.ele3 = ele3;
    }

    public addIntersectionObserver(): AddIntersectionObserver {
        return new AddIntersectionObserver(this.ele1, this.ele2, this.ele3);
    }
    
    public toggle(): Toggle {
        return new Toggle(this.ele1, this.ele2, this.ele3);
    }
}

export class W4 {
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

class ReactMounting {
    private element!: string
    private jsx!: JSX.Element

    constructor(element: string, jsx: JSX.Element) {
        this.element = element
        this.jsx = jsx

        this.render();
    }

    private render() {
        const parentElement: HTMLElement | null = document.querySelector(this.element);
        if (!parentElement) {
            throw new Error("The element React components will be mounted on is not found");
        }
        (ReactDOM.createRoot(parentElement).render(this.jsx))
    }
}

export class AddIntersectionObserver extends W3 {
    private observer: any;
    private target: HTMLElement;
    private count: number;

    constructor(target: string, options: Object, cb: () => void) {
        super(target, options, cb);

        this.target = document.querySelector(this.ele1);

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.ele3(entry.isIntersecting, this.count);
            })
        }, this.ele2)
        this.count = 0;
    }

    public observe() : this {
        this.observer.observe(this.target);
        return this;
    }

    public unobserve() : this {
        this.observer.unobserve(this.target);
        return this;
    }

    public increaseCount() : void {
        this.count++;
    }

    public resetCount(): void {
        this.count = 0;
    }

    public getCount() : number {
        return this.count;
    }
}

class Share extends W1 {
    constructor(obj: {
        title: string,
        url: string
    }) {
        super(obj);
        this.run();
    }

    private run() {
        if(navigator.share) {
            navigator.share(this.ele1)
        } else {
            alert("Share does not support this browser")
        }
    }
}

export class Table extends W2 {
    // Follow the object format
    // header = {
    //     1: a,
    //     2: b,
    //     3: c
    // }
    // data = {
    //     1: {
    //         1: data1,
    //         2: data2
    //     },
    //     2: {
    //         1: data3,
    //         2: data4
    //     }
    // }
    // The table should look like this
    // a b     c
    // 1 data1 data2
    // 2 data3 data4
    private location: string;
    private data: Array<Object>;

    constructor(location: string, data: Array<Object>) {
        super(location, data);
        this.location = location;
        this.data = data;
    }

    public addHeader(): this {
        $(this.location).append('<table><tr></tr></table>');
        // Append header
        for (const headerKey in this.data[0]) {
            if (this.data[0].hasOwnProperty(headerKey)) {
                $(this.location + " table tr").append(`<th>${headerKey}</th>`);
            }
        }

        return this;
    }

    public addRow(data: {
        [key: number]: {
            [key: number]: any
        }
    }): this {
        // Append data rows
        for (const dataKey in data) {
            let row = `<tr>`, eachData = data[dataKey];
            for (const eachKey in eachData) {
                if(eachKey === 'createdAt') {
                    let dateFormatted = new Intl.DateTimeFormat('en-US', {
                        timeZone: 'America/New_York',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      }).format(new Date(eachData[eachKey]));
                    row += `<th>${dateFormatted}</th>`;
                    continue
                }
                row += `<th>${eachData[eachKey]}</th>`;
            }
            row += `</tr>`;
            $(this.location + " table").append(row);
        }
    
        return this;
    }

    public empty() {
        $(this.location).empty();
        this.addHeader();
    }

}

class Spinner extends W1 {

    constructor(ele1: HTMLElement) {
        super(ele1);
    }

    public show(): this {
        // $(this.ele1 + " .loader").addClass("spinner");
        $(this.ele1.querySelector(".loader")).addClass("spinner")
        return this;
    }
    
    public hide(): this {
        // $(this.ele1 + " .loader").removeClass("spinner");
        $(this.ele1.querySelector(".loader")).removeClass("spinner")
        return this;
    }

    public singleSpinner(): this {
        const styleElement = document.createElement("style");
        styleElement.textContent = `
        .spinner::after {
            content: "";
            position: absolute;
            width: 16px;
            height: 16px;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            border: 4px solid transparent;
            border-top-color: #000;
            border-radius: 50%;
            animation: spinner 1s linear infinite;
        }
        @keyframes spinner {
            from {
                transform: rotate(0turn);
            }
            to {
                transform: rotate(1turn);
            }
        }`;
        document.head.appendChild(styleElement);
        $(this.ele1).append(`<div class="loader"></div>`);
        $(this.ele1).css("position", "relative");
        return this;
    }

    public gradientSpinner(): this {
        $(this.ele1).append(`<div class="loader spinner"></div>`);
        return this;
    }
}


class PassShowHide extends W1 {
    private inputSelector: string;
    private $input: JQuery<HTMLElement>;

    constructor(inputSelector: string) {
        super(inputSelector);
        this.inputSelector = inputSelector;
        this.$input = $(this.inputSelector);
    }

    public run(): this {
        const inputWidth = this.$input.innerWidth();
        const inputHeight = this.$input.innerHeight();
        
        // Create a wrapper div and move the input inside it
        this.$input.wrap('<div style="position: relative;"></div>');

        // Adjust the after method to add the eye icon after the input within the new wrapper
        this.$input.after(
            `<i class="fa-solid fa-eye eye" style="position: absolute; left: ${inputWidth! - (18 + 3)}px; top: ${(inputHeight! - 16) / 2}px; cursor: pointer; color: #333;"></i>`
        );

        const $eye = this.$input.next();

        $eye.on('click', () => {
            if (this.$input.attr('type') === "password") {
                this.$input.attr('type', 'text');
                $eye.css({ color: "green" });
            } else {
                this.$input.attr('type', 'password');
                $eye.css({ color: "#333" });
            }
        });

        return this;
    }
}

class Toggle extends W3 {

    constructor(ele1: {
        trigger: HTMLElement,
        terminate?: Array<HTMLElement>
    }, ele2: HTMLElement, ele3: string) {
        super(ele1, ele2, ele3);
    }

    public default(): this {
        $(this.ele1).click((e) => {
            $(e.currentTarget).toggleClass(this.ele2);
        });
        return this;
    }

    private disableScroll() {
        $("body").css({
            overflow: "hidden"
        })
    }

    private enableScroll() {
        $("body").css({
            overflow: "auto"
        })
    }

    public advanced(): this {
        // Check if the showing element is defined or rendered yet
        if(this.ele2 === null) {
            throw new Error("showing element is not defined or rendered on DOM")
        }

        // Check if trigger element is defined or rendered yet. If so, perform click event. If clicked, open the showing element. If clicked again, close the showing element
        if(this.ele1.terminate === null) {
            throw new Error("terminating element is not defined or rendered on DOM")
        } else {
            this.ele1.trigger.addEventListener('click', (e: any) => {
                e.preventDefault()
                e.stopPropagation()
                if($(this.ele2).hasClass(this.ele3)) {
                    this.enableScroll()
                    $(this.ele2).removeClass(this.ele3)
                } else {
                    this.disableScroll()
                    $(this.ele2).addClass(this.ele3)
                }
            })
        }

        // terminating element could be null. If not null, perform click event for every element in the terminating array to close the showing menu
        if(this.ele1.terminate !== null) {
            document.addEventListener('click', e => {
                const target = e.target as HTMLElement

                if((this.ele1.terminate as Array<HTMLElement>).includes(target)) {
                    this.enableScroll()
                    $(this.ele2).removeClass(this.ele3)
                }
            })
        }

        return this
    }

    public cancel(): this {
        $(this.ele1.trigger).off()
        $(this.ele1.terminate).off()
        $(this.ele2).off()
        $(document).off()
        return this
    }
}

class CopyToClipboard extends W2 {
    constructor(ele1: string, ele2: string) {
        super(ele1, ele2);
    }

    public run(cb: (e: string) => void): void {
        $(this.ele2).click(() => {
            navigator.clipboard.writeText(this.ele1).then(() => {
                cb(this.ele1);
            });
        });
    }
}

class Search extends W2 {
    private searchUI: SearchUI
    
    constructor(ele1: any, ele2: any) {
        super(ele1, ele2);
        this.searchUI = new SearchUI(this.ele1, this.ele2);
        
    }
}