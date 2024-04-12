## This project is for web development initiated by Nha Phan (Will) from Kennesaw State University
## Note: This module requires users to have jQuery and FrontAwesome CDNs
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://kit.fontawesome.com/960d33c629.js" crossorigin="anonymous"></script>
```
### W.js is for front-end development
#### 1. passShowHide
```js
$$(element).passShowHide().run()
```

#### 2. addSpinner
```js
$$(element).addSpinner().singleSpinner().show()
$$(element).addSpinner().gradientSpinner().show() // Still in development
```
#### 3. transform
```js
$$(element).transform()
```
#### 4. upload
```js
const upload = $$(element to click, input element to click).upload().openFile() // Open input
// get source file from input file
input.change((e) => {
    upload.fileHandling (e, function(src))
})
upload.drawImage(img tag element, x, y, scale, angle, width of canvas, height of canvas, width of container of img tag element, height of container of img tag element)
```


### WW.js is for backend development