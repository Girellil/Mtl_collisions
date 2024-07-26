//Select your menu ID
let selMenu = "bCollisionmap";
let myMap;

// create getJsonML function to retrieve response
// function getJsonML(url){
//      return d3.json(url);
// }

// Event Listener to your main function
document.addEventListener('DOMContentLoaded', function() {
    const submenu1 = document.getElementById(selMenu);

    submenu1.addEventListener('click', function(event) {
        event.preventDefault();
        // Call Function
        startGraphML();
    });
});

//Initial Graph Function
function startGraphML(){

    // Clear Output content
    let graphArea = d3.select("#graphics-output");
    let homeText = d3.select('#homeContent');
    let APIText = d3.select('#APIcontent');
    let AboutText = d3.select('#aboutContent');
    let mapArea = d3.select("#mapArea")

    homeText.style("display", "none");
    APIText.style("display", "none");
    AboutText.style("display", "none");
    graphArea.style("display", "block");

    //Select D3 Area, clear Content and adjust side-by side view
    graphArea.html("");

    // Avoid double init map
    if (myMap) {
        myMap.remove();
    }
    
    myMap = L.map("graphics-output", {
        center: [45.5019, -73.5674],
        zoom: 11
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    console.log("end-function")
          
}

//Function to update graphics
// function generateGraphicML(){

//     //Select page elements
//     let menuNoClusters = d3.select("#ddClusters");
//     let menuYear = d3.select("#ddYear");

//     //Get current values at the moment selected
//     let noClusters = menuNoClusters.property("value");
//     let year = menuYear.property("value");

//     api_url = "/api/v1.0/program_cluster/" + noClusters + "/" + year;

//     //Loop through all items(years) of the json
//     getJsonML(api_url).then(function(data){

//         // Load inertia graph
//         let inertiaImageArea = d3.select("#leftColumn2");
//         inertiaImageArea.html('');
//         inertiaImageArea.append("img").attr("src", `https://github.com/aayushgambhir2023/Bootcamp-Project4/blob/Lucas/ML_modules/programs_cluster/inertias/elbow_${year}_plot.png?raw=true`)
//         .style("width", "100%");

//         let progNames = data.map(item => item.Program);
//         let progRevs = data.map(item => item.rev);
//         let progExps = data.map(item => item.exp);
//         let progClusters = data.map(item => item.cluster);

//         //Start Line Graph Values
//         // Graph info
//         let traceLine = [{
//             x: progExps,
//             y: progRevs,
//             xaxis: {
//                 title: "Expenses",
//                 tickmode: "array", 
//             },
//             yaxis: {
//                 title: "Revenue",
//                 zeroline: false 
//             },
//             mode: 'markers',
//             marker: {
//               size: 13,
//               color: progClusters
//             },
//             text: progNames,
//             hovertemplate: '%{text}<br>Revenue: %{y}<br>Expenses: %{x}<br>Cluster: %{marker.color}',
//             name: ''
//           }];

//         // Graph Layout
//         let layoutLine = {
//             title: "Clusters of Programs in " + year,

//             plot_bgcolor: "#f7f7f7",
//             paper_bgcolor: "#f7f7f7",
//             margin: {
//                 t: 50,
//                 l: 50,
//                 r: 50,
//                 b: 50
//             },
//             //width: 1555,
//             height: 500,
//             xaxis: {
//                 showticklabels: false,
//                 title: "Expenses"
//             },
//             yaxis: {
//                 showticklabels: false,
//                 title: "Revenue"
//             }
//         };

//         // Plot line graph
//         Plotly.newPlot("rightColumn", traceLine, layoutLine);
    
//     });

// }