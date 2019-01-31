let options;
let initDate = new Date().format('yyyy-mm-dd HH:M')
let firstTime = new Date(initDate).setMinutes(new Date(initDate).getMinutes() -10)
let dateStarted = new Date(firstTime).setSeconds(0)
let dataLog;
let dataLogJSON ;
$(document).ready(function () {

    initDataLog();
    firstReload()

        setValueGraph();

    setInterval(function(){
        var dateStart =  dateStarted;
        var currentDateInit = new Date().format('yyyy-mm-dd HH:M')
        var currentDate = new Date(currentDateInit).setSeconds(0)

        console.log('=== update data ===');
        console.log('=== dateStart'+dateStart+'  === full format'+new Date(dateStart)+''  );
        console.log('=== currentDate'+currentDate+'  === full format'+new Date(currentDate)+''  );

        searchDataHistory(dateStart,currentDate)
        renderCanvas(dataLog)


    }, 60000)




});

let setValueGraph = () => {

    renderCanvas(dataLog)

}

let renderCanvas = (jsonValue) => {
    $("#chartContainer").CanvasJSChart(jsonValue);
}


let toogleDataSeries = (e)=> {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    e.chart.render();
}

let searchDataHistory = (startDate,endDate) =>{

      $.ajax({
        url:session['context']+'/dataLog/findDataLogByCriteria',
        headers: {
            Accept : "application/json"
        },
        data: {
            startDate : startDate,
            endDate : endDate,
            firstResult: 0,
            maxResult: 100
        },
        type: "GET",
        async: false,
        error: function(){
            console.log('Fail ')
        },
        complete: function(xhr){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    let result = JSON.parse(xhr.responseText)
                    console.log('Size Json '+result.length)
                    let arrResult = []
                    for(let i =0; i<result.length; i++){

                        let map = {
                            x : new Date(new Date(result[i].createDate).setSeconds(0)) ,
                            // y : Math.floor((Math.random() * 5) + 0)
                            y : i % 2 === 0 ? 1 : 0
                        }

                        arrResult.push(map)
                    }
                    dataLog.data[0].dataPoints =  arrResult
                }
            }
           
        }
    });





}


let initDataLog = ()=> {

    // console.log('dataLogJSON Size = '+dataLogJSON != null ? dataLogJSON.length : 'null')

    dataLog = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Monitoring Real-Time"
        },
        axisX: {
            valueFormatString: "HH:mm"
        },
        axisY: {
            title: "Value of Voltage",
            suffix: "",
            minimum: -2,
            maximun: 5
        },
        toolTip: {
            shared: true,
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "bottom",
            horizontalAlign: "left",
            dockInsidePlotArea: true,
            itemclick: toogleDataSeries
        },
        data: [{
            type: "line",
            showInLegend: true,
            name: "DataLog Graph",
            markerType: "square",
            xValueFormatString: "DD-MMM-YYYY HH:mm:ss",
            color: "#7afd00",
            yValueFormatString: "#,##0K",
            dataPoints: [
                { x: new Date(2019, 1-1, 31,1,1), y: 1 },
                { x: new Date(2019, 1-1, 31,1,2), y: 2 },
                { x: new Date(2019, 1-1, 31,1,3), y: 3 },
                { x: new Date(2019, 1-1, 31,1,4), y: 1 },
                { x: new Date(2019, 1-1, 31,1,5), y: 3 },
                { x: new Date(2019, 1-1, 31,1,6), y: 4 },
                { x: new Date(2019, 1-1, 31,1,7), y: 0 },
                { x: new Date(2019, 1-1, 31,1,8), y: 1 },
                { x: new Date(2019, 1-1, 31,1,9), y: 2 },
                { x: new Date(2019, 1-1, 31,1,10), y: 3 },
                { x: new Date(2019, 1-1, 31,1,11), y: 2 },
                { x: new Date(2019, 1-1, 31,1,12), y: 1 }




                // { x: new Date(2019, 2, 16,14,28 ), y: 67 }

            ]
        }

        ]
    };



}


let firstReload = () => {
    var dateStart =  dateStarted;
    var currentDateInit = new Date().format('yyyy-mm-dd HH:M')
    var currentDate = new Date(currentDateInit).setSeconds(0)

    console.log('=== update data ===');
    console.log('=== dateStart'+dateStart+'  === full format'+new Date(dateStart)+''  );
    console.log('=== currentDate'+currentDate+'  === full format'+new Date(currentDate)+''  );

    searchDataHistory(dateStart,currentDate)
}