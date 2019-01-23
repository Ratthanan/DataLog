var listHotel = [];
var idInputHotel = "";
var MASTER_DATA_CODE_HOTEL = "M011";

function AutocompleteHotel() {

}

AutocompleteHotel.init=function (id) {
    idInputHotel = id;
    var data = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },

        url: session['context'] + '/masterDatas/findAutoCompleteHotelByKeySearch?code=' + MASTER_DATA_CODE_HOTEL,
        async: false,
        complete: function (xhr) {
            if (xhr.readyState == 4) {

                data = JSON.parse(xhr.responseText);
                if(data != null){
                    $.each(data,function (index,item) {
                        var data = {
                            label :item.code + " : " + item.description,
                            code : item.code,
                            rate : item.variable1
                        };

                        listHotel.push(data)
                    });

                    $("#"+id).autocomplete({
                        source:listHotel,
                        minLength: 0,
                        select:function(event,ui) {
                            $("#"+id).val( ui.item.label );
                            checkOnSelectHotel(ui.item.label);
                        }
                    }).focus(function () {
                        $(this).autocomplete('search','')
                    });
                }
            }
        }
    });

}


function checkOnSelectHotel(label) {
    var index = listHotel.findIndex( listHotel => listHotel.label  == label);
    if(index != -1){
        $("#"+idInputHotel).attr("data-hotel-code",listHotel[index].code);
        $("#"+idInputHotel).attr("data-hotel-rate",listHotel[index].rate);
    }else{
        $("#"+idInputHotel).val("");
        $("#"+idInputHotel).attr("data-hotel-code","");
        $("#"+idInputHotel).attr("data-hotel-rate","");
    }
}

function checkOnChangeHotel(input) {
    var index = listHotel.findIndex( listHotel => listHotel.label  == input.value);
    if(index != -1){
        $("#"+idInputHotel).attr("data-hotel-code",listHotel[index].code);
        $("#"+idInputHotel).attr("data-hotel-rate",listHotel[index].rate);
    }else{
        $("#"+idInputHotel).val("");
        $("#"+idInputHotel).attr("data-hotel-code","");
        $("#"+idInputHotel).attr("data-hotel-rate","");
    }
}

AutocompleteHotel.renderValue = function(code){
    $.each(listHotel,function (index,item) {

        if(item.code == code){
            $("#"+idInputHotel).val(item.label );
            checkOnSelectHotel(item.label);
        }

    });
}
