export type RangeSliderOptions = {
    default?: number,
    unit?: string,
    range?: Array<number>
}

export class RangeSlider {
    private options: any | null;
    private value: number;
    private container: string;

    constructor(container: string, cb: (e: any) => void, options: RangeSliderOptions) {
        this.options = options;
        this.value = this.options?.default;
        this.container = container;

        this.css();
        this.render();

        const $container = $(this.container);
        const $rangeSlider = $(this.container + " .rangeSliderBox");
        $container.click(e => {
            e.stopPropagation();
            if ($rangeSlider.css('display') === 'none') {
                $rangeSlider.css('display', 'flex');
            } else {
                $rangeSlider.css('display', 'none');
            }
        })
        $("body").click(e => {
            e.stopPropagation();
            $rangeSlider.css('display', 'none')
        })
        $rangeSlider.click(e => {
            e.stopPropagation();
            $rangeSlider.css('display', 'flex');
        })

        const range = document.querySelector(this.container + " #range") as HTMLInputElement;
        const showRange = document.querySelector(this.container + " #showRange") as HTMLInputElement;

        range.addEventListener("input", e => {
            const input = e.target as HTMLInputElement;
            this.setValue(Number(input.value));

            cb(this.getValue());
            showRange.value = this.getValue() + this.options?.unit;
        })
        
        $(".rangeSliderBox__reset").click(e => {
            e.stopPropagation();
            this.setValue(this.options?.default);
            
            cb(this.getValue());
            showRange.value = this.getValue() + this.options?.unit;
            range.value = this.getValue() + '';
        })
    }

    public getValue(): number {
        return this.value;
    }

    public setValue(value: number) : void {
        this.value = value;
    }

    private render() {
        const $container = $(this.container);
        $container.append(this.html());
    }

    private html() {
        return `
            <div class="rangeSliderBox">
                <div class="rangeSliderBox__reset">
                    <span>Reset</span>
                </div>
                <div class="rangeSliderBox__input">
                    <input id="showRange" class="showRange" type="text" value="${this.value + this.options?.unit}">
                    <input id="range" class="range" type="range" min="${this.options?.range[0]}" max="${this.options?.range[1]}" value="${this.value}">
                </div>
            </div>
        `;
    }

    private css() {
        const css = `
            ${this.container} {
                position: relative;
            }
            ${this.container} .rangeSliderBox {
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
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px ;
            }
            ${this.container} .rangeSliderBox__reset {
                display: ${this.options?.default == null ? "none" : "flex"};
                justify-content: center;
                align-items: center;
                height: fit-content;
                padding-right: 10px;
            }
            ${this.container} .rangeSliderBox__input {
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
                gap: 10px;
            }
            ${this.container} .rangeSliderBox .range {
                height: 10px;
                border-radius: 20px;
                outline: none;
                opacity: 0.9;
                transition: opacity 0.2s;
                border: none;
            }
            ${this.container} .rangeSliderBox .showRange {
                border: none;
            }
        `;

        const style = document.createElement("style");
        style.textContent = css;
        document.head.append(style);
    }
}