'use strict';

let jsonfile = require('jsonfile'),
    fs = require('fs'),
    simplify = require('simplify-js'),
    t = require('tape')


const file = 'province.json';

const PRECISION = 1000000, tolerance = 15000


jsonfile.readFile(file, (err, obj) => {
  
  for( let i = 0; i < 81; ++i )
  {

  	let geoType = obj.features[i].geometry.type;

  	if (geoType === `Polygon`) {

  		let provinceName = obj.features[i].properties.NAME_1;
  		let polyCoor = obj.features[i].geometry.coordinates;
  		let coordinates = polyCoor[0];

  		let results = coordinates.map (x => {
  		  let finalList = {};
  			finalList[`y`] = x[0]; finalList[`x`] = x[1];
  			return finalList;
  		})


      let original = addPrecision(results, PRECISION)

      let b = simplify(original, tolerance)

      let finalResult = convertToLatLng(returnPrecision(b, PRECISION))


  	  createFile(provinceName, finalResult);


  	} else { 

     if (geoType === `MultiPolygon`) {

		let featureTemp = obj.features[i];
		let geometryTemp = featureTemp.geometry;
		let resultList = [];
		let provinceName = featureTemp.properties["PROVINCE"];
		for (let polygonKey in geometryTemp.coordinates) {	
			let coordinates = [];
			
			let polygon = geometryTemp.coordinates[polygonKey];
			
			for (let coordinateListkey in polygon) {
				
				for (let key in polygon[coordinateListkey]) {
					let coord = {};
						coord.y = polygon[coordinateListkey][key][0];
						coord.x = polygon[coordinateListkey][key][1];
						coordinates.push(coord);
				}
			}
			
			resultList.push(coordinates);
		}
		
      let original = resultList.map(element => addPrecision(element,PRECISION))
      let b = original.map(element => simplify(element,tolerance))
      let finalResult = b.map(element => convertToLatLng(returnPrecision(element,PRECISION)))
      createFile(provinceName, finalResult);

	 
     }
  	}
  }


})

    let addPrecision = function(input, precision) {
      let output = input.map(element => {
        let obj = {}
        obj.x = element.x * precision
        obj.y = element.y * precision
        return obj
      })
      return output
    }

    let convertToLatLng = function(input) {
      let output = input.map(element => {
        let obj = {}
        obj.lat = element.x 
        obj.lng = element.y 
        return obj
      })
      return output
    }

    let returnPrecision = function(input, precision) {
    let output = input.map(element => {
      let obj = {}
      obj.x = element.x / precision
      obj.y = element.y / precision
      return obj
    })
    return output
  }


    function createFile(provinceName, results) {

      let newFileName = provinceName.replace(/\s/g, '-').toLowerCase();

      let file = `output/15k/${newFileName}.json`
      jsonfile.writeFile(file, results, function (err) {
        console.log(`created ${newFileName} jsonFile`);
      })
    }

