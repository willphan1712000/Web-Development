// W.js is module created by Will - Thanh Nha Phan - Kennesaw State University
// This module helps frontend development to be easily deployed

function $$(ele1, ele2, ele3, ele4) {
    const p = arguments.length
    if(p === 1) {
        return new W1(ele1)
    }
    else if (p === 2) {
        return new W2(ele1, ele2)
    }
    else if(p === 3) {
        return new W3(ele1, ele2, ele3)
    }
    else if(p === 4) {
        return new W4(ele1, ele2, ele3, ele4)
    }
}

function W1(ele1) {
    this.ele1 = ele1
    const thisObject = this
    this.passShowHide = function() {
        return new PassShowHide(this.ele1)
    }
    this.transform = function() {
        return new Transform(this.ele1, undefined, undefined)
    }
    this.addSpinner = function() {
        return new Spinner(this.ele1)
    }
    this.format = function() {
        return new Format(this.ele1)
    }
}

function W2(ele1, ele2) {
    this.ele1 = ele1
    this.ele2 = ele2
    const thisObject = this
    this.toggle = function() {
        return new Toggle(this.ele1, this.ele2)
    }
    this.upload = function() {
        return new Upload(this.ele1, this.ele2)
    }
    this.copyToClipboard = function() {
        return new CopyToClipboard(this.ele1, this.ele2)
    }
}
function W3(ele1, ele2, ele3) {
    this.ele1 = ele1
    this.ele2 = ele2
    this.ele3 = ele3
    const thisObject = this
    this.transform = function() {
        return new Transform(thisObject.ele1, thisObject.ele2, thisObject.ele3)
    }

    this.table = function() {
        return new Table(this.ele1, this.ele2, this.ele3)
    }

    this.transformDesktop = function() {
        return new TransformDesktop(this.ele1, this.ele2, this.ele3)
    }
}
function W4(ele1, ele2, ele3, ele4) {
    this.ele1 = ele1
    this.ele2 = ele2
    this.ele3 = ele3
    this.ele4 = ele4
    const thisObject = this
}

function Table(location, header, data) {
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
    this.location = location
    this.header = header
    this.data = data
    const thisObject = this

    this.create = function() {
        $(this.location).append('<table><tr></tr></table>')
        for(const headerKey in this.header) {
            if(this.header.hasOwnProperty(headerKey)) {
                $(this.location + " table tr").append(`<th>${this.header[headerKey]}</th>`)
            }
        }
        let counter = 0
        for(const dataKey in this.data) {
            counter++
            let row = `<tr><th>${counter}</th>`, eachData = this.data[dataKey]
            for(const eachKey in eachData) {
                row += `<th>${eachData[eachKey]}</th>`
            }
            row += `</tr>`
            $(this.location + " table").append(row)
        }
        return this
    }
}

function Spinner(ele1) {
    this.ele1 = ele1 // Element that the spinner will be added to
    const thisObject = this
    this.show = function() {
        $(this.ele1 + " .loader").addClass("spinner")
        return this
    }
    this.hide = function() {
        $(this.ele1 + " .loader").removeClass("spinner")
        return this
    }
    this.singleSpinner = function() {
        let styleElement = document.createElement("style")
        styleElement.textContent = `
        .spinner {
            position: absolute;
            top: 50%;
            left: 50%;
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
        }`
        document.head.appendChild(styleElement)
        $(this.ele1).append(`<div class="loader"></div>`)
        $(this.ele1).css("position", "relative")
        return this
    }
    this.gradientSpinner = function() {
        $(this.ele1).append(`<div class="loader spinner"></div>`)
        return this
    }
}

