<?php

//require SITE_ROOT.'modules/users/model/BLL/user_bll.class.singleton.php';

class users_model{
    private $bll;
    public static $_instance;

    private function __construct()
    {
        $this->bll = users_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    public function create_user($arrArgument)
    {
        return $this->bll->create_user_BLL($arrArgument);
    }

    public function obtain_paises($url)
    {
        return $this->bll->obtain_paises_BLL($url);
    }

    public function obtain_provincias()
    {
        return $this->bll->obtain_provincias_BLL();

    }

    public function obtain_poblaciones($arrArgument)
    {
        return $this->bll->obtain_poblaciones_BLL($arrArgument);
    }
}
