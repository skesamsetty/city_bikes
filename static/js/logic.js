// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);

function createMarkers(response) {
  console.log(response);

  // Create variable stations and assign to it response.data.stations
  var stations = response.data.stations;

  // Initialize an array to hold bike markers.
  bikeMarkers = [];


  // Loop through the stations array.
  for (var i = 0; i<stations.length; i++   ) {
    
    currentStation = stations[i];

    // For each station, create a marker, and bind a popup with the station's name.
    var marker = L.marker([currentStation.lat,currentStation.lon]).bindPopup(currentStation.name);

    // Add the marker to the bikeMarkers array.
    bikeMarkers.push(marker);
  }

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(bikeMarkers));
}

function createMap(bikeStations) {

  // Create the tile layer that will be the background of our map.
  var streetBackground = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

  // Create a baseMaps object to hold the streetmap layer.
  var baseMaps = {
    Street: streetBackground
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  var overlayMaps = {
    Cities: bikeStations
  };

  // Create the map object with options.
  var myMap = L.map("map-id", {
    center: [40.71739973, -73.98016555],
    zoom: 15,
    layers: [streetBackground, bikeStations]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}
