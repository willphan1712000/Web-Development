
<img src="./will.png">




## This project is for web development initiated by Nha Phan (Will) from Kennesaw State University
## Note: This module requires users to have jQuery and FrontAwesome CDNs
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://kit.fontawesome.com/960d33c629.js" crossorigin="anonymous"></script>
```

## How to use Transform
### First, create this html template
```html
<div class="frame">
    <div class="img__wrapper">
        <img src="">
    </div>
</div>
```
### Then apply Transform
```ts
$$(".img__wrapper", ".frame").transform().addController().transform();
```
### This command is going to add controller to the image and perform transformation