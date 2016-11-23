<?php
    function loadModel($model_path, $model_name, $function, $arrArgument = ''){
        $model = $model_path.$model_name.'.class.singleton.php';
        //echo json_encode($model);
        if (file_exists($model)) {
            //echo json_encode($model);
            include_once($model);
          //  echo json_encode($model);
            $modelClass = $model_name;

            if (!method_exists($modelClass, $function)) {
                throw new Exception();
            }
            //echo json_encode($modelClass);
            $obj = $modelClass::getInstance();

            if (isset($arrArgument)) {
               //return call_user_func(array($obj, $function),$arrArgument);//cambiar a array como en router
              return $obj->$function($arrArgument);
            }
        } else {
            throw new Exception();
        }
    }

    function loadView($rutaVista = '', $templateName = '', $arrPassValue = ''){
        $view_path = $rutaVista.$templateName;
        $arrData = '';

        if (file_exists($view_path)) {
            if (isset($arrPassValue))
                $arrData = $arrPassValue;
                include_once($view_path);
        } else {
            //codigo nuevo
          $result = filter_num_int($rutaVista);
            if ($result['resultado']) {
                $rutaVista = $result['datos'];
            } else {
                $rutaVista = http_response_code();
            }
            //codigo nuevo
            $log = log::getInstance();
            $log->add_log_general('error loadView general', $_GET['module'], 'response ' . $rutaVista); //$text, $controller, $function
            $log->add_log_user('error loadView general', '', $_GET['module'], 'response ' . $rutaVista); //$msg, $username = "", $controller, $function
                //die($templateName . ' Template Not Found under View Folder');

            $result = response_code($rutaVista);
            $arrData = $result;
            require_once VIEW_PATH_INC_ERROR . "error.php";
            //require_once $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/view/inc/templates_error/'.'error'.'.php';
        }
    }
