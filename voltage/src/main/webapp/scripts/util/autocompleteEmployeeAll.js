var listEmployeeAll = [];
var idInputEmpAll = "";
var keySearch="%";

function AutocompleteEmployeeAll() {

}


AutocompleteEmployeeAll.setId = function (id) {
    idInputEmpAll = id
};

AutocompleteEmployeeAll.init = function (id) {
    idInputEmpAll = id;

    var data = $.ajax({
        url: session.context + "//intermediaries/findAutoCompleteEmployeeByKeySearch?keySearch="+keySearch,
        headers: {
            Accept : "application/json"
        },
        type: "GET",
        async: false
    }).responseJSON;

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

            listEmployeeAll.push(data)
        });

        $("#"+idInputEmpAll).autocomplete({
            source:listEmployeeAll,
            minLength: 0,
            select:function(event,ui) {
                $("#"+idInputEmpAll).val( ui.item.label );
                checkOnSelectEmployeeAll(ui.item.label);
            }
        }).focus(function () {
            $(this).autocomplete('search','')
        });
    }
};

AutocompleteEmployeeAll.search = function (input,id) {
    keySearch = input;
    listEmployeeAll.clear();
    console.log(id);
    AutocompleteEmployeeAll.init(id);

}


function checkOnSelectEmployeeAll(label) {
    var index = listEmployeeAll.findIndex( listEmployeeAll => listEmployeeAll.label  == label);
    if(index != -1){
        $("#"+idInputEmpAll).attr("data-empCode",listEmployeeAll[index].code);
        $("#"+idInputEmpAll).attr("data-userName",listEmployeeAll[index].userName);
        $("#"+idInputEmpAll).attr("data-position",listEmployeeAll[index].position);
        $("#"+idInputEmpAll).attr("data-compCode",listEmployeeAll[index].compCode);
        $("#"+idInputEmpAll).attr("data-compName",listEmployeeAll[index].compName);
        $("#"+idInputEmpAll).attr("data-deptCode",listEmployeeAll[index].deptCode);
        $("#"+idInputEmpAll).attr("data-deptName",listEmployeeAll[index].deptName);
        $("#"+idInputEmpAll).attr("data-costCenter",listEmployeeAll[index].costCenter);
        $("#"+idInputEmpAll).attr("data-personalId",listEmployeeAll[index].personalId);
        $("#"+idInputEmpAll).attr("data-psa",listEmployeeAll[index].psa);
        $("#"+idInputEmpAll).attr("data-empLv",listEmployeeAll[index].empLv);
    }else{
        $("#"+idInputEmpAll).val("");
        $("#"+idInputEmpAll).attr("data-empCode","");
        $("#"+idInputEmpAll).attr("data-userName","");
        $("#"+idInputEmpAll).attr("data-position","");
        $("#"+idInputEmpAll).attr("data-compCode","");
        $("#"+idInputEmpAll).attr("data-compName","");
        $("#"+idInputEmpAll).attr("data-deptCode","");
        $("#"+idInputEmpAll).attr("data-deptName","");
        $("#"+idInputEmpAll).attr("data-costCenter","");
        $("#"+idInputEmpAll).attr("data-personalId","");
        $("#"+idInputEmpAll).attr("data-psa","");
        $("#"+idInputEmpAll).attr("data-empLv","");
    }
}

function checkOnChangeEmployeeAll(input) {

    var index = listEmployeeAll.findIndex( listEmployeeAll => listEmployeeAll.label  == input.value);
    if(index != -1){
        $("#"+idInputEmpAll).attr("data-empCode",listEmployeeAll[index].code);
        $("#"+idInputEmpAll).attr("data-userName",listEmployeeAll[index].userName);
        $("#"+idInputEmpAll).attr("data-position",listEmployeeAll[index].position);
        $("#"+idInputEmpAll).attr("data-compCode",listEmployeeAll[index].compCode);
        $("#"+idInputEmpAll).attr("data-compName",listEmployeeAll[index].compName);
        $("#"+idInputEmpAll).attr("data-deptCode",listEmployeeAll[index].deptCode);
        $("#"+idInputEmpAll).attr("data-deptName",listEmployeeAll[index].deptName);
        $("#"+idInputEmpAll).attr("data-costCenter",listEmployeeAll[index].costCenter);
        $("#"+idInputEmpAll).attr("data-personalId",listEmployeeAll[index].personalId);
        $("#"+idInputEmpAll).attr("data-psa",listEmployeeAll[index].psa);
        $("#"+idInputEmpAll).attr("data-empLv",listEmployeeAll[index].empLv);
    }else{
        $("#"+idInputEmpAll).val("");
        $("#"+idInputEmpAll).attr("data-empCode","");
        $("#"+idInputEmpAll).attr("data-userName","");
        $("#"+idInputEmpAll).attr("data-position","");
        $("#"+idInputEmpAll).attr("data-compCode","");
        $("#"+idInputEmpAll).attr("data-compName","");
        $("#"+idInputEmpAll).attr("data-deptCode","");
        $("#"+idInputEmpAll).attr("data-deptName","");
        $("#"+idInputEmpAll).attr("data-costCenter","");
        $("#"+idInputEmpAll).attr("data-personalId","");
        $("#"+idInputEmpAll).attr("data-psa","");
        $("#"+idInputEmpAll).attr("data-empLv","");
    }
}

AutocompleteEmployeeAll.renderValue = function(userName,id) {
    $.each(listEmployeeAll, function (index, item) {

        if (item.userName == userName) {
            $("#" + id).val(item.label);
            checkOnSelectEmployeeAll(item.label);
        }

    });
}