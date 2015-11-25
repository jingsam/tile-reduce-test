'use strict';

var tileReduce = require('tile-reduce');
var path = require('path');

var numFeatures = 0;

var remoteSources = [
  {name: 'osm', url: 'https://b.tiles.mapbox.com/v4/morganherlocker.3vsvfjjw/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoibW9yZ2FuaGVybG9ja2VyIiwiYSI6Ii1zLU4xOWMifQ.FubD68OEerk74AYCLduMZQ', raw: true},
  {name: 'tiger', url: 'https://b.tiles.mapbox.com/v4/morganherlocker.4c81vjdd/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoibW9yZ2FuaGVybG9ja2VyIiwiYSI6Ii1zLU4xOWMifQ.FubD68OEerk74AYCLduMZQ', raw: true}
];

tileReduce({
  bbox: [-122.05862045288086, 36.93768132842635, -121.97296142578124, 37.00378647456494],
  //tiles: [[5276, 12757, 15]],
  zoom: 15,
  map: path.join(__dirname, '/count.js'),
  sources: remoteSources
})
.on('reduce', function(num) {
  numFeatures += num;
})
.on('end', function() {
  console.log('Features total: %d', numFeatures);
});
