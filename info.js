// 11/21/2019
// Emma Coyle
// CSE 383 AJAX Assignment

// 11/18/19
// Add javascript code so that all three boxes have updated information.  There are three blocks that need information:
// On the left is a list of who is logged in and from what IP they are logged in via.
// In the middle is a box listing data from the load function.
// In the right is a box listing current network usage.
// Add javascript code to update the time.
// When the ajax calls fails, record the event in the log, newest event at the top.
// There is a video below showing my solution.
// Paste links to your code and to the git repository here in canvas.


// His sample ajax call & use
// function getDisk() {
//     a=$.ajax({
//     url: URL + '/api/v1/df',
//     method: "GET"
//   }).done(function(data) {
//       //clear out old data
//       $("#disk").html("");
//       len = data.df.length;
//       for (i=0;i<len;i++) {
//         $("#disk").append("<tr><td>" + data.df[i].Mount+"</td><td>" + data.df[i].Size + "</td><td>" + data.df[i].Used + "</td></tr>");
//       }
//   })
//     .fail(function(error) {
//     console.log("error",error.statusText);
//   });
// }

var URL = 'http://ceclnx01.cec.miamioh.edu/~campbest/cse383-f19-campbest-public/ajax1/info.php';

// Display users' id & ip
function displayUserData() {
    // Get the data
    a = $.ajax({
        url: URL + '/api/v1/who',
        method: "GET"
    }).done(function (data) {
      //clear out old data
      $("#users").html("");
      len = data.who.length;
      for (i = 0; i < len ; i++) {
        $("#users").append("<tr><td>" + data.who[i].uid + "</td><td>" + data.who[i].ip + "</td></tr>");
      }
    })
        .fail(function (error) {
            var d = new Date();
            // console.log("error", error.statusText);
            $("#log").append("<li>" + "Error User Data " + d.toLocaleString() + "</li>");
        });
}

// Display's all of the Load Data Averages, onemin, fivemin, fifteenmin, numRunning, & ttlProc
function displayLoadData() {
    // Get the data
    a = $.ajax({
        url: URL + '/api/v1/loadavg',
        method: "GET"
    }).done(function (data) {
      //clear out old data
      $("#onemin").html(data.loadavg.OneMinAvg);
      $("#fivemin").html(data.loadavg.FiveMinAvg);      
      $("#fifteenmin").html(data.loadavg.FifteenMinAvg);      
      $("#numRunning").html(data.loadavg.NumRunning);      
      $("#ttlProc").html(data.loadavg.TtlProcesses);            
    })
        .fail(function (error) {
            var d = new Date();
            // console.log("error", error.statusText);
            $("#log").append("<li>" + "Error Loading Average Data Load-Time " + d.toLocaleString() + "</li>");
        });
}

// Display's the TX and RX network data
function displayNetworkData() {
    // Get the data
    a = $.ajax({
        url: URL + '/api/v1/network',
        method: "GET"
    }).done(function (data) {
      //clear out old data
      $("#txbytes").html(data.network.txbytes);
      $("#txavg").html(data.network.txbytes/1000);   
      $("#rxbytes").html(data.network.rxbytes);
      $("#rxavg").html(data.network.txbytes/1000);                
    })
        .fail(function (error) {
            var d = new Date();
            // console.log("error", error.statusText);
            $("#log").append("<li>" + "Error Loading Network Data " + d.toLocaleString() + "</li>");
        });
}

// Display Users & IP addresses w/ json file who.json
function loadData() {
    displayUserData();
    displayLoadData();
    displayNetworkData();
    showDateTime();
}

// Display Date & Time at the bottom of html page
function showDateTime() {
    var d = new Date();
    document.getElementById('time').innerHTML = d;
    var t = setTimeout(loadData, 1000);
}