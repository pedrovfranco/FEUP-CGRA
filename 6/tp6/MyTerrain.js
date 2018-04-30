/**
 * MyTerrain
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTerrain extends Plane {

	constructor(scene, nrDivs, scaleX, scaleY) 
	{
		var scaleX = scaleX || 1;
		var scaleY = scaleY || 1;

		super(scene, nrDivs, 0 - (scaleY-1)/2, 1 + (scaleY-1)/2, 0 - (scaleX-1)/2, 1 + (scaleX-1)/2);
	};

};