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
    this.ele2 = ele2 // Collision element
    this.ele3 = ele3 // Controller element
    this.collided = false
    this.x = 0
    this.y = 0
    this.scale = 1
    this.angle = 0
    const $ele1 = $(this.ele1)
    const $ele2 = $(this.ele2)
    const $ele3 = $(this.ele3)
    const $resize = $ele3.find(".resize")
    const $rotate = $ele3.find(".rotate")
    const thisObject = this
    
    this.setValue = function(x, y, scale, angle) {
        this.x = (x !== undefined) ? x : this.x
        this.y = (y !== undefined) ? y : this.y
        this.scale = (scale !== undefined) ? scale : this.scale
        this.angle = (angle !== undefined) ? angle : this.angle
    }
    this.performTransform = function(x, y, scale, angle) {
        $ele1.css({
            transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${angle}deg)`
        })
        $ele3.css({
            transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${angle}deg)`
        })
    }

    this.performResize = function(width, height) {
        $ele1.css({
            width: width,
            height: height,

        })
        $ele3.css({
            width: width,
            height: height
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

    this.draggableTouch = function() {
        let iPosX, iPosY, posX, posY, dX, dY
        $ele3.on("touchstart", function(e) {
            e.preventDefault()
            e.stopPropagation()
            iPosX = e.touches[0].clientX
            iPosY = e.touches[0].clientY
            let [posX, posY, scale, angle] = thisObject.exportData()
            $ele3.on("touchmove", function(e) {
                dX = e.touches[0].clientX - iPosX
                dY = e.touches[0].clientY - iPosY
                iPosX = e.touches[0].clientX
                iPosY = e.touches[0].clientY
                posX += dX
                posY += dY
                thisObject.performTransform(posX, posY, scale, angle)
            })
            $ele3.on("touchend", function() {
                $ele3.off("touchmove", null)
                $ele3.off("touchend", null)
                thisObject.setValue(posX, posY, undefined, undefined)
            })
        })
        return this
    }

    this.draggableDesk = function() {
        $ele3.on("mousedown", function(e) {
            let iPosX, iPosY, dX, dY
            e.preventDefault()
            e.stopPropagation()
            iPosX = e.clientX
            iPosY = e.clientY
            let [posX, posY, scale, angle] = thisObject.exportData()
            $(window).on("mousemove", function(e) {
                dX = e.clientX - iPosX
                dY = e.clientY - iPosY
                iPosX = e.clientX
                iPosY = e.clientY
                posX += dX
                posY += dY
                thisObject.performTransform(posX, posY, scale, angle)
            })
            $(window).on("mouseup", function() {
                $(window).off("mousemove", null)
                $(window).off("mouseup", null)
                thisObject.setValue(posX, posY, undefined, undefined)
            })
        })
        return this
    }

    this.resizableTouch = function() {
        function calculateRotate(x, y, cx, cy, angle) {
            angle = angle * Math.PI / 180
            return [
                (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx,
                (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy
            ]
        }

        function getCenter($ele, posX, posY) {
            return [
                posX + $ele.width()/2,
                posY + $ele.height()/2
            ]
        }

        $resize.each(function(index, element) {
            $(element).on("touchstart", function(e) {
                e.preventDefault()
                e.stopPropagation()
                $(element).addClass("show")
                $(element).find(".circle").addClass("show")
                let r = $ele3.width() / $ele3.height()
                let [posX, posY, scale, angle] = thisObject.exportData()
                let x0 = $(".preview__imgArea--wrapper").offset().left - window.scrollX
                let y0 = $(".preview__imgArea--wrapper").offset().top - window.scrollY
                let [cx, cy] = getCenter($ele3, posX, posY)
                let rotatedCorner, bottomright = false, bottomleft = false, topright = false
                let dx
                if($(element).hasClass("resize-bottomright")) {
                    rotatedCorner = calculateRotate(posX, posY, cx, cy, angle)
                    bottomright = true
                } else if ($(element).hasClass("resize-bottomleft")) {
                    rotatedCorner = calculateRotate(posX + $ele3.width(), posY, cx, cy, angle)
                    bottomleft = true
                } else if ($(element).hasClass("resize-topright")) {
                    rotatedCorner = calculateRotate(posX, posY + $ele3.height(), cx, cy, angle)
                    topright = true
                } else {
                    rotatedCorner = calculateRotate(posX + $ele3.width(), posY + $ele3.height(), cx, cy, angle)
                }
                $(window).on("touchmove", function(e) {
                    let x = e.touches[0].clientX - x0
                    let y = e.touches[0].clientY - y0
                    let newCenter = [
                        (rotatedCorner[0] + x) / 2,
                        (rotatedCorner[1] + y) / 2
                    ]

                    let newCorner = calculateRotate(rotatedCorner[0], rotatedCorner[1], newCenter[0], newCenter[1], -angle)
                    let newOppositeCorner = calculateRotate(x, y, newCenter[0], newCenter[1], -angle)

                    if(bottomright) {
                        dx = newOppositeCorner[0] - newCorner[0]
                        posX = newCorner[0]
                        posY = newCorner[1]
                    } else if (bottomleft) {
                        dx = - (newOppositeCorner[0] - newCorner[0])
                        posX = newCorner[0] + $ele3.width()
                        posY = newCorner[1]
                    } else if (topright) {
                        dx = newOppositeCorner[0] - newCorner[0]
                        posX = newCorner[0]
                        posY = newCorner[1] + $ele3.height()
                    } else {
                        dx = - (newOppositeCorner[0] - newCorner[0])
                        posX = newCorner[0] + $ele3.width()
                        posY = newCorner[1] + $ele3.height()
                    }
                    
                    thisObject.performResize(dx,dx / r)

                    if(bottomright) {
                        posX = newCorner[0]
                        posY = newCorner[1]
                    } else if (bottomleft) {
                        posX = newCorner[0] - $ele3.width()
                        posY = newCorner[1]
                    } else if (topright) {
                        posX = newCorner[0]
                        posY = newCorner[1] - $ele3.height()
                    } else {
                        posX = newCorner[0] - $ele3.width()
                        posY = newCorner[1] - $ele3.height()
                    }

                    thisObject.performTransform(posX, posY, scale, angle)
                })
    
                $(window).on("touchend", function() {
                    $(window).off("touchmove", null)
                    $(window).off("touchend", null)
                    thisObject.setValue(posX, posY, scale, angle)
                    $(element).removeClass("show")
                    $(element).find(".circle").removeClass("show")
                })
            })
        })
        return this
    }

    this.rotateTouch = function() {
        $rotate.on("touchstart", function(e) {
            e.preventDefault()
            e.stopPropagation()
            let vectorX, vectorY, X, Y
            X = $ele3.offset().left + $ele3.width()/2
            Y = $ele3.offset().top + $ele3.height()/2
            let [posX, posY, scale, angle] = thisObject.exportData()
            $(window).on("touchmove", function(e) {
                vectorX = X - e.touches[0].clientX - window.scrollX
                vectorY = Y - e.touches[0].clientY - window.scrollY

                angle = Math.atan2(vectorY, vectorX) * 180 / Math.PI + 90

                thisObject.performTransform(posX, posY, scale, angle)
            })

            $(window).on("touchend", function() {
                $(window).off("touchmove", null)
                $(window).off("touchend", null)
                thisObject.setValue(undefined, undefined, undefined, angle)
            })
        })
        return this
    }

    this.resizableDesk = function() {
        function calculateRotate(x, y, cx, cy, angle) {
            angle = angle * Math.PI / 180
            return [
                (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx,
                (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy
            ]
        }

        function getCenter($ele, posX, posY) {
            return [
                posX + $ele.width()/2,
                posY + $ele.height()/2
            ]
        }

        $resize.each(function(index, element) {
            $(element).on("mousedown", function(e) {
                e.preventDefault()
                e.stopPropagation()
                $(element).addClass("show")
                $(element).find(".circle").addClass("show")
                let r = $ele3.width() / $ele3.height()
                let [posX, posY, scale, angle] = thisObject.exportData()
                let x0 = $(".preview__imgArea--wrapper").offset().left - window.scrollX
                let y0 = $(".preview__imgArea--wrapper").offset().top - window.scrollY
                let [cx, cy] = getCenter($ele3, posX, posY)
                let rotatedCorner, bottomright = false, bottomleft = false, topright = false
                let dx
                if($(element).hasClass("resize-bottomright")) {
                    rotatedCorner = calculateRotate(posX, posY, cx, cy, angle)
                    bottomright = true
                } else if ($(element).hasClass("resize-bottomleft")) {
                    rotatedCorner = calculateRotate(posX + $ele3.width(), posY, cx, cy, angle)
                    bottomleft = true
                } else if ($(element).hasClass("resize-topright")) {
                    rotatedCorner = calculateRotate(posX, posY + $ele3.height(), cx, cy, angle)
                    topright = true
                } else {
                    rotatedCorner = calculateRotate(posX + $ele3.width(), posY + $ele3.height(), cx, cy, angle)
                }
                $(window).on("mousemove", function(e) {
                    let x = e.clientX - x0
                    let y = e.clientY - y0
                    let newCenter = [
                        (rotatedCorner[0] + x) / 2,
                        (rotatedCorner[1] + y) / 2
                    ]

                    let newCorner = calculateRotate(rotatedCorner[0], rotatedCorner[1], newCenter[0], newCenter[1], -angle)
                    let newOppositeCorner = calculateRotate(x, y, newCenter[0], newCenter[1], -angle)

                    if(bottomright) {
                        dx = newOppositeCorner[0] - newCorner[0]
                        posX = newCorner[0]
                        posY = newCorner[1]
                    } else if (bottomleft) {
                        dx = - (newOppositeCorner[0] - newCorner[0])
                        posX = newCorner[0] + $ele3.width()
                        posY = newCorner[1]
                    } else if (topright) {
                        dx = newOppositeCorner[0] - newCorner[0]
                        posX = newCorner[0]
                        posY = newCorner[1] + $ele3.height()
                    } else {
                        dx = - (newOppositeCorner[0] - newCorner[0])
                        posX = newCorner[0] + $ele3.width()
                        posY = newCorner[1] + $ele3.height()
                    }
                    
                    thisObject.performResize(dx,dx / r)

                    if(bottomright) {
                        posX = newCorner[0]
                        posY = newCorner[1]
                    } else if (bottomleft) {
                        posX = newCorner[0] - $ele3.width()
                        posY = newCorner[1]
                    } else if (topright) {
                        posX = newCorner[0]
                        posY = newCorner[1] - $ele3.height()
                    } else {
                        posX = newCorner[0] - $ele3.width()
                        posY = newCorner[1] - $ele3.height()
                    }

                    thisObject.performTransform(posX, posY, scale, angle)
                })
    
                $(window).on("mouseup", function() {
                    $(window).off("mousemove", null)
                    $(window).off("mouseup", null)
                    thisObject.setValue(posX, posY, scale, angle)
                    $(element).removeClass("show")
                    $(element).find(".circle").removeClass("show")
                })
            })
        })
        return this
    }

    this.rotateDesk = function() {
        $rotate.on("mousedown", function(e) {
            e.preventDefault()
            e.stopPropagation()
            let vectorX, vectorY, X, Y
            X = $ele3.offset().left + $ele3.width()/2
            Y = $ele3.offset().top + $ele3.height()/2
            let [posX, posY, scale, angle] = thisObject.exportData()
            $(window).on("mousemove", function(e) {
                vectorX = X - e.clientX - window.scrollX
                vectorY = Y - e.clientY - window.scrollY

                angle = Math.atan2(vectorY, vectorX) * 180 / Math.PI + 90

                thisObject.performTransform(posX, posY, scale, angle)
            })

            $(window).on("mouseup", function() {
                $(window).off("mousemove", null)
                $(window).off("mouseup", null)
                thisObject.setValue(undefined, undefined, undefined, angle)
            })
        })
        return this
    }

    this.collide = function(touchedCb, notTouchedCb, touchEndCb) {
        let ele2X = $ele2.offset().left + $ele2.width()/2
        let ele2Y = $ele2.offset().top - $(window).scrollTop() + $ele2.height()/2
        let radius = $ele2.width()/2
        $ele3.on("touchstart", function(e) {
            e.preventDefault()
            e.stopPropagation()
            $(this).on("touchmove", function(e) {
                let fingerX = e.targetTouches[0].clientX
                let fingerY = e.targetTouches[0].clientY
                let distanceX = fingerX - ele2X
                let distanceY = fingerY - ele2Y
                let distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY)
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
