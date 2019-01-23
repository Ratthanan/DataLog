var listDoc = [];
var idInputDocRefAdv = "";

function AutocompleteDocRefAdvForExpense() {

}

AutocompleteDocRefAdvForExpense.init=function (id,userName,docNumber) {
    var json = {};
    var url;
    
    if("" != docNumber){
        url = 'findByDocTypeAndDocNumberAndDocStatusCompleteAndUser';
        json['docNumber'] = docNumber;
    }else {
        url = 'findByDocTypeAndDocStatusCompleteAndUser';
    }

    json['userName'] = userName;

    idInputDocRefAdv = id;
    
    var data = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },

        url: session['context'] + '//advance/'+url,
        data:json,
        async: false,
        complete: function (xhr) {
            if (xhr.readyState == 4) {
                data = JSON.parse(xhr.responseText);
                console.log("*******************");
                console.log(data);
                if(data != null && data.length > 0){

                    if(data[0].documentAdvance){
                        if($("#"+id).attr('defaultValue') != undefined && $("#"+id).attr('defaultValue') == "Y"){
                            $("#"+id).val(data[0].docNumber);
                        }
                    }
                    
                    $.each(data,function (index,item) {
                        var amount = 0;
                        if(item.documentAdvance){
                            amount += item.documentAdvance.amount;
                            var docRefApp = item.documentReferences.length!=0?item.documentReferences[0].docReferenceNumber:"";
                            var data = {
                                label :item.docNumber,
                                doc : item.docNumber,
                                amount : amount,
                                docRefApp :docRefApp
                            };

                            listDoc.push(data)
                        }
                    });

                    $("#"+id).autocomplete({
                        source:listDoc,
                        minLength: 0,
                        select:function(event,ui) {
                            $("#"+id).val( ui.item.label );
                            checkOnSelectDocRefAdvForExpense(ui.item.label);
                        }
                    }).focus(function () {
                        $(this).autocomplete('search','')
                    });
                }
            }
        }
    });

}


function checkOnSelectDocRefAdvForExpense(label) {
    var index = listDoc.findIndex( listDoc => listDoc.label  == label);
    if(index != -1){
        $("#"+idInputDocRefAdv).attr("data-doc",listDoc[index].doc);
        $("#"+idInputDocRefAdv).attr("data-amount",listDoc[index].amount);
        $("#"+idInputDocRefAdv).attr("data-docRefApp",listDoc[index].docRefApp);
    }else{
        $("#"+idInputDocRefAdv).val("");
        $("#"+idInputDocRefAdv).attr("data-doc","");
        $("#"+idInputDocRefAdv).attr("data-amount","");
        $("#"+idInputDocRefAdv).attr("data-docRefApp","");
    }
}

function checkOnChangeDocRefAdvForExpense(input) {
    var index = listDoc.findIndex( listDoc => listDoc.label  == input.value);
    if(index != -1){
        $("#"+idInputDocRefAdv).attr("data-doc",listDoc[index].doc);
        $("#"+idInputDocRefAdv).attr("data-amount",listDoc[index].amount);
        $("#"+idInputDocRefAdv).attr("data-docRefApp",listDoc[index].docRefApp);
    }else{
        $("#"+idInputDocRefAdv).val("");
        $("#"+idInputDocRefAdv).attr("data-doc","");
        $("#"+idInputDocRefAdv).attr("data-amount","");
        $("#"+idInputDocRefAdv).attr("data-docRefApp","");
    }
}

AutocompleteDocRefAdvForExpense.renderValue = function(docNumber){
    $.each(listDoc,function (index,item) {

        if(item.doc == docNumber){
            $("#"+idInputDocRefAdv).val(item.label);
            checkOnSelectDocRefAdvForExpense(item.label);
        }

    });
}

function viewDetailDocumentReferenceDocRefAdv(input){
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
                console.log(xhr);
                var document = JSON.parse(xhr.responseText);

                if(document != null){
                    if(document.documentType == "ADV"){
                        window.open(session.context+'/advance/advanceDetail?doc='+document.id+"&type=v","_blank");
                    }else {
                        if(document.approveType != "0006" && document.approveType != "0007"){
                            window.open(session.context+'/approve/viewCreateDocDetail?doc='+document.id+"&type=v","_blank");
                        }else{
                            window.open(session.context+'/approve/viewCreateDocSetDetail?doc='+document.id+"&type=v","_blank");
                        }
                    }

                }
            }
        });
    }else{
        var errorMessage = MSG_AUTOCOMPLETE_ADV_EXPENSE.MESSAGE_REQUIRE_FIELD+" "+LB_AUTOCOMPLETE_ADV_EXPENSE.LABEL_DOCUMENT_REFERENCE;

        $('#autoCompleteWarningModal .modal-body').html(errorMessage);
        $('#autoCompleteWarningModal').modal('show');
    }
}