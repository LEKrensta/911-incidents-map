var point = {
    type: "point",
    longitude: -49.97,
    latitude: 41.73
  };
  
  var markerSymbol = {
    type: "simple-marker",
    color: [226, 119, 40],
    outline: {
      color: [255, 255, 255],
      width: 2
    }
  };
  
  export const testPOI = {
    geometry: point,
    symbol: markerSymbol,
    attributes: {
        name: 'foo',
    }
  };
