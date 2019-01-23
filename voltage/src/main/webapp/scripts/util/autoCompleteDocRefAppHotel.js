var listDocRefApproveHotel = [];
var idInputHotelDoc = "";

function AutocompleteDocRefAppHotel(id) {
    idInputHotelDoc = id;
}
AutocompleteDocRefAppHotel.find=function (id,keySearch) {
    idInputHotelDoc = id;
    listDocRefApproveHotel.clear();
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

            listDocRefApproveHotel.push(data)
        });

        $("#"+id).autocomplete({
            source:listDocRefApproveHotel,
            minLength: 0,
            select:function(event,ui) {
                $("#"+id).val( ui.item.label );
                checkOnSelectDocRefHotel(ui.item.label);
            }
        }).focus(function () {
            $(this).autocomplete('search','')
        });
    }
}

AutocompleteDocRefAppHotel.search = function (id,requester,str){
    idInputHotelDoc = id;
    listDocRefApproveHotel.clear();
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

            listDocRefApproveHotel.push(data)
        });

        $("#"+id).autocomplete({
            source:listDocRefApproveHotel,
            minLength: 0,
            select:function(event,ui) {
                $("#"+id).val( ui.item.label );
                checkOnSelectDocRefHotel(ui.item.label);
            }
        }).focus(function () {
            $(this).autocomplete('search','')
        });
    }
}

function checkOnSelectDocRefHotel(label) {
    var index = listDocRefApproveHotel.findIndex( listDocRefApproveHotel => listDocRefApproveHotel.label  == label);
    if(index != -1){
        $("#"+idInputHotelDoc).attr("data-doc",listDocRefApproveHotel[index].doc);
    }else{
        $("#"+idInputHotelDoc).val("");
        $("#"+idInputHotelDoc).attr("data-doc","");
    }
}

function checkOnChangeDocRefHotel(input) {
    var index = listDocRefApproveHotel.findIndex( listDocRefApproveHotel => listDocRefApproveHotel.label  == input.value);
    if(index != -1){
        $("#"+idInputHotelDoc).attr("data-doc",listDocRefApproveHotel[index].doc);
    }else{
        $("#"+idInputHotelDoc).val("");
        $("#"+idInputHotelDoc).attr("data-doc","");
    }
}

AutocompleteDocRefAppHotel.renderValue = function(docNumber,id){
    idInputHotelDoc = id;
    $.each(listDocRefApproveHotel,function (index,item) {

        if(item.doc == docNumber){
            $("#"+idInputHotelDoc).val(item.label );
            checkOnSelectDocRefHotel(item.label);
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