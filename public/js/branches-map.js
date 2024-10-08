function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    mapId: '1ef79a163a70d375'
  });

  if (!map) {
    console.error("Map not initialized properly");
    return;
  }

  // Create an InfoWindow object
  const infoWindow = new google.maps.InfoWindow();

    // Fetch the branch locations from the server
    fetch('/branches')
    .then(response => response.json())
    .then(locations => {
      locations.forEach(location => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat: location.lat, lng: location.lng },
          map: map
        });
        // Add a click listener to display the InfoWindow with the branch name
        marker.addListener('click', () => {
          infoWindow.setContent(location.name); // Set the branch name as the content
          infoWindow.open(map, marker); // Open the InfoWindow on the map at the marker position
        });
      });
      
      // Display the branch addresses in the DOM
      displayBranchAddresses(locations);
      // Optionally center the map on the first branch
      if (locations.length > 0) {
        map.setCenter({ lat: locations[0].lat, lng: locations[0].lng });
      }
    })
    .catch(error => {
      console.error('Error fetching branch locations:', error);
    });
  }
// Function to display the branch addresses in the <ul>
function displayBranchAddresses(branches) {
  const branchList = document.querySelector('.map-description ul');
  branchList.innerHTML = ''; // Clear existing list

  branches.forEach(branch => {
    const listItem = document.createElement('li');
    listItem.textContent = `${branch.name}: ${branch.address}`;
    branchList.appendChild(listItem);
  });
}

// Run initMap when the Google Maps API is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initMap();
});