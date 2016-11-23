jQuery.fn.fill_or_clean = function() {
    this.each(function() {
        //if ($("#name").val() == "") {
        if ($("#name").val() == "") {
            $("#name").val("Introduce name");
            $("#name").focus(function() {
                if ($("#name").val() == "Introduce name") {
                    $("#name").val('');
                }
            });
        }
        $("#name").blur(function() { //Onblur se activa cuando el usuario retira el foco
            if ($("#name").val() == "") {
                $("#name").val("Introduce name");
            }
        });

        if ($("#last_name").val() == "") {
            $("#last_name").val("Introduce last name");
            $("#last_name").focus(function() {
                if ($("#last_name").val() == "Introduce last name") {
                    $("#last_name").val('');
                }
            });
        }
        $("#last_name").blur(function() {
            if ($("#last_name").val() == "") {
                $("#last_name").val("Introduce last name");
            }
        });
        if ($("#birth_date").val() == "") {
            $("#birth_date").val("Introduce date of birth");
            $("#birth_date").focus(function() {
                if ($("#birth_date").val() == "Introduce date of birth") {
                    $("#birth_date").val('');
                }
            });
        }
        $("#birth_date").blur(function() {
            if ($("#birth_date").val() == "") {
                $("#birth_date").val("Introduce date of birth");
            }
        });
        if ($("#title_date").val() == "") {
            $("#title_date").val("Introduce date of title");
            $("#title_date").focus(function() {
                if ($("#title_date").val() == "Introduce date of title") {
                    $("#title_date").val('');
                }
            });
        }
        $("#title_date").blur(function() {
            if ($("#title_date").val() == "") {
                $("#title_date").val("Introduce date of title");
            }
        });
        if ($("#address").val() == "") {
            $("#address").val("Introduce address");
            $("#address").focus(function() {
                if ($("#address").val() == "Introduce address") {
                    $("#address").val("");
                }
            });
        }
        $("#address").blur(function() {
            if ($("#address").val() == "") {
                $("#address").val("Introduce address");
            }
        });
        if ($("#user").val() == "") {
            $("#user").val("Introduce user");
            $("#user").focus(function() {
                if ($("#user").val() == "Introduce user") {
                    $("#user").val("");
                }
            });
        }
        $("#user").blur(function() {
            if ($("#user").val() == "") {
                $("#user").val("Introduce user");
            }
        });
        if ($("#pass").val() == "") {
            $("#pass").val("password");
            $("#pass").focus(function() {
                if ($("#pass").val() == "password") {
                    $("#pass").val("");
                }
            });
        }
        $("#pass").blur(function() {
            if ($("#pass").val() == "") {
                $("#pass").val("password");
            }
        });
        if ($("#conf_pass").val() == "") {
            $("#conf_pass").val("password");
            $("#conf_pass").focus(function() {
                if ($("#conf_pass").val() == "password") {
                    $("#conf_pass").val("");
                }
            });
        }
        $("#conf_pass").blur(function() {
            if ($("#conf_pass").val() == "") {
                $("#conf_pass").val("password");
            }
        });
        if ($("#email").val() == "") {
            $("#email").val("Introduce email");
            $("#email").focus(function() {
                if ($("#email").val() == "Introduce email") {
                    $("#email").val("");
                }
            });
        }
        $("#email").blur(function() {
            if ($("#email").val() == "") {
                $("#email").val("Introduce email");
            }
        });
        if ($("#conf_email").val() == "") {
            $("#conf_email").val("Repeat email");
            $("#conf_email").focus(function() {
                if ($("#conf_email").val() == "Repeat email") {
                    $("#conf_email").val("");
                }
            });
        }
        $("#conf_email").blur(function() {
            if ($("#conf_email").val() == "") {
                $("#conf_email").val("Repeat email");
            }
        });


    }); //each
    return this;

}; //function

//Solution to : "Uncaught Error: Dropzone already attached."
Dropzone.autoDiscover = false;

