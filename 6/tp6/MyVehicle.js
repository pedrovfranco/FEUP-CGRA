/**
 * MyVehicle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 function checkSquareRoot(x, y)
 {
    var result = Math.pow(x, y)

    if (x > 0) {
        return result;
    } else {
        return -1 * Math.pow( -x, y);
    }
}

class MyVehicle extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		//Objects Declaration
		this.top = new MyTop(scene);
		this.body = new MyBody(scene);
		this.tire = new MyTire(scene, 35, 1);
		this.semisphere = new MySemiSphere(scene, 20, 20);
		this.carAppearance = new CGFappearance(scene);

		//Headlight Texture
		this.headlightAppearance =  new CGFappearance(this.scene);
		this.headlightAppearance.loadTexture("../resources/images/headlight.jpg");

		//Time variables
		this.time = -1;
		this.deltaTime = -1;
		this.elapsed = 0;

		//Kinetic variables
		this.position = [0, 0, 0];
		this.acceleration = 0;

		this.gravity = -9.8;
		this.gravitySpeed = 0;

		//Speed Attributes
		this.speed = 0;
		this.maxSpeed = 25;
		this.guiSpeed = 1;

		//Rotation Variables
		this.rotation = [0, 0, 0];
		this.rotationSpeed = [0, 0, 0];
		this.rotationAcceleration = [0, 0, 0];

		this.wheelAngle = 0;
		this.wheelFrontRotation = 0;

		this.maxRotation = 0.1;
		this.maxWheelAngle = Math.PI/6;

		//Friction Force
		this.fallout = 0;
		this.rotationFallout = 0;

		//This is used to prevent movement when car is in crane
		this.locked = false;
	
		//Setting pre-defined car variables
		this.setVariables(4, 3, 1, 2.2, 2, 1);
	};

	display()
	{
		//Tire variables
		var tireScale = this.tireDiameter/2;
		var tireThickness = tireScale*0.7;
		var tireX = (this.width - 2*tireThickness)/2 - 0.01;

		this.scene.translate(this.position[0], this.position[1], this.position[2]);
		this.scene.rotate(this.rotation[0], 1, 0, 0);
		this.scene.translate(0, 0, -this.axelDistance/2); // Rotate car by the rear wheel axis
		this.scene.rotate(this.rotation[1], 0, 1, 0);
		this.scene.translate(0, 0, this.axelDistance/2);
		this.scene.rotate(this.rotation[2], 0, 0, 1);

	    //Back left tire
		this.scene.pushMatrix();
			this.scene.translate(tireX + 0.3, tireScale, -this.axelDistance/2);
			this.scene.rotate(this.wheelFrontRotation, 1, 0, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(tireScale, tireScale, tireThickness);
			this.tire.display();
		this.scene.popMatrix();

		//Back right tire
		this.scene.pushMatrix();
			this.scene.translate(-tireThickness-tireX - 0.3, tireScale, -this.axelDistance/2);
			this.scene.rotate(this.wheelFrontRotation, 1, 0, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(tireScale, tireScale, tireThickness);
			this.tire.display();
		this.scene.popMatrix();

		//Front left tire
		this.scene.pushMatrix();
			this.scene.translate(tireX + 0.3, tireScale, this.axelDistance/2);
			this.scene.rotate(this.wheelAngle, 0, 1, 0);
			this.scene.rotate(this.wheelFrontRotation, 1, 0, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(tireScale, tireScale, tireThickness);
			this.tire.display();
		this.scene.popMatrix();

		//Front right tire
		this.scene.pushMatrix();
			this.scene.translate(-tireThickness-tireX - 0.3, tireScale, this.axelDistance/2);
			this.scene.rotate(this.wheelAngle, 0, 1, 0);
			this.scene.rotate(this.wheelFrontRotation, 1, 0, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(tireScale, tireScale, tireThickness);
			this.tire.display();
		this.scene.popMatrix();


		//Body
		this.scene.pushMatrix();
			this.scene.translate(0, 0.25*this.height, 0);
			this.scene.scale(this.width/Math.sqrt(2), 0.45*this.height, this.length/Math.sqrt(2));
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.rotate(Math.PI/4, 0, 0, 1);
			this.carAppearance.apply();
			this.body.display();
		this.scene.popMatrix();

		//Top
		this.scene.pushMatrix();
			this.scene.translate(0, 0.25*this.height + 0.45*this.height, -this.width*0.1);
			this.scene.scale(this.width, 0.3*this.height, this.length/2/1.8);
			this.scene.translate(-0.5, 0.5, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.top.display();
		this.scene.popMatrix();

		//Left headlight
		this.scene.pushMatrix();
			this.scene.translate(this.width/2*0.7, this.height/2, this.length/2);
			this.scene.scale(0.2, 0.2, 0.15);
			this.headlightAppearance.apply();
			this.semisphere.display();
		this.scene.popMatrix();

		//Right headlight
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
	};

	setAcceleration(acceleration)
	{
		var mult = 10;

		if (acceleration == 0)
			this.fallout = mult/100;
		else
			this.fallout = 0;

		this.acceleration = mult*acceleration;
	}

	setRotAcceleration(rotAcceleration)
	{
		var mult = 1;

		if (rotAcceleration == 0)
			this.rotationFallout = mult/8;
		else
			this.rotationFallout = 0;

		this.rotationAcceleration[1] = mult*rotAcceleration;
	}

	updatePosition()
	{
		if (this.speed != 0)
		{
			this.rotation[1] += checkSquareRoot(this.speed, 0.8)*this.rotationSpeed[1]*this.deltaTime + (checkSquareRoot(this.speed, 0.8)*this.guiSpeed*this.rotationAcceleration[1]*this.deltaTime*this.deltaTime/2);
			this.rotationSpeed[1] += this.guiSpeed*this.rotationAcceleration[1]*this.deltaTime;
		}

		this.wheelAngle += this.guiSpeed*this.rotationAcceleration[1]*this.deltaTime;


		if (this.rotationSpeed[1] > this.maxRotation)
			this.rotationSpeed[1] = this.maxRotation;

		if (this.rotationSpeed[1] < -this.maxRotation)
			this.rotationSpeed[1] = -this.maxRotation;

		if (this.wheelAngle > this.maxWheelAngle)
			this.wheelAngle = this.maxWheelAngle;

		if (this.wheelAngle < -this.maxWheelAngle)
			this.wheelAngle = -this.maxWheelAngle;

		if (this.rotationSpeed[1] > 0) //Makes rotationSpeed[1] = 0 when its near 0
		{
			if (this.rotationSpeed[1] - this.rotationFallout*this.deltaTime < 0)
				this.rotationSpeed[1] = 0;
			else
				this.rotationSpeed[1] -= this.rotationFallout*this.deltaTime;
		}
		else if (this.rotationSpeed[1] < 0)
		{
			if (this.rotationSpeed[1] + this.rotationFallout*this.deltaTime > 0)
				this.rotationSpeed[1] = 0;
			else
				this.rotationSpeed[1] += this.rotationFallout*this.deltaTime;
		}

		if (this.wheelAngle > 0)
		{
			if (this.wheelAngle - 10*this.rotationFallout * this.deltaTime < 0)
				this.wheelAngle = 0;
			else
				this.wheelAngle -= 10*this.rotationFallout * this.deltaTime;
		}
		else if (this.wheelAngle < 0)
		{
			if (this.wheelAngle + 10*this.rotationFallout * this.deltaTime > 0)
				this.wheelAngle = 0;
			else
				this.wheelAngle += 10*this.rotationFallout * this.deltaTime;
		}


		this.position[0] += (this.speed*this.deltaTime + this.guiSpeed*this.acceleration*this.deltaTime*this.deltaTime/2)*Math.sin(this.rotation[1]);
		this.position[2] += (this.speed*this.deltaTime + this.guiSpeed*this.acceleration*this.deltaTime*this.deltaTime/2)*Math.cos(this.rotation[1]);

		this.speed += this.guiSpeed * this.acceleration * this.deltaTime;

		if (this.speed > 0) //Makes speed = 0 when its near 0
		{
			if (this.speed - this.fallout < 0)
				this.speed = 0;
			else
				this.speed -= this.fallout;
		}
		else if (this.speed < 0)
		{
			if (this.speed + this.fallout > 0)
				this.speed = 0;
			else
				this.speed += this.fallout;
		}

		if (this.speed > this.maxSpeed*this.guiSpeed)
			this.speed = this.maxSpeed*this.guiSpeed;

		if (this.speed < -this.maxSpeed*this.guiSpeed)
			this.speed = -this.maxSpeed*this.guiSpeed;

		this.wheelFrontRotation += this.speed/this.tireDiameter*this.deltaTime/2;

		if (this.position[1] + this.deltaTime*this.gravitySpeed + (this.gravity*this.deltaTime*this.deltaTime/2) < 0)
		{
			this.position[1] = 0;
			this.gravitySpeed = 0;
		}
		else
		{
			this.gravitySpeed += this.deltaTime*this.gravity;
			this.position[1] += this.deltaTime*this.gravitySpeed + (this.gravity*this.deltaTime*this.deltaTime/2);
		}
	};

	update(currTime, length, axelDistance, tireDiameter, width, height, guiSpeed)
	{
		if (this.time == -1)
			this.time = currTime;

		this.deltaTime = (currTime - this.time - this.elapsed)/1000;

		this.elapsed = currTime - this.time; //Time elapsed from start in milliseconds

		this.setVariables(length, axelDistance, tireDiameter, width, height, guiSpeed);

		if (!this.locked)
			this.updatePosition();
	};

	setAppearance(appearance){
		this.carAppearance = appearance

	}
};


class MyTop extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.initBuffers();
	}

	initBuffers()
	{
		this.vertices = [
		 -0.5, 0.5, 0.0,
		  0.5, 0.5, 0.0,
		 -0.5, 0.5, 1.0,
		  0.5, 0.5, 1.0,
		 -1.0,-0.5, 0.0,
		 -0.5, 0.5, 0.0,
		 -1.0,-0.5, 1.0,
		 -0.5, 0.5, 1.0,
		 -1.0,-0.5, 0.0,
		  1.0,-0.5, 0.0,
		 -1.0,-0.5, 1.0,
		  1.0,-0.5, 1.0,
		  0.5, 0.5, 0.0,
		  1.0,-0.5, 0.0,
		  0.5, 0.5, 1.0,
		  1.0,-0.5, 1.0,
		 -0.5, 0.5, 0.0,
		  0.5, 0.5, 0.0,
		 -1.0,-0.5, 0.0,
		  1.0,-0.5, 0.0,
		 -0.5, 0.5, 1.0,
		  0.5, 0.5, 1.0,
		 -1.0,-0.5, 1.0,
		  1.0,-0.5, 1.0
		 ];

		this.indices = [
		0, 2, 1,
		1, 2, 3,
		4, 6, 5,
		5, 6, 7,
		8, 9, 10,
		9, 11, 10,
		12, 14, 13,
		13, 14, 15,
		16, 17, 18,
		17, 19, 18,
		20, 22, 21,
		21, 22, 23
		];

		this.normals = [
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
		-2/Math.sqrt(5), 1/Math.sqrt(5), 0,
		-2/Math.sqrt(5), 1/Math.sqrt(5), 0,
		-2/Math.sqrt(5), 1/Math.sqrt(5), 0,
		-2/Math.sqrt(5), 1/Math.sqrt(5), 0,
		0,-1, 0,
		0,-1, 0,
		0,-1, 0,
		0,-1, 0,
		2/Math.sqrt(5), 1/Math.sqrt(5), 0,
		2/Math.sqrt(5), 1/Math.sqrt(5), 0,
		2/Math.sqrt(5), 1/Math.sqrt(5), 0,
		2/Math.sqrt(5), 1/Math.sqrt(5), 0,
		0, 0,-1,
		0, 0,-1,
		0, 0,-1,
		0, 0,-1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
		];

		this.texCoords = [
		0.4258, 0.0420,
		0.6690, 0.0410,
		0.4248, 0.3086,
		0.6700, 0.3056,

		0.3115234375, 0.021484375,
		0.4238281250, 0.041015625,
		0.3115234375, 0.333984375,
		0.4257812500, 0.314453125,

		0, 0,
		0, 0,
		0, 0,
		0, 0,

		0.3115234375, 0.021484375,
		0.4238281250, 0.041015625,
		0.3115234375, 0.333984375,
		0.4257812500, 0.314453125,

		0.4200000000, 0.318000000,
		0.6787109375, 0.318359375,
		0.2832000000, 0.410000000,
		0.7929687500, 0.410156250,

		0.4200000000, 0.318000000,
		0.6787109375, 0.318359375,
		0.2832000000, 0.410000000,
		0.7929687500, 0.410156250
		];


		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
};


class MyBody extends CGFobject
{
	constructor(scene)
	{
		super(scene);


		this.initBuffers();
	}

	initBuffers()
	{
		this.vertices = [
		1.0, 0.0, 0.0,
		1.0, 0.0, 1.0,
		0.0, 1.0, 0.0,
		0.0, 1.0, 1.0,
		0.0, 1.0, 0.0,
		0.0, 1.0, 1.0,
	   -1.0, 0.0, 0.0,
	   -1.0, 0.0, 1.0,
	   -1.0, 0.0, 0.0,
	   -1.0, 0.0, 1.0,
	   -0.0,-1.0, 0.0,
	   -0.0,-1.0, 1.0,
	   -0.0,-1.0, 0.0,
	   -0.0,-1.0, 1.0,
		1.0,-0.0, 0.0,
		1.0,-0.0, 1.0,
		1.0, 0.0, 0.0,
		0.0, 1.0, 0.0,
	   -1.0, 0.0, 0.0,
	   -0.0,-1.0, 0.0,
		0.0, 0.0, 0.0,
		1.0, 0.0, 1.0,
		0.0, 1.0, 1.0,
	   -1.0, 0.0, 1.0,
	   -0.0,-1.0, 1.0,
		0.0, 0.0, 1.0
		];

		this.indices = [
		0, 2, 1,
		1, 2, 3,
		4, 6, 5,
		5, 6, 7,
		8, 10, 9,
		9, 10, 11,
		12, 14, 13,
		13, 14, 15,
		16, 20, 17,
		17, 20, 18,
		18, 20, 19,
		19, 20, 16,
		21, 22, 25,
		22, 23, 25,
		23, 24, 25,
		24, 21, 25
		];

		this.normals = [
		0.7071067811865476, 0.7071067811865475, 0,
		0.7071067811865476, 0.7071067811865475, 0,
		0.7071067811865476, 0.7071067811865475, 0,
		0.7071067811865476, 0.7071067811865475, 0,
	   -0.7071067811865475, 0.7071067811865476, 0,
	   -0.7071067811865475, 0.7071067811865476, 0,
	   -0.7071067811865475, 0.7071067811865476, 0,
	   -0.7071067811865475, 0.7071067811865476, 0,
	   -0.7071067811865477,-0.7071067811865475, 0,
	   -0.7071067811865477,-0.7071067811865475, 0,
	   -0.7071067811865477,-0.7071067811865475, 0,
	   -0.7071067811865477,-0.7071067811865475, 0,
		0.7071067811865474,-0.7071067811865477, 0,
		0.7071067811865474,-0.7071067811865477, 0,
		0.7071067811865474,-0.7071067811865477, 0,
		0.7071067811865474,-0.7071067811865477, 0,
		0, 0,-1,
		0, 0,-1,
		0, 0,-1,
		0, 0,-1,
		0, 0,-1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
		];


		this.texCoords = [
		0.8681640625, 0.5732421875,
		1.0000000000, 0.5732421875,
		0.8681640625, 1.0000000000,
		1.0000000000, 1.0000000000,

		0.6806640625, 0.724609375,
		0.6806640625, 0.585937500,
		0.0000000000, 0.724609375,
		0.0000000000, 0.585937500,

		0.1396484375, 0.0830078125,
		0.1396484375, 0.0830078125,
		0.1396484375, 0.0830078125,
		0.1396484375, 0.0830078125,

		0.0000000000, 0.724609375,
		0.0000000000, 0.585937500,
		0.6806640625, 0.724609375,
		0.6806640625, 0.585937500,

		0.1132812500, 0.09765625,
		0.1132812500, 0.09765625,
		0.1132812500, 0.09765625,
		0.1132812500, 0.09765625,
		0.1132812500, 0.09765625,

		0.00000000000, 1.0000000000,
		0.00000000000, 0.7568359375,
		0.68066406250, 1.0000000000,
		0.68066406250, 0.7568359375,
		0.34033203125, 0.87841796875
		];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

};
