import TransformController from "./TransformController";

type Dimension = [
    x: number,
    y: number,
    angle: number,
    w: number,
    h: number,
]

// Element 1 : Image Wrapper
// Element 2 : Image Frame
// Element 3 : Image element
// Element 4 : Controller
// <div className="frame"> (2)
//     <div className="wrapper"> (1)
//          <img className="img__preview" /> (3)
//     </div>
// </div>
// <div class="controller"></div> (4)

export default class Transform {
    private ele1!: HTMLElement; // Main element
    private ele2!: HTMLElement; // Container for image transformation

    private x!: number;
    private y!: number;
    private angle!: number;
    private w!: number;
    private h!: number;

    private wrapperClass!: string;
    private imgFrame!: HTMLElement;
    private controllerClassName!: string;
    private frameClass!: string;
    private isRotateOffScreen!: boolean;
    private img!: HTMLImageElement;
    private ratio!: number;
    private controllerContainer!: HTMLElement;
    private controller!: HTMLElement;

    constructor(ele1: HTMLElement, ele2?: HTMLElement, ele3?: string) {
        this.ele1 = ele1 // Element 1
        this.ele2 = ele2! // Element 2
        this.x = 0
        this.y = 0
        this.angle = 0
        this.w = 0
        this.h = 0

        if(this.ele1 === null) {
            throw new Error("wrapper elemenet is not defined or not rendered yet")
        }
        this.wrapperClass = "_" + (Date.now() + 5000).toString()
        $(this.ele1).addClass(this.wrapperClass)

        
        this.imgFrame = this.ele2! // Element 2
        if(this.imgFrame === null) {
            throw new Error("frame element is not defined or not rendered yet")
        }
        this.frameClass = "_" + (Date.now() - 5000).toString()
        $(this.ele2).addClass(this.frameClass)

        
        this.img = (this.ele1).querySelector("img") as HTMLImageElement; // Element 3
        if(this.img === null) {
            throw new Error("image element is not defined or not rendered yet")
        }
        this.ratio = this.img.clientWidth / this.img.clientHeight;
        
        this.controllerClassName = "_" + Date.now().toString();
        this.isRotateOffScreen = false;

        this.initialize()
    }

    private async initialize() {
        const transformController = new TransformController(this.wrapperClass, this.frameClass, this.controllerClassName);
        await transformController.addController()

        this.controllerContainer = document.querySelector("." + this.controllerClassName + '--container')!
        this.controller = document.querySelector("." + this.controllerClassName)!

        this.transform(); // add transform to image
        this.handleElementGoOffScreen("." + this.controllerClassName + " .rotate", "." + this.controllerClassName + " .rotate.shadow", "rotate").handleElementGoOffScreen("." + this.controllerClassName + " .delete", "." + this.controllerClassName + " .delete.shadow", "delete"); // add hanle go off screen
    }

    public reset(): void {
        const width = this.imgFrame.clientWidth
        const height = width / this.ratio
        this.resize(width, height);
        // this.repositionElement(100, 100 / this.ratio);
        this.repositionElement(width/2, this.imgFrame.clientHeight/2);
        this.setValue(0, 0, 0, width, height)
        this.rotateBox(0)
    }
    
    private setValue(x: number | undefined, y: number | undefined, angle:number | undefined, w: number | undefined, h: number | undefined) {
        this.x = (x !== undefined) ? x : this.x
        this.y = (y !== undefined) ? y : this.y
        this.angle = (angle !== undefined) ? angle : this.angle
        this.w = (w !== undefined) ? w : this.w
        this.h = (h !== undefined) ? h : this.h
    }

    public exportData(): Dimension {
        return [this.x, this.y, this.angle, this.w, this.h];
    }

    private repositionElement(x: number, y: number) : void {
        const controllerWrapper = this.controllerContainer
        const boxWrapper = this.ele1 as HTMLElement;

        boxWrapper.style.left = x + 'px';
        boxWrapper.style.top = y + 'px';
        controllerWrapper.style.left = (x + this.imgFrame.offsetLeft + 3) + 'px';
        controllerWrapper.style.top = (y + this.imgFrame.offsetTop + 3) + 'px';
    }

    private resize(w: number, h: number): void {
        const controller = this.controller;
        const img = this.img
        const wrapper = this.ele1

        controller.style.width = w + 3 + 'px';
        controller.style.height = h + 3 + 'px';
        img.style.width = w + 'px';
        wrapper.style.width = w + 'px';
        // img.style.height = h + 'px';
    }

