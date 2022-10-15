function traerInformacionRoom() {
    $.ajax(
            {
                url: "http://129.159.70.221:81/api/Partyroom/all",
                type: "GET",
                datatype: "JSON",
                success: function (respuesta) {
                    verRespuestaRoom(respuesta);
                }
            }
    );

}



function verRespuestaRoom(items) {

    $("#resultadoRoom").empty();

    let myTable = "<table>";
    myTable += "<tr><th>Id</th><th>Nombre</th>\n\
                <th>Propietario</th>\n\
                <th>Capacidad</th>\n\
                <th>Descripción</th><th></th><th></th><tr>";

    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].owner + "</td>";
        myTable += "<td>" + items[i].capacity + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable += "<td><button onclick='editarInformacionRoom(" + items[i].id + ")' class='editar'>Editar</button>";
        myTable += "<td><button onclick='borrarElementoRoom(" + items[i].id + ")' class='borrar'>Borrar</button>";
        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#resultadoRoom").append(myTable);
}

function guardarInformacionRoom() {

    $("#resultadoRoom").empty();

    if ($("#idPartyRoom").val() === "") {

        if ($("#ownerRoom").val() !== "" && $("#capacityRoom").val() !== "" &&
                $("#nameRoom").val() !== "" && $("#descriptionRoom").val() !== "") {
            let myData = {owner: $("#ownerRoom").val(), capacity: $("#capacityRoom").val(), category: null,
                name: $("#nameRoom").val(), description: $("#descriptionRoom").val()};
            let dataToSend = JSON.stringify(myData);

            $.ajax(
                    {
                        url: "http://129.159.70.221:81/api/Partyroom/save",
                        type: "POST",
                        data: dataToSend,
                        datatype: "JSON",
                        contentType: "application/json",
                        success: function (respuesta) {
                            alert("Inserción exitosa");
                            $("#ownerRoom").val('');
                            $("#capacityRoom").val('');
                            $("#nameRoom").val('');
                            $("#descriptionRoom").val('');
                        },
                        error: function (xhr, status) {
                            alert("Operación no satisfactoria", +xhr.status);
                        }
                    }
            );
        } else {
            alert("Operación no satisfactoria. Todos los campos deben rellenarse");
        } 
    } else {
        let myData = {id: $("#idPartyRoom").val(), owner: $("#ownerRoom").val(), capacity: $("#capacityRoom").val(), category: null,
            name: $("#nameRoom").val(), description: $("#descriptionRoom").val()};
        let dataToSend = JSON.stringify(myData);

        $.ajax(
                {
                    url: "http://129.159.70.221:81/api/Partyroom/update",
                    type: "PUT",
                    data: dataToSend,
                    datatype: "JSON",
                    contentType: "application/json",
                    success: function (respuesta) {
                        alert("Actualización exitosa");
                        $("#idPartyRoom").val('');
                        $("#ownerRoom").val('');
                        $("#capacityRoom").val('');
                        $("#nameRoom").val('');
                        $("#descriptionRoom").val('');
                    },
                    error: function (xhr, status) {
                        alert("Operación no satisfactoria", +xhr.status);
                    }
                }
        );
    }
}

function editarInformacionRoom(idElemento) {


    $.ajax(
            {
                url: "http://129.159.70.221:81/api/Partyroom/" + idElemento,
                type: "GET",
                datatype: "JSON",
                success: function (respuesta) {
                    $("#idPartyRoom").val(idElemento);
                    $("#nameRoom").val(respuesta.name);
                    $("#ownerRoom").val(respuesta.owner);
                    $("#capacityRoom").val(respuesta.capacity);
                    $("#descriptionRoom").val(respuesta.description);
                }
            }
    );

}

function borrarElementoRoom(idElemento) {

    let myData = {id: idElemento};
    let dataToSend = JSON.stringify(myData);

    $.ajax(
            {
                url: "http://129.159.70.221:81/api/Partyroom/" + idElemento,
                type: "DELETE",
                data: dataToSend,
                datatype: "JSON",
                contentType: "application/json",
                success: function (respuesta) {
                    alert("Borrado exitoso");
                    traerInformacionRoom();
                },
                error: function (xhr, status) {
                    alert("Operación no satisfactoria", +xhr.status);
                }
            }
    );

}

