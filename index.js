'use strict';

var tileReduce = require('tile-reduce');
var path = require('path');

var numFeatures = 0;

var remoteSources = [
  // {
  //   name: 'streets',
  //   url: 'https://b.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoibWFwZXIiLCJhIjoiY2loMzVxMzU2MHk0NndjbTV6ZDllczd1biJ9.OroifZ0opDCfHtxq7CzOlg',
  //   layers: ['road'],
  //   maxrate: 10,
  //   raw: true
  // },
  {
    name: 'mapzen_osm',
    url: 'http://vector.mapzen.com/osm/roads/{z}/{x}/{y}.mvt?api_key=vector-tiles-1b0ODIU',
    maxrate: 10,
    raw: true
  }
];

tileReduce({
  bbox: [-122.05862045288086, 36.93768132842635, -121.97296142578124, 37.00378647456494],
  // bbox: [-180.0,-85.1,180.0,85.1],
  // tiles: [[5276, 12757, 15]],
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
