<?php

  //SITE_ROOT
  $path = $_SERVER['DOCUMENT_ROOT'].'/photoTourist_framework_v1/';
  define('SITE_ROOT', $path);

  //SITE_PATH
  define('SITE_PATH', '/photoTourist_framework_v1/');

  //CSS
  define('CSS_PATH', SITE_PATH.'view/css/');

  //log
  define('USER_LOG_DIR', SITE_ROOT . 'log/user/Site_User_errors.log');
  define('GENERAL_LOG_DIR', SITE_ROOT . 'log/general/Site_General_errors.log');

  //production
  define('PRODUCTION', true);

  //model
  define('MODEL_PATH', SITE_ROOT.'model/');

  //view
  define('VIEW_PATH_INC', SITE_ROOT.'view/inc/');
  define('VIEW_PATH_INC_ERROR', SITE_ROOT.'view/inc/templates_error/');

  //IMG
  define('IMG_PATH', SITE_PATH . 'view/images/');
  
  //CSS
define('CSS_PATH', SITE_PATH . 'view/css/');

//JS
define('JS_PATH', SITE_PATH . 'view/js/');

  //modules
  define('MODULES_PATH', SITE_ROOT.'modules/');

  //resources
  define('RESOURCES', SITE_ROOT.'resources/');

  //media
  define('MEDIA_PATH', SITE_ROOT.'media/');

  //utils
  define('UTILS', SITE_ROOT.'utils/');

  //model users
  define('FUNCTIONS_USERS', SITE_ROOT.'modules/users/utils/');
  define('MODEL_PATH_USERS', SITE_ROOT.'modules/users/model/');
  define('DAO_USERS', SITE_ROOT.'modules/users/model/DAO/');
  define('BLL_USERS', SITE_ROOT.'modules/users/model/BLL/');
  define('MODEL_USERS', SITE_ROOT.'modules/users/model/model/');
  define('USERS_JS_PATH', SITE_PATH.'modules/users/view/js/');

  //amigables
  define('URL_AMIGABLES', TRUE);
