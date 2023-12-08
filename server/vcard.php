<?php
    include "conn.php";
    if(isset($_POST['vcard'])) {
        $username = $_POST['vcard'];
        $infoQuery = mysqli_query($conn, "SELECT *FROM info WHERE username = '$username'");
        $infoArray = mysqli_fetch_assoc($infoQuery);

        $img = $infoArray['image'];
        $name = $infoArray['name'];
        $des = $infoArray['des'];
        $Phone = $infoArray['Phone'];
        $Email = $infoArray['Email'];
        $Map = $infoArray['Map'];
        $Facebook = $infoArray['Facebook'];
        $Instagram = $infoArray['Instagram'];
        $Messenger = $infoArray['Messenger'];
        $Zalo = $infoArray['Zalo'];
        $Tiktok = $infoArray['Tiktok'];
        if(!empty($img)) {
            $imageData = base64_encode(file_get_contents("../".$username."/".$img));
        }
    
        $vCardContent = "BEGIN:VCARD
        VERSION:3.0
        REV:2023-12-08T06:00:48Z
        NOTE;CHARSET=utf-8:$des
        N;CHARSET=utf-8:$name;;;;
        FN;CHARSET=utf-8:$name
        TEL;PREF:$Phone
        EMAIL;TYPE=Email:$Email
        URL;TYPE=Map:$Map
        URL;TYPE=Facebook:$Facebook
        URL;TYPE=Messenger:$Messenger
        URL;TYPE=Instagram:$Instagram
        URL;TYPE=TikTok:$Tiktok
        URL;TYPE=Zalo:$Zalo
        PHOTO;ENCODING=b;TYPE=JPEG:$imageData
        END:VCARD
        ";
    
        // Set headers to trigger a download
        header('Content-type: text/vcard');
        header('Content-Disposition: attachment; filename="contact.vcf"');
    
        // Output the vCard content
        echo $vCardContent;
    }
