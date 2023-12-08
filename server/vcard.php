<?php
	include_once "image.php";
	// Define vCard data
	$firstName = 'John';
	$lastName = 'Doe';
	$email = 'john.doe@example.com';
	$phone = '+1234567890';
	$facebookUrl = 'https://www.facebook.com/johndoe';
	// Build vCard content
	$vCardContent = "BEGIN:VCARD
	VERSION:3.0
	REV:2023-12-08T06:00:48Z
	URL:https://danhbaso.net/example/
	NOTE;CHARSET=utf-8:🌺 Cuộc sống chỉ có thể được nhìn ngược về quá khứ; nhưng
	nó phải được sống hướng về phía trước 💜
	N;CHARSET=utf-8:Phan Thanh Nhã;;;;
	FN;CHARSET=utf-8:Phan Thanh Nhã
	TEL;PREF:0988866969
	EMAIL;TYPE=Email:natalie.lynch@pencloud.com
	URL;TYPE=Facebook:https://facebook.com/example
	URL;TYPE=TikTok:https://tiktok.com/@tiktok
	URL;TYPE=Facebook messenger:https://m.me/chatbot
	URL;TYPE=Zalo:https://zalo.me/0999999999
	URL;TYPE=Số tài khoản ngân hàng:1903483483
	PHOTO;ENCODING=b;TYPE=JPEG:$imageData
	END:VCARD
	";

	// Set headers to trigger a download
	header('Content-type: text/vcard');
	header('Content-Disposition: attachment; filename="contact.vcf"');

	// Output the vCard content
	echo $vCardContent;
?>
