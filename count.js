'use strict';

var turf = require('turf');

module.exports = function(tilelayers, tile, writeData, done) {
    var length = 0;
    var layer =  tilelayers.osm.osm;

    var roadTypes = [
        'motorway',
        'trunk',
        'primary',
        'secondary',
        'tertiary',
        'unclassified',
        'residential',
        'road',
    ];

    for (var i = 0; i < layer.features.length; i++) {
        var feature = layer.features[i];
        if (roadTypes.indexOf(feature.properties.highway) > -1) {
            length += line_length(feature, 'kilometers');
        }
    }

    done(null, length);
};


function line_length(feature, units) {
    var length = 0;

    if (feature.geometry.type == 'LineString') {
        length = turf.lineDistance(feature, units);
    }

    if (feature.geometry.type == 'MultiLineString') {
        for (var i = 0; i < feature.geometry.coordinates.length; i++) {
            var linestring = turf.linestring(feature.geometry.coordinates[i]);
            length += turf.lineDistance(linestring, units);
        }
    }

    return length;
}
