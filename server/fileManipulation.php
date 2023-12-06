<?php
  function deleteFolder($path) {
        if(!is_dir($path)) {
            return false;
        }

        $files = array_diff(scandir($path), array('.', '..'));

        foreach($files as $file) {
            $filePath = $path.'/'.$file;
            if(is_dir($filePath)) {
                deleteFolder($filePath);
            } else {
                unlink($filePath);
            }
        }

        return rmdir($path);
    }
?>
