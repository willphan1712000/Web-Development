export default class TransformController {
    private wrapper!: string;
    private frame!: string;
    private controller!: string;

    constructor(wrapper: string, frame: string, controller: string) {
        this.wrapper = wrapper;
        this.frame = frame;
        this.controller = controller;
    }

    public addController() : void {
        const styleElement = document.createElement('style')
        styleElement.textContent = this.css()
        document.head.appendChild(styleElement)

        $(this.frame).after(this.controllerTemplate())
    }

    private css(): string {
        return `
        ${this.wrapper} {
            position: absolute;
            transform-origin: top left;
            user-select: none;
        }
        ${this.wrapper} > img {
            object-fit: contain;
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            z-index: 1;
            transform: translate(-50%, -50%)
        }
        .${this.controller}--container {
            position: absolute;
            transform-origin: top left;
            user-select: none;
        }
        .${this.controller} {
            position: absolute;
            user-select: none;
            border: solid 3px #6924d5;
            z-index: 1;
            top: 0;
            left: 0;
            transform: translate(-50%, -50%);
        }
        .${this.controller} .resize {
            background-color: #fff;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            transition: all .1s linear;
        }
        .${this.controller} .resize.show {
            background-color: #6924d5;
        }
        .${this.controller} .resize > .circle {
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
        .${this.controller} .resize > .circle.show {
            visibility: visible;
        }
        .${this.controller} .resize.resize-topleft {
            position: absolute;
            top: -10px;
            left: -10px;
        }
        .${this.controller} .resize.resize-topright {
            position: absolute;
            top: -10px;
            right: -10px;
        }
        .${this.controller} .resize.resize-bottomleft {
            position: absolute;
            bottom: -10px;
            left: -10px;
        }
        .${this.controller} .resize.resize-bottomright {
            position: absolute;
            bottom: -10px;
            right: -10px;
        }
        .${this.controller} .rotate {
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
        .${this.controller} .delete {
            position: absolute;
            bottom: -50px;
            left: calc(50% + 40px);
            width: 30px;
            height: 30px;
            background-color: #fff;
            border-radius: 50%;
            display: none;
            justify-content: center;
            align-items: center;
        }
    `
    }

    private controllerTemplate(): string { 
        return `
            <div class="${this.controller}--container">
                <div class="${this.controller}">
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
            `
    }
}