var listEmployeeAllForExpense = [];
var idInputEmpAllForExpense = "";
var keySearchForExpense;

function AutocompleteEmployeeAllForExpense() {

}


AutocompleteEmployeeAllForExpense.setId = function (id) {
    idInputEmpAllForExpense = id

}

AutocompleteEmployeeAllForExpense.init = function (id) {
    idInputEmpAllForExpense = id;

    var data = $.ajax({
        url: session.context + "//intermediaries/findAutoCompleteEmployeeByKeySearch?keySearch="+keySearchForExpense,
        headers: {
            Accept : "application/json"
        },
        type: "GET",
        async: false
    }).responseJSON;

    console.log(data)

    if(data != null){
        $.each(data,function (index,item) {
            var data = {
                label :item.name,
                code:item.employeeCode.replace(".",""),
                userName : item.userName,
                position : item.position,
                compCode : item.companyCode,
                compName : item.companyName,
                deptCode : item.deptCode,
                deptName : item.deptName,
                costCenter : item.costCenter,
                psa      : item.psa,
                personalId      :   item.personalId,
                empLv    : item.empLv
            };

            listEmployeeAllForExpense.push(data)
        });

        $("#"+idInputEmpAllForExpense).autocomplete({
            source:listEmployeeAllForExpense,
            minLength: 0,
            select:function(event,ui) {
                $("#"+idInputEmpAllForExpense).val( ui.item.label );
                checkOnSelectEmployeeAllForExpense(ui.item.label);
            }
        }).focus(function () {
            $(this).autocomplete('search','')
        });
    }
};

AutocompleteEmployeeAllForExpense.search = function (input,id) {
    keySearchForExpense = input;
    listEmployeeAllForExpense.clear();
    AutocompleteEmployeeAllForExpense.init(id);

}


function checkOnSelectEmployeeAllForExpense(label) {
    var index = listEmployeeAllForExpense.findIndex( listEmployeeAllForExpense => listEmployeeAllForExpense.label  == label);
    if(index != -1){
        $("#"+idInputEmpAllForExpense).attr("data-empCode",listEmployeeAllForExpense[index].code);
        $("#"+idInputEmpAllForExpense).attr("data-userName",listEmployeeAllForExpense[index].userName);
        $("#"+idInputEmpAllForExpense).attr("data-position",listEmployeeAllForExpense[index].position);
        $("#"+idInputEmpAllForExpense).attr("data-compCode",listEmployeeAllForExpense[index].compCode);
        $("#"+idInputEmpAllForExpense).attr("data-compName",listEmployeeAllForExpense[index].compName);
        $("#"+idInputEmpAllForExpense).attr("data-deptCode",listEmployeeAllForExpense[index].deptCode);
        $("#"+idInputEmpAllForExpense).attr("data-deptName",listEmployeeAllForExpense[index].deptName);
        $("#"+idInputEmpAllForExpense).attr("data-costCenter",listEmployeeAllForExpense[index].costCenter);
    }else{
        $("#"+idInputEmpAllForExpense).val("");
        $("#"+idInputEmpAllForExpense).attr("data-empCode","");
        $("#"+idInputEmpAllForExpense).attr("data-userName","");
        $("#"+idInputEmpAllForExpense).attr("data-position","");
        $("#"+idInputEmpAllForExpense).attr("data-compCode","");
        $("#"+idInputEmpAllForExpense).attr("data-compName","");
        $("#"+idInputEmpAllForExpense).attr("data-deptCode","");
        $("#"+idInputEmpAllForExpense).attr("data-deptName","");
        $("#"+idInputEmpAllForExpense).attr("data-costCenter","");
    }
}

function checkOnChangeEmployeeAllForExpense(input) {

    var index = listEmployeeAllForExpense.findIndex( listEmployeeAllForExpense => listEmployeeAllForExpense.label  == input.value);
    if(index != -1){
        $("#"+idInputEmpAllForExpense).attr("data-empCode",listEmployeeAllForExpense[index].code);
        $("#"+idInputEmpAllForExpense).attr("data-userName",listEmployeeAllForExpense[index].userName);
        $("#"+idInputEmpAllForExpense).attr("data-position",listEmployeeAllForExpense[index].position);
        $("#"+idInputEmpAllForExpense).attr("data-compCode",listEmployeeAllForExpense[index].compCode);
        $("#"+idInputEmpAllForExpense).attr("data-compName",listEmployeeAllForExpense[index].compName);
        $("#"+idInputEmpAllForExpense).attr("data-deptCode",listEmployeeAllForExpense[index].deptCode);
        $("#"+idInputEmpAllForExpense).attr("data-deptName",listEmployeeAllForExpense[index].deptName);
        $("#"+idInputEmpAllForExpense).attr("data-costCenter",listEmployeeAllForExpense[index].costCenter);
    }else{
        $("#"+idInputEmpAllForExpense).val("");
        $("#"+idInputEmpAllForExpense).attr("data-empCode","");
        $("#"+idInputEmpAllForExpense).attr("data-userName","");
        $("#"+idInputEmpAllForExpense).attr("data-position","");
        $("#"+idInputEmpAllForExpense).attr("data-compCode","");
        $("#"+idInputEmpAllForExpense).attr("data-compName","");
        $("#"+idInputEmpAllForExpense).attr("data-deptCode","");
        $("#"+idInputEmpAllForExpense).attr("data-deptName","");
        $("#"+idInputEmpAllForExpense).attr("data-costCenter","");
    }
}

AutocompleteEmployeeAllForExpense.renderValue = function(userName) {
    $.each(listEmployeeAllForExpense, function (index, item) {

        if (item.userName == userName) {
            $("#" + idInputEmpAllForExpense).val(item.label);
            checkOnSelectEmployeeAllForExpense(item.label);
        }

    });
}