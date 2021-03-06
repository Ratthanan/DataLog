let tim_search =  ''
let objectUtilPagination = $.extend({},UtilPagination);





$(document).ready(function () {
    $.material.init();
    initCalendat()
    console.log("===== Datalog Listing =====")
    initialDataQuery()
    searchDataLog()


    $('#btn_search').on('click',function () {
        console.log('search by tim')
        searchDataLog()

    })

    $('#btn_export').on('click',function () {
        console.log('btn_export click')
        generateExcelReport()

    })

    $.material.init();


    $("#search_tim_start").flatpickr({
        dateFormat : "Y-m-d H:i",
        enableTime : true
    });

    $("#imageCalendarSearch_tim_start").on('click',function () {
        $("#search_tim_start").focus()
    });

    $("#search_tim_end").flatpickr({
        dateFormat : "Y-m-d H:i",
        enableTime : true
    });

    $("#imageCalendarSearch_tim_end").on('click',function () {
        $("#search_tim_end").focus()
    });
});







let initialDataQuery = () =>{
    tim_search = $('#search_tim').val()

}
let searchDataLog = () =>{

    var criteriaObject = {
        startDate : $("#search_tim_start").val()=="" ? "": (new Date($("#search_tim_start").val()).getTime()).toString(),
        endDate : $("#search_tim_end").val()=="" ? "": (new Date($("#search_tim_end").val()).getTime()).toString()
    };
    queryDataLog(criteriaObject)

}
let queryDataLog = (criteriaObject) =>{
    console.log('=== start query dataLog ===')
    objectUtilPagination.setId("#pagingSearchDataLogBody");
    objectUtilPagination.setUrlData("/dataLog/findDataLogByCriteria");
    objectUtilPagination.setUrlSize("/dataLog/findDataLogByCriteriaSize");


    objectUtilPagination.loadTable = function(items){
        var item = items


        $('#dataLogBody').empty();
        // $('#dataLogBody').append('' +
        //     '<div style="margin-top: 10px; margin-left: 0px; margin-right: 0px;" class="row">' +
        //     '<div class="col-sm-3 styleHeader">Device</div>' +
        //     '<div class="col-sm-3 styleHeader_1">Voltage</div>' +
        //     '<div class="col-sm-3 styleHeader">Time</div>' +
        //     '<div class="col-sm-2 styleHeader_2">Action</div>' +
        //     '</div>')
        if(item.length > 0 && item != null){
            $dataForQuery = item;
            var itemIdTmp ;

            var cout = 1;
            for(var j=0;j<item.length;j++){
                cout++;
                var PE    = item[j].PE==null?"":item[j].PE;
                var UID    = item[j].UID==null?"":item[j].UID;
                var MAC    = item[j].MAC==null?"":item[j].MAC;
                var TIM    = item[j].createDate==null?"":new Date(Number(item[j].createDate));
                // var TIM    = item[j].createDate==null?"":(item[j].createDate)

                var monthNames = [
                    "January", "February", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"
                ];

                var day = TIM.getDate();
                var monthIndex = TIM.getMonth();
                var year = TIM.getFullYear();
                var time = TIM.getHours() + ':' + TIM.getMinutes()
                var fullDate = day + '/' + monthIndex+1 + '/' + year+ ' '+time;

                // $('#dataLogBody').append('' +
                //     '<tr '+
                //     ((j%2 == 0) ? ' style="background:#ffffff; margin-top: 5px;" ' : ' style="background:#c6d5ff; margin-top: 5px;"')+'>'+
                //     '<td class="text-center">'+UID+'</td>'+
                //     '<td class="text-center">'+(cout % 2 == 0 ? '0' : '1')+'</td>'+
                //     '<td class="text-center">'+fullDate+'</td>'+
                //     // '<td class="text-center">'+fullDate+'</td>'+
                //
                //     '</tr>'+
                //     '')

                $('#dataLogBody').append(''+
                          '<div class="col-sm-12">' +
                        '<div '+((j%2 == 0) ? ' class="col-sm-4 detail-font-green bgWhite" ' : ' class="col-sm-4 detail-font-green bgGrey"')+'  style="border-bottom: 1px solid #b4bcc2; border-left: 1px solid #b4bcc2;">'+UID+'</div>'+
                        '<div '+((j%2 == 0) ? ' class="col-sm-2 detail-font-black bgWhite" ' : ' class="col-sm-2 detail-font-black bgGrey"')+' style="border-bottom: 1px solid #b4bcc2; " >'+(cout % 2 == 0 ? '0' : '1')+'</div>' +
                        '<div '+((j%2 == 0) ? ' class="col-sm-1 detail-font-black bgWhite" ' : ' class="col-sm-1 detail-font-black bgGrey"')+' style="border-bottom: 1px solid #b4bcc2; " >'+'volt'+'</div>' +
                        '<div '+((j%2 == 0) ? ' class="col-sm-2 detail-font-black bgWhite" ' : ' class="col-sm-2 detail-font-black bgGrey"')+' style="border-bottom: 1px solid #b4bcc2; " >'+fullDate+'</div>' +
                        '<div '+((j%2 == 0) ? ' class="col-sm-2 bgWhite" ' : ' class="col-sm-2 bgGrey"')+' style="border-bottom: 1px solid #b4bcc2; border-right: 1px solid #b4bcc2;">'+'<button style="color:white; font-weight:900; margin-left:30%; padding-bottom:7px; margin-bottom:5px; background-image: linear-gradient(to left bottom, #5bc0de, #3dc0d3, #1ebec4, #11bcb0, #26b99a);" class="btn btn-sm center">View</button>'+'</div>' +
                 
                    '</div>')




            }


        }else{
            //Not Found
        }

    };

    objectUtilPagination.setDataSearch(criteriaObject);
    objectUtilPagination.search(objectUtilPagination);
    objectUtilPagination.loadPage(($CRITERIA_PAGE*1)+1,objectUtilPagination);


}


let findAllDataLog = () =>{


        var dataVat = $.ajax({
            url:session['context']+'/dataLog/findAll',
            headers: {
                Accept : "application/json"
            },
            type: "GET",
            async: false
        }).responseJSON;





}
let findDataLogByTIMBetween = (start,end) =>{


    var dataVat = $.ajax({
        url:session['context']+'/dataLog/findByTIMBetween',
        headers: {
            Accept : "application/json"
        },
        data: {
            start : start,
            end : end
        },
        type: "GET",
        async: false
    }).responseJSON;





}
let findDataLogById = (id) =>{

    var result = $.ajax({
        url:session['context']+'/dataLog/findById',
        headers: {
            Accept : "application/json"
        },
        type: "GET",
        data: {
            id : id
        },
        async: false
    }).responseJSON;

}




let initCalendat =()=> {
    console.log('initCalendat')
    $("#startDateEndDate").flatpickr({
        mode: "range",
        dateFormat: "d/m/Y",
        locale:"en"
    });

}



let generateExcelReport =()=> {

     var startDate = $("#search_tim_start").val()=="" ? "": (new Date($("#search_tim_start").val()).getTime()).toString()
     var endDate = $("#search_tim_end").val()=="" ? "": (new Date($("#search_tim_end").val()).getTime()).toString()

   window.location.href =   session['context']+'/dataLog/downloadHistory?startDate='+startDate+'&endDate='+endDate
}


