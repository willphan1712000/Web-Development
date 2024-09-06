import { ColorPicker, ColorPickerOptions } from "./ColorPicker";

type Gradient = {color1: string, color2: string, deg: string};

export default class ColorPickerDouble implements ColorPicker {
    private color: string;
    private gradient: Gradient;
    private container: string;
    private options: ColorPickerOptions;

    constructor(container: string, cb: (e: any) => void, options: ColorPickerOptions) {
        this.options = options;
        this.container = container;
        this.color = options.default;
        this.gradient = {
            color1: "0",
            color2: "0",
            deg: "0"
        }
        
        this.render();

        const $container = $(this.container);
        const $colorPicker = $(this.container + " .colorPickerBox");
        $container.click(e => {
            e.stopPropagation();
            if ($colorPicker.css('display') === 'none') {
                $colorPicker.css('display', 'flex');
            } else {
                $colorPicker.css('display', 'none');
            }
        })
        $("body").click(e => {
            e.stopPropagation();
            $colorPicker.css('display', 'none')
        })
        $colorPicker.click(e => {
            e.stopPropagation();
            $colorPicker.css('display', 'flex');
        })

        const color1 = document.querySelector(this.container + " #color1") as HTMLInputElement;
        color1.addEventListener("input", e => {
            const input = e.target as HTMLInputElement;
            this.gradient.color1 = input.value;
            this.setColor(this.gradient);
            cb(this.getColor());
        })

        const color2 = document.querySelector(this.container + " #color2") as HTMLInputElement;
        const deg = document.querySelector(this.container + " #deg") as HTMLInputElement;
        color2.addEventListener("input", e => {
            const input = e.target as HTMLInputElement;
            this.gradient.color2 = input.value;
            this.setColor(this.gradient);
            cb(this.getColor());
        })
        deg.addEventListener("input", e => {
            const input = e.target as HTMLInputElement;
            this.gradient.deg = input.value;
            this.setColor(this.gradient);
            cb(this.getColor());
        })

        $(".colorPickerBox__reset").click(e => {
            e.stopPropagation();
            this.color = this.options.default
            cb(this.getColor());
        })
    }

    public getColor(): string {
        return this.color
    }

    private setColor(color: Gradient): void {
        this.color = `linear-gradient(${color.deg}deg, ${this.hslToHex(Number(color.color2), 100, 80)}, ${this.hslToHex(Number(color.color1), 100, 80)})`;
    }

    private render() {
        const style = document.createElement("style");
        style.textContent = this.css();

        document.head.append(style);
        const $container = $(this.container);
        $container.append(this.html());
    }

    private html(): string {
        return `
            <div class="colorPickerBox">
                <div class="colorPickerBox__reset">
                    <span>Reset</span>
                </div>
                <div class="colorPickerBox__input">
                    <input id="color1" class="color1" type="range" min="0" max="360" value="0">
                    <input id="color2" class="color2" type="range" min="0" max="360" value="0">
                    <input id="deg" class="id" type="range" min="0" max="360" value="0">
                </div>
            </div>
        `;
    }

    private css() : string {
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
            ${this.container} .colorPickerBox .color1, ${this.container} .colorPickerBox .color2 {
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

    private hslToHex(h: number, s: number, l: number) : string {
        // Convert HSL to RGB
        s /= 100;
        l /= 100;
      
        let c = (1 - Math.abs(2 * l - 1)) * s;
        let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        let m = l - c / 2;
      
        let r, g, b;
        if (0 <= h && h < 60) {
            r = c;
            g = x;
            b = 0;
        } else if (60 <= h && h < 120) {
            r = x;
            g = c;
            b = 0;
        } else if (120 <= h && h < 180) {
            r = 0;
            g = c;
            b = x;
        } else if (180 <= h && h < 240) {
            r = 0;
            g = x;
            b = c;
        } else if (240 <= h && h < 300) {
            r = x;
            g = 0;
            b = c;
        } else {
            r = c;
            g = 0;
            b = x;
        }
      
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
      
        // Convert RGB to Hex
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }
    
}