    private rotateBox(deg: number): void {
        const controllerWrapper = this.controllerContainer;
        const boxWrapper = this.ele1;
        // const deleteEle = controllerWrapper.querySelector(".delete") as HTMLElemen

        boxWrapper.style.transform = `rotate(${deg}deg)`;
        controllerWrapper.style.rotate = `${deg}deg`;
        // deleteEle.style.rotate = `${-deg}deg`
    }

    private handleElementGoOffScreen(main: string, shadow: string, type: string): Transform {
        // This function is responsible for handling element going off the screen by moving it to the oppiste side if it disappears from the screen
        const mainEle = document.querySelector(main) as HTMLElement;
        const shadowEle = document.querySelector(shadow) as HTMLElement;
        
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1
        }
        
        const callback = (entries: any) => {
            entries.forEach((entry: any) => {
                switch(type) {
                    case 'rotate':
                        if(!entry.isIntersecting) {
                            mainEle.style.top = "auto";
                            mainEle.style.bottom = "-50px";
                            this.isRotateOffScreen = true;
                        } else {
                            mainEle.style.bottom = "auto";
                            mainEle.style.top = "-50px";
                            this.isRotateOffScreen = false;
                        }
                        break
                    case 'delete':
                        if(!entry.isIntersecting) {
                            mainEle.style.bottom = "auto";
                            mainEle.style.top = "-50px";
                        } else {
                            mainEle.style.top = "auto";
                            mainEle.style.bottom = "-50px";
                        }
                        break
                }
            })
        }
        
