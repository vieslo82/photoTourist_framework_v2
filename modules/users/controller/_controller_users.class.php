<?php
    session_start();
    include $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/modules/users/utils/functions_users.inc.php';
    include $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/utils/upload.php';
    include $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/utils/common.inc.php';
    include $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/paths.php';
    include $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/model/Conf.class.singleton.php';

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
    if ((isset($_GET['upload'])) && ($_GET['upload'] == true)) {
        $result_avatar = upload_files();
        $_SESSION['result_avatar'] = $result_avatar;
    //echo debug($_SESSION['result_avatar']); //se mostraría en alert(response); de dropzone.js
    }

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
    if ((isset($_POST['alta_users_json']))) {
        alta_users();
    }

    function alta_users()
    {
        $jsondata = array();

        //Transformamos JSON a Datos normales.
        $usersJSON = json_decode($_POST['alta_users_json'], true);

        $result = validate_user($usersJSON);

        if (empty($_SESSION['result_avatar'])) {
            $_SESSION['result_avatar'] = array('resultado' => true, 'error' => '', 'datos' => 'media/default-avatar.png');
        }

        $result_avatar = $_SESSION['result_avatar'];

        if (($result['resultado']) && ($result_avatar['resultado'])) {
            $arrArgument = array(
                'name' => ucfirst($result['datos']['name']),
                'last_name' => ucfirst($result['datos']['last_name']),
                'birth_date' => $result['datos']['birth_date'],
                'title_date' => $result['datos']['title_date'],
                'address' => $result['datos']['address'],
                'user' => $result['datos']['user'],
                'pass' => $result['datos']['pass'],
                'email' => $result['datos']['email'],
                'en_lvl' => strtoupper($result['datos']['en_lvl']),
                'interests' => $result['datos']['interests'],
                'avatar' => $result_avatar['datos'],
                'pais' => ucfirst($result['datos']['pais']),
                'provincia' => ucfirst($result['datos']['provincia']),
                'poblacion' => ucfirst($result['datos']['poblacion']),
            );

            //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
            //Preparamos los datos para hacer insertarlos en la Base de Datos
            $arrValue = false;
            $path_model = $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/modules/users/model/model/';
            $arrValue = loadModel($path_model, 'users_model', 'create_user', $arrArgument);
            //echo json_encode($arrValue);
            //die();

            if ($arrValue) {
                $mensaje = 'Su registro se ha efectuado correctamente, para finalizar compruebe que ha recibido un correo de validacion y siga sus instrucciones';
            } else {
                $mensaje = 'No se ha podido realizar su alta. Intentelo mas tarde';
            }

            //Redirigimos a results_users con los datos de $arrArgument y $mensaje
            $_SESSION['user'] = $arrArgument;
            $_SESSION['msje'] = $mensaje;
            $callback = 'index.php?module=users&view=results_users';

            $jsondata['success'] = true;
            $jsondata['redirect'] = $callback;
            echo json_encode($jsondata);
            exit;
        } else {
            //$error = $result['error'];
            //$error_avatar = $result_avatar['error'];
            $jsondata['success'] = false;
            $jsondata['error'] = $result['error'];
            echo json_encode($jsondata);
            $jsondata['error_avatar'] = $result_avatar['error'];

            $jsondata['success1'] = false;
            if ($result_avatar['resultado']) {
                $jsondata['success1'] = true;
                $jsondata['img_avatar'] = $result_avatar['datos'];
            }
            header('HTTP/1.0 400 Bad error', true, 404);
            echo json_encode($jsondata);
            //exit;
        }
    }

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
    if (isset($_GET['delete']) && $_GET['delete'] == true) {
        $_SESSION['result_avatar'] = array();
        $result = remove_files();
        if ($result === true) {
            echo json_encode(array('res' => true));
        } else {
            echo json_encode(array('res' => false));
        }
    }

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
    if (isset($_GET['load']) && $_GET['load'] == true) {
        $jsondata = array();
        if (isset($_SESSION['user'])) {
            //echo debug($_SESSION['user']);
            $jsondata['user'] = $_SESSION['user'];
        }
        if (isset($_SESSION['msje'])) {
            //echo $_SESSION['msje'];
            $jsondata['msje'] = $_SESSION['msje'];
        }
        close_session();
        echo json_encode($jsondata);
        exit;
    }

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
    function close_session()
    {
        unset($_SESSION['user']);
        unset($_SESSION['msje']);
        $_SESSION = array(); // Destruye todas las variables de la sesión
        session_destroy(); // Destruye la sesión
    }

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
    if ((isset($_GET['load_data'])) && ($_GET['load_data'] == true)) {
        $jsondata = array();

        if (isset($_SESSION['user'])) {
            $jsondata['user'] = $_SESSION['user'];
            echo json_encode($jsondata);
            exit;
        } else {
            $jsondata['user'] = '';
            echo json_encode($jsondata);
            exit;
        }
    }

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
    //Funciones para los COMBODEPENDENT

    if ((isset($_GET['load_pais'])) && ($_GET['load_pais'] == true)) {
        $json = array();
        $url = 'http://www.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfCountryNamesByName/JSON';

        $path_model = $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/modules/users/model/model/';

        $json = loadModel($path_model, 'users_model', 'obtain_paises', $url);
        /*if($json){
          echo $json;
          exit;
        }else{
          $json = "error";
          echo $json;
          exit;
        }*/

//FUNCION DE TONI para comprobar si la url de pais está disponible
  if (stristr($json, 'error')) {
      $json = 'error';
      exit;
      if ($json) {
          echo $json;
          exit;
      } else {
          $json = 'error';
          echo $json;
          exit;
      }
  }
    }

/////////////////////////////////////////////////// load_provincias
if ((isset($_GET['load_provincias'])) && ($_GET['load_provincias'] == true)) {
    $jsondata = array();
    $json = array();

    $path_model = $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/modules/users/model/model/';

    $json = loadModel($path_model, 'users_model', 'obtain_provincias');

    if ($json) {
        $jsondata['provincias'] = $json;
        echo json_encode($jsondata);
        exit;
    } else {
        $jsondata['provincias'] = 'error';
        echo json_encode($jsondata);
        exit;
    }
}

/////////////////////////////////////////////////// load_poblaciones
if (isset($_POST['idPoblac'])) {
    $jsondata = array();
    $json = array();

    $path_model = $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/modules/users/model/model/';
    $json = loadModel($path_model, 'users_model', 'obtain_poblaciones', $_POST['idPoblac']);

    if ($json) {
        $jsondata['poblaciones'] = $json;
        echo json_encode($jsondata);
        exit;
    } else {
        $jsondata['poblaciones'] = 'error';
        echo json_encode($jsondata);
        exit;
    }
}
