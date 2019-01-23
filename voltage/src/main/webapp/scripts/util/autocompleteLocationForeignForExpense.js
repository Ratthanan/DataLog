var listLocationForeignForExpense = [];
var idInputLocationForeignForExpense = "";
var keySearchLocationForeignForExpense= "";

function AutocompleteLocationForeignForExpense() {

}


AutocompleteLocationForeignForExpense.setId = function (id) {
    idInputLocationForeignForExpense = id

};

AutocompleteLocationForeignForExpense.init = function (id) {
    idInputLocationForeignForExpense = id;

    var data = $.ajax({
        url: session.context + "/locations/findByLocationTypeAndDescription?locationType=F&description="+keySearchLocationForeignForExpense,
        headers: {
            Accept : "application/json"
        },
        type: "GET",
        async: false
    }).responseJSON;

    if(data.content){
        $.each(data.content,function (index,item) {
            var data = {
                label    : item.description,
                code     : item.code,
                zoneCode : item.zoneCode
                
            };

            listLocationForeignForExpense.push(data)
        });

        $("#"+idInputLocationForeignForExpense).autocomplete({
            source:listLocationForeignForExpense,
            minLength: 0,
            select:function(event,ui) {
                $("#"+idInputLocationForeignForExpense).val( ui.item.label );
                checkOnSelectLocationForeignForExpense(ui.item.label);
            }
        }).focus(function () {
            $(this).autocomplete('search','')
        });
    }
};

AutocompleteLocationForeignForExpense.search = function (input) {
    keySearchLocationForeignForExpense = input;
    listLocationForeignForExpense.clear();
    AutocompleteLocationForeignForExpense.init(idInputLocationForeignForExpense);

}


function checkOnSelectLocationForeignForExpense(label) {
    var index = listLocationForeignForExpense.findIndex( listLocationForeignForExpense => listLocationForeignForExpense.label  == label);
    if(index != -1){
        $("#"+idInputLocationForeignForExpense).attr("data-code",listLocationForeignForExpense[index].code);
        $("#"+idInputLocationForeignForExpense).attr("data-zoneCode",listLocationForeignForExpense[index].zoneCode);
    }else{
        $("#"+idInputLocationForeignForExpense).val("");
        $("#"+idInputLocationForeignForExpense).attr("data-code","");
        $("#"+idInputLocationForeignForExpense).attr("data-zoneCode","");
    }
}

function checkOnChangeLocationForeignForExpense(input) {

    var index = listLocationForeignForExpense.findIndex( listLocationForeignForExpense => listLocationForeignForExpense.label  == input.value);
    if(index != -1){
        $("#"+idInputLocationForeignForExpense).attr("data-code",listLocationForeignForExpense[index].code);
        $("#"+idInputLocationForeignForExpense).attr("data-zoneCode",listLocationForeignForExpense[index].zoneCode);
    }else{
        $("#"+idInputLocationForeignForExpense).val("");
        $("#"+idInputLocationForeignForExpense).attr("data-code","");
        $("#"+idInputLocationForeignForExpense).attr("data-zoneCode","");
    }
}

AutocompleteLocationForeignForExpense.renderValue = function(description) {
    $.each(listLocationForeignForExpense, function (index, item) {

        if (item.label == description) {
            $("#" + idInputLocationForeignForExpense).val(item.label);
            checkOnSelectLocationForeignForExpense(item.label);
        }

    });
}