$(document).ready(function() {

    $(this).fill_or_clean();//CARGAMOS FUNCION LIMPIAR

    //Datepicker///////////////////////////


    //Valida users /////////////////////////
    $('#submit_user').click(function() {
        validate_user();
    });

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

    //Control de seguridad para evitar que al volver atrás de la pantalla results a create, no nos imprima los datos
    //$.get("modules/users/controller/controller_users.class.php?load_data=true",
    $.post("../../users/load_data_users/",{'load_data':true},
        function(response) {
            //alert(response.user);
            if (response.user === "") {
                $("#name").val('');
                $("#last_name").val('');
                $("#birth_date").val('');
                $("#title_date").val('');
                $("#address").val('');
                $("#user").val('');
                $("#pass").val('');
                $("#conf_pass").val('');
                $("#email").val('');
                $("#conf_email").val('');
                $("#en_lvl").val('Select level');
                var inputElements = document.getElementsByClassName('messageCheckbox');
                for (var i = 0; i < inputElements.length; i++) {
                    if (inputElements[i].checked) {
                        inputElements[i].checked = false;
                    }
                }

            } else {
                $("#name").val(response.user.name);
                $("#last_name").val(response.user.last_name);
                $("#birth_date").val(response.user.birth_date);
                $("#title_date").val(response.user.title_date);
                $("#address").val(response.user.address);
                $("#user").val(response.user.user);
                $("#pass").val(response.user.pass);
                $("#conf_pass").val(response.user.conf_pass);
                $("#email").val(response.user.email);
                $("#conf_email").val(response.user.conf_email);
                $("#en_lvl").val(response.user.en_lvl);
                var interests = response.user.interests;
                var inputElements = document.getElementsByClassName('messageCheckbox');
                for (var i = 0; i < interests.length; i++) {
                    for (var j = 0; j < inputElements.length; j++) {
                        if (interests[i] === inputElements[j])
                            inputElements[j].checked = true;
                    }
                }
            }
        }, "json");

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

    //Dropzone function //////////////////////////////////
    $("#dropzone").dropzone({
        //url: "modules/users/controller/controller_users.class.php?upload=true",
        url: "../../users/upload_users/",
        params:{'upload':true},
        addRemoveLinks: true,
        maxFileSize: 1000,
        dictResponseError: "Ha ocurrido un error en el server",
        acceptedFiles: 'image/*,.jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF,.rar,application/pdf,.psd',
        init: function() {
            this.on("success", function(file, response) {
                //alert(response);
                $("#progress").show();
                $("#bar").width('100%');
                $("#percent").html('100%');
                $('.msg').text('').removeClass('msg_error');
                $('.msg').text('Success Upload image!!').addClass('msg_ok').animate({
                    'right': '300px'
                }, 300);
            });
        },
        complete: function(file) {
            //if(file.status == "success"){
            //alert("El archivo se ha subido correctamente: " + file.name);
            //}
        },
        error: function(file) {
            //alert("Error subiendo el archivo " + file.name);
        },
        removedfile: function(file, serverFileName) {
            var name = file.name;
            $.ajax({
                type: "POST",
                //url: "modules/users/controller/controller_users.class.php?delete=true",
                url: "../../users/delete_users/",
                data: {"filename":name,"delete":true},
                success: function(data) {
                    $("#progress").hide();
                    $('.msg').text('').removeClass('msg_ok');
                    $('.msg').text('').removeClass('msg_error');
                    $("#e_avatar").html("");

                    var json = JSON.parse(data);
                    if (json.res === true) {
                        var element;
                        if ((element = file.previewElement) != null) {
                            element.parentNode.removeChild(file.previewElement);
                            //alert("Imagen eliminada: " + name);
                        } else {
                            false;
                        }
                    } else { //json.res == false, elimino la imagen también
                        var element;
                        if ((element = file.previewElement) != null) {
                            element.parentNode.removeChild(file.previewElement);
                        } else {
                            false;
                        }
                    }
                }
            });
        }
    });//Fin Dropzone

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

    //Utilizamos las expresiones regulares para las funciones de  fadeout
    var email_reg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    //var date_reg = /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/;
    var date_reg = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d$/;//calendario español
    var address_reg = /^[a-z0-9- -.]+$/i;
    var pass_reg = /^[0-9a-zA-Z]{6,32}$/;
    var string_reg = /^[A-Za-z]{2,30}$/;
    var usr_reg = /^[0-9a-zA-Z]{2,20}$/;

    //realizamos funciones para que sea más práctico nuestro formulario
    $("#name, #last_name").keyup(function() {
        if ($(this).val() != "" && string_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("#conf_email").keyup(function() {
        if ($(this).val() != "" && $(this).val() == $('#email').val()) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("#user").keyup(function() {
        if ($(this).val() != "" && usr_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("#conf_pass").keyup(function() {
        if ($(this).val() != "" && $(this).val() == $('#pass').val()) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("#pass").keyup(function() {
        if ($(this).val() != "" && pass_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("#title_date, #birth_date").keyup(function() {
        if ($(this).val() != "" && date_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("#address").keyup(function() {
        if ($(this).val() != "" && address_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });

    $("#email").keyup(function() {
        if ($(this).val() != "" && email_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
    //Cargamos los Dependent Dropdown

    load_countries_v1();
      $("#provincia").empty();
      $("#provincia").append('<option value="" selected="selected">Selecciona una Provincia</option>');
      $("#provincia").prop('disabled', true);
      $("#poblacion").empty();
      $("#poblacion").append('<option value="" selected="selected">Selecciona una Poblacion</option>');
      $("#poblacion").prop('disabled', true);

      $("#pais").change(function() {
          var pais = $(this).val();
          var provincia = $("#provincia");
          var poblacion = $("#poblacion");

          if (pais !== 'ES') {
              provincia.prop('disabled', true);
              poblacion.prop('disabled', true);
              $("#provincia").empty();
              $("#poblacion").empty();
          } else {
              provincia.prop('disabled', false);
              poblacion.prop('disabled', false);
              load_provincias_v1();
          } //fi else
      });

      $("#provincia").change(function() {
          var prov = $(this).val();
          if (prov > 0) {
              load_poblaciones_v1(prov);
          } else {
              $("#poblacion").prop('disabled', false);
          }
      });

});//FIN Document Ready


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
//Funciones para cargar los Dependent Dropdown
function load_countries_v2(cad,post_data) {//antes solo pasabamos cad

      $.post(cad, post_data, function (data) {//
    //$.getJSON(cad, function(data) {
            $("#pais").empty();
            $("#pais").append('<option value="" selected="selected">Selecciona un Pais</option>');

            $.each(data, function(i, valor) {
                $("#pais").append("<option value='" + valor.sISOCode + "'>" + valor.sName + "</option>");
            });
        })
        .fail(function() {
            console.log("error load_countries");
            //alert( "error load_countries" );
        });
}

function load_countries_v1() {
    //$.get("modules/users/controller/controller_users.class.php?load_pais=true",
    $.post("../../users/load_countries_users/",{'load_country':true},//el codigo ejemplo es por POST
      function(response) {

          var isArray = true;// creamos variable para comparar
          var array;
          try {
              array = JSON.parse(response);//guardamos JSon en una array
              isArray = Array.isArray(array);//devuelve si una array en True o False
          } catch(ex){
              isArray = false;
          }

          if (response === 'error' || !isArray) {
              //load_countries_v2("resources/ListOfCountryNamesByName.json");
              load_countries_v2("../../resources/ListOfCountryNamesByName.json");

          } else {
              //load_countries_v2("modules/products/controller/controller_products.class.php?load_pais=true"); //oorsprong.org
              load_countries_v2("../../users/load_countries_users/",{'load_country':true}); //oorsprong.org

          }
      })
      .fail(function(response) {
          //load_countries_v2("resources/ListOfCountryNamesByName.json");
          load_countries_v2("../../resources/ListOfCountryNamesByName.json");

      });
}

function load_provincias_v2() {
    //$.get("resources/provinciasypoblaciones.xml", function(xml) {
    $.get("../../resources/provinciasypoblaciones.xml", function (xml) {

            $("#provincia").empty();
            $("#provincia").append('<option value="" selected="selected">Selecciona una Provincia</option>');

            $(xml).find("provincia").each(function() {
                var id = $(this).attr('id');
                var nombre = $(this).find('nombre').text();
                $("#provincia").append("<option value='" + id + "'>" + nombre + "</option>");
            });
        })
        .fail(function() {
            alert("error load_provincias");
        });
}

function load_provincias_v1() { //provinciasypoblaciones.xml - xpath
    //$.get("modules/users/controller/controller_users.class.php?load_provincias=true",
    $.post("../../users/load_provinces_users/", {'load_provinces' : true},
            function(response) {
                $("#provincia").empty();
                $("#provincia").append('<option value="" selected="selected">Selecciona una Provincia</option>');
                //alert(response);
                var json = JSON.parse(response);
                var provincias = json.provincias;
                //alert(json);
                //alert(provincias);
                //console.log(provincias);

                //alert(provincias[0].id);
                //alert(provincias[0].nombre);

                if (provincias === 'error') {
                    load_provincias_v2();
                } else {
                    for (var i = 0; i < provincias.length; i++) {
                        $("#provincia").append("<option value='" + provincias[i].id + "'>" + provincias[i].nombre + "</option>");
                    }
                }
            })
        .fail(function(response) {
            load_provincias_v2();
        });
}

function load_poblaciones_v2(prov) {
    //$.get("resources/provinciasypoblaciones.xml", function(xml) {
    $.get("../../resources/provinciasypoblaciones.xml", function (xml) {
            $("#poblacion").empty();
            $("#poblacion").append('<option value="" selected="selected">Selecciona una Poblacion</option>');

            $(xml).find('provincia[id=' + prov + ']').each(function() {
                $(this).find('localidad').each(function() {
                    $("#poblacion").append("<option value='" + $(this).text() + "'>" + $(this).text() + "</option>");
                });
            });
        })
        .fail(function() {
            alert("error load_poblaciones");
        });
}

function load_poblaciones_v1(prov) { //provinciasypoblaciones.xml - xpath
    var datos = {
        idPoblac: prov
    };
    //$.post("modules/users/controller/controller_users.class.php", datos, function(response) {
    $.post("../../users/load_towns_users/", datos, function (response) {
            //alert(response);
            var json = JSON.parse(response);
            var poblaciones = json.poblaciones;
            //alert(poblaciones);
            //console.log(poblaciones);
            //alert(poblaciones[0].poblacion);

            $("#poblacion").empty();
            $("#poblacion").append('<option value="" selected="selected">Selecciona una Poblacion</option>');

            if (poblaciones === 'error') {
                load_poblaciones_v2(prov);
            } else {
                for (var i = 0; i < poblaciones.length; i++) {
                    $("#poblacion").append("<option value='" + poblaciones[i].poblacion + "'>" + poblaciones[i].poblacion + "</option>");
                }
            }
        })
        .fail(function() {
            load_poblaciones_v2(prov);
        });
}

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//Función para Validar Dependent Dropdown

function validate_pais(pais) {
    if (pais === null) {
        //return 'default_pais';
        return false;
    }
    if (pais.length === 0) {
        //return 'default_pais';
        return false;
    }
    if (pais === 'Selecciona un Pais') {
        //return 'default_pais';
        return false;
    }
    return true;
}

function validate_provincia(provincia) {
    if (provincia === null) {
        return 'default_provincia';
    }
    if (provincia.length === 0) {
        return 'default_provincia';
    }
    if (provincia === 'Selecciona una Provincia') {
        //return 'default_provincia';
        return false;
    }
    return true;
}

function validate_poblacion(poblacion) {
    if (poblacion === null) {
        return 'default_poblacion';
    }
    if (poblacion.length === 0) {
        return 'default_poblacion';
    }
    if (poblacion === 'Selecciona una Poblacion') {
        //return 'default_poblacion';
        return false;
    }
    return true;
}


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
//Función para Validar Usuarios
function validate_user() {

    var result = true;

    var name = document.getElementById('name').value;
    var last_name = document.getElementById('last_name').value;
    var birth_date = document.getElementById('birth_date').value;
    var title_date = document.getElementById('title_date').value;
    var address = document.getElementById('address').value;
    var en_lvl = document.getElementById('en_lvl').value;
    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;
    var conf_pass = document.getElementById('conf_pass').value;
    var email = document.getElementById('email').value;
    var conf_email = document.getElementById('conf_email').value;
    var pais = $("#pais").val();
    var provincia = $("#provincia").val();
    var poblacion = $("#poblacion").val();
    //var interests = [];
    var interests = new Array();
    var inputElements = document.getElementsByClassName('messageCheckbox');
    var j = 0;
    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].checked) {
            interests[j] = inputElements[i].value;
            j++;
        }
    }


    //Utilizamos las expresiones regulares para la validación de errores JS
    var email_reg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    //var date_reg = /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/;
    var date_reg = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d$/;//calendario español
    var address_reg = /^[a-z0-9- -.]+$/i;
    var pass_reg = /^[0-9a-zA-Z]{6,32}$/;
    var string_reg = /^[A-Za-z]{2,30}$/;
    var usr_reg = /^[0-9a-zA-Z]{2,20}$/;
    var v_pais = validate_pais(pais);
    var v_provincia = validate_provincia(provincia);
    var v_poblacion = validate_poblacion(poblacion);



    $(".error").remove();
    if ($("#name").val() == "" || $("#name").val() == "Introduce name") {
        $("#name").focus().after("<span class='error'>Introduce name</span>");
        result = false;
        return false;
    } else if (!string_reg.test($("#name").val())) {
        $("#name").focus().after("<span class='error'>Name must be 2 to 30 letters</span>");
        result = false;
        return false;
    } else if ($("#last_name").val() == "" || $("#last_name").val() == "Introduce last name") {
        $("#last_name").focus().after("<span class='error'>Introduce last name</span>");
        result = false;
        return false;
    } else if (!string_reg.test($("#last_name").val())) {
        $("#last_name").focus().after("<span class='error'>Last name must be 2 to 30 letters</span>");
        result = false;
        return false;
    } else if ($("#birth_date").val() == "" || $("#birth_date").val() == "Introduce date of birth") {
        $("#birth_date").focus().after("<span class='error'>Introduce date of birth</span>");
        result = false;
        return false;
    } else if (!date_reg.test($("#birth_date").val())) {
        $("#birth_date").focus().after("<span class='error'>error format date (mm/dd/yyyy)</span>");
        result = false;
        return false;
    } else if ($("#title_date").val() == "" || $("#title_date").val() == "Introduce date of title") {
        $("#title_date").focus().after("<span class='error'>Introduce date of title</span>");
        result = false;
        return false;
    } else if (!date_reg.test($("#title_date").val())) {
        $("#title_date").focus().after("<span class='error'>error format date (mm/dd/yyyy)</span>");
        result = false;
        return false;
    }

    if ($("#address").val() == "" || $("#address").val() == "Introduce address") {
        $("#address").focus().after("<span class='error'>Introduce address</span>");
        result = false;
        return false;
    } else if (!address_reg.test($("#address").val())) {
        $("#address").focus().after("<span class='error'>Address don't have  symbols.</span>");
        result = false;
        return false;
    }

    if ($("#user").val() == "" || $("#user").val() == "Introduce user") {
        $("#user").focus().after("<span class='error'>Introduce user</span>");
        result = false;
        return false;
    } else if (!usr_reg.test($("#user").val())) {
        $("#user").focus().after("<span class='error'>Last name must be 2 to 20 characters.</span>");
        result = false;
        return false;
    }

    if ($("#pass").val() == "" || $("#pass").val() == "password") {
        $("#pass").focus().after("<span class='error'>Introduce pass</span>");
        result = false;
        return false;
    } else if (!pass_reg.test($("#pass").val())) {
        $("#pass").focus().after("<span class='error'>Last name must be 6 to 32 characters.</span>");
        result = false;
        return false;
    }

    if ($("#conf_pass").val() == "" || $("#conf_pass").val() == "password") {
        $("#conf_pass").focus().after("<span class='error'>Repeat pass</span>");
        result = false;
        return false;
    } else if ($("#pass").val() != $("#conf_pass").val()) {
        $("#conf_pass").focus().after("<span class='error'>Pass doesn't match.</span>");
        result = false;
        return false;
    }

    if ($("#email").val() == "" || $("#email").val() == "Introduce email") {
        $("#email").focus().after("<span class='error'>Introduce email</span>");
        result = false;
        return false;
    } else if (!email_reg.test($("#email").val())) {
        $("#email").focus().after("<span class='error'>Error format email (example@example.com).</span>");
        result = false;
        return false;
    }

    if ($("#conf_email").val() == "" || $("#conf_email").val() == "Repeat email") {
        $("#conf_email").focus().after("<span class='error'>Repeat email</span>");
        result = false;
        return false;
    } else if ($("#email").val() != $("#conf_email").val()) {
        $("#conf_email").focus().after("<span class='error'>Email doesn't match.</span>");
        result = false;
        return false;
    }

    if (!v_pais) {
        $("#pais").focus().after("<span class='error'>Selecciona un Pais");
        //document.getElementById('e_pais').innerHTML = "Selecciona un Pais";
        result = false;
        return false;
    }

    if (!v_provincia) {
        $("#provincia").focus().after("<span class='error'>Selecciona una Provincia");
        //document.getElementById('e_pais').innerHTML = "Selecciona una Provincia";
        result = false;
        return false;
    }

    if (!v_poblacion) {
        $("#poblacion").focus().after("<span class='error'>Selecciona una Poblacion");
        //document.getElementById('e_pais').innerHTML = "Selecciona uuna Poblacion";
        result = false;
        return false;
    }


//Si todo es CORRECTO "result = true", se envian datos al SERVIDOR
    if (result) {

      if (provincia === null) {
            provincia = 'default_provincia';
        } else if (provincia.length === 0) {
            provincia = 'default_provincia';
        } else if (provincia === 'Selecciona una Provincia') {
            return 'default_provincia';
        }

        if (poblacion === null) {
            poblacion = 'default_poblacion';
        } else if (poblacion.length === 0) {
            poblacion = 'default_poblacion';
        } else if (poblacion === 'Selecciona una Poblacion') {
            return 'default_poblacion';
        }

      //Creamos un Array con los datos correctos del formulario.
        var data = {
            "name": name,
            "last_name": last_name,
            "birth_date": birth_date,
            "title_date": title_date,
            "address": address,
            "en_lvl": en_lvl,
            "user": user,
            "pass": pass,
            "conf_pass": conf_pass,
            "email": email,
            "conf_email": conf_email,
            "interests": interests,
            "pais": pais,
            "provincia": provincia,
            "poblacion": poblacion,
        };

        //Convertimos Array en JSON.
        var data_users_JSON = JSON.stringify(data);

        //Pasamos el JSON al Controller
        /*$.post('modules/users/controller/controller_users.class.php', {
                alta_users_json: data_users_JSON
            },*/
            $.post("../../users/alta_users/",
               {alta_users_json: data_users_JSON},

            //utilizamos AJAX para esperar la respuesta "response"
            function(response) {
                //console.log(response);
                if (response.success) {
                    window.location.href = response.redirect;
                }
                //alert(response);  //para debuguear
                //}); //para debuguear
            }, "json").fail(function(xhr) {


            if (xhr.responseJSON == 'undefined' && xhr.responseJSON == null)
                xhr.responseJSON = JSON.parse(xhr.responseText);

            if (xhr.responseJSON.error.name)
              $("#name").focus().after("<span  class='error1'>" + xhr.responseJSON.error.name + "</span>");

            if (xhr.responseJSON.error.last_name)
                $("#last_name").focus().after("<span  class='error1'>" + xhr.responseJSON.error.last_name + "</span>");

            if (xhr.responseJSON.error.birth_date)
                $("#birth_date").focus().after("<span  class='error1'>" + xhr.responseJSON.error.birth_date + "</span>");

            if (xhr.responseJSON.error.title_date)
                $("#title_date").focus().after("<span  class='error1'>" + xhr.responseJSON.error.title_date + "</span>");

            if (xhr.responseJSON.error.address)
                $("#address").focus().after("<span  class='error1'>" + xhr.responseJSON.error.address + "</span>");

            if (xhr.responseJSON.error.user)
                $("#user").focus().after("<span  class='error1'>" + xhr.responseJSON.error.user + "</span>");

            if (xhr.responseJSON.error.pass)
                $("#pass").focus().after("<span  class='error1'>" + xhr.responseJSON.error.pass + "</span>");

            if (xhr.responseJSON.error.conf_pass)
                $("#conf_pass").focus().after("<span  class='error1'>" + xhr.responseJSON.error.conf_pass + "</span>");

            if (xhr.responseJSON.error.email)
                $("#email").focus().after("<span  class='error1'>" + xhr.responseJSON.error.email + "</span>");

            if (xhr.responseJSON.error.conf_email)
                $("#conf_email").focus().after("<span class='error1'>" + xhr.responseJSON.error.conf_email + "</span>");

            if (xhr.responseJSON.error.en_lvl)
                $("#en_lvl").focus().after("<span  class='error1'>" + xhr.responseJSON.error.en_lvl + "</span>");

            if (xhr.responseJSON.error.interests)
                $("#e_interests").focus().after("<span  class='error1'>" + xhr.responseJSON.error.interests + "</span>");

            if (xhr.responseJSON.error_avatar)
                $("#dropzone").focus().after("<span  class='error1'>" + xhr.responseJSON.error_avatar + "</span>");

            if (xhr.responseJSON.error.pais)
                $("#pais").focus().after("<span class='error1'>" + xhr.responseJSON.error.pais + "</span>");

            if (xhr.responseJSON.error.provincia)
                $("#provincia").focus().after("<span class='error1'>" + xhr.responseJSON.error.provincia + "</span>");

            if (xhr.responseJSON.error.poblacion)
                $("#poblacion").focus().after("<span class='error1'>" + xhr.responseJSON.error.poblacion + "</span>");

            if (xhr.responseJSON.success1) {
                if (xhr.responseJSON.img_avatar !== "/php/photoTourist_framework_v1/media/default-avatar.png") {
                    //$("#progress").show();
                    //$("#bar").width('100%');
                    //$("#percent").html('100%');
                    //$('.msg').text('').removeClass('msg_error');
                    //$('.msg').text('Success Upload image!!').addClass('msg_ok').animate({ 'right' : '300px' }, 300);
                }
            } else {
                $("#progress").hide();
                $('.msg').text('').removeClass('msg_ok');
                $('.msg').text('Error Upload image!!').addClass('msg_error').animate({
                    'right': '300px'
                }, 300);
            }
        });
    }
}
