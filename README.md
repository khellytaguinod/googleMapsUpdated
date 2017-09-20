## googleMapsUpdated

A 98labs Exs

# Contains the simplified coordinates of the updated 81 provinces of the Philippines

How?

Used the [GRASS GIS 7.2.1](https://grass.osgeo.org/) to merge the old coordinations of Shariff Kabunsuan and Maguindanao to create the new updated *provinceUpdated.json*	

The **provincesUpdated** folder contains all the list of the original coordinates of the Philippines 81 provinces

**provincesGenerator.js**
from the provincesUpdated folder will generate the extracted coordinations and will created a json for each of the listed 81 provinces from the provinceUpdated.json

The **provincesSimplified** folder contains all the compressed coordinates from the original 81 provinces coordinates

**Simplifier.js**	
from the provincesSimplified folder will generate the simplified coordintes that use the [line-simplify-rdp](https://github.com/scottglz/line-simplify-rdp) and generate the simplified coordinates.

Created different kinds of html depending on how high the tolerance was set to visualize at different threshold values from the coordinates.

How to Run
**run program using Node.js**
