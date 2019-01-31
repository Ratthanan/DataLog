let options;
let initDate = new Date().format('yyyy-mm-dd HH:M')
let firstTime = new Date(initDate).setMinutes(new Date(initDate).getMinutes() -5)
let dateStarted = new Date(firstTime).setSeconds(0)
let dataLog;
let dataLogJSON ;
$(document).ready(function () {



        initDataLog();
        setValueGraph();

    setInterval(function(){
        var dateStart =  dateStarted;
        var currentDateInit = new Date().format('yyyy-mm-dd HH:M')
        var currentDate = new Date(currentDateInit).setSeconds(0)

        console.log('=== update data ===');
        console.log('=== dateStart'+dateStart+'  === full format'+new Date(dateStart)+''  );
        console.log('=== currentDate'+currentDate+'  === full format'+new Date(currentDate)+''  );

        searchDataHistory(dateStart,currentDate)


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

    dataLogJSON = $.ajax({
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
        async: false
    }).responseJSON;


}


let initDataLog = ()=> {

    // console.log('dataLogJSON Size = '+dataLogJSON != null ? dataLogJSON.length : 'null')

    dataLog = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Data log"
        },
        axisX: {
            valueFormatString: "DD MMM, YYYY"
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
            xValueFormatString: "DD MMM, YYYY HH:mm",
            color: "#7afd00",
            yValueFormatString: "#,##0K",
            dataPoints: [
                { x: new Date(2017, 1, 1,1,1), y: 1 },
                { x: new Date(2017, 1, 2,2,1), y: 2 },
                { x: new Date(2017, 1, 3,3,1), y: 3 },
                { x: new Date(2017, 1, 4,4,1), y: 1 },
                { x: new Date(2017, 1, 5,5,1), y: 3 },
                { x: new Date(2017, 1, 6,6,1), y: 4 },
                { x: new Date(2017, 1, 7,7,1), y: 0 },
                { x: new Date(2017, 1, 8,8,1), y: 1 },
                { x: new Date(2017, 1, 9,9,1), y: 2 },
                { x: new Date(2017, 1, 10,10,1), y: 3 },
                { x: new Date(2017, 1, 11,11,1), y: 2 },
                { x: new Date(2017, 1, 12,12,1), y: 1 },
                { x: new Date(2017, 1, 13,13,1), y: 0 },
                { x: new Date(2017, 1, 14,14,1), y: 5},
                { x: new Date(2017, 1, 15,15,1), y: 2 },
                { x: new Date(2017, 1, 16,16,1), y: 2 },
                { x: new Date(2017, 1, 17,17,1), y: 2 },
                { x: new Date(2017, 1, 18,18,1), y: 3 },
                { x: new Date(2017, 1, 19,19,1), y: 1 },
                { x: new Date(2017, 1, 20,1,1), y: 3 },
                { x: new Date(2017, 1, 21,2,1), y: 4 },
                { x: new Date(2017, 1, 22,3,1), y: 4 },
                { x: new Date(2017, 1, 23,4,1), y: 2 },
                { x: new Date(2017, 1, 24,5,1), y: 0 },
                { x: new Date(2017, 1, 25,6,1), y: 0 },
                { x: new Date(2017, 1, 26,7,1), y: 0 },
                { x: new Date(2017, 1, 28,8,1), y: 0 },


                // { x: new Date(2017, 2, 16,14,28 ), y: 67 }

            ]
        }

        ]
    };



}