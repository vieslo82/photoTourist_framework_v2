<?php
//utilizar $_FILES['file'] no $_FILES['avatar'] por dropzone.js

    function upload_files()
    {
        $error = '';
        $copiarFichero = false;
        $extensiones = array('jpg', 'jpeg', 'gif', 'png', 'bmp');

        if (!isset($_FILES)) {
            $error .= 'No existe $_FILES <br>';
        }
        if (!isset($_FILES['file'])) {
            $error .= 'No existe $_FILES[file] <br>';
        }

        $imagen = $_FILES['file']['tmp_name'];
        $nom_fitxer = $_FILES['file']['name'];
        $mida_fitxer = $_FILES['file']['size'];
        $tipus_fitxer = $_FILES['file']['type'];
        $error_fitxer = $_FILES['file']['error'];

        if ($error_fitxer > 0) { // El error 0 quiere decir que se subió el archivo correctamente
            switch ($error_fitxer) {
                case 1: $error .= 'Fitxer major que upload_max_filesize <br>'; break;
                case 2: $error .= 'Fitxer major que max_file_size <br>'; break;
                case 3: $error .= 'Fitxer només parcialment pujat <br>'; break;
                //case 4: $error .=  'No has pujat cap fitxer <br>';break; //assignarem a l'us default-avatar
            }
        }

        ////////////////////////////////////////////////////////////////////////////
        //if($_FILES['avatar']['error'] !== 0) { //Assignarem a l'us default-avatar
            //$error .=  'Archivo no subido correctamente <br>';
        //}

        ////////////////////////////////////////////////////////////////////////////
        if ($_FILES['file']['size'] > 55000) {
            $error .= 'Large File Size <br>';
        }

        ////////////////////////////////////////////////////////////////////////////
        //if ($_FILES['avatar']['name'] === "") { //Assignarem a l'us default-avatar
            //$error .= "No ha seleccionado ninguna imagen. Te proporcionamos un default-avatar<br>";
        //}

        if ($_FILES['file']['name'] !== '') {
            ////////////////////////////////////////////////////////////////////////////
            @$extension = strtolower(end(explode('.', $_FILES['file']['name']))); // Obtenemos la extensión, en minúsculas para poder comparar
            if (!in_array($extension, $extensiones)) {
                $error .= 'Sólo se permite subir archivos con estas extensiones: '.implode(', ', $extensiones).' <br>';
            }
            ////////////////////////////////////////////////////////////////////////////
            //getimagesize falla si $_FILES['avatar']['name'] === ""
            if (!@getimagesize($_FILES['file']['tmp_name'])) {
                $error .= 'Invalid Image File... <br>';
            }
            ////////////////////////////////////////////////////////////////////////////
            list($width, $height, $type, $attr) = @getimagesize($_FILES['file']['tmp_name']);
            if ($width > 150 || $height > 150) {
                $error .= 'Maximum width and height exceeded. Please upload images below 100x100 px size <br>';
            }
        }

        ////////////////////////////////////////////////////////////////////////////
        $upfile = $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/media/'.$_FILES['file']['name'];
        if (is_uploaded_file($_FILES['file']['tmp_name'])) {
            if (is_file($_FILES['file']['tmp_name'])) {
                $idUnico = rand();
                $nombreFichero = $idUnico.'-'.$_FILES['file']['name'];
                $_SESSION['nombreFichero'] = $nombreFichero;
                $copiarFichero = true;
                // I use absolute route to move_uploaded_file because this happens when i run ajax
                $upfile = $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/media/'.$nombreFichero;
            } else {
                $error .= 'Invalid File...';
            }
        }

        $i = 0;
        if ($error == '') {
            if ($copiarFichero) {
                if (!move_uploaded_file($_FILES['file']['tmp_name'], $upfile)) {
                    $error .= '<p>Error al subir la imagen.</p>';

                    return $return = array('resultado' => false, 'error' => $error, 'datos' => '');
                }
                //We need edit $upfile because now i don't need absolute route.
                $upfile = '/php/photoTourist_framework_v1/media/'.$nombreFichero;

                return $return = array('resultado' => true, 'error' => $error, 'datos' => $upfile);
            }
            if ($_FILES['file']['error'] !== 0) { //Assignarem a l'us default-avatar
                $upfile = '/php/photoTourist_framework_v1/media/default-avatar.jpg';

                return $return = array('resultado' => true, 'error' => $error, 'datos' => $upfile);
            }
        } else {
            return $return = array('resultado' => false, 'error' => $error, 'datos' => '');
        }
    }

    function remove_files()
    {
        //return json_encode("ESTOY EN UPD.PHP");
    $name = $_POST['filename'];
        if (file_exists($_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/media/'.$name)) {
            unlink($_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/media/'.$name);

            return true;
        } else {
            return false;
        }
    }
