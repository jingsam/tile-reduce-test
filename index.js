'use strict';

var tileReduce = require('tile-reduce');
var path = require('path');

var numFeatures = 0;

var remoteSources = [
  // {
  // name: 'osm',
  // url: 'https://b.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoibWFwZXIiLCJhIjoiY2loMzVxMzU2MHk0NndjbTV6ZDllczd1biJ9.OroifZ0opDCfHtxq7CzOlg',
  // layers: ['road'],
  // maxrate: 10,
  // raw: true
  // },
  // {
  // name: 'osm',
  // url: 'http://vector.mapzen.com/osm/roads/{z}/{x}/{y}.mvt?api_key=vector-tiles-1b0ODIU',
  // maxrate: 15,
  // raw: true
  // }，
  {
    name: 'osm',
    mbtiles: path.join(__dirname, '/latest.planet.z12.mbtiles'),
    layers: ['osm']
  }
];

tileReduce({
    // bbox: [-122.05862045288086, 36.93768132842635, -121.97296142578124, 37.00378647456494],
    // bbox: [-180.0,-85.1,180.0,85.1],
    bbox: [73.66, 3.86, 135.05, 53.55],
    // tiles: [[5276, 12757, 15]],
    zoom: 12,
    map: path.join(__dirname, '/count.js'),
    sources: remoteSources
  })
  .on('reduce', function(num) {
    numFeatures += num;
  })
  .on('end', function() {
    console.log('total: %d', numFeatures);
  });
