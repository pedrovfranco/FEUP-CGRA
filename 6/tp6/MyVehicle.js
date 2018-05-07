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
		this.semisphere = new MySemiSphere(scene, 20, 20);

		this.time = -1;
		this.elapsed = 0;

		this.speed = 0;

		this.position = [0, 0, 0];
		this.rotation = [0, 0, 0];

		this.setVariables(4, 3, 1, 2.2, 2);
	};

	display()
	{
		var tireScale = this.tireDiameter/2;
		var tireThickness = tireScale*0.7;
		var tireX = (this.width - 2*tireThickness)/2 - 0.01;

		this.scene.translate(this.position[0], this.position[1], this.position[2]);

		this.scene.rotate(this.rotation[0], 1, 0, 0);
		this.scene.rotate(this.rotation[1], 0, 1, 0);
		this.scene.rotate(this.rotation[2], 0, 0, 1);

		// //back left tire
		this.scene.pushMatrix();
			this.scene.translate(tireX, tireScale, -this.axelDistance/2);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(tireScale, tireScale, tireThickness);
			this.tire.display();
		this.scene.popMatrix();

		// //back right tire
		this.scene.pushMatrix();
			this.scene.translate(-tireThickness-tireX, tireScale, -this.axelDistance/2);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(tireScale, tireScale, tireThickness);
			this.tire.display();
		this.scene.popMatrix();

		//front left tire
		this.scene.pushMatrix();
			this.scene.translate(tireX, tireScale, this.axelDistance/2);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(tireScale, tireScale, tireThickness);
			this.tire.display();
		this.scene.popMatrix();
		
		//front right tire
		this.scene.pushMatrix();
			this.scene.translate(-tireThickness-tireX, tireScale, this.axelDistance/2);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(tireScale, tireScale, tireThickness);
			this.tire.display();
		this.scene.popMatrix();

		//body
		this.scene.pushMatrix();
			this.scene.translate(0, 0.25*this.height, 0);
			this.scene.scale(this.width/Math.sqrt(2), 0.45*this.height, this.length/Math.sqrt(2));
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.rotate(Math.PI/4, 0, 0, 1);
			this.body.display();
		this.scene.popMatrix();

		//top
		this.scene.pushMatrix();
			this.scene.translate(0, 0.25*this.height + 0.45*this.height, -this.width*0.1);
			this.scene.scale(this.width, 0.3*this.height, this.length/2/1.8);
			this.scene.translate(-0.5, 0.5, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.top.display();
		this.scene.popMatrix();

		//left headlight
		this.scene.pushMatrix();
			this.scene.translate(this.width/2*0.7, this.height/2, this.length/2);
			this.scene.scale(0.2, 0.2, 0.15);
			this.semisphere.display();
		this.scene.popMatrix();

		//right headlight
		this.scene.pushMatrix();
			this.scene.translate(-this.width/2*0.7, this.height/2, this.length/2);
			this.scene.scale(0.2, 0.2, 0.15);
			this.semisphere.display();
		this.scene.popMatrix();


	};

	setVariables(length, axelDistance, tireDiameter, width, height)
	{
		this.length = length;
		this.axelDistance = axelDistance;
		this.tireDiameter = tireDiameter;
		this.width = width;
		this.height = height;
	};

	setSpeed(speed)
	{
		this.position[2] += speed*Math.cos(this.rotation[1]);
		this.position[1] += speed*Math.sin(this.rotation[0]);
		this.position[0] += speed*Math.sin(this.rotation[1]);
	}

	setRotation(rot)
	{
		this.rotation[1] += rot;
	}

	update(currTime, length, axelDistance, tireDiameter, width, height)
	{
		this.setVariables(length, axelDistance, tireDiameter, width, height);

		if (this.time == -1)
			this.time = currTime;

		this.elapsed = currTime - this.time; //Time elapsed from start in milliseconds
	};
};
