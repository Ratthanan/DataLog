var listEmployee = [];
var idInputEmp = "";
var keySearch = "%";

function AutocompleteEmployee() {

}

AutocompleteEmployee.init = function (id) {
    idInputEmp = id;

    var data = $.ajax({
        url: session.context + "/intermediaries/findAutoCompleteEmployeeByKeySearchAndUserName?userName=" + $USERNAME + '&keySearch=' + keySearch,
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
                label           :   item.name,
                code            :   item.employeeCode.replace(".",""),
                userName        :   item.userName,
                position        :   item.position,
                compCode        :   item.companyCode,
                compName        :   item.companyName,
                deptCode        :   item.deptCode,
                deptName        :   item.deptName,
                costCenter      :   item.costCenter,
                psa             :   item.psa,
                personalId      :   item.personalId,
                psaName         :   item.psaName,
                empLv           :   item.empLv
            };

            listEmployee.push(data)
        });

        $("#"+idInputEmp).autocomplete({
            source:listEmployee,
            minLength: 0,
            select:function(event,ui) {
                $("#"+idInputEmp).val( ui.item.label );
                checkOnSelectEmployee(ui.item.label);
            }
        }).focus(function () {
            $(this).autocomplete('search','')
        });
    }

};

AutocompleteEmployee.search = function (id,input) {
    keySearch = input;
    listEmployee.clear();
    AutocompleteEmployee.init(id);

};

function checkOnSelectEmployee(label) {
    var index = listEmployee.findIndex( listEmployee => listEmployee.label  == label);
    if(index != -1){
        $("#"+idInputEmp).attr("data-empCode",listEmployee[index].code);
        $("#"+idInputEmp).attr("data-userName",listEmployee[index].userName);
        $("#"+idInputEmp).attr("data-position",listEmployee[index].position);
        $("#"+idInputEmp).attr("data-compCode",listEmployee[index].compCode);
        $("#"+idInputEmp).attr("data-compName",listEmployee[index].compName);
        $("#"+idInputEmp).attr("data-deptCode",listEmployee[index].deptCode);
        $("#"+idInputEmp).attr("data-deptName",listEmployee[index].deptName);
        $("#"+idInputEmp).attr("data-costCenter",listEmployee[index].costCenter);
        $("#"+idInputEmp).attr("data-psa",listEmployee[index].psa);
        $("#"+idInputEmp).attr("data-personalId",listEmployee[index].personalId);
        $("#"+idInputEmp).attr("data-psaName",listEmployee[index].psaName);
        $("#"+idInputEmp).attr("data-empLv",listEmployee[index].empLv);
    }else{
        $("#"+idInputEmp).val("");
        $("#"+idInputEmp).attr("data-empCode","");
        $("#"+idInputEmp).attr("data-userName","");
        $("#"+idInputEmp).attr("data-position","");
        $("#"+idInputEmp).attr("data-compCode","");
        $("#"+idInputEmp).attr("data-compName","");
        $("#"+idInputEmp).attr("data-deptCode","");
        $("#"+idInputEmp).attr("data-deptName","");
        $("#"+idInputEmp).attr("data-costCenter","");
        $("#"+idInputEmp).attr("data-psa","");
        $("#"+idInputEmp).attr("data-personalId","");
        $("#"+idInputEmp).attr("data-psaName","");
        $("#"+idInputEmp).attr("data-empLv","");
    }
}

function checkOnChangeEmployee(input) {
    var index = listEmployee.findIndex( listEmployee => listEmployee.label  == input.value);
    if(index != -1){
        $("#"+idInputEmp).attr("data-empCode",listEmployee[index].code);
        $("#"+idInputEmp).attr("data-userName",listEmployee[index].userName);
        $("#"+idInputEmp).attr("data-position",listEmployee[index].position);
        $("#"+idInputEmp).attr("data-compCode",listEmployee[index].compCode);
        $("#"+idInputEmp).attr("data-compName",listEmployee[index].compName);
        $("#"+idInputEmp).attr("data-deptCode",listEmployee[index].deptCode);
        $("#"+idInputEmp).attr("data-deptName",listEmployee[index].deptName);
        $("#"+idInputEmp).attr("data-costCenter",listEmployee[index].costCenter);
        $("#"+idInputEmp).attr("data-psa",listEmployee[index].psa);
        $("#"+idInputEmp).attr("data-personalId",listEmployee[index].personalId);
        $("#"+idInputEmp).attr("data-psaName",listEmployee[index].psaName);
        $("#"+idInputEmp).attr("data-empLv",listEmployee[index].empLv);
    }else{
        $("#"+idInputEmp).val("");
        $("#"+idInputEmp).attr("data-empCode","");
        $("#"+idInputEmp).attr("data-userName","");
        $("#"+idInputEmp).attr("data-position","");
        $("#"+idInputEmp).attr("data-compCode","");
        $("#"+idInputEmp).attr("data-compName","");
        $("#"+idInputEmp).attr("data-deptCode","");
        $("#"+idInputEmp).attr("data-deptName","");
        $("#"+idInputEmp).attr("data-costCenter","");
        $("#"+idInputEmp).attr("data-psa","");
        $("#"+idInputEmp).attr("data-personalId","");
        $("#"+idInputEmp).attr("data-psaName","");
        $("#"+idInputEmp).attr("data-empLv","");
    }
}

AutocompleteEmployee.renderValue = function(userName) {
    console.info(userName);
    $.each(listEmployee, function (index, item) {

        if (item.userName == userName) {
            $("#" + idInputEmp).val(item.label);
            checkOnSelectEmployee(item.label);
        }
    });
}

AutocompleteEmployee.setId = function (id) {
    idInputEmp = id
};