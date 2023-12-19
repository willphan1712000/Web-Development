// WW.js is module created by Will - Thanh Nha Phan - Kennesaw State University
// This module helps backend development to be easily deployed

function $$$(ele1, ele2, ele3, ele4, ele5) {
    const p = arguments.length
    if(p === 1) {
        return new WW1(ele1)
    }
    else if (p === 2) {
        return new WW2(ele1, ele2)
    }
    else if(p === 3) {
        return new WW3(ele1, ele2, ele3)
    }
    else if(p === 4) {
        return new WW4(ele1, ele2, ele3, ele4)
    }
    else if(p === 5) {
        return new WW5(ele1, ele2, ele3, ele4, ele5)
    }
}

function WW1(ele1) {
    this.ele1 = ele1
    const thisObject = this

    
}
function WW2(ele1, ele2) {
    this.ele1 = ele1
    this.ele2 = ele2
    const thisObject = this

    
    
}
function WW3(ele1, ele2, ele3) {
    this.ele1 = ele1
    this.ele2 = ele2
    this.ele3 = ele3
    const thisObject = this

}
function WW4(ele1, ele2, ele3, ele4) {
    this.ele1 = ele1
    this.ele2 = ele2
    this.ele3 = ele3
    this.ele4 = ele4
    const thisObject = this

}
function WW5(ele1, ele2, ele3, ele4, ele5) {
    this.ele1 = ele1
    this.ele2 = ele2
    this.ele3 = ele3
    this.ele4 = ele4
    this.ele5 = ele5
    const thisObject = this

    this.signup = function() {
        return new Signup(this.ele1, this.ele2, this.ele3, this.ele4, this.ele5)
    }

    this.formValidate = function() {
        return new FormValidate(this.ele1, this.ele2, this.ele3, this.ele4, this.ele5)
    }
}

function FormValidate(input, msg, success, error, regex) {
    this.input = input
    this.msg = msg
    this.success = success
    this.error = error
    this.regex = regex
    this.isValid = true
    const thisObject = this

    this.setValidity = function(value) {
        this.isValid = value
    }

    this.getValidity = function() {
        return this.isValid
    }


    this.phoneFormat = function() {
        $(this.input).on("input", function(event) {
            let inputValue = event.target.value.replace(/\D/g, '');
            let formattedValue = '';

            // Apply the formatting
            for (let i = 0; i < inputValue.length; i++) {
                if (i === 3 || i === 6) {
                    formattedValue += '-';
                }
                formattedValue += inputValue[i];
            }

            // Update the input value
            event.target.value = formattedValue;
        })
    }

    this.run = function() {
        const regex = this.regex
        $(this.input).on("input", function(e) {
            if(e.target.value !== '') {
                if(regex.test(e.target.value)) {
                    thisObject.setValidity(true)
                    $(thisObject.msg).html(thisObject.success)
                } else {
                    thisObject.setValidity(false)
                    $(thisObject.msg).html(thisObject.error)
                }
            } else {
                $(thisObject.msg).html('')
                thisObject.setValidity(true)
            }
        })
        return this
    }
}

function Signup(username, email, password, error, submit) {
    this.username = username
    this.email = email
    this.password = password
    this.error = error
    this.submit = submit
    const $usernameInput = $(this.username)
    const $emailInput = $(this.email)
    const $passwordInput = $(this.password)
    const $submit = $(this.submit)
    const $error = $(this.error)

    const thisObject = this
    this.run = function() {
        $submit.click(function(e) {
            e.preventDefault()
            if(thisObject.isFillAll($usernameInput.val(), $emailInput.val(), $passwordInput.val())) {
                $error.html("Please fill in all information!")
                thisObject.shakingErrorMsg($error)
            } else {
                if(!thisObject.isValidEmail($emailInput.val())) {
                    $error.html("The email is not valid!")
                    thisObject.shakingErrorMsg($error)
                } else {
                    if(!thisObject.isValidPassword($passwordInput.val())) {
                        $error.html("The password is not valid!")
                        thisObject.shakingErrorMsg($error)
                    } else {
                        $error.html("")
                        $.ajax({
                            url: "/data/signup.php",
                            method: "POST",
                            dataType: "json",
                            data: {
                                username: thisObject.removeSpace($usernameInput.val()),
                                email: $emailInput.val(),
                                password: $passwordInput.val()
                            },
                            success: function(e) {
                                if(e[0]) {
                                    $error.html("The username has already been taken!")
                                    thisObject.shakingErrorMsg($error)
                                } else {
                                    if(!e[1]) {
                                        $error.html("The email is not valid!")
                                        thisObject.shakingErrorMsg($error)
                                    } else {
                                        if(!(e[2] && e[3] && e[4] && e[5])) {
                                            $error.html("There is an error, try again!")
                                            thisObject.shakingErrorMsg($error)
                                        } else {
                                            thisObject.signUpSuccess(".signupChild", "inactive", ".signupSuccess", "active")
                                            // Optional operation
                                            thisObject.createFiles(thisObject.removeSpace($usernameInput.val()))
                                        }
                                    }
                                }   
                            },
                            error: function() {
                                $error.html("The server has internal error!")
                                thisObject.shakingErrorMsg($error)
                            }
                        })
                    }
                }
            }
        })
    }

    this.isFillAll = function(username, email, password) {
        return (!(username && email && password)) ? true : false
    }

    this.isValidEmail = function(email) {
        // Regular expression for a basic email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Test the email against the regular expression
        return emailRegex.test(email);
    }

    this.isValidPassword = function(password) {
        let position, isValidLength = false, hasUpperCase = false, hasDigit = false, hasSpecialChar = true, isValid = false // Bypass special character requirement
        if(password.length >= 12) {
            isValidLength = true
        }
        for(let i = 0; i < password.length; i++) {
            position = password[i].charCodeAt()
            if(position >= 65 && position <= 90) {
                hasUpperCase = true
            }
            if(position >= 48 && position <= 57) {
                hasDigit = true
            }
            if(position >= 33 && position <= 47) {
                hasSpecialChar = true
            }
            if(hasUpperCase && hasDigit && hasSpecialChar) {
                isValid = true
                break;
            }
        }
        if(isValidLength && isValid) return isValid
    }

    this.removeSpace = function(text) {
        let filtered = '';
        for(let i = 0; i < text.length; i++) {
            if(text[i] === ' ') {
                continue
            } else {
                filtered += text[i]
            }
        }
        return filtered;
    }

    this.shakingErrorMsg = function(error) {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozrequestAnimationFrame || window.webkitrequestAnimationFrame || window.msrequestAnimationFrame;

        var counter = 0, x = 0, dx = -2.5
        function shaking() {
            counter++
            x += dx
            if(x <= -15 || x >= 15) {
                dx = -dx;
            }
            const runAnimation = requestAnimationFrame(shaking)
            if(counter === 30) {
                cancelAnimationFrame(runAnimation)
                x = 0
            }
            error.css({
                transform: `translateX(${x}px)`
            })
        }
        shaking()
    }

    this.signUpSuccess = function(before, beforeClass, after, afterClass) {
        $(before).addClass(beforeClass)
        $(after).addClass(afterClass)
    }
    
    // Gray out this function when not in use in other projects
    this.createFiles = function(username) {
        let data = {}
        data.type = 'create'
        data.username = username
        $.ajax({
            url: "/data/update.php",
            method: "POST",
            dataType: "html",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(e) {
                
            }
        })
    }
}


export {$$$}
