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

		this.headlightAppearance =  new CGFappearance(this.scene);
		this.headlightAppearance.loadTexture("../resources/images/headlight.jpg");
		
		this.time = -1;
		this.elapsed = 0;

		this.position = [0, 0, 0];
		this.speed = 0;
		this.acceleration = 0;

		this.maxSpeed = 0.3;
		
		this.rotation = [0, 0, 0];

		this.rotationSpeed = [0, 0, 0];

		this.wheelAngle = 0;

		this.maxAngle = 0.1;

		this.fallout = 0;

		this.tickTime = -1;

		this.wheelFrontRotation = 0;

		this.guiSpeed = 1;

		this.setVariables(4, 3, 1, 2.2, 2, 1);
	};

	display()
	{
		var tireScale = this.tireDiameter/2;
		var tireThickness = tireScale*0.7;
		var tireX = (this.width - 2*tireThickness)/2 - 0.01;

		this.updatePosition();

		this.scene.translate(this.position[0], this.position[1], this.position[2]);

		this.scene.rotate(this.rotation[0], 1, 0, 0);
		this.scene.translate(0, 0, -this.axelDistance/2); // Rotate car by rear wheel axis		
		this.scene.rotate(this.rotation[1], 0, 1, 0);

		this.scene.translate(0, 0, this.axelDistance/2);
		this.scene.rotate(this.rotation[2], 0, 0, 1);

		// //back left tire
		this.scene.pushMatrix();
			this.scene.translate(tireX, tireScale, -this.axelDistance/2);
			this.scene.rotate(this.wheelFrontRotation, 1, 0, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(tireScale, tireScale, tireThickness);
			this.tire.display();
		this.scene.popMatrix();

		// //back right tire
		this.scene.pushMatrix();
			this.scene.translate(-tireThickness-tireX, tireScale, -this.axelDistance/2);
			this.scene.rotate(this.wheelFrontRotation, 1, 0, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(tireScale, tireScale, tireThickness);
			this.tire.display();
		this.scene.popMatrix();

		//front left tire
		this.scene.pushMatrix();
			
			this.scene.translate(tireX, tireScale, this.axelDistance/2);
			this.scene.rotate(this.wheelAngle, 0, 1, 0);
			this.scene.rotate(this.wheelFrontRotation, 1, 0, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(tireScale, tireScale, tireThickness);
			this.tire.display();
		this.scene.popMatrix();
		
		//front right tire
		this.scene.pushMatrix();
			this.scene.translate(-tireThickness-tireX, tireScale, this.axelDistance/2);
			this.scene.rotate(this.wheelAngle, 0, 1, 0);
			this.scene.rotate(this.wheelFrontRotation, 1, 0, 0);
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
			this.headlightAppearance.apply();
			this.semisphere.display();
		this.scene.popMatrix();

		//right headlight
		this.scene.pushMatrix();
			this.scene.translate(-this.width/2*0.7, this.height/2, this.length/2);
			this.scene.scale(0.2, 0.2, 0.15);
			this.headlightAppearance.apply();
			this.semisphere.display();
		this.scene.popMatrix();
	};
 
	setVariables(length, axelDistance, tireDiameter, width, height, guiSpeed)
	{
		this.length = length;
		this.axelDistance = axelDistance;
		this.tireDiameter = tireDiameter;
		this.width = width;
		this.height = height;
		this.guiSpeed = guiSpeed;
		this.maxSpeed = 0.3 * guiSpeed;
	};

	setAcceleration(acceleration)
	{
		if (acceleration == 0)
			this.fallout = 0.001;
		else
			this.fallout = 0;

			this.acceleration = 0.00008*acceleration;
	}

	setRotSpeed(rotSpeed)
	{
		this.rotationSpeed[0] = 0;
		this.rotationSpeed[1] = 0.2*rotSpeed;
		this.rotationSpeed[2] = 0;

		this.wheelAngle = 3*this.rotationSpeed[1];
	}

	updatePosition()
	{
		if (this.rotationSpeed[1] > this.maxAngle)
			this.rotationSpeed[1] = this.maxAngle;

		this.rotation[0] += this.rotationSpeed[0];
		this.rotation[1] += this.rotationSpeed[1]*this.speed;
		this.rotation[2] += this.rotationSpeed[2];

		
		if (this.speed > 0)
			this.speed -= this.fallout;
		else
			this.speed += this.fallout;
		
		if (this.speed > this.maxSpeed)
			this.speed = this.maxSpeed;

		if (this.speed < -this.maxSpeed)
			this.speed = -this.maxSpeed;

		this.speed += this.guiSpeed * this.acceleration * this.tickTime;

		this.position[0] += this.speed*Math.sin(this.rotation[1]);
		this.position[1] += this.speed*Math.sin(this.rotation[0]);
		this.position[2] += this.speed*Math.cos(this.rotation[1]);

		this.wheelFrontRotation += this.speed/this.tireDiameter/2;
	};
	
	update(currTime, length, axelDistance, tireDiameter, width, height, guiSpeed)
	{
		this.setVariables(length, axelDistance, tireDiameter, width, height, guiSpeed);

		if (this.time == -1)
			this.time = currTime;

		this.tickTime = currTime - this.time - this.elapsed;

		this.elapsed = currTime - this.time; //Time elapsed from start in milliseconds
	};
};	
