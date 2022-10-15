function traerInformacionRes() {
    $.ajax(
            {
                url: "http://129.159.70.221:81/api/Reservation/all",
                type: "GET",
                datatype: "JSON",
                success: function (respuesta) {
                    verRespuestaRes(respuesta);
                }
            }
    );
}

function verRespuestaRes(items) {

    $("#resultadoRes").empty();

    let myTable = "<table>";
    myTable += "<tr><th>Id</th><th>Cliente</th><th>Salón</th><th>Fecha Inicio</th><th>Fecha Fin</th><th>Estado</th><th></th><th></th><tr>";

    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].idReservation + "</td>";
        myTable += "<td>" + items[i].client["name"] + "</td>";
        myTable += "<td>" + items[i].partyroom["name"] + "</td>";
        myTable += "<td>" + items[i].startDate + "</td>";
        myTable += "<td>" + items[i].devolutionDate + "</td>";
        myTable += "<td>" + items[i].status + "</td>";
        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#resultadoRes").append(myTable);
}

function guardarInformacionRes() {

    if ($("#startDate").val() !== "" && $("#devolutionDate").val() !== "" &&
            $("#status").val() !== "" && $("#idCli2").val() !== "" && $("#idRoom2").val() !== "") {
        let idCliente = $("#idCli2").val();
        $.ajax(
                {
                    url: "http://129.159.70.221:81/api/Client/" + idCliente,
                    type: "GET",
                    datatype: "JSON",
                    success: function (respuesta) {
                        if (respuesta === null) {
                            alert("Operación no satisfactoria. El Id del cliente no existe");
                        } else {
                            guardarInformacionRes2(respuesta);
                        }
                    }
                }
        );
    } else {
        alert("Operación no satisfactoria. Todos los campos deben rellenarse");
    }


}

function guardarInformacionRes2(cliente) {

    let idPartyroom = $("#idRoom2").val();
    $.ajax(
            {
                url: "http://129.159.70.221:81/api/Partyroom/" + idPartyroom,
                type: "GET",
                datatype: "JSON",
                success: function (respuesta) {
                    if (respuesta === null) {
                        alert("Operación no satisfactoria. El Id del salón no existe");
                    } else {
                        guardarInformacionRes3(cliente, respuesta);
                    }
                }
            }
    );

}

function guardarInformacionRes3(cliente, salon) {

    $("#resultadoRes").empty();

    let myData = {startDate: $("#startDate").val(), devolutionDate: $("#devolutionDate").val(),
        status: $("#status").val(), partyroom: salon, client: cliente};
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax(
            {
                url: "http://129.159.70.221:81/api/Reservation/save",
                type: "POST",
                data: dataToSend,
                datatype: "JSON",
                contentType: "application/json",
                success: function (respuesta) {
                    alert("Inserción exitosa");
                    $("#idCli2").val('');
                    $("#idRoom2").val('');
                    $("#startDate").val('');
                    $("#devolutionDate").val('');
                },
                error: function (xhr, status) {
                    alert("Operación no satisfactoria", +xhr.status);
                }
            }
    );

}
