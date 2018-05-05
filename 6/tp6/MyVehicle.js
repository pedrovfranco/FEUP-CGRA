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

		this.top = new MyTrapezoidPrism(scene, 1, 2, 1);
		this.body = new MyPrismWithTop(scene, 4, 1);
		this.tire = new MyTire(scene, 35, 1);

		var scaleX = 1;
		var scaleY = 1;

		this.plane = new Plane(scene, 20, 0 - (scaleY-1)/2, 1 + (scaleY-1)/2, 0 - (scaleX-1)/2, 1 + (scaleX-1)/2, 0);
		
	};

	display()
	{

		var length = 4.3, tireDiameter = 1, thickness = 2.5, height = 1.8;

		var tireScale = tireDiameter/2;
		var tireThickness = tireScale*0.7;
		var tireX = (thickness - 2*tireThickness)/2 - 0.01;

		// //back left tire
		this.scene.pushMatrix();
			this.scene.translate(tireX, tireScale, -length/2);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(tireScale, tireScale, tireThickness);
			this.tire.display();
		this.scene.popMatrix();

		// //back right tire
		this.scene.pushMatrix();
			this.scene.translate(-tireThickness-tireX, tireScale, -length/2);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(tireScale, tireScale, tireThickness);
			this.tire.display();
		this.scene.popMatrix();

		//front left tire
		this.scene.pushMatrix();
			this.scene.translate(tireX, tireScale, length/2);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(tireScale, tireScale, tireThickness);
			this.tire.display();
		this.scene.popMatrix();
		
		//front right tire
		this.scene.pushMatrix();
			this.scene.translate(-tireThickness-tireX, tireScale, length/2);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(tireScale, tireScale, tireThickness);
			this.tire.display();
		this.scene.popMatrix();

		//body
		this.scene.pushMatrix();
			this.scene.translate(0, 0.6, 0);
			this.scene.scale(thickness/Math.sqrt(2), 0.9, length);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.rotate(Math.PI/4, 0, 0, 1);
			this.body.display();
		this.scene.popMatrix();

		//top
		this.scene.pushMatrix();
			this.scene.translate(0, 0.6 + 0.9, 0);
			this.scene.scale(thickness, 0.8, length/2/1.2);
			this.scene.translate(-0.5, 0.5, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.top.display();
		this.scene.popMatrix();

	};
};