function PassShowHide(input) {
    this.input = input
    const $input= $(this.input)
    this.run = function() {
        const inputWidth = $input.innerWidth()
        const inputHeight = $input.innerHeight()
        $input.after('<div style="position: relative;"></div>')
        $(input + " + div").append($input.html(self))
        $input.after(`<i class="fa-solid fa-eye eye" style="position: absolute;left: ${inputWidth - (18+3)}px; top: ${(inputHeight-16)/2}px; cursor: pointer; color: #333;"></i>`)
        const $eye = $(this.input).next()
        $eye.click(function() {
            if($input.attr('type') === "password") {
                $input.attr('type', 'text')
                $(this).css({
                    color: "green"
                })
            } else {
                $input.attr('type', 'password')
                $(this).css({
                    color: "#333"
                })
            }
        })
        return this
    }
}

function Upload(ele1, ele2) {
    this.ele1 = ele1 // element to click
    this.ele2 = ele2 // input element to click
    const $ele1 = $(this.ele1)
    const $ele2 = $(this.ele2)
    const thisObject = this

    this.openFile = function() {
        $ele1.click(e => {
            e.stopPropagation()
            $ele2.click()
        })
        return this
    }

    this.fileHandling = function(e, cb) {
        const {target} = e
        const file = target.files[0]
        if(file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function(readerEvent) {
                const imgElement = document.createElement("img")
                imgElement.src = readerEvent.target.result
                imgElement.onload = function(imgEvent) {
                    cb(imgEvent.target.src)
                }
            }
        }
    }
    
    this.drawImage = function(e, x, y, scale, angle, canvasWidth, canvasHeight, containerWidth, containerHeight) {
        const canvas = document.createElement("canvas")
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        const ctx = canvas.getContext("2d")
        const ratioX = canvasWidth/containerWidth
        const ratioY = canvasHeight/containerHeight
        let finalX = x*ratioX
        let finalY = y*ratioY
        let midleWidth = e.width*ratioX
        let midleHeight = e.height*ratioY
        let finalWidth = e.width*ratioX*scale
        let finalHeight = e.height*ratioY*scale
        ctx.translate(finalX + midleWidth/2, finalY + midleHeight/2)
        ctx.rotate((angle*Math.PI)/180)
        ctx.drawImage(e, -finalWidth/2, -finalHeight/2, finalWidth, finalHeight);
        const srcEncoded = ctx.canvas.toDataURL(e).split(",")[1];
        return srcEncoded
    }
}

function Toggle(ele1, ele2) {
    this.ele1 = ele1 // Targeted element
    this.ele2 = ele2 // Class name to be toggled
    const thisObject = this

    this.run = function() {
        $(this.ele1).click(function(e) {
            $(e.currentTarget).toggleClass(thisObject.ele2)
        })
        return this
    }
}

