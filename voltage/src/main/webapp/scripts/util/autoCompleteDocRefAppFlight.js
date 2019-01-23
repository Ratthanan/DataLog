var listDocRefApproveFlight = [];
var idInputFlight = "";

function AutocompleteDocRefAppFlight(id) {
    idInputFlight = id;
}
AutocompleteDocRefAppFlight.find =function (id,keySearch) {
    idInputFlight = id;
    listDocRefApproveFlight.clear();
    var data = $.ajax({
        url: session.context + "/approve/findAutoCompleteDocRefApp?requester="+keySearch,
        headers: {
            Accept : "application/json"
        },
        type: "GET",
        async: false
    }).responseJSON;

    if(data != null){
        $.each(data,function (index,item) {
            var data = {
                label :item.docNumber,
                doc:item.docNumber
            };

            listDocRefApproveFlight.push(data)
        });

        $("#"+id).autocomplete({
            source:listDocRefApproveFlight,
            minLength: 0,
            select:function(event,ui) {
                $("#"+id).val( ui.item.label );
                checkOnSelectDocRefFlight(ui.item.label);
            }
        }).focus(function () {
            $(this).autocomplete('search','')
        });
    }
}

AutocompleteDocRefAppFlight.search = function (id,requester,str){
    idInputFlight = id;
    listDocRefApproveFlight.clear();
    var data = $.ajax({
        url: session.context + "/approve/findAutoCompleteDocRefAppByKeySearch?requester="+requester+"&keySearch="+str,
        headers: {
            Accept : "application/json"
        },
        type: "GET",
        async: false
    }).responseJSON;

    if(data != null){
        $.each(data,function (index,item) {
            var data = {
                label :item.docNumber,
                doc:item.docNumber
            };

            listDocRefApproveFlight.push(data)
        });

        $("#"+id).autocomplete({
            source:listDocRefApproveFlight,
            minLength: 0,
            select:function(event,ui) {
                $("#"+id).val( ui.item.label );
                checkOnSelectDocRefFlight(ui.item.label);
            }
        }).focus(function () {
            $(this).autocomplete('search','')
        });
    }
}

function checkOnSelectDocRefFlight(label) {
    var index = listDocRefApproveFlight.findIndex( listDocRefApproveFlight => listDocRefApproveFlight.label  == label);
    if(index != -1){
        $("#"+idInputFlight).attr("data-doc",listDocRefApproveFlight[index].doc);
    }else{
        $("#"+idInputFlight).val("");
        $("#"+idInputFlight).attr("data-doc","");
    }
}

function checkOnChangeDocRefFlight(input) {
    var index = listDocRefApproveFlight.findIndex( listDocRefApproveFlight => listDocRefApproveFlight.label  == input.value);
    if(index != -1){
        $("#"+idInputFlight).attr("data-doc",listDocRefApproveFlight[index].doc);
    }else{
        $("#"+idInputFlight).val("");
        $("#"+idInputFlight).attr("data-doc","");
    }
}

AutocompleteDocRefAppFlight.renderValue = function(docNumber,id){
    idInputFlight = id;
    $.each(listDocRefApproveFlight,function (index,item) {

        if(item.doc == docNumber){
            $("#"+idInputFlight).val(item.label );
            checkOnSelectDocRefFlight(item.label);
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
            complete: function (xhr) {
                var document = JSON.parse(xhr.responseText);
                if(document != null){
                    window.open(session.context+'/approve/viewCreateDocDetail?doc='+document.id,"_blank");
                }
            }
        });
    }else{
        var errorMessage = MESSAGE.MESSAGE_REQUIRE_FIELD+" "+LABLE.LABEL_DOCUMENT_REFERENCE;

        $('#autoCompleteWarningModal .modal-body').html(errorMessage);
        $('#autoCompleteWarningModal').modal('show');
    }
}
