<?php
    include "conn.php";
    
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