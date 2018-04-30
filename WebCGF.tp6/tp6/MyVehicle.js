/**
 * MyVehicle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyVehicle extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.body = new MyQuad(this);


		
	};

	display(){

		this.body.display();

	};
};
