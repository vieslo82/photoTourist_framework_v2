<?php

class users_dao{
    public static $_instance;

    private function __construct(){
    }

    public static function getInstance(){
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    public function create_user_DAO($db, $arrArgument){
        $name = $arrArgument['name'];
        $last_name = $arrArgument['last_name'];
        $birth_date = $arrArgument['birth_date'];
        $title_date = $arrArgument['title_date'];
        $address = $arrArgument['address'];
        $user = $arrArgument['user'];
        $pass = $arrArgument['pass'];
        $email = $arrArgument['email'];
        $en_lvl = $arrArgument['en_lvl'];
        $interests = $arrArgument['interests'];
        $avatar = $arrArgument['avatar'];
        $pais = $arrArgument['pais'];
        $provincia = $arrArgument['provincia'];
        $poblacion = $arrArgument['poblacion'];

        $history = 0;
        $music = 0;
        $computing = 0;
        $magic = 0;

        foreach ($interests as $indice) {
            if ($indice === 'History') {
                $history = 1;
            }
            if ($indice === 'Music') {
                $music = 1;
            }
            if ($indice === 'Computing') {
                $computing = 1;
            }
            if ($indice === 'Magic') {
                $magic = 1;
            }
        }

        $sql = 'INSERT INTO users (name, last_name, birth_date, title_date,'
                .' address, user, pass, email, en_lvl,Computing,History,'
                .' Magic,Music,avatar,pais,provincia, poblacion)'
                ." VALUES ('$name', '$last_name', '$birth_date','$title_date', "
                ." '$address', '$user', '$pass', '$email', '$en_lvl', '$computing', '$history', "
                ." '$magic', '$music', '$avatar', '$pais', '$provincia', '$poblacion')";

        return $db->ejecutar($sql);
    }

    public function obtain_paises_DAO($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        $file_contents = curl_exec($ch);
        curl_close($ch);

        return ($file_contents) ? $file_contents : false;
    }

    public function obtain_provincias_DAO(){
        $json = array();
        $tmp = array();
        //$provincias = simplexml_load_file($_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/resources/provinciasypoblaciones.xml');
        $provincias = simplexml_load_file(RESOURCES . 'provinciasypoblaciones.xml');
        $result = $provincias->xpath('/lista/provincia/nombre | /lista/provincia/@id');
        for ($i = 0; $i < count($result); $i += 2) {
            $e = $i + 1;
            $provincia = $result[$e];

            $tmp = array(
           'id' => (string) $result[$i], 'nombre' => (string) $provincia,
         );
            array_push($json, $tmp);
        }

        return $json;
    }

    public function obtain_poblaciones_DAO($arrArgument){
        $json = array();
        $tmp = array();

        $filter = (string) $arrArgument;
        //$xml = simplexml_load_file($_SERVER['DOCUMENT_ROOT'].'/php/photoTourist_framework_v1/resources/provinciasypoblaciones.xml');
        $xml = simplexml_load_file(RESOURCES . 'provinciasypoblaciones.xml');
        $result = $xml->xpath("/lista/provincia[@id='$filter']/localidades");

        for ($i = 0; $i < count($result[0]); ++$i) {
            $tmp = array(
             'poblacion' => (string) $result[0]->localidad[$i],
           );
            array_push($json, $tmp);
        }

        return $json;
    }
}
