export type OptionsOption = {
    default: string,
    list: string[],
    representative: string
}

export class Options {
    private options: OptionsOption;
    private list: string[];
    private container: string;
    private font: string;

    constructor(container: string, cb: (e:any) => void, options: OptionsOption) {
        this.container = container;
        this.options = options;
        this.list = options.list;
        this.font = options.default;

        this.render();

        const $container = $(this.container);
        const $list = $(this.container + " .list_wrapper");
        $container.click(e => {
            e.stopPropagation();
            if ($list.css('display') === 'none') {
                $list.css('display', 'flex');
            } else {
                $list.css('display', 'none');
            }
        })
        $("body").click(e => {
            e.stopPropagation();
            $list.css('display', 'none')
        })
        $list.click(e => {
            e.stopPropagation();
            $list.css('display', 'flex');
        })

        $(this.container + " .font-element").click(e => {
            e.stopPropagation();
            this.setFont(e.target.getAttribute("data-font")!);
            cb(e.target.getAttribute("data-font"));
        })
        
        $(this.container + " .list_reset").click(e => {
            e.stopPropagation();
            this.setFont(this.options.default);
            cb(this.getFont());
        })
    }

    public getFont(): string {
        return this.font;
    }

    private setFont(font : string) : void {
        this.font = font;
    }

    private render(): void {
        const style = document.createElement("style");
        style.textContent = this.css();
        document.head.append(style);
        
        const $container = $(this.container);
        $container.append(this.html());
    }

    private html(): string {
        let list = '';
        this.list.forEach(e => {
            list += `<div data-font="${e}" class="font-element" style="font-family: ${e}">${this.options.representative}</div>`;
        })
        return `
            <div class="list_wrapper">
                <div class="list_reset">Reset</div>
                ${list}
            </div>
        `
    }

    private css(): string {
        return `
            ${this.container} {
                position: relative;
            }
            ${this.container} .list_wrapper {
                display: flex;
                flex-direction: row;
                position: absolute;
                align-items: center;
                left: 110%;
                height: 70px;
                display: none;
                background: #fff;
                border-radius: 20px;
                padding: 10px;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px;
                z-index: 1;
                width: 250px;
                overflow-y: hidden;
                overflow-x: auto;
            }
            ${this.container} .list_wrapper::-webkit-scrollbar {
                display: none;
            }
            ${this.container} .list_wrapper .list_reset {
                display: ${this.options?.default == null ? "none" : "flex"};
                justify-content: center;
                align-items: center;
                height: fit-content;
                padding-right: 10px;
            }
            ${this.container} .list_wrapper > .font-element {
                padding: 12px;
                font-size: 35px;
            }
        `;
    }
}