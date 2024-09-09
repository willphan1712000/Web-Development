import TransformController from "./TransformController";

type Dimension = [
    x: number,
    y: number,
    angle: number,
    w: number,
    h: number,
]

export default class Transform {
    private ele1!: string; // Main element
    private ele2!: string; // Container for image transformation
    private collided!: boolean;
    private deleted!: boolean;
    private x!: number;
    private y!: number;
    private angle!: number;
    private w!: number;
    private h!: number;
    private $ele2!: JQuery<HTMLElement>;
    private imgFrame!: HTMLElement;
    private controllerClassName!: string;
    private isRotateOffScreen!: boolean;
    private img!: HTMLImageElement;
    private ratio!: number;
    private transformController!: TransformController;

    constructor(ele1: string, ele2?: string | undefined, ele3?: string | undefined) {
        this.ele1 = ele1,
        this.ele2 = ele2!,
        this.collided = false
        this.deleted = true
        this.x = 0
        this.y = 0
        this.angle = 0
        this.w = 0
        this.h = 0
        this.$ele2 = $(this.ele2);
        this.imgFrame = document.querySelector(this.ele2)!;
        this.controllerClassName = this.ele1.substring(1) + '--controller';
        this.isRotateOffScreen = false;
        this.img = document.querySelector(this.ele1 + " > img") as HTMLImageElement;
        this.ratio = this.img.width / this.img.height;
        this.transformController = new TransformController(this.ele1, this.ele2, this.controllerClassName);

        this.reset() // reset image to original
        this.transformController.addController(); // add controller to image
        this.transform(); // add transform to image
        this.handleElementGoOffScreen("." + this.controllerClassName + " .rotate", "." + this.controllerClassName + " .rotate.shadow", "rotate").handleElementGoOffScreen("." + this.controllerClassName + " .delete", "." + this.controllerClassName + " .delete.shadow", "delete"); // add hanle go off screen
    }

    public reset(): void {
        $(this.ele1 + "--controller--container").remove(); // kill previous controller if exists
        (document.querySelector(this.ele1) as HTMLElement).style.transform = `rotate(${0}deg)`; // reset image to 0 deg
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

    private isCollided() : boolean {
        return this.collided
    }

    private setIsCollided(is : boolean) {
        this.collided = is
    }

    private isDeleted() : boolean {
        return this.deleted
    }

    private setDeleted(is : boolean): void {
        this.deleted = is
    }

    private delete(cb: () => void) {
        const handleDelete = (e: any) => {
            e.preventDefault()
            e.stopPropagation()
            cb()
            this.setDeleted(true)
        }
        $(this.ele1 + "--controller .delete").on("touchstart", e => handleDelete(e))
        $(this.ele1 + "--controller .delete").on("mousedown", e => handleDelete(e))
        return this
    }

    private repositionElement(x: number, y: number) : void {
        const controllerWrapper = document.querySelector(this.ele1 + '--controller--container') as HTMLElement;
        const boxWrapper = document.querySelector(this.ele1) as HTMLElement;

        boxWrapper.style.left = x + 'px';
        boxWrapper.style.top = y + 'px';
        controllerWrapper.style.left = (x + this.imgFrame.offsetLeft + 3) + 'px';
        controllerWrapper.style.top = (y + this.imgFrame.offsetTop + 3) + 'px';
    }

    private resize(w: number, h: number): void {
        const controller = document.querySelector(this.ele1 + '--controller') as HTMLElement;
        const img = document.querySelector(this.ele1 + " > img") as HTMLElement;

        controller.style.width = w + 6 + 'px';
        controller.style.height = h + 6 + 'px';
        img.style.width = w + 'px';
        // img.style.height = h + 'px';
    }

    private rotateBox(deg: number): void {
        const controllerWrapper = document.querySelector(this.ele1 + '--controller--container') as HTMLElement;
        const boxWrapper = document.querySelector(this.ele1) as HTMLElement;
        const deleteEle = controllerWrapper.querySelector(".delete") as HTMLElement;

        boxWrapper.style.transform = `rotate(${deg}deg)`;
        controllerWrapper.style.rotate = `${deg}deg`;
        deleteEle.style.rotate = `${-deg}deg`
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
        const controller = document.querySelector(this.ele1 + '--controller') as HTMLElement;
        const controllerWrapper = document.querySelector(this.ele1 + '--controller--container') as HTMLElement;
        const boxWrapper = document.querySelector(this.ele1) as HTMLElement;

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
            event.preventDefault()
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
                controllerWrapper.addEventListener('touchmove', eventMoveHandler, false);
                window.addEventListener('touchend', function eventEndHandler() {
                    controllerWrapper.removeEventListener('touchmove', eventMoveHandler, false);
                    window.removeEventListener('touchend', eventEndHandler);
                }, false);
            }
        }
        controllerWrapper.addEventListener('mousedown', e => handleDrag(e, 'desk'), false);
        controllerWrapper.addEventListener('touchstart', e => handleDrag(e, 'touch'), false);
        // done drag support

        // handle resize
        // var rightMid = document.getElementById("right-mid");
        // var leftMid = document.getElementById("left-mid");
        // var topMid = document.getElementById("top-mid");
        // var bottomMid = document.getElementById("bottom-mid");

        var leftTop = document.querySelector(this.ele1 + "--controller .resize-topleft") as HTMLElement;
        var rightTop = document.querySelector(this.ele1 + "--controller .resize-topright") as HTMLElement;
        var rightBottom = document.querySelector(this.ele1 + "--controller .resize-bottomright") as HTMLElement;
        var leftBottom = document.querySelector(this.ele1 + "--controller .resize-bottomleft") as HTMLElement;

        const resizeHandler = (event: any, left = false, top = false, xResize = false, yResize = false, type: 'desk' | 'touch'
        ) => {
            event.preventDefault()
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
                window.addEventListener('touchmove', eventMoveHandler, false);
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

        leftTop.addEventListener('touchstart', e => resizeHandler(e, true, true, true, true, 'touch'));
        rightTop.addEventListener('touchstart', e => resizeHandler(e, false, true, true, true, 'touch'));
        rightBottom.addEventListener('touchstart', e => resizeHandler(e, false, false, true, true, 'touch'));
        leftBottom.addEventListener('touchstart', e => resizeHandler(e, true, false, true, true, 'touch'));

        // handle rotation
        var rotate = document.querySelector(this.ele1 + "--controller .rotate") as HTMLElement;
        const handleRotate = (event: any, type: 'desk' | 'touch') => {
            event.preventDefault()
            event.stopPropagation()
    
            initX = event.target.offsetLeft;
            initY = event.target.offsetTop;
            mousePressX = (type === 'desk') ? event.clientX : event.touches[0].clientX;
            mousePressY = (type === 'desk') ? event.clientY : event.touches[0].clientY;
    
    
            var arrow = document.querySelector(this.ele1 + '--controller') as HTMLElement;
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
                window.addEventListener('touchmove', eventMoveHandler, false);
    
                window.addEventListener('touchend', function eventEndHandler() {
                    window.removeEventListener('touchmove', eventMoveHandler, false);
                    window.removeEventListener('touchend', eventEndHandler);
                }, false);
            }
        }
        rotate.addEventListener('mousedown', e => handleRotate(e, 'desk'), false);
        rotate.addEventListener('touchstart', e => handleRotate(e, 'touch'), false);

        this.resize(200, 200 / this.ratio);
        this.repositionElement(100, 100 / this.ratio);
        this.setValue(0, 0, 0, 200, 200 / this.ratio)
        return this
    }
}