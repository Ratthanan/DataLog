var listDocRefApp = [];
var idInputDoc = "";

function AutocompleteDocRefAppForExpense() {

}

AutocompleteDocRefAppForExpense.init=function (id,userName) {
    var json = {};
    json['userName'] = userName;
    idInputDoc = id;
    var data =$.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },

        url: session['context'] + '/approve/findByDocTypeAndDocStatusCompleteAndAppTypeTravelAndTravelMemberUser',
        data:json,
        async: false,
        complete: function (xhr) {
            if (xhr.readyState == 4) {
                data = JSON.parse(xhr.responseText);
                console.info(data);
                if(data != null && data.length > 0){
                    $.each(data,function (index,item) {
                        var data = {
                            label :item.docNumber,
                            doc : item.docNumber
                        };

                        listDocRefApp.push(data)
                    });

                    $("#"+id).autocomplete({
                        source:listDocRefApp,
                        minLength: 0,
                        select:function(event,ui) {
                            $("#"+id).val( ui.item.label );
                            checkOnSelectDocRefAppForExpense(ui.item.label);
                        }
                    }).focus(function () {
                        $(this).autocomplete('search','')
                    });
                }
            }
        }
    });

}

function checkOnSelectDocRefAppForExpense(label) {
    var index = listDocRefApp.findIndex( listDocRefApp => listDocRefApp.label  == label);
    if(index != -1){
        $("#"+idInputDoc).attr("data-doc",listDocRefApp[index].doc);
    }else{
        $("#"+idInputDoc).val("");
        $("#"+idInputDoc).attr("data-doc","");
    }
}

function checkOnChangeDocRefAppForExpense(input) {
    var index = listDocRefApp.findIndex( listDocRefApp => listDocRefApp.label  == input.value);
    if(index != -1){
        $("#"+idInputDoc).attr("data-doc",listDocRefApp[index].doc);
    }else{
        $("#"+idInputDoc).val("");
        $("#"+idInputDoc).attr("data-doc","");
    }
}

AutocompleteDocRefAppForExpense.renderValue = function(docNumber){
    $.each(listDocRefApp,function (index,item) {

        if(item.doc == docNumber){
            $("#"+idInputDoc).val(item.label );
            checkOnSelectDocRefAppForExpense(item.label);
        }
    });
}

function viewDetailDocumentReference(input){
    var docNumber = input.getAttribute('data-attn');
    if(docNumber != ""){
        $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            url: session['context']+'/approve/findByDocumentNumber/'+docNumber,
            async: false,
            complete: function (xhr) {
                var document = JSON.parse(xhr.responseText);
                if(document != null){
                    if(document.approveType != "0006" && document.approveType != "0007" ){
                        window.open(session.context+'/approve/viewCreateDocDetail?doc='+document.id+"&type=v","_blank");
                    }else{
                        window.open(session.context+'/approve/viewCreateDocSetDetail?doc='+document.id+"&type=v","_blank");
                    }
                }
            }
        });
    }else{
        var errorMessage = MSG_AUTOCOMPLETE_APP_EXPENSE.MESSAGE_REQUIRE_FIELD+" "+LB_AUTOCOMPLETE_APP_EXPENSE.LABEL_DOCUMENT_REFERENCE;

        $('#autoCompleteWarningModal .modal-body').html(errorMessage);
        $('#autoCompleteWarningModal').modal('show');
    }
}
