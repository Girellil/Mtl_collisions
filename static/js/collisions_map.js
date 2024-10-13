// Select your menu ID
let selMenu = "bCollisionmap";
let myMap;

// create getJsonML function to retrieve response
function getJsonML(url){
     return d3.json(url);
}

// Event Listener to your main function
document.addEventListener('DOMContentLoaded', function() {
    const submenu1 = document.getElementById(selMenu);

    submenu1.addEventListener('click', function(event) {
        event.preventDefault();
        // Call Function
        startGraphML();
    });
});

// Initial Graph Function
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

    // Select D3 Area, clear Content and adjust side-by-side view
    graphArea.html("");

    // Avoid double init map
    if (myMap) {
        myMap.remove();
    }
    
    myMap = L.map("graphics-output", {
        center: [45.5019, -73.5674],
        zoom: 11
    });

    // Define map layers
    let sketchLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // Add layer control
    L.control.layers({
        "Sketch": sketchLayer,
        "Satellite": satelliteLayer
    }, {}, { collapsed: false }).addTo(myMap);

    // Set the initial layer
    sketchLayer.addTo(myMap);

    // Add year filter toggle
    const yearControl = L.control({ position: 'topright' });
    yearControl.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'year-control');
        div.innerHTML = `
            <select id="yearSelect">
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
            </select>
        `;
        return div;
    };
    yearControl.addTo(myMap);

    // Initial year
    let year = "2018"; 

    // Load data for initial year
    let api_url = "/api/allcollisions/" + year;
    loadData(api_url);

    // Event listener for year selection
    document.getElementById('yearSelect').addEventListener('change', function(event) {
        year = event.target.value;
        api_url = "/api/allcollisions/" + year;
        loadData(api_url);
    });
}

// Function to load data
function loadData(api_url) {
    getJsonML(api_url).then(function(data){
        console.log(data);
        // You can add logic to visualize the data on the map here
    });
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