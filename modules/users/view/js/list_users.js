//UTILIZAMOS LA FUNCION AJAX PARA PINTAR UN USERS
$(document).ready(function() {
    //load_users_ajax();
    //load_users_get_v1();
    load_users_get_v2();
});

////////////////////////////////////////////////////////////////
/*function load_users_ajax() {
    $.ajax({
        type: 'GET',
        url: "index.php?module=users&function=load_users&load=true",
        //dataType: 'json',
        async: false
    }).success(function(data) {
        var json = JSON.parse(data);

        //alert(json.user.usuario);

        pintar_user2(json);

    }).fail(function(xhr) {
        alert(xhr.responseText);
    });
}*/

////////////////////////////////////////////////////////////////
/*function load_users_get_v1() {
  $.get("index.php?module=users&function=load_users&load=true", function (data, status) {
        var json = JSON.parse(data);
        //$( "#content" ).html( json.msje );
        //alert("Data: " + json.user.usuario + "\nStatus: " + status);

        pintar_user2(json);
    });
}*/

////////////////////////////////////////////////////////////////
function load_users_get_v2() {
  //alert("ESTOY EN LOAD_USERS_GET_V2");
  var jqxhr = $.post("../../users/load_users/",{'load':true}, function (data) {
    //alert(data);
        var json = JSON.parse(data);

        //console.log(json);
        pintar_user(json);
        //alert( "success" );
    }).done(function() {
        //alert( "second success" );
    }).fail(function() {
        //alert( "error" );
    }).always(function() {
        //alert( "finished" );
    });

    jqxhr.always(function() {
        //alert( "second finished" );
    });
}

function pintar_user(data) {
    //alert(data.user.avatar);
    var content = document.getElementById("content");
    var div_user = document.createElement("div");
    var parrafo = document.createElement("p");

    for (var name_data in data) {
        if (name_data != 'user') {
            var dat = document.createElement("div");
            dat.innerHTML = name_data + " = " + data[name_data];
            parrafo.appendChild(dat);
        } else {
            for (var name_user in data.user) {
                date_print(name_user, data.user[name_user]);
            }
        }

    }
    div_user.appendChild(parrafo);
    content.appendChild(div_user);

    //function to print dynamically divs
    function date_print(names, dates) {
        if (names === 'avatar' || names === 'interests') {
            if (names === 'avatar') {
                var img = document.createElement("div");
                var cad = dates;
                var html = '<img src="../../' + cad + '" height="75" width="75"> ';
                img.innerHTML = html;
                parrafo.appendChild(img);
            } else {
                var interests = document.createElement("div");
                interests.innerHTML = "interests = ";
                for (var i = 0; i < data.user.interests.length; i++) {
                    interests.innerHTML += " - " + data.user.interests[i];
                }
                parrafo.appendChild(interests);
            }
        } else {
            var date = document.createElement("div");
            date.innerHTML = names + " = " + dates;
            parrafo.appendChild(date);
        }
    }
}

function pintar_user2(data) {
    //alert(data.user.avatar);
    var content = document.getElementById("content");
    var div_user = document.createElement("div");
    var parrafo = document.createElement("p");

    var msje = document.createElement("div");
    msje.innerHTML = "msje = ";
    msje.innerHTML += data.msje;

    var name = document.createElement("div");
    name.innerHTML = "name = ";
    name.innerHTML += data.user.name;

    var last_name = document.createElement("div");
    last_name.innerHTML = "last_name = ";
    last_name.innerHTML += data.user.last_name;

    var birth_date = document.createElement("div");
    birth_date.innerHTML = "birth_date = ";
    birth_date.innerHTML += data.user.birth_date;

    var title_date = document.createElement("div");
    title_date.innerHTML = "fecha_stock = ";
    title_date.innerHTML += data.user.title_date;

    var address = document.createElement("div");
    address.innerHTML = "address = ";
    address.innerHTML += data.user.address;

    var pais = document.createElement("div");
    pais.innerHTML = "pais = ";
    pais.innerHTML += data.user.pais;

    var provincia = document.createElement("div");
    provincia.innerHTML = "provincia = ";
    provincia.innerHTML += data.user.provincia;

    var poblacion = document.createElement("div");
    poblacion.innerHTML = "poblacion = ";
    poblacion.innerHTML += data.user.poblacion;

    var email = document.createElement("div");
    email.innerHTML = "email = ";
    email.innerHTML += data.user.email;

    var en_lvl = document.createElement("div");
    en_lvl.innerHTML = "email = ";
    en_lvl.innerHTML += data.user.en_lvl;

    var interests = document.createElement("div");
    interests.innerHTML = "interests = ";
    for(var i =0;i < data.user.interests.length;i++){
    interests.innerHTML += " - "+data.user.interests[i];
    }

    //arreglar ruta IMATGE!!!!!

    var cad = data.user.avatar;
    //console.log('cad');
    //var cad = cad.toLowerCase();
    var img = document.createElement("div");
    var html = '<img src="' + cad + '" height="75" width="75"> ';
    img.innerHTML = html;
    //alert(html);

    div_user.appendChild(parrafo);
    parrafo.appendChild(msje);
    parrafo.appendChild(name);
    parrafo.appendChild(last_name);
    parrafo.appendChild(birth_date);
    parrafo.appendChild(title_date);
    parrafo.appendChild(address);
    parrafo.appendChild(pais);
    parrafo.appendChild(provincia);
    parrafo.appendChild(poblacion);
    parrafo.appendChild(email);
    parrafo.appendChild(en_lvl);
    parrafo.appendChild(interests);
    content.appendChild(div_user);
    content.appendChild(img);
  }
