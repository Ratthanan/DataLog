var listHotelForExpense = [];
var idInputHotelForExpense = "";
var MASTER_DATA_CODE_HOTEL_ForExpense = "M011";

function AutocompleteHotelForExpense() {

}

AutocompleteHotelForExpense.init=function (id) {
    idInputHotelForExpense = id;
    var data = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },

        url: session['context'] + '/masterDatas/findAutoCompleteHotelByKeySearch?code=' + MASTER_DATA_CODE_HOTEL_ForExpense,
        async: false,
        complete: function (xhr) {
            if (xhr.readyState == 4) {

                data = JSON.parse(xhr.responseText);
                if(data != null){
                    $.each(data,function (index,item) {
                        var data = {
                            label :item.code + " : " + item.description,
                            code : item.code,
                            rate : item.variable1,
                            isIbis : item.variable2==null?"":item.variable2,
                            roomType : item.variable3==null?"":item.variable3,
                            zoneType : item.variable4==null?"":item.variable4
                        };

                        listHotelForExpense.push(data)
                    });

                    $("#"+id).autocomplete({
                        source:listHotelForExpense,
                        minLength: 0,
                        select:function(event,ui) {
                            $("#"+id).val( ui.item.label );
                            checkOnSelectHotelForExpense(ui.item.label);
                        }
                    }).focus(function () {
                        $(this).autocomplete('search','')
                    });
                }
            }
        }
    });

}


function checkOnSelectHotelForExpense(label) {
    var index = listHotelForExpense.findIndex( listHotelForExpense => listHotelForExpense.label  == label);
    if(index != -1){
        $("#"+idInputHotelForExpense).attr("data-hotel-code",listHotelForExpense[index].code);
        $("#"+idInputHotelForExpense).attr("data-hotel-rate",listHotelForExpense[index].rate);
        $("#"+idInputHotelForExpense).attr("data-hotel-isIbis",listHotelForExpense[index].isIbis);
        $("#"+idInputHotelForExpense).attr("data-hotel-roomType",listHotelForExpense[index].roomType);
        $("#"+idInputHotelForExpense).attr("data-hotel-zoneType",listHotelForExpense[index].zoneType);
    }else{
        $("#"+idInputHotelForExpense).val("");
        $("#"+idInputHotelForExpense).attr("data-hotel-code","");
        $("#"+idInputHotelForExpense).attr("data-hotel-rate","");
        $("#"+idInputHotelForExpense).attr("data-hotel-isIbis","");
        $("#"+idInputHotelForExpense).attr("data-hotel-roomType","");
        $("#"+idInputHotelForExpense).attr("data-hotel-zoneType","");
    }
}

function checkOnChangeHotelForExpense(input) {
    var index = listHotelForExpense.findIndex( listHotelForExpense => listHotelForExpense.label  == input.value);
    if(index != -1){
        $("#"+idInputHotelForExpense).attr("data-hotel-code",listHotelForExpense[index].code);
        $("#"+idInputHotelForExpense).attr("data-hotel-rate",listHotelForExpense[index].rate);
        $("#"+idInputHotelForExpense).attr("data-hotel-isIbis",listHotelForExpense[index].isIbis);
        $("#"+idInputHotelForExpense).attr("data-hotel-roomType",listHotelForExpense[index].roomType);
        $("#"+idInputHotelForExpense).attr("data-hotel-zoneType",listHotelForExpense[index].zoneType);
    }else{
        $("#"+idInputHotelForExpense).val("");
        $("#"+idInputHotelForExpense).attr("data-hotel-code","");
        $("#"+idInputHotelForExpense).attr("data-hotel-rate","");
        $("#"+idInputHotelForExpense).attr("data-hotel-isIbis","");
        $("#"+idInputHotelForExpense).attr("data-hotel-roomType","");
        $("#"+idInputHotelForExpense).attr("data-hotel-zoneType","");
    }
}

AutocompleteHotelForExpense.renderValue = function(label){
    $.each(listHotelForExpense,function (index,item) {

        if(item.label == label){
            $("#"+idInputHotelForExpense).val(item.label );
            checkOnSelectHotelForExpense(item.label);
        }

    });
}
