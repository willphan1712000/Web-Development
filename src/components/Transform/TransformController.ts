import $ from 'jquery'

const rotate = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z"/></svg>'

const trash = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>'

export default class TransformController {
    private wrapper!: string;
    private frame!: string;
    private controller!: string;

    constructor(wrapper: string, frame: string, controller: string) {
        this.wrapper = wrapper;
        this.frame = frame;
        this.controller = controller;
    }

    public addController() : Promise<void> {
        return new Promise((res) => {
            const styleElement = document.createElement('style')
            styleElement.textContent = this.css()
            document.head.appendChild(styleElement)
    
            $("." + this.frame).after(this.controllerTemplate())
            res()
        })
    }

    private css(): string {
        return `
        .${this.wrapper} {
            position: absolute;
            transform-origin: top left;
            user-select: none;
        }
        .${this.wrapper} > img {
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
                    <div class="dot rotate">${rotate}</div>
                    <div class="dot rotate shadow" style="visibility: hidden;">${rotate}</div>
                    <div class="dot delete">${trash}</div>
                    <div class="dot delete shadow" style="visibility: hidden;">${trash}</div>
                </div>
            </div>
            `
    }
}