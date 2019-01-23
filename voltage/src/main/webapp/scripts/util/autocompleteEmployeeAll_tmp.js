var listEmployeeAll_tmp = [];
var idInputEmpAll_tmp = "";
var keySearch;

function AutocompleteEmployeeAll_tmp() {

}

AutocompleteEmployeeAll_tmp.init = function (id) {
    idInputEmpAll_tmp = id;

    var data = $.ajax({
        url: session.context + "//intermediaries/findAutoCompleteEmployeeByKeySearch?keySearch="+keySearch,
        headers: {
            Accept : "application/json"
        },
        type: "GET",
        async: false
    }).responseJSON;
    console.info(data);

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
                costCenter : item.costCenter
            };

            listEmployeeAll_tmp.push(data)
        });

        $("#"+idInputEmpAll_tmp).autocomplete({
            source:listEmployeeAll_tmp,
            minLength: 0,
            select:function(event,ui) {
                $("#"+idInputEmpAll_tmp).val( ui.item.label );
                checkOnSelectEmployeeAll_tmp(ui.item.label);
            }
        }).focus(function () {
            $(this).autocomplete('search','')
        });
    }
};

AutocompleteEmployeeAll_tmp.search = function (input,id) {
    console.info(input+'<<<<<INPUT SEATCH');
    keySearch = input;
    listEmployeeAll_tmp.clear();
    AutocompleteEmployeeAll_tmp.init(id);

}


function checkOnSelectEmployeeAll_tmp(label) {
    var index = listEmployeeAll_tmp.findIndex( listEmployeeAll_tmp => listEmployeeAll_tmp.label  == label);
    if(index != -1){
        $("#"+idInputEmpAll_tmp).attr("data-empCode",listEmployeeAll_tmp[index].code);
        $("#"+idInputEmpAll_tmp).attr("data-userName",listEmployeeAll_tmp[index].userName);
        $("#"+idInputEmpAll_tmp).attr("data-position",listEmployeeAll_tmp[index].position);
        $("#"+idInputEmpAll_tmp).attr("data-compCode",listEmployeeAll_tmp[index].compCode);
        $("#"+idInputEmpAll_tmp).attr("data-compName",listEmployeeAll_tmp[index].compName);
        $("#"+idInputEmpAll_tmp).attr("data-deptCode",listEmployeeAll_tmp[index].deptCode);
        $("#"+idInputEmpAll_tmp).attr("data-deptName",listEmployeeAll_tmp[index].deptName);
        $("#"+idInputEmpAll_tmp).attr("data-costCenter",listEmployeeAll_tmp[index].costCenter);
    }else{
        $("#"+idInputEmpAll_tmp).val("");
        $("#"+idInputEmpAll_tmp).attr("data-empCode","");
        $("#"+idInputEmpAll_tmp).attr("data-userName","");
        $("#"+idInputEmpAll_tmp).attr("data-position","");
        $("#"+idInputEmpAll_tmp).attr("data-compCode","");
        $("#"+idInputEmpAll_tmp).attr("data-compName","");
        $("#"+idInputEmpAll_tmp).attr("data-deptCode","");
        $("#"+idInputEmpAll_tmp).attr("data-deptName","");
        $("#"+idInputEmpAll_tmp).attr("data-costCenter","");
    }
}

function checkOnChangeEmployeeAll_tmp(input) {

    var index = listEmployeeAll_tmp.findIndex( listEmployeeAll_tmp => listEmployeeAll_tmp.label  == input.value);
    if(index != -1){
        $("#"+idInputEmpAll_tmp).attr("data-empCode",listEmployeeAll_tmp[index].code);
        $("#"+idInputEmpAll_tmp).attr("data-userName",listEmployeeAll_tmp[index].userName);
        $("#"+idInputEmpAll_tmp).attr("data-position",listEmployeeAll_tmp[index].position);
        $("#"+idInputEmpAll_tmp).attr("data-compCode",listEmployeeAll_tmp[index].compCode);
        $("#"+idInputEmpAll_tmp).attr("data-compName",listEmployeeAll_tmp[index].compName);
        $("#"+idInputEmpAll_tmp).attr("data-deptCode",listEmployeeAll_tmp[index].deptCode);
        $("#"+idInputEmpAll_tmp).attr("data-deptName",listEmployeeAll_tmp[index].deptName);
        $("#"+idInputEmpAll_tmp).attr("data-costCenter",listEmployeeAll_tmp[index].costCenter);
    }else{
        $("#"+idInputEmpAll_tmp).val("");
        $("#"+idInputEmpAll_tmp).attr("data-empCode","");
        $("#"+idInputEmpAll_tmp).attr("data-userName","");
        $("#"+idInputEmpAll_tmp).attr("data-position","");
        $("#"+idInputEmpAll_tmp).attr("data-compCode","");
        $("#"+idInputEmpAll_tmp).attr("data-compName","");
        $("#"+idInputEmpAll_tmp).attr("data-deptCode","");
        $("#"+idInputEmpAll_tmp).attr("data-deptName","");
        $("#"+idInputEmpAll_tmp).attr("data-costCenter","");
    }
}

AutocompleteEmployeeAll_tmp.renderValue = function(userName) {
    console.info(userName);
    $.each(listEmployeeAll_tmp, function (index, item) {

        if (item.userName == userName) {
            $("#" + idInputEmpAll_tmp).val(item.label);
            checkOnSelectEmployeeAll_tmp(item.label);
        }

    });
}