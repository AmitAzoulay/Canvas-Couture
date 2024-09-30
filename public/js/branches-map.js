function initMap() {
    const locations = [
      { lat: 35.2271, lng: -80.8431 }, // Charlotte
      { lat: 35.7796, lng: -78.6382 }, // Raleigh
      { lat: 36.0726, lng: -79.7910 }, // Greensboro
      { lat: 36.0014, lng: -78.9382 }, // Durham
      { lat: 35.5961, lng: -82.5515 }  // Asheville
    ];
    
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: locations[0]
    });

    locations.forEach(location => {
      new google.maps.Marker({
        position: location,
        map: map
      });
    });
  }