function Transform(ele1, ele2, ele3) {
    this.ele1 = ele1 // Main element
    this.ele2 = ele2 // container
    this.collided = false
    this.deleted = true
    this.x = 0
    this.y = 0
    this.angle = 0
    this.w = 0
    this.h = 0
    const $ele2 = $(this.ele2)
    const imgFrame = document.querySelector(this.ele2)
    this.controllerClassName = this.ele1.substring(1) + '--controller'
    let isRotateOffScreen = false;
    const thisObject = this

    const img = document.querySelector(this.ele1 + " > img")
    let ratio = img.width / img.height

    this.setRatio = function(r) {
        ratio = r
    }
    
    this.setValue = function(x, y, angle, w, h) {
        this.x = (x !== undefined) ? x : this.x
        this.y = (y !== undefined) ? y : this.y
        this.angle = (angle !== undefined) ? angle : this.angle
        this.w = (w !== undefined) ? w : this.w
        this.h = (h !== undefined) ? h : this.h
    }

    this.exportData = function() {
        return [this.x, this.y, this.angle, this.w, this.h]
    }

    this.isCollided = function() {
        return this.collided
    }

    this.setIsCollided = function(is) {
        this.collided = is
    }

    this.isDeleted = function() {
        return this.deleted
    }

    this.setDeleted = function(is) {
        this.deleted = is
    }

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
    `

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
    `

    this.addController = function() {
        $ele2.after(this.controllerTemplate)
        thisObject.addCSSForController().handleElementGoOffScreen("." + thisObject.controllerClassName + " .rotate", "." + thisObject.controllerClassName + " .rotate.shadow", "rotate").handleElementGoOffScreen("." + thisObject.controllerClassName + " .delete", "." + thisObject.controllerClassName + " .delete.shadow", "delete")
        return this
    }

    this.addCSSForController = function() {
        const styleElement = document.createElement('style')
        styleElement.textContent = this.css
        document.head.appendChild(styleElement)
        return this
    }

    this.delete = function(cb) {
        function handleDelete(e) {
            e.preventDefault()
            e.stopPropagation()
            cb()
            thisObject.setDeleted(true)
        }
        $(this.ele1 + "--controller .delete").on("touchstart", e => handleDelete(e))
        $(this.ele1 + "--controller .delete").on("mousedown", e => handleDelete(e))
        return this
    }

    this.repositionElement = function(x, y) {
        const controllerWrapper = document.querySelector(this.ele1 + '--controller--container');
        const boxWrapper = document.querySelector(this.ele1);

        boxWrapper.style.left = x + 'px';
        boxWrapper.style.top = y + 'px';
        controllerWrapper.style.left = (x + imgFrame.offsetLeft + 3) + 'px';
        controllerWrapper.style.top = (y + imgFrame.offsetTop + 3) + 'px';
    }

    this.resize = function(w, h) {
        const controller = document.querySelector(this.ele1 + '--controller');
        const img = document.querySelector(this.ele1 + " > img")

        controller.style.width = w + 6 + 'px';
        controller.style.height = h + 6 + 'px';
        img.style.width = w + 'px';
        // img.style.height = h + 'px';
    }

    this.rotateBox = function(deg) {
        const controllerWrapper = document.querySelector(this.ele1 + '--controller--container');
        const boxWrapper = document.querySelector(this.ele1);

        boxWrapper.style.transform = `rotate(${deg}deg)`;
        controllerWrapper.style.rotate = `${deg}deg`;
        controllerWrapper.querySelector(".delete").style.rotate = `${-deg}deg`
    }

    this.handleElementGoOffScreen = function(main, shadow, type) {
        // This function is responsible for handling element going off the screen by moving it to the oppiste side if it disappears from the screen
        const mainEle = document.querySelector(main);
        const shadowEle = document.querySelector(shadow);
        
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1
        }
        
        const callback = (entries) => {
            entries.forEach(entry => {
                switch(type) {
                    case 'rotate':
                        if(!entry.isIntersecting) {
                            mainEle.style.top = "auto";
                            mainEle.style.bottom = "-50px";
                            isRotateOffScreen = true;
                        } else {
                            mainEle.style.bottom = "auto";
                            mainEle.style.top = "-50px";
                            isRotateOffScreen = false;
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

    this.transform = function() {
        const controller = document.querySelector(this.ele1 + '--controller');
        const controllerWrapper = document.querySelector(this.ele1 + '--controller--container');
        const boxWrapper = document.querySelector(this.ele1);

        const minWidth = 40;
        const minHeight = 40;

        var initX, initY, mousePressX, mousePressY, initW, initH, initRotate;

        function getCurrentRotation(el) {
            var st = window.getComputedStyle(el, null);
            var tm = st.getPropertyValue("-webkit-transform") ||
                st.getPropertyValue("-moz-transform") ||
                st.getPropertyValue("-ms-transform") ||
                st.getPropertyValue("-o-transform") ||
                st.getPropertyValue("transform")
            "none";
            if (tm != "none") {
                var values = tm.split('(')[1].split(')')[0].split(',');
                var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
                return (angle < 0 ? angle + 360 : angle);
            }
            return 0;
        }

        function mousedownCb(event) {
            event.target.classList.add("show")
            event.target.querySelector(".circle").classList.add("show")
        }
        
        function mouseupCb(event) {
            event.target.classList.remove("show")
            event.target.querySelector(".circle").classList.remove("show")
        }

        // drag support
        function handleDrag(event, type) {
            event.preventDefault()
            event.stopPropagation()
            initX = boxWrapper.offsetLeft;
            initY = boxWrapper.offsetTop;
            mousePressX = (type === 'desk') ? event.clientX : event.touches[0].clientX;
            mousePressY = (type === 'desk') ? event.clientY : event.touches[0].clientY;
            let [,,, w, h] = thisObject.exportData()
    
            function eventMoveHandler(event) {
                let x = (type === 'desk') ? event.clientX : event.touches[0].clientX
                let y = (type === 'desk') ? event.clientY : event.touches[0].clientY
                var posX = initX + (x - mousePressX)
                var posY = initY + (y - mousePressY)
                thisObject.repositionElement(posX, posY);
                thisObject.setValue(posX - w / 2, posY - h / 2, undefined, undefined, undefined)
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

        var leftTop = document.querySelector(this.ele1 + "--controller .resize-topleft");
        var rightTop = document.querySelector(this.ele1 + "--controller .resize-topright");
        var rightBottom = document.querySelector(this.ele1 + "--controller .resize-bottomright");
        var leftBottom = document.querySelector(this.ele1 + "--controller .resize-bottomleft");

        function resizeHandler(event, left = false, top = false, xResize = false, yResize = false, type) {
            event.preventDefault()
            event.stopPropagation()
            initX = boxWrapper.offsetLeft;
            initY = boxWrapper.offsetTop;
            mousePressX = (type === 'desk') ? event.clientX : event.touches[0].clientX;
            mousePressY = (type === 'desk') ? event.clientY : event.touches[0].clientY;

            initW = img.offsetWidth;
            initH = img.offsetHeight;

            initRotate = getCurrentRotation(boxWrapper);
            
            var initRadians = initRotate * Math.PI / 180;
            var cosFraction = Math.cos(initRadians);
            var sinFraction = Math.sin(initRadians);
            mousedownCb(event)
            var vectorC = [mousePressX - initX - imgFrame.offsetLeft, mousePressY - initY - imgFrame.offsetTop]
            function eventMoveHandler(event) {
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
                rotatedHDiff = (rotatedHDiff*rotatedWDiff > 0) ? (rotatedWDiff / ratio) : (- rotatedWDiff / ratio);

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

                thisObject.resize(newW, newH);
                thisObject.repositionElement(newX, newY);
                thisObject.setValue(newX - newW / 2, newY - newH / 2, undefined, newW, newH)
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
        var rotate = document.querySelector(thisObject.ele1 + "--controller .rotate");
        function handleRotate(event, type) {
            event.preventDefault()
            event.stopPropagation()
    
            initX = event.target.offsetLeft;
            initY = event.target.offsetTop;
            mousePressX = (type === 'desk') ? event.clientX : event.touches[0].clientX;
            mousePressY = (type === 'desk') ? event.clientY : event.touches[0].clientY;
    
    
            var arrow = document.querySelector(thisObject.ele1 + '--controller');
            var arrowRects = arrow.getBoundingClientRect();
            var arrowX = arrowRects.left + arrowRects.width / 2;
            var arrowY = arrowRects.top + arrowRects.height / 2;
    
            const compensation = isRotateOffScreen ? 180 : 0

            function eventMoveHandler(event) {
                let x = (type === 'desk') ? event.clientX : event.touches[0].clientX
                let y = (type === 'desk') ? event.clientY : event.touches[0].clientY
                var angle = Math.atan2(y - arrowY, x - arrowX) + Math.PI / 2;
                angle *= 180 / Math.PI
                angle += compensation
                thisObject.rotateBox(angle);
                thisObject.setValue(undefined, undefined, angle, undefined, undefined)
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

        thisObject.resize(200, 200 / ratio);
        thisObject.repositionElement(100, 100 / ratio);
        thisObject.setValue(0, 0, 0, 200, 200 / ratio)
        return this
    }
}

function CopyToClipboard(ele1, ele2) {
    this.ele1 = ele1 // text
    this.ele2 = ele2 // button
    const thisObject = this

    this.run = function(cb) {
        $(this.ele2).click(() => {
            navigator.clipboard.writeText(thisObject.ele1)
            cb()
        })
    }
}


export {$$}
