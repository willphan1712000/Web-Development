// W.js is module created by Will - Thanh Nha Phan - Kennesaw State University
// This module helps frontend development to be easily deployed

import SearchUI from "./components/search/SearchUI";
import { RangeSliderOptions, RangeSlider } from "./components/rangeSlider/RangeSlider";
import { ColorPicker, ColorPickerOptions } from "./components/colorPicker/ColorPicker";
import ColorPickerSingle from "./components/colorPicker/ColorPickerSingle";
import ColorPickerDouble from "./components/colorPicker/ColorPickerDouble";
import { Options, OptionsOption } from "./components/options/Options";

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
        return new Transform(this.ele1, undefined, undefined);
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

    public upload(): Upload {
        return new Upload(this.ele1, this.ele2);
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

    // public transformDesktop(): TransformDesktop {
    //     return new TransformDesktop(this.ele1, this.ele2, this.ele3);
    // }
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

class Upload extends W2 {
    private $ele1: JQuery<HTMLElement>;
    private $ele2: JQuery<HTMLElement>;

    constructor(ele1: string, ele2: string) {
        super(ele1, ele2);
        this.$ele1 = $(this.ele1);
        this.$ele2 = $(this.ele2);
    }

    public openFile(): this {
        this.$ele1.click(e => {
            e.stopPropagation();
            this.$ele2.click();
        });
        return this;
    }

    public fileHandling(e: Event, cb: (src: string) => void): void {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (readerEvent) => {
                const imgElement = document.createElement("img");
                imgElement.src = readerEvent.target?.result as string;
                imgElement.onload = (imgEvent) => {
                    cb((imgEvent.target as HTMLImageElement).src);
                };
            };
        }
    }

    public drawImage(e: any, x: number, y: number, scale: number, angle: number, canvasWidth: number, canvasHeight: number, containerWidth: number, containerHeight: number): string {
        const canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("Unable to get canvas context");
        }

        const ratioX = canvasWidth / containerWidth;
        const ratioY = canvasHeight / containerHeight;
        const finalX = x * ratioX;
        const finalY = y * ratioY;
        const midleWidth = e.width * ratioX;
        const midleHeight = e.height * ratioY;
        const finalWidth = e.width * ratioX * scale;
        const finalHeight = e.height * ratioY * scale;

        ctx.translate(finalX + midleWidth / 2, finalY + midleHeight / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.drawImage(e, -finalWidth / 2, -finalHeight / 2, finalWidth, finalHeight);
        const srcEncoded = ctx.canvas.toDataURL(e).split(",")[1];
        return srcEncoded;
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

class Transform {
    private ele1: string;
    private ele2: string | undefined;
    private collided: boolean;
    private deleted: boolean;
    private x: number;
    private y: number;
    private angle: number;
    private w: number;
    private h: number;
    private controllerClassName: string;
    private css: string;
    private controllerTemplate: string;
    private ratio: number;
    private  isRotateOffScreen: boolean;
    private $ele2: JQuery<HTMLElement>;
    private imgFrame: HTMLElement | null;
    private thisObject: Transform;

    constructor(ele1: string, ele2: string | undefined, ele3: string | undefined) {
        this.ele1 = ele1;
        this.ele2 = ele2;
        this.collided = false;
        this.deleted = true;
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.w = 0;
        this.h = 0;
        this.$ele2 = $(ele2!);
        this.imgFrame = document.querySelector(ele2!);
        this.controllerClassName = this.ele1.substring(1) + '--controller';
        this.isRotateOffScreen = false;
        this.thisObject = this;

        const img = document.querySelector(this.ele1 + " > img") as HTMLImageElement;
        this.ratio = img.width / img.height;

        this.css = `
            ${this.ele1} {
                position: absolute;
                transform-origin: top left;
                user-select: none;
            }
            ${this.ele1} > img {
                object-fit: contain;
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                z-index: 1;
                transform: translate(-50%, -50%)
            }
            .${this.controllerClassName}--container {
                position: absolute;
                transform-origin: top left;
                user-select: none;
            }
            .${this.controllerClassName} {
                position: absolute;
                user-select: none;
                border: solid 3px #6924d5;
                z-index: 1;
                top: 0;
                left: 0;
                transform: translate(-50%, -50%);
            }
            .${this.controllerClassName} .resize {
                background-color: #fff;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                transition: all .1s linear;
            }
            .${this.controllerClassName} .resize.show {
                background-color: #6924d5;
            }
            .${this.controllerClassName} .resize > .circle {
                background-color: #f0f0f0a8;
                position: absolute;
                top: -15px;
                left: -15px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                z-index: -1;
                visibility: hidden;
                transition: all .1s linear;
            }
            .${this.controllerClassName} .resize > .circle.show {
                visibility: visible;
            }
            .${this.controllerClassName} .resize.resize-topleft {
                position: absolute;
                top: -10px;
                left: -10px;
            }
            .${this.controllerClassName} .resize.resize-topright {
                position: absolute;
                top: -10px;
                right: -10px;
            }
            .${this.controllerClassName} .resize.resize-bottomleft {
                position: absolute;
                bottom: -10px;
                left: -10px;
            }
            .${this.controllerClassName} .resize.resize-bottomright {
                position: absolute;
                bottom: -10px;
                right: -10px;
            }
            .${this.controllerClassName} .rotate {
                position: absolute;
                top: -50px;
                left: calc(50% - 15px);
                width: 30px;
                height: 30px;
                background-color: #fff;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .${this.controllerClassName} .delete {
                position: absolute;
                bottom: -50px;
                left: calc(50% + 40px);
                width: 30px;
                height: 30px;
                background-color: #fff;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        `;

        this.controllerTemplate = `
            <div class="${this.controllerClassName}--container">
                <div class="${this.controllerClassName}">
                    <div class="dot resize resize-topleft"><div class="circle"></div></div>
                    <div class="dot resize resize-topright"><div class="circle"></div></div>
                    <div class="dot resize resize-bottomleft"><div class="circle"></div></div>
                    <div class="dot resize resize-bottomright"><div class="circle"></div></div>
                    <div class="dot rotate"><i class="fa-solid fa-rotate"></i></div>
                    <div class="dot rotate shadow" style="visibility: hidden;"><i class="fa-solid fa-rotate"></i></div>
                    <div class="dot delete"><i class="fa-solid fa-trash"></i></div>
                    <div class="dot delete shadow" style="visibility: hidden;"><i class="fa-solid fa-trash"></i></div>
                </div>
            </div>
        `;
    }

    setRatio(r: number) {
        this.ratio = r;
    }

    setValue(x?: number, y?: number, angle?: number, w?: number, h?: number) {
        this.x = x !== undefined ? x : this.x;
        this.y = y !== undefined ? y : this.y;
        this.angle = angle !== undefined ? angle : this.angle;
        this.w = w !== undefined ? w : this.w;
        this.h = h !== undefined ? h : this.h;
    }

    exportData() {
        return [this.x, this.y, this.angle, this.w, this.h];
    }

    isCollided() {
        return this.collided;
    }

    setIsCollided(is: boolean) {
        this.collided = is;
    }

    isDeleted() {
        return this.deleted;
    }

    setDeleted(is: boolean) {
        this.deleted = is;
    }

    addController() {
        this.$ele2.after(this.controllerTemplate);
        this.addCSSForController()
            .handleElementGoOffScreen("." + this.controllerClassName + " .rotate", "." + this.controllerClassName + " .rotate.shadow", "rotate")
            .handleElementGoOffScreen("." + this.controllerClassName + " .delete", "." + this.controllerClassName + " .delete.shadow", "delete");
        return this;
    }

    addCSSForController() {
        const styleElement = document.createElement('style');
        styleElement.textContent = this.css;
        document.head.appendChild(styleElement);
        return this;
    }

    delete(cb: () => void) {
        const handleDelete = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            cb();
            this.setDeleted(true);
        };
        $(this.ele1 + "--controller .delete").on("touchstart", handleDelete);
        $(this.ele1 + "--controller .delete").on("mousedown", handleDelete);
        return this;
    }

    repositionElement(x: number, y: number) {
        const controllerWrapper = document.querySelector(this.ele1 + '--controller--container') as HTMLElement;
        const boxWrapper = document.querySelector(this.ele1) as HTMLElement;

        boxWrapper.style.left = x + 'px';
        boxWrapper.style.top = y + 'px';
        controllerWrapper.style.left = (x + (this.imgFrame?.offsetLeft || 0) + 3) + 'px';
        controllerWrapper.style.top = (y + (this.imgFrame?.offsetTop || 0) + 3) + 'px';
    }

    resize(w: number, h: number) {
        const controller = document.querySelector(this.ele1 + '--controller') as HTMLElement;
        const img = document.querySelector(this.ele1 + " > img") as HTMLImageElement;

        controller.style.width = w + 6 + 'px';
        controller.style.height = h + 6 + 'px';
        img.style.width = w + 'px';
    }

    rotateBox(deg: number) {
        const controllerWrapper = document.querySelector(this.ele1 + '--controller--container') as HTMLElement;
        const boxWrapper = document.querySelector(this.ele1) as HTMLElement;

        boxWrapper.style.transform = `rotate(${deg}deg)`;
        controllerWrapper.style.rotate = `${deg}deg`;
        (controllerWrapper.querySelector(".delete") as HTMLElement).style.rotate = `${-deg}deg`;
    }

    handleElementGoOffScreen(main: string, shadow: string, type: string) {
        const mainEle = document.querySelector(main) as HTMLElement;
        const shadowEle = document.querySelector(shadow) as HTMLElement;

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    shadowEle.style.visibility = "visible";
                    shadowEle.style.left = mainEle.style.left;
                    shadowEle.style.top = mainEle.style.top;

                    if (type === "rotate") {
                        this.isRotateOffScreen = true;
                    }
                } else {
                    shadowEle.style.visibility = "hidden";
                    if (type === "rotate") {
                        this.isRotateOffScreen = false;
                    }
                }
            });
        }, options);

        observer.observe(mainEle);

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