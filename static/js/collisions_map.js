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
                <option value="2018">2021</option>
                <option value="2019">2020</option>
                <option value="2020">2019</option>
                <option value="2021">2018</option>
            </select>
        `;
        return div;
    };
    yearControl.addTo(myMap);

    // Initial year
    let year = "2021"; 

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
      
    // Loop through each feature
    data.forEach(function(collision) {

        // Get place time and magnitud of the earthquake
        let latitude = collision.LOC_LAT;
        let longitude = collision.LOC_LONG;
        let collision_code = collision.NO_SEQ_COLL;
        let collision_date = collision.DT_ACCDN;
        let collision_deaths = collision.NB_MORTS;
        let collision_sev_injuried = collision.NB_BLESSES_GRAVES;
        let collision_lig_injuried = collision.NB_BLESSES_LEGERS;

        //let time = Date(collision.NO_SEQ_COLL);

        // Call get color to set fillcolor based on Depth
        // Colors are tones of RED input as RGB on the function below
        //let red = getCircleColor(depth);

        // Create Circles + Bind POP-UP with relevant info of the EQ.
        L.circle([latitude, longitude], {
            color: 'rgb(' + 255 + ', 0, 0)',
            fillColor: 'rgb(' + 255 + ', 0, 0)',
            fillOpacity: 0.5,
            radius: 5,
            weight: 1
        }).bindPopup(`<h2>${collision_code}</h2> <hr>
            <h3>Date: ${collision_date}</h3> <hr>
            <h3>Deaths: ${collision_deaths}</h3> <hr>
            <h3>Injuried (Severe): ${collision_sev_injuried}</h3> <hr>
            <h3>Injuried (minor): ${collision_lig_injuried}</h3> <hr>
            `).addTo(myMap);
        //bindPopup(`<h2>${place}</h2> <hr> <h3>Date: ${time}</h3> <hr> <h3>Magnitude: ${mag}, Depth: ${depth}</h3>`).addTo(myMap);

    });

    // Setup legend.
    // let legend = L.control({ position: "bottomright" });
    // legend.onAdd = function () {
    //     let div = L.DomUtil.create('div', 'info legend'),
    //     grades = colorLabels,
    //     colors = colorScales,
    //     labels = [];

    // // Legend title
    // div.innerHTML = '<h1>Earthquake Depth</h1>'
    
    // // Loop through lables intervals to generate colored square for each + Label Name
    // for (let i = 0; i < grades.length; i++) {
    //     // Add rectangle filled with respective color
    //     div.innerHTML +=
    //         '<span style="background-color:' + colors[i] + ';width:35px;height:25px;display:inline-block;margin-right:5px;"></span>' +
    //         grades[i] + '<br>';
    // }
    // //Formatting legend with a white Background and rounding corners
    // div.style.backgroundColor = "white";
    // div.style.borderRadius = "10px";
    // return div;
    // };
    
    // Adding the legend to the map
    // legend.addTo(myMap);
    });
}