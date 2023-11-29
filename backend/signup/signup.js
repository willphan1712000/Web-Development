// This module requires you to use jQuery -> IMPORTANT
// The Signup object requires you to have 6 elements that are shown as parameters below
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
    this.signup = function() {
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
                                username: $usernameInput.val(),
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
                                            $error.html("There is a problem creating your account!")
                                            thisObject.shakingErrorMsg($error)
                                        } else {
                                            thisObject.signUpSuccess(".signupChild", "inactive", ".signupSuccess", "active")
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
        let position, isValidLength = false, hasUpperCase = false, hasDigit = false, hasSpecialChar = false, isValid = false
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
}
function signup(username, email, password, error, submit) {
    return new Signup(username, email, password, error, submit)
}
export {signup}
