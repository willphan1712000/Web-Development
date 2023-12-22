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
    this.imageProcess = function() {
        return new ImageProcess(this.ele1, this.ele2)
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
}
function W4(ele1, ele2, ele3, ele4) {
    this.ele1 = ele1
    this.ele2 = ele2
    this.ele3 = ele3
    this.ele4 = ele4
    const thisObject = this
    this.copyToClipboard = function() {
        return new CopyToClipboard(this.ele1, this.ele2, this.ele3, this.ele4)
    }
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

function ImageProcess(ele1, ele2) {
    this.ele1 = ele1
    this.ele2 = ele2
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

    this.createCanvas = function(width, height) {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        canvas.width = width
        canvas.height = height
        return [canvas, ctx]
    }
    
    this.drawImage = function(e, ctx, x, y, scale, angle, canvas, containerWidth, containerHeight) {
        const ratioX = canvas.width/containerWidth
        const ratioY = canvas.height/containerHeight
        let finalX = x*ratioX
        let finalY = y*ratioY
        let midleWidth = e.width*ratioX
        let midleHeight = e.height*ratioY
        let finalWidth = e.width*ratioX*scale
        let finalHeight = e.height*ratioY*scale

        ctx.save()
        ctx.translate(finalX + midleWidth/2, finalY + midleHeight/2)
        ctx.rotate((angle*Math.PI)/180)
        ctx.drawImage(e, -finalWidth/2, -finalHeight/2, finalWidth, finalHeight);
        ctx.restore()
        const srcEncoded = ctx.canvas.toDataURL(e).split(",")[1]
        return [ctx, srcEncoded]
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

function TransformTouch(ele1, ele2) {
    this.ele1 = ele1
    this.ele2 = ele2
    this.collided = false
    this.x = 0
    this.y = 0
    this.scale = 1
    this.angle = 0
    $ele1 = $(this.ele1)
    $ele2 = $(this.ele2)
    
    this.setValue = function(x, y, scale, angle) {
        this.x = (x !== undefined) ? x : this.x
        this.y = (y !== undefined) ? y : this.y
        this.scale = (scale !== undefined) ? scale : this.scale
        this.angle = (scale !== undefined) ? angle : this.angle
    }
    this.performTransform = function($ele, x, y, scale, angle) {
        $ele.css({
            transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${angle}deg)`
        })
    }

    this.exportData = function() {
        return [this.x, this.y, this.scale, this.angle]
    }

    this.isCollided = function() {
        return this.collided
    }

    this.setIsCollided = function(is) {
        this.collided = is
    }

    const thisObject = this
    this.draggable = function() {
        $ele1.on("touchstart", function(e) {
            e.preventDefault() // Prevent the page from scrolling
            e.stopPropagation() // Prevent the finger from touching another element that is overlapped by the targeted element
            if(e.targetTouches.length >= 1) {
                iPosX = e.targetTouches[0].clientX
                iPosY = e.targetTouches[0].clientY
                let [posX, posY, scale, angle] = thisObject.exportData()
                $(this).on("touchmove", function(e) {
                    dX = e.targetTouches[0].clientX - iPosX
                    dY = e.targetTouches[0].clientY - iPosY
                    iPosX = e.targetTouches[0].clientX
                    iPosY = e.targetTouches[0].clientY
                    posX += dX
                    posY += dY
                    thisObject.performTransform($(this), posX, posY, scale, angle)
                })
                $(this).on("touchend", function() {
                    $(this).off("touchmove", null)
                    $(this).off("touchend", null)
                    thisObject.setValue(posX, posY, undefined, undefined)
                })
            }
        })
        return this
    }

    this.distort = function() {
        $ele1.on("touchstart", function(e) {
            e.preventDefault()
            e.stopPropagation()
            if(e.targetTouches.length === 2) {
                finger1X = e.targetTouches[0].clientX
                finger1Y = e.targetTouches[0].clientY
                finger2X = e.targetTouches[1].clientX
                finger2Y = e.targetTouches[1].clientY
                iVectorX = finger2X - finger1X
                iVectorY = finger2Y - finger1Y
                initialAngle = Math.atan2(iVectorX, iVectorY)
                let [posX, posY, scale, angle] = thisObject.exportData()
                $(this).on("touchmove", function(e) {
                    finger1X = e.targetTouches[0].clientX
                    finger1Y = e.targetTouches[0].clientY
                    finger2X = e.targetTouches[1].clientX
                    finger2Y = e.targetTouches[1].clientY
                    vectorX = finger2X - finger1X
                    vectorY = finger2Y - finger1Y
                    currentAngle = Math.atan2(vectorX, vectorY)
                    angle -= (currentAngle - initialAngle)*180/Math.PI
                    dScale = Math.sqrt(vectorX*vectorX + vectorY*vectorY)/Math.sqrt(iVectorX*iVectorX + iVectorY*iVectorY)
                    scale *= dScale
                    thisObject.performTransform($(this), posX, posY, scale, angle)
                    iVectorX = vectorX
                    iVectorY = vectorY
                    initialAngle = currentAngle
                })
                $(this).on("touchend", function() {
                    $(this).off("touchmove", null)
                    $(this).off("touchend", null)
                    thisObject.setValue(undefined, undefined, scale, angle)
                })
            }
        })
        return this
    }

    this.collide = function(touchedCb, notTouchedCb, touchEndCb) {
        let ele2X = $ele2.offset().left + $ele2.width()/2
        let ele2Y = $ele2.offset().top + $ele2.height()/2
        let radius = $ele2.width()/2
        $ele1.on("touchstart", function(e) {
            e.preventDefault()
            e.stopPropagation()
            $(this).on("touchmove", function(e) {
                let fingerX = e.targetTouches[0].clientX
                let fingerY = e.targetTouches[0].clientY
                let distanceX = fingerX - ele2X
                let distanceY = fingerY - ele2Y
                distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY)
                if(distance <= radius) {
                    thisObject.setIsCollided(true)
                    touchedCb()
                } else {
                    thisObject.setIsCollided(false)
                    notTouchedCb()
                }
            })
            $(this).on("touchend", function() {
                if(thisObject.isCollided()) {
                    thisObject.setValue(0, 0, 1, 0)
                    let [x, y, scale, angle] = thisObject.exportData()
                    thisObject.performTransform($(this), x, y, scale, angle)
                    touchEndCb()
                }
                $(this).off("touchmove", null)
                $(this).off("touchend", null)
            })
        })
        return this
    }
    this.terminate = function() {
        $ele1.off("touchstart", null)
        $(document).off("touchmove", null)
        $(document).off("touchend", null)
        return this
    }
}

function CopyToClipboard(ele1, ele2, ele3, ele4) {
    this.ele1 = ele1 // text
    this.ele2 = ele2 // button
    this.ele3 = ele3 // indicator after click button
    this.ele4 = ele4 // class after click button
    const thisObject = this

    this.run = function() {
        $(this.ele2).click(() => {
            navigator.clipboard.writeText(thisObject.ele1)
            $(thisObject.ele3).addClass(thisObject.ele4)
            setTimeout(()=>{
                $(thisObject.ele3).removeClass(thisObject.ele4)
            }, 1000)
        })
    }
}


export {$$}
