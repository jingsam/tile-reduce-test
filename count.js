'use strict';

module.exports = function(data, tile, writeData, done) {
  var count = 0;
  // console.log(data);
  if (data.mapzen_osm.roads) count += data.mapzen_osm.roads.length;
  done(null, count);
};
