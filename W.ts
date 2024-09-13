// W.js is module created by Will - Thanh Nha Phan - Kennesaw State University
// This module helps frontend development to be easily deployed

import SearchUI from "./components/search/SearchUI";
import { RangeSliderOptions, RangeSlider } from "./components/rangeSlider/RangeSlider";
import { ColorPicker, ColorPickerOptions } from "./components/colorPicker/ColorPicker";
import ColorPickerSingle from "./components/colorPicker/ColorPickerSingle";
import ColorPickerDouble from "./components/colorPicker/ColorPickerDouble";
import { Options, OptionsOption } from "./components/options/Options";
import Transform from "./components/Transform/Transform";
import UploadFile from "./components/upload/UploadFile";
import TextEditor from "./components/textEditor/TextEditor";

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

    public transform(): Transform {
        return new Transform(this.ele1);
    }

    public addSpinner(): Spinner {
        return new Spinner(this.ele1);
    }

    public share(): Share {
        return new Share(this.ele1);
    }

    public colorPickerSingle(cb: (e: any) => void, options: ColorPickerOptions): ColorPicker {
        return new ColorPickerSingle(this.ele1, cb, options);
    }

    public colorPickerDouble(cb: (e: any) => void, options: ColorPickerOptions): ColorPicker {
        return new ColorPickerDouble(this.ele1, cb, options);
    }

    public rangeSlider(cb: (e: any) => void, options: RangeSliderOptions): RangeSlider {
        return new RangeSlider(this.ele1, cb, options);
    }

    public options(cb: (e: any) => void, options: OptionsOption): Options {
        return new Options(this.ele1, cb, options);
    }

    public uploadFile(cb: (e: any) => void): UploadFile {
        return new UploadFile(this.ele1, cb);
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

    public toggle(): Toggle {
        return new Toggle(this.ele1, this.ele2);
    }

    public copyToClipboard(): CopyToClipboard {
        return new CopyToClipboard(this.ele1, this.ele2);
    }

    public table(): Table {
        return new Table(this.ele1, this.ele2);
    }

    public search(): Search {
        return new Search(this.ele1, this.ele2);
    }

    public transform(): Transform {
        return new Transform(this.ele1, this.ele2);
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

    public transform(): Transform {
        return new Transform(this.ele1, this.ele2, this.ele3);
    }

    public addIntersectionObserver(): AddIntersectionObserver {
        return new AddIntersectionObserver(this.ele1, this.ele2, this.ele3);
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
    private header: {[key: number]: string};

    constructor(location: string, header: {[key: number]: string;}) {
        super(location, header);
        this.location = location;
        this.header = header;
    }

    public addHeader(): this {
        $(this.location).append('<table><tr></tr></table>');

        // Append header
        for (const headerKey in this.header) {
            if (this.header.hasOwnProperty(headerKey)) {
                $(this.location + " table tr").append(`<th>${this.header[headerKey]}</th>`);
            }
        }

        return this;
    }

    public addRow(data: {
        [key: number]: {
            [key: number]: string
        }
    }): this {
        // Append data rows
        for (const dataKey in data) {
            let row = `<tr>`, eachData = data[dataKey];
            for (const eachKey in eachData) {
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

    constructor(ele1: string) {
        super(ele1);
    }

    public show(): this {
        $(this.ele1 + " .loader").addClass("spinner");
        return this;
    }

    public hide(): this {
        $(this.ele1 + " .loader").removeClass("spinner");
        return this;
    }

    public singleSpinner(): this {
        const styleElement = document.createElement("style");
        styleElement.textContent = `
        .spinner {
            position: absolute;
            top: calc(50% - 8px);
            left: calc(50% - 8px);
        }
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

class Toggle extends W2 {

    constructor(ele1: string, ele2: string) {
        super(ele1, ele2);
    }

    public run(): this {
        $(this.ele1).click((e) => {
            $(e.currentTarget).toggleClass(this.ele2);
        });
        return this;
    }
}

class CopyToClipboard extends W2 {
    constructor(ele1: string, ele2: string) {
        super(ele1, ele2);
    }

    public run(cb: () => void): void {
        $(this.ele2).click(() => {
            navigator.clipboard.writeText(this.ele1).then(() => {
                cb();
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