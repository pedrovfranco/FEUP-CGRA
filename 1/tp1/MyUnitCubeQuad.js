/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCubeQuad extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.quad = new MyQuad(this.scene);
		this.quad.initBuffers();
		
	};


	display()
	{	
		this.scene.pushMatrix();

		this.scene.translate(0, 0, 0.5);
		this.quad.display();					// Face z positiva

		this.scene.popMatrix();

		this.scene.pushMatrix();
		
		this.scene.translate(0.5, 0, 0);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.quad.display();					// Face x positiva

		this.scene.popMatrix();

		this.scene.pushMatrix();
		
		this.scene.translate(0, 0.5, 0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.quad.display();					// Face y positiva

		this.scene.popMatrix();

		this.scene.pushMatrix();
		
		this.scene.translate(0, 0, -0.5);
		this.scene.rotate(Math.PI, 1, 0, 0);
		this.quad.display();					// Face z negativa

		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		
		this.scene.translate(-0.5, 0, 0);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.quad.display();					// Face x negativa

		this.scene.popMatrix();

		this.scene.pushMatrix();
		
		this.scene.translate(0, -0.5, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.quad.display();					// Face y negativa

		this.scene.popMatrix();
		

	}
	
};

