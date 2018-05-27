/**
 * MyCrane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 class MyUpperCrane extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);

		//Object Declaration
		this.shorterArm = new MyPrismWithTop(scene, 4, 1);

		//Time Variables
        this.time = -1;
		this.elapsed = 0;
		this.deltaTime = -1;

		this.angle = 0;
		this.rotationSpeed = 0;
		this.maxAngle = Math.PI/6;	
	}

	display(){

	//Short Arm
	this.scene.pushMatrix();
   	    this.scene.scale(1/3,1/3,4);
        this.scene.translate(0, 1, -1);
   	    this.shorterArm.display();
	this.scene.popMatrix();

	}

	update(currTime)
	{
	if (this.time == -1)
		this.time = currTime;

		this.deltaTime = (currTime - this.time - this.elapsed)/1000;
		this.elapsed = currTime - this.time; //Time elapsed from start in milliseconds
		this.rotationSpeed = this.deltaTime;

	};

   updatePosition()
   {
      if(this.angle <=  this.maxAngle)
      {
         this.angle += this.rotationSpeed;
      }
   }
};

class MyMagnet extends CGFobject{

	constructor(scene, slices, stacks)
	{
		super(scene);

		//Objects Declaration
		this.littleString = new MyCylinderForTexture(scene,slices,stacks);
		this.magnet = new MyCylinderForTexture(scene,slices,stacks);

		//Crane Texture
		this.baseAppearance = new CGFappearance(this.scene);
		this.baseAppearance.loadTexture("../resources/images/grey.jpg");
	}

	display(){

   this.scene.translate(0, -1.3, -0.05);

	//String
	this.scene.pushMatrix();
	    this.scene.rotate(Math.PI/2,1,0,0);
	    this.scene.scale(1/20,1/20,1.5);
	    this.baseAppearance.apply();
 	    this.littleString.display();
	this.scene.popMatrix();

	//Magnet
	this.scene.pushMatrix();
	    this.scene.translate(0,-1.5,0);
	    this.scene.scale(1,0.2,1);
	    this.baseAppearance.apply();
	    this.magnet.display();
	this.scene.popMatrix();

	}
}

class MyCrane extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);

		//Object Declaration
		this.base = new MyCylinderForTexture(scene,slices,stacks);
		this.smallerBase = new MyCylinderForTexture(scene,slices,stacks);
		this.arm = new MyPrismWithTop(scene, 4, 1);
		this.topCrane = new MyUpperCrane(scene,slices,stacks);
      	this.magnet = new MyMagnet(scene, slices, stacks);

		//Crane Texture
		this.baseAppearance = new CGFappearance(this.scene);
		this.baseAppearance.loadTexture("../resources/images/grey.jpg");

		//Time Variables
    	this.time = -1;
    	this.deltaTime = -1;
		this.elapsed = 0;

		this.angle = 0;
		this.rotationSpeed = 0;
		
   		//Lower Base Angle & Top Crane Rotation Angle
   		this.maxAngle = Math.PI;
    	this.topCraneAngle = Math.PI/6;
    	this.topCraneMaxAngle = -Math.PI/6;

		//Initial Top Crane Position
    	this.topCranePosition = [0, 7, -4];

		//Varying Pendulum Position (depedant on top crane position) 
    	this.pendulumPostition = [this.topCranePosition[0], this.topCranePosition[1] + 4*Math.sin(this.topCraneAngle), this.topCranePosition[2] - 4*Math.cos(this.topCraneAngle)];
		
		//Declaration of the car from the scene
		this.car = new MyVehicle(scene);

		//Bool to control the display of the car
		//True when it is placed on the small platform and picked by crane
		this.displayCar = false;
		
		this.status = 0; 

		//0 = waiting for car
		//1 = rotating to car position
		//2 = descing to car
		//3 = ascending car
		//4 = rotate to drop car
		//5 = drop car

	}

	display()
	{

		this.scene.rotate(this.angle, 0, 1, 0);
		this.scene.rotate(Math.PI, 0, 1, 0);

		//Lower Base
		this.scene.pushMatrix();
			this.baseAppearance.apply();
			this.base.display();
		this.scene.popMatrix();

		//Arm
		this.scene.pushMatrix();
			this.scene.translate(0, 7.5,-3.75);
			this.scene.rotate(Math.PI/3,1,0,0);
			this.scene.scale(0.4,0.4,8);
			this.arm.display();
		this.scene.popMatrix();

		//Smaller Base
		this.scene.pushMatrix();
			this.scene.translate(0.55,7.5,-4);
			this.scene.rotate(Math.PI/2,0, 0,1);
			this.scene.scale(0.9,0.9,0.9);
			this.baseAppearance.apply();
			this.smallerBase.display();
		this.scene.popMatrix();

		//Top Crane
		this.scene.pushMatrix();
			this.scene.translate(this.topCranePosition[0], this.topCranePosition[1], this.topCranePosition[2]);
			this.scene.rotate(this.topCraneAngle, 1, 0, 0);
			this.topCrane.display();
		this.scene.popMatrix();

		//Mgnet
		this.scene.pushMatrix();
			this.scene.translate(this.pendulumPostition[0], this.pendulumPostition[1], this.pendulumPostition[2]);
			this.magnet.display();
		this.scene.popMatrix();

		//Car
		if (this.displayCar)
		{
			this.scene.pushMatrix();
				this.scene.translate(0, -2.8 - this.car.height, 0);
				this.scene.translate(this.pendulumPostition[0], this.pendulumPostition[1], this.pendulumPostition[2]);
				this.car.display();
			this.scene.popMatrix();
		}

	}


	update(currTime)
	{
		if (this.time == -1)
			this.time = currTime;

		this.deltaTime = (currTime - this.time - this.elapsed)/1000;
		this.elapsed = currTime - this.time; //Time elapsed from start in milliseconds
		this.rotationSpeed = this.deltaTime;

		this.updatePosition();
		this.topCrane.update(currTime);
	};

	updatePosition()
	{
		if (this.status == 0)
		{
			if (this.car.speed == 0 && this.car.position[0] > 11.5-7 && this.car.position[0] < 11.5 && this.car.position[2] > -4.5-7 && this.car.position[2] < -4.5)
			{
				this.car.locked = true;
				this.status = 1;
			}
		}
		else if (this.status == 1)
		{
			if (this.angle <= this.maxAngle)
				this.angle += this.rotationSpeed;
			else
				this.status = 2;
		}
		else if (this.status == 2)
		{

			if (this.topCraneAngle > this.topCraneMaxAngle)
				this.topCraneAngle -= this.deltaTime;
			else
			{
				this.car.position = [0, 0, 0];
				this.car.rotation = [0, 0, 0];
				this.displayCar = true;
				this.status = 3;
			}
		}

		else if (this.status == 3)
		{
			if (this.topCraneAngle < -this.topCraneMaxAngle)
				this.topCraneAngle += this.deltaTime;
			else
				this.status = 4;
		}
		else if (this.status == 4)
		{
			if (this.angle >= 0)
			{
				this.angle -= this.rotationSpeed;
			}
			else
				this.status = 5;
			}

		else if (this.status == 5)
		{
			this.displayCar = false;
			this.car.locked = false;
			this.car.position = [8, this.pendulumPostition[1] - this.car.height - 2.8, 10.5];
			this.car.rotation[1] = Math.PI;

			this.status = 0;		
	    }

		this.pendulumPostition[0] = this.topCranePosition[0];
		this.pendulumPostition[1] = this.topCranePosition[1] + 4*Math.sin(this.topCraneAngle);
		this.pendulumPostition[2] = this.topCranePosition[2] - 4*Math.cos(this.topCraneAngle);

	}

	setCar(car)
	{
		this.car = car
	}

};
