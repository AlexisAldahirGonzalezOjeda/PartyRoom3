function traerInformacionMens() {
    $.ajax(
            {
                url: "http://129.159.70.221:81/api/Message/all",
                type: "GET",
                datatype: "JSON",
                success: function (respuesta) {
                    verRespuestaMens(respuesta);
                }
            }
    );
}

function verRespuestaMens(items) {

    $("#resultadoMens").empty();
    let myTable = "<table>";
    myTable += "<tr><th>Id</th><th>Cliente</th><th>Salón</th><th>Mensaje</th><th></th><th></th><tr>";
    for (i = 0; i < items.length; i++) {
        let idC = items[i].client["idClient"];
        let idP = items[i].partyroom["id"];
        myTable += "<tr>";
        myTable += "<td>" + items[i].idMessage + "</td>";
        myTable += "<td>" + items[i].client["name"] + "</td>";
        myTable += "<td>" + items[i].partyroom["name"] + "</td>";
        myTable += "<td>" + items[i].messageText + "</td>";
        myTable += "<td><button onclick='editarInformacionMens(" + items[i].idMessage + "," + idC + "," + idP + ")' class='editar'>Editar</button>";
        myTable += "<td><button onclick='borrarElementoMens(" + items[i].idMessage + ")' class='borrar'>Borrar</button>";
        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#resultadoMens").append(myTable);
}

function guardarInformacionMens() {

    if ($("#idCli").val() !== "" && $("#idRoom").val() !== "" && $("#messageText").val() !== "") {
        let idCliente = $("#idCli").val();
        $.ajax(
                {
                    url: "http://129.159.70.221:81/api/Client/" + idCliente,
                    type: "GET",
                    datatype: "JSON",
                    success: function (respuesta) {
                        if (respuesta === null) {
                            alert("Operación no satisfactoria. El Id del cliente no existe");
                        } else {
                            guardarInformacionMens2(respuesta);
                        }
                    }
                }
        );
    } else {
        alert("Operación no satisfactoria. Todos los campos deben rellenarse");
    }


}

function guardarInformacionMens2(cliente) {

    let idPartyroom = $("#idRoom").val();
    $.ajax(
            {
                url: "http://129.159.70.221:81/api/Partyroom/" + idPartyroom,
                type: "GET",
                datatype: "JSON",
                success: function (respuesta) {
                    if (respuesta === null) {
                        alert("Operación no satisfactoria. El Id del salón no existe");
                    } else {
                        guardarInformacionMens3(cliente, respuesta);
                    }
                }
            }
    );
}

function guardarInformacionMens3(cliente, partyroom) {

    $("#resultadoMens").empty();
    if ($("#idMensaje").val() === "") {
        let myData = {partyroom: partyroom, client: cliente,
            messageText: $("#messageText").val()};
        let dataToSend = JSON.stringify(myData);
        $.ajax(
                {
                    url: "http://129.159.70.221:81/api/Message/save",
                    type: "POST",
                    data: dataToSend,
                    datatype: "JSON",
                    contentType: "application/json",
                    success: function (respuesta) {
                        alert("Inserción exitosa");
                        $("#idMensaje").val('');
                        $("#idCli").val('');
                        $("#idRoom").val('');
                        $("#messageText").val('');
                    },
                    error: function (xhr, status) {
                        alert("Operación no satisfactoria", +xhr.status);
                    }
                }
        );
    } else {
        let myData = {idMessage: $("#idMensaje").val(), partyroom: partyroom, client: cliente,
            messageText: $("#messageText").val()};
        let dataToSend = JSON.stringify(myData);
        $.ajax(
                {
                    url: "http://129.159.70.221:81/api/Message/update",
                    type: "PUT",
                    data: dataToSend,
                    datatype: "JSON",
                    contentType: "application/json",
                    success: function (respuesta) {
                        alert("Actualización exitosa");
                        $("#idMensaje").val('');
                        $("#idCli").val('');
                        $("#idRoom").val('');
                        $("#messageText").val('');
                    },
                    error: function (xhr, status) {
                        alert("Operación no satisfactoria", +xhr.status);
                    }
                }
        );
    }
}



function editarInformacionMens(idElemento, idC, idP) {

    $.ajax(
            {
                url: "http://129.159.70.221:81/api/Message/" + idElemento,
                type: "GET",
                datatype: "JSON",
                success: function (respuesta) {
                    $("#idMensaje").val(idElemento);
                    $("#idCli").val(idC);
                    $("#idRoom").val(idP);
                    $("#messageText").val(respuesta.messageText);
                }
            }
    );
}

function borrarElementoMens(idElemento) {

    let myData = {id: idElemento};
    let dataToSend = JSON.stringify(myData);
    $.ajax(
            {
                url: "http://129.159.70.221:81/api/Message/" + idElemento,
                type: "DELETE",
                data: dataToSend,
                datatype: "JSON",
                contentType: "application/json",
                success: function (respuesta) {
                    alert("Borrado exitoso");
                    traerInformacionMens();
                },
                error: function (xhr, status) {
                    alert("Operación no satisfactoria", +xhr.status);
                }
            }
    );
}
