'use strict';

let jsonfile = require('jsonfile');
let fs = require('fs');
const file = 'provinceUPDATED.json';

jsonfile.readFile(file, (err, obj) => {

    function createFile(provinceName, results) {

      let newFileName = provinceName.replace(/\s/g, '-').toLowerCase();

      let file = `generatedProvinces/${newFileName}.json`
      jsonfile.writeFile(file, results, function (err) {
        console.error(err)
        console.log(`created ${newFileName} file`);

      })
    }

  
  for( let i = 0; i < 81; ++i )
  {

  	let geoType = obj.features[i].geometry.type;

  	if (geoType === `Polygon`) {

  		let provinceName = obj.features[i].properties.NAME_1;
  		let polyCoor = obj.features[i].geometry.coordinates;
  		let coordinates = polyCoor[0];

  		let results = coordinates.map (x => {
  			let finalList = {};
  			finalList[`lng`] = x[0]; finalList[`lat`] = x[1];
  			return finalList;
  		})

  	  createFile(provinceName, results);

  	} else { 

     if (geoType === `MultiPolygon`) {

		let featureTemp = obj.features[i];
		let geometryTemp = featureTemp.geometry;
		let resultList = [];
		let provinceName = featureTemp.properties["PROVINCE"];
		for (let polygonKey in geometryTemp.coordinates) {	
			//console.log("multi ", polygon);
			let coordinates = [];
			
			let polygon = geometryTemp.coordinates[polygonKey];
			
			for (let coordinateListkey in polygon) {
				
				for (let key in polygon[coordinateListkey]) {
					let coord = {};
						coord.lng = polygon[coordinateListkey][key][0];
						coord.lat = polygon[coordinateListkey][key][1];
						coordinates.push(coord);
				}
			}
			
			resultList.push(coordinates);
		}
		
		createFile(provinceName, resultList);
	 
     }

  	}

  }


})