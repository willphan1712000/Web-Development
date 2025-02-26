import { ColorPicker, ColorPickerOptions } from "./ColorPicker";
import { ColorPickerMethod } from "./ColorPickerMethod";

export default class ColorPickerSingle extends ColorPickerMethod implements ColorPicker {
    private color: string;
    private container: string;
    private options: ColorPickerOptions;

    constructor(container: string, cb: (e: any) => void, options: ColorPickerOptions) {
        super();
        this.options = options;
        this.container = container;
        this.color = options.default;

        this.render(); // render the color picker

        this.clickBehavior(this.container); // set click behavior for color picker

        const color = document.querySelector(this.container + " #color") as HTMLInputElement;
        color.addEventListener("input", e => {
            const input = e.target as HTMLInputElement;
            this.setColor(input.value);
            cb(this.getColor());
        })

        $(this.container + " .colorPickerBox__reset").click(e => {
            e.stopPropagation();
            this.color = this.options.default
            cb(this.getColor());
        })
    }

    public getColor(): string {
        return this.color;
    }

    private setColor(color: string): void {
        this.color = this.hslToHex(Number(color), 100, 80);
    }

    private render() {
        const style = document.createElement("style");
        style.textContent = this.css();
        document.head.append(style);
        
        const $container = $(this.container);
        $container.append(this.html());
    }

    private html() : string {
        return `
            <div class="colorPickerBox">
                <div class="colorPickerBox__reset">
                    <span>Reset</span>
                </div>
                <div class="colorPickerBox__input">
                    <input id="color" class="color" type="range" min="0" max="360" value="0">
                </div>
            </div>
        `;
    }

    private css(): string {
        return `
            ${this.container} {
                position: relative;
            }
            ${this.container} .colorPickerBox {
                display: flex;
                flex-direction: row;
                position: absolute;
                align-items: center;
                justify-content: center;
                left: 110%;
                height: 70px;
                display: none;
                background: #fff;
                border-radius: 20px;
                padding: 10px;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px;
                z-index: 1;
            }
            ${this.container} .colorPickerBox__reset {
                display: ${this.options?.default == null ? "none" : "flex"};
                justify-content: center;
                align-items: center;
                height: fit-content;
                padding-right: 10px;
            }
            ${this.container} .colorPickerBox__input {
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
                gap: 10px;
            }
            ${this.container} .colorPickerBox .color {
                -webkit-appearance: none;
                appearance: none;
                height: 10px;
                border-radius: 20px;
                background: linear-gradient(to right, 
                    hsl(0, 100%, 50%), 
                    hsl(60, 100%, 50%), 
                    hsl(120, 100%, 50%), 
                    hsl(180, 100%, 50%), 
                    hsl(240, 100%, 50%), 
                    hsl(300, 100%, 50%), 
                    hsl(360, 100%, 50%)
                );
                outline: none;
                opacity: 0.9;
                transition: opacity 0.2s;
                border: none;
            }
        `;
    }
}