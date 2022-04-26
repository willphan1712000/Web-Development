<?php
    if(isset($_POST['submit'])) {
        if(!empty($_POST['radioFile'])) {
            echo ' ' . $_POST['radioFile'];
        } else {
            echo 'Please select';
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <div class="colorTable">
        <form action="" method="POST" enctype="multipart/form-data">
            <label class="radio">
                <input type="radio" name="radioFile" value="yellow"class="radio__input">
                <div class="radio__circle--1"></div>
            </label>
            <label class="radio">
                <input type="radio" name="radioFile" value="green"class="radio__input">
                <div class="radio__circle--2"></div>
            </label> 
            <label class="radio">
                <input type="radio" name="radioFile" value="red"class="radio__input">
                <div class="radio__circle--3"></div>
            </label> 
            <label class="radio">
                <input type="radio" name="radioFile" value="gray"class="radio__input">
                <div class="radio__circle--4"></div>
            </label>
            <button type="submit" name="submit">Submit</button>
        </form>
    </div>
    <div id="result"></div>
    
    <script>
        function displayRadioValue() {
            var ele = document.getElementsByName('radioFile');
            for (i = 0; i < ele.length; i++) {
                if(ele[i].checked) {
                    document.getElementById("result").innerHTML = "The color you have selected is " + ele[i].value;
                }
            }
        }
    </script>
</body>
</html>
