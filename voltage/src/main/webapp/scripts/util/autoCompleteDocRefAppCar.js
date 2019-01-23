var listDocRefApproveCar = [];
var idInputDocRefApprove = "";

function AutocompleteDocRefAppCar(id){
    idInputDocRefApprove = id;
}

AutocompleteDocRefAppCar.find = function (id,keySearch) {
    idInputDocRefApprove = id;
    listDocRefApproveCar.clear();
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

            listDocRefApproveCar.push(data)
        });

        $("#"+id).autocomplete({
            source:listDocRefApproveCar,
            minLength: 0,
            select:function(event,ui) {
                $("#"+id).val( ui.item.label );
                checkOnSelectDocRefCar(ui.item.label);
            }
        }).focus(function () {
            $(this).autocomplete('search','')
        });
    }
}

AutocompleteDocRefAppCar.search = function (id,requester,str) {
    idInputDocRefApprove = id;
    listDocRefApproveCar.clear();
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

            listDocRefApproveCar.push(data)
        });

        $("#"+id).autocomplete({
            source:listDocRefApproveCar,
            minLength: 0,
            select:function(event,ui) {
                $("#"+id).val( ui.item.label );
                checkOnSelectDocRefCar(ui.item.label);
            }
        }).focus(function () {
            $(this).autocomplete('search','')
        });
    }
}

function checkOnSelectDocRefCar(label) {
    var index = listDocRefApproveCar.findIndex( listDocRefApproveCar => listDocRefApproveCar.label  == label);
    if(index != -1){
        $("#"+idInputDocRefApprove).attr("data-doc",listDocRefApproveCar[index].doc);
    }else{
        $("#"+idInputDocRefApprove).val("");
        $("#"+idInputDocRefApprove).attr("data-doc","");
    }
}

function checkOnChangeDocRefCar(input) {
    var index = listDocRefApproveCar.findIndex( listDocRefApproveCar => listDocRefApproveCar.label  == input.value);
    if(index != -1){
        $("#"+idInputDocRefApprove).attr("data-doc",listDocRefApproveCar[index].doc);
    }else{
        $("#"+idInputDocRefApprove).val("");
        $("#"+idInputDocRefApprove).attr("data-doc","");
    }
}

AutocompleteDocRefAppCar.renderValue = function(docNumber,id){
    idInputDocRefApprove = id;
    $.each(listDocRefApproveCar,function (index,item) {

        if(item.doc == docNumber){
            $("#"+idInputDocRefApprove).val(item.label );
            checkOnSelectDocRefCar(item.label);
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