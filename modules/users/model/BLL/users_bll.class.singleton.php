<?php

//$path = $_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/';

//require MODEL_PATH.'Db.class.singleton.php';
//require SITE_ROOT.'modules/users/model/DAO/user_dao.class.singleton.php';

class users_bll{
    private $dao;
    private $db;
    public static $_instance;

    private function __construct(){
        $this->dao = users_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance(){
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    public function create_user_BLL($arrArgument){
        return $this->dao->create_user_DAO($this->db, $arrArgument);
    }

    public function obtain_paises_BLL($url){
        return $this->dao->obtain_paises_DAO($url);
    }

    public function obtain_provincias_BLL(){
        return $this->dao->obtain_provincias_DAO();
    }

    public function obtain_poblaciones_BLL($arrArgument){
        return $this->dao->obtain_poblaciones_DAO($arrArgument);
    }
}
