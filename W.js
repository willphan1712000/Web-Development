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
        return new PassShowHide(thisObject.ele1)
    }
}
function W2(ele1, ele2) {
    this.ele1 = ele1
    this.ele2 = ele2
    const thisObject = this

    this.toggle = function() {
        return new Toggle(thisObject.ele1, thisObject.ele2)
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
        const $eye = $(".eye")
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
    }
}

function Toggle(ele1, ele2) {
    this.ele1 = ele1
    this.ele2 = ele2
    const thisObject = this

    this.run = function() {
        $(this.ele1).click(function(e) {
            $(e.currentTarget).toggleClass(thisObject.ele2)
        })
    }
}

function Transform(ele1, ele2, ele3) {
    this.ele1 = ele1
    this.ele2 = ele2
    this.signal = ele3
    this.collided = false
    this.x = 0
    this.y = 0
    this.scale = 1
    this.angle = 0
    const $ele1 = $(this.ele1)
    const $ele2 = $(this.ele2)
    
    this.setValue = function(x, y, scale, angle) {
        this.x = (x !== undefined) ? x : this.x
        this.y = (y !== undefined) ? y : this.y
        this.scale = (scale !== undefined) ? scale : this.scale
        this.angle = (scale !== undefined) ? angle : this.angle
    }
    this.performTransform = function(x, y, scale, angle) {
        $ele1.css({
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
            e.preventDefault()
            e.stopPropagation()
            iPosX = e.touches[0].clientX
            iPosY = e.touches[0].clientY
            let [posX, posY, scale, angle] = thisObject.exportData()
            $ele1.on("touchmove", function(e) {
                dX = e.touches[0].clientX - iPosX
                dY = e.touches[0].clientY - iPosY
                iPosX = e.touches[0].clientX
                iPosY = e.touches[0].clientY
                posX += dX
                posY += dY
                thisObject.performTransform(posX, posY, scale, angle)
            })
            $ele1.on("touchend", function() {
                $ele1.off("touchmove", null)
                $ele1.off("touchend", null)
                thisObject.setValue(posX, posY, undefined, undefined)
            })
        })
        return this
    }

    this.distort = function() {
        $ele1.on("touchstart", function(e) {
            e.preventDefault()
            e.stopPropagation()
            if(e.touches.length === 2) {
                finger1X = e.touches[0].clientX
                finger1Y = e.touches[0].clientY
                finger2X = e.touches[1].clientX
                finger2Y = e.touches[1].clientY
                iVectorX = finger2X - finger1X
                iVectorY = finger2Y - finger1Y
                initialAngle = Math.atan2(iVectorX, iVectorY)
                let [posX, posY, scale, angle] = thisObject.exportData()
                $ele1.on("touchmove", function(e) {
                    finger1X = e.touches[0].clientX
                    finger1Y = e.touches[0].clientY
                    finger2X = e.touches[1].clientX
                    finger2Y = e.touches[1].clientY
                    vectorX = finger2X - finger1X
                    vectorY = finger2Y - finger1Y
                    currentAngle = Math.atan2(vectorX, vectorY)
                    angle -= (currentAngle - initialAngle)*180/Math.PI
                    dScale = Math.sqrt(vectorX*vectorX + vectorY*vectorY)/Math.sqrt(iVectorX*iVectorX + iVectorY*iVectorY)
                    scale *= dScale
                    thisObject.performTransform(posX, posY, scale, angle)
                    iVectorX = vectorX
                    iVectorY = vectorY
                    initialAngle = currentAngle
                })
                $ele1.on("touchend", function() {
                    $ele1.off("touchmove", null)
                    $ele1.off("touchend", null)
                    thisObject.setValue(undefined, undefined, scale, angle)
                })
            }
        })
        return this
    }

    this.collide = function() {
        $ele1.on("touchstart", function() {
            let ele2X = $ele2.offset().left + $ele2.width()/2
            let ele2Y = $ele2.offset().top + $ele2.height()/2
            let radius = $ele2.width()/2
            $(document).on("touchmove", function(e) {
                let fingerX = e.touches[0].clientX
                let fingerY = e.touches[0].clientY
                let distanceX = fingerX - ele2X
                let distanceY = fingerY - ele2Y
                distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY)
                if(distance <= radius) {
                    thisObject.setIsCollided(true)
                    $ele2.addClass(thisObject.signal)
                    $ele1.hide('fast')
                } else {
                    thisObject.setIsCollided(false)
                    $ele2.removeClass(thisObject.signal)
                    $ele1.show('fast')
                }
            })
            $(document).on("touchend", function() {
                if(thisObject.isCollided()) {
                    thisObject.setValue(0, 0, 1, 0)
                    $ele1.empty()
                    $ele2.removeClass(thisObject.signal)
                    let [x, y, scale, angle] = thisObject.exportData()
                    thisObject.performTransform(x, y, scale, angle)
                }
                $(document).off("touchmove", null)
                $(document).off("touchend", null)
            })
        })
        return this
    }
}


export {$$}