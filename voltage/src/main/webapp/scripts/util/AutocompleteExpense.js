var listExpenseAutoComplete = [];
var idInputExpense = "";

function AutocompleteExpense() {

}

AutocompleteExpense.init=function (id,companyCode,psa,headOfficeGL,factoryGL,keySearch,userName,costCenter) {
    listExpenseAutoComplete = [];
    idInputExpense = id;
    var url = "//expenseByCompanies/findExpenseTypeByCompanyByPaAndPsaAndKeySearch/"+companyCode+"/"+psa+""+"/"+userName+"/?headOfficeGL="+headOfficeGL+"&factoryGL="+factoryGL+"&keySearch="+keySearch;
    var data = $.ajax({
        url: session.context + url,
        headers: {
            Accept : "application/json"
        },
        type: "GET",
        async: false
    }).responseJSON;

    var charIndex4 = costCenter.charAt(3);

    if(data){
        $.each(data,function (index,item) {
            if(item.expenseTypes){
                var gl = charIndex4 == "9" || costCenter == '1017920010' ?item.expenseTypes.headOfficeGL:item.expenseTypes.factoryGL;
                var data = {
                    label : gl+" : "+item.expenseTypes.description,
                    expenseId:item.expenseTypes.id,
                    id:item.id,
                    gl:gl,
                    description:item.expenseTypes.description,
                    favorite:item.expenseTypes.favorite
                };

                listExpenseAutoComplete.push(data)
            }
        });

        $("#"+id).autocomplete({
            source:listExpenseAutoComplete,
            minLength: 0,
            select:function(event,ui) {
                $("#"+id).val( ui.item.label );
                checkOnSelect(ui.item.label);
            }
        }).focus(function () {
            $(this).autocomplete('search','')
        });

    }
};

function checkOnSelect(label) {
    var index = listExpenseAutoComplete.findIndex( listExpenseAutoComplete => listExpenseAutoComplete.label  == label);
    if(index != -1){
        $("#"+idInputExpense).attr("data-expense-id",listExpenseAutoComplete[index].expenseId);
        $("#"+idInputExpense).attr("data-gl",listExpenseAutoComplete[index].gl);
        $("#"+idInputExpense).attr("data-expense-company-id",listExpenseAutoComplete[index].id);
        $("#"+idInputExpense).attr("data-description",listExpenseAutoComplete[index].description);
    }else{
        $("#"+idInputExpense).val("");
        $("#"+idInputExpense).attr("data-expense-id","");
        $("#"+idInputExpense).attr("data-gl","");
        $("#"+idInputExpense).attr("data-expense-company-id","");
        $("#"+idInputExpense).attr("data-description","");
    }
}

function checkOnChange(input) {
    var index = listExpenseAutoComplete.findIndex( listExpenseAutoComplete => listExpenseAutoComplete.label  == input.value);
    if(index != -1){
        $("#"+idInputExpense).attr("data-expense-id",listExpenseAutoComplete[index].expenseId);
        $("#"+idInputExpense).attr("data-gl",listExpenseAutoComplete[index].gl);
        $("#"+idInputExpense).attr("data-expense-company-id",listExpenseAutoComplete[index].id);
        $("#"+idInputExpense).attr("data-description",listExpenseAutoComplete[index].description);
    }else{
        $("#"+idInputExpense).val("");
        $("#"+idInputExpense).attr("data-expense-id","");
        $("#"+idInputExpense).attr("data-gl","");
        $("#"+idInputExpense).attr("data-expense-company-id","");
        $("#"+idInputExpense).attr("data-description","");
    }
}