        const observer = new IntersectionObserver(callback, options);
        observer.observe(shadowEle)
        return this
    }

    public transform() : Transform {
        const controllerWrapper = this.controllerContainer;
        const boxWrapper = this.ele1;

        const minWidth = 40;
        const minHeight = 40;

        var initX: number, initY : number, mousePressX : number, mousePressY : number, initW : number, initH : number, initRotate: number;

        function getCurrentRotation(el: any) {
            var st = window.getComputedStyle(el, null);
            var tm = st.getPropertyValue("-webkit-transform") ||
                st.getPropertyValue("-moz-transform") ||
                st.getPropertyValue("-ms-transform") ||
                st.getPropertyValue("-o-transform") ||
                st.getPropertyValue("transform")
            "none";
            if (tm != "none") {
                var values = tm.split('(')[1].split(')')[0].split(',');
                var angle = Math.round(Math.atan2(Number(values[1]), Number(values[0])) * (180 / Math.PI));
                return (angle < 0 ? angle + 360 : angle);
            }
            return 0;
        }

        function mousedownCb(event: any) {
            event.target.classList.add("show")
            event.target.querySelector(".circle").classList.add("show")
        }
        
        function mouseupCb(event: any) {
            event.target.classList.remove("show")
            event.target.querySelector(".circle").classList.remove("show")
        }

        // drag support
        const handleDrag = (event: any, type: 'desk' | 'touch') => {
            // event.preventDefault()
            event.stopPropagation()
            let initX = boxWrapper.offsetLeft;
            let initY = boxWrapper.offsetTop;
            let mousePressX = (type === 'desk') ? event.clientX : event.touches[0].clientX;
            let mousePressY = (type === 'desk') ? event.clientY : event.touches[0].clientY;
            let [,,, w, h] = this.exportData();
    
            const eventMoveHandler = (event: any) => {
                let x = (type === 'desk') ? event.clientX : event.touches[0].clientX
                let y = (type === 'desk') ? event.clientY : event.touches[0].clientY
                var posX = initX + (x - mousePressX)
                var posY = initY + (y - mousePressY)
                this.repositionElement(posX, posY);
                this.setValue(posX - w / 2, posY - h / 2, undefined, undefined, undefined)
            }
    
            if(type === 'desk') {
                controllerWrapper.addEventListener('mousemove', eventMoveHandler, false);
                window.addEventListener('mouseup', function eventEndHandler() {
                    controllerWrapper.removeEventListener('mousemove', eventMoveHandler, false);
                    window.removeEventListener('mouseup', eventEndHandler);
                }, false);
            } else {
                controllerWrapper.addEventListener('touchmove', eventMoveHandler, {'passive': true});
                window.addEventListener('touchend', function eventEndHandler() {
                    controllerWrapper.removeEventListener('touchmove', eventMoveHandler);
                    window.removeEventListener('touchend', eventEndHandler);
                }, false);
            }
        }
        controllerWrapper.addEventListener('mousedown', e => handleDrag(e, 'desk'), false);
        controllerWrapper.addEventListener('touchstart', e => handleDrag(e, 'touch'), {'passive': true});
        // done drag support

        // handle resize
        // var rightMid = document.getElementById("right-mid");
        // var leftMid = document.getElementById("left-mid");
        // var topMid = document.getElementById("top-mid");
        // var bottomMid = document.getElementById("bottom-mid");

        var leftTop = document.querySelector("." + this.controllerClassName + " .resize-topleft") as HTMLElement;
        var rightTop = document.querySelector("." + this.controllerClassName + " .resize-topright") as HTMLElement;
        var rightBottom = document.querySelector("." + this.controllerClassName + " .resize-bottomright") as HTMLElement;
        var leftBottom = document.querySelector("." + this.controllerClassName + " .resize-bottomleft") as HTMLElement;

        const resizeHandler = (event: any, left = false, top = false, xResize = false, yResize = false, type: 'desk' | 'touch'
        ) => {
            // event.preventDefault()
            event.stopPropagation()
            initX = boxWrapper.offsetLeft;
            initY = boxWrapper.offsetTop;
            mousePressX = (type === 'desk') ? event.clientX : event.touches[0].clientX;
            mousePressY = (type === 'desk') ? event.clientY : event.touches[0].clientY;

            initW = this.img.offsetWidth;
            initH = this.img.offsetHeight;

            initRotate = getCurrentRotation(boxWrapper);
            
            var initRadians = initRotate * Math.PI / 180;
            var cosFraction = Math.cos(initRadians);
            var sinFraction = Math.sin(initRadians);
            mousedownCb(event)
            var vectorC = [mousePressX - initX - this.imgFrame.offsetLeft, mousePressY - initY - this.imgFrame.offsetTop]
            const eventMoveHandler = (event: any) => {
                var x = ((type === 'desk') ? event.clientX : event.touches[0].clientX)
                var y = ((type === 'desk') ? event.clientY : event.touches[0].clientY)
                var wDiff = x - mousePressX
                var hDiff = y - mousePressY
                var vectorD = [wDiff, hDiff]
                const c = (vectorC[0] * vectorD[0] + vectorC[1] * vectorD[1]) / (vectorC[0] * vectorC[0] + vectorC[1] * vectorC[1])
                var vectorH = [c * vectorC[0], c * vectorC[1]]
                // var rotatedWDiff = cosFraction * wDiff + sinFraction * hDiff;
                // var rotatedHDiff = cosFraction * hDiff - sinFraction * wDiff;
                var rotatedWDiff = cosFraction * vectorH[0] + sinFraction * vectorH[1];
                var rotatedHDiff = cosFraction * vectorH[1] - sinFraction * vectorH[0];
                rotatedHDiff = (rotatedHDiff*rotatedWDiff > 0) ? (rotatedWDiff / this.ratio) : (- rotatedWDiff / this.ratio);

                var newW = initW, newH = initH, newX = initX, newY = initY;

                if (xResize) {
                    if (left) {
                        newW = initW - rotatedWDiff;
                        if (newW < minWidth) {
                        newW = minWidth;
                        rotatedWDiff = initW - minWidth;
                        }
                    } else {
                        newW = initW + rotatedWDiff;
                        if (newW < minWidth) {
                        newW = minWidth;
                        rotatedWDiff = minWidth - initW;
                        }
                    }
                    newX += 0.5 * rotatedWDiff * cosFraction;
                    newY += 0.5 * rotatedWDiff * sinFraction;
                }

                if (yResize) {
                    if (top) {
                        newH = initH - rotatedHDiff;
                        if (newH < minHeight) {
                        newH = minHeight;
                        rotatedHDiff = initH - minHeight;
                        }
                    } else {
                        newH = initH + rotatedHDiff;
                        if (newH < minHeight) {
                        newH = minHeight;
                        rotatedHDiff = minHeight - initH;
                        }
                    }
                    newX -= 0.5 * rotatedHDiff * sinFraction;
                    newY += 0.5 * rotatedHDiff * cosFraction;
                }

                this.resize(newW, newH);
                this.repositionElement(newX, newY);
                this.setValue(newX - newW / 2, newY - newH / 2, undefined, newW, newH)
            }

            if(type === 'desk') {
                window.addEventListener('mousemove', eventMoveHandler, false);
                window.addEventListener('mouseup', function eventEndHandler() {
                    mouseupCb(event)
                    window.removeEventListener('mousemove', eventMoveHandler, false);
                    window.removeEventListener('mouseup', eventEndHandler);
                }, false);
            } else {
                window.addEventListener('touchmove', eventMoveHandler, {'passive': true});
                window.addEventListener('touchend', function eventEndHandler() {
                    mouseupCb(event)
                    window.removeEventListener('touchmove', eventMoveHandler, false);
                    window.removeEventListener('touchend', eventEndHandler);
                }, false);
            }
        }


        // rightMid.addEventListener('mousedown', e => resizeHandler(e, false, false, true, false));
        // leftMid.addEventListener('mousedown', e => resizeHandler(e, true, false, true, false));
        // topMid.addEventListener('mousedown', e => resizeHandler(e, false, true, false, true));
        // bottomMid.addEventListener('mousedown', e => resizeHandler(e, false, false, false, true));
        leftTop.addEventListener('mousedown', e => resizeHandler(e, true, true, true, true, 'desk'));
        rightTop.addEventListener('mousedown', e => resizeHandler(e, false, true, true, true, 'desk'));
        rightBottom.addEventListener('mousedown', e => resizeHandler(e, false, false, true, true, 'desk'));
        leftBottom.addEventListener('mousedown', e => resizeHandler(e, true, false, true, true, 'desk'));

        leftTop.addEventListener('touchstart', e => resizeHandler(e, true, true, true, true, 'touch'), {'passive': true});
        rightTop.addEventListener('touchstart', e => resizeHandler(e, false, true, true, true, 'touch'), {'passive': true});
        rightBottom.addEventListener('touchstart', e => resizeHandler(e, false, false, true, true, 'touch'), {'passive': true});
        leftBottom.addEventListener('touchstart', e => resizeHandler(e, true, false, true, true, 'touch'), {'passive': true});

        // handle rotation
        var rotate = document.querySelector("." + this.controllerClassName + " .rotate") as HTMLElement;
        const handleRotate = (event: any, type: 'desk' | 'touch') => {
            // event.preventDefault()
            event.stopPropagation()
    
            initX = event.target.offsetLeft;
            initY = event.target.offsetTop;
            mousePressX = (type === 'desk') ? event.clientX : event.touches[0].clientX;
            mousePressY = (type === 'desk') ? event.clientY : event.touches[0].clientY;
    
    
            var arrow = this.controller as HTMLElement;
            var arrowRects = arrow.getBoundingClientRect();
            var arrowX = arrowRects.left + arrowRects.width / 2;
            var arrowY = arrowRects.top + arrowRects.height / 2;
    
            const compensation = this.isRotateOffScreen ? 180 : 0

            const eventMoveHandler = (event: any) => {
                let x = (type === 'desk') ? event.clientX : event.touches[0].clientX
                let y = (type === 'desk') ? event.clientY : event.touches[0].clientY
                var angle = Math.atan2(y - arrowY, x - arrowX) + Math.PI / 2;
                angle *= 180 / Math.PI
                angle += compensation
                this.rotateBox(angle);
                this.setValue(undefined, undefined, angle, undefined, undefined)
            }
            if(type === 'desk') {
                window.addEventListener('mousemove', eventMoveHandler, false);
    
                window.addEventListener('mouseup', function eventEndHandler() {
                    window.removeEventListener('mousemove', eventMoveHandler, false);
                    window.removeEventListener('mouseup', eventEndHandler);
                }, false);
            } else {
                window.addEventListener('touchmove', eventMoveHandler, {'passive': true});
    
                window.addEventListener('touchend', function eventEndHandler() {
                    window.removeEventListener('touchmove', eventMoveHandler, false);
                    window.removeEventListener('touchend', eventEndHandler);
                }, false);
            }
        }
        rotate.addEventListener('mousedown', e => handleRotate(e, 'desk'), false);
        rotate.addEventListener('touchstart', e => handleRotate(e, 'touch'), {'passive': true});

        this.reset()
        return this
    }

    public cleanup(): Transform {
        window.removeEventListener('mousedown', () => {})
        window.removeEventListener('mouseup', () => {})
        window.removeEventListener('mousemove', () => {})

        window.removeEventListener('touchstart', () => {})
        window.removeEventListener('touchend', () => {})
        window.removeEventListener('touchmove', () => {})
        return this
    }
}