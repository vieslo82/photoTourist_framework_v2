<?php

    class controller_users{

        public function __construct(){
            include FUNCTIONS_USERS.'functions_users.inc.php';
            include UTILS.'upload.php';
            $_SESSION['module'] = 'users';
        }

        public function form_users(){
            require_once VIEW_PATH_INC.'header.php';
            require_once VIEW_PATH_INC.'menu.php';

            echo '<br><br><br><br><br><br><br>';
            loadView('modules/users/view/', 'create_users.php');

            require_once VIEW_PATH_INC.'footer.html';
        }

        public function results_user(){
            require_once VIEW_PATH_INC.'header.php';
            require_once VIEW_PATH_INC.'menu.php';

            echo '<br><br><br><br><br><br><br>';
            loadView('modules/users/view/', 'results_users.php');

            require_once VIEW_PATH_INC.'footer.html';
        }

        public function upload_users(){
            if ((isset($_POST['upload'])) && ($_POST['upload'] == true)) {
                $result_avatar = upload_files();
                $_SESSION['result_avatar'] = $result_avatar;
                echo debugPHP($_SESSION['result_avatar']); // show it   in alert(response) dropzone
            }
        }

        public function alta_users(){
            if ((isset($_POST['alta_users_json']))) {
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
                    try {
                        $arrValue = loadModel(MODEL_USERS, 'users_model', 'create_user', $arrArgument);
                    } catch (Exception $e) {
                        showErrorPage(2, 'ERROR - 503 BD', 'HTTP/1.0 503 Service Unavailable', 503);
                    }

                    if ($arrValue) {
                        $mensaje = 'Su registro se ha efectuado correctamente, para finalizar compruebe que ha recibido un correo de validacion y siga sus instrucciones';
                    } else {
                        $mensaje = 'No se ha podido realizar su alta. Intentelo mas tarde';
                    }

                    //Redirigimos a results_users con los datos de $arrArgument y $mensaje
                    $_SESSION['user'] = $arrArgument;
                    $_SESSION['msje'] = $mensaje;
                    $callback = '../../users/results_user/';
                    //$callback = 'index.php?module=users&view=results_users';
                    $jsondata['success'] = true;
                    $jsondata['redirect'] = $callback;
                    echo json_encode($jsondata);
                    exit;
                } else {
                    //$error = $result['error'];
                    //$error_avatar = $result_avatar['error'];
                    $jsondata['success'] = false;
                    $jsondata['error'] = $result['error'];
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
        }

        public function delete_users(){
            if (isset($_GET['delete']) && $_GET['delete'] == true) {
                $_SESSION['result_avatar'] = array();
                $result = remove_files();
                if ($result === true) {
                    echo json_encode(array('res' => true));
                } else {
                    echo json_encode(array('res' => false));
                }
            }
        }

        public function load_users(){

          if (isset($_POST['load']) && $_POST['load'] == true) {
          //echo json_encode("FUNCION LOAD USERS");
          //exit;
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
        }

        public function load_data_users(){
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
        }

      //DEPENDENT DROP DOWN [Pais, Provincias, Poblaciones]
      public function load_countries_users(){
          if ((isset($_GET['load_country'])) && ($_GET['load_country'] == true)) {
              $json = array();
              $url = 'http://www.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfCountryNamesByName/JSON';

              //$path_model = $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/modules/users/model/model/';

              //$json = loadModel($path_model, 'users_model', 'obtain_paises', $url);

              try {
                              //throw new Exception();
                  $json = loadModel(MODEL_USERS, "users_model", "obtain_paises", $url);
              } catch (Exception $e) {
                  $json = array();
              }

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
      }

        public function load_provinces_users(){

            if ((isset($_POST['load_provinces'])) && ($_POST['load_provinces'] == true)) {
                $jsondata = array();
                $json = array();

                //$path_model = $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/modules/users/model/model/';

                //$json = loadModel($path_model, 'users_model', 'obtain_provincias');

                try {
                  $json = loadModel(MODEL_USERS, "users_model", "obtain_provincias");
                } catch (Exception $e) {
                    $json = array();
                }

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
        }

        public function load_towns_users(){
            if (isset($_POST['idPoblac'])) {
                $jsondata = array();
                $json = array();

                //$path_model = $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/modules/users/model/model/';
                //$json = loadModel($path_model, 'users_model', 'obtain_poblaciones', $_POST['idPoblac']);

                try {
                     $json = loadModel(MODEL_USERS, "users_model", "obtain_poblaciones", $_POST['idPoblac']);
                } catch (Exception $e) {
                      showErrorPage(2, "ERROR - 503 BD", 'HTTP/1.0 503 Service Unavailable', 503);
                }

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
        }
      //_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

    }
