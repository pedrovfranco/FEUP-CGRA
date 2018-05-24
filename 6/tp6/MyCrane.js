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

		this.shorterArm = new MyPrismWithTop(scene, 4, 1);

		this.armAppearance = new CGFappearance(this.scene);
		this.armAppearance.loadTexture("../resources/images/black.png");

        this.time = -1;
		this.elapsed = 0;

		this.angle = 0;
		this.rotationSpeed = 0;
		this.maxAngle = Math.PI/6;

		this.deltaTime = -1;

	}

	display(){

	// this.scene.rotate(-this.angle, 1,0,0);
//	this.scene.translate(0.55,7.5,-4);

	this.scene.pushMatrix();
   	this.scene.scale(1/3,1/3,4);
      this.scene.translate(0, 1, -1);
   	this.armAppearance.apply();
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

		// this.updatePosition();
	};

   updatePosition()
   {
      if(this.angle <=  this.maxAngle)
      {
         this.angle += this.rotationSpeed;
      }
   }

};

class MyPendulum extends CGFobject{

	constructor(scene, slices, stacks)
	{
		super(scene);

		this.littleString = new MyCylinderForTexture(scene,slices,stacks);
		this.magnet = new MyCylinderForTexture(scene,slices,stacks);

		this.baseAppearance = new CGFappearance(this.scene);
		this.baseAppearance.loadTexture("../resources/images/black.png");

		this.armAppearance = new CGFappearance(this.scene);
		this.armAppearance.loadTexture("../resources/images/black.png");


	}

	display(){

   this.scene.translate(0, -1.3, -0.05);

	this.scene.pushMatrix();
	this.scene.rotate(Math.PI/2,1,0,0);
	this.scene.scale(1/20,1/20,1.5);
	this.baseAppearance.apply();
	this.littleString.display();
	this.scene.popMatrix();

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
		this.base = new MyCylinderForTexture(scene,slices,stacks);
		this.smallerBase = new MyCylinderForTexture(scene,slices,stacks);
		this.arm = new MyPrismWithTop(scene, 4, 1);
		this.topCrane = new MyUpperCrane(scene,slices,stacks);
      this.pendulum = new MyPendulum(scene, slices, stacks);

		this.baseAppearance = new CGFappearance(this.scene);
		this.baseAppearance.loadTexture("../resources/images/black.png");

		this.armAppearance = new CGFappearance(this.scene);
		this.armAppearance.loadTexture("../resources/images/black.png");


      this.time = -1;
		this.elapsed = 0;

		this.angle = 0;
		this.rotationSpeed = 0;
		this.maxAngle = Math.PI;

      this.topCranePosition = [0, 7, -4];
      this.topCraneAngle = Math.PI/6;
      this.topCraneMaxAngle = -Math.PI/6;

      this.pendulumPostition = [0, 0, 0];

		this.deltaTime = -1;

	}

	display(){

//	this.scene.rotate(this.angle, 0,1,0);

	this.scene.pushMatrix();
	this.baseAppearance.apply();
	this.base.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0, 7.5,-3.75);
	this.scene.rotate(Math.PI/3,1,0,0);
	this.scene.scale(0.4,0.4,8);
	this.armAppearance.apply();
	this.arm.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0.55,7.5,-4);
	this.scene.rotate(Math.PI/2,0, 0,1);
	this.scene.scale(0.9,0.9,0.9);
	this.baseAppearance.apply();
	this.smallerBase.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	  this.scene.translate(this.topCranePosition[0], this.topCranePosition[1], this.topCranePosition[2]);
     this.scene.rotate(this.topCraneAngle, 1, 0, 0);
	  this.topCrane.display();
	this.scene.popMatrix();

   this.scene.pushMatrix();
   // this.scene.translate(0, -1.3, -0.05);
	  this.scene.translate(this.pendulumPostition[0], this.pendulumPostition[1], this.pendulumPostition[2]);
	  this.pendulum.display();
	this.scene.popMatrix();

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

		if(this.angle <=  this.maxAngle)
      {
			this.angle += this.rotationSpeed;
		}

      if(this.topCraneAngle >=  this.topCraneMaxAngle)
      {
			this.topCraneAngle -= this.deltaTime/2;
		}

      this.pendulumPostition[0] = this.topCranePosition[0];
      this.pendulumPostition[1] = this.topCranePosition[1] + 4*Math.sin(this.topCraneAngle);
      this.pendulumPostition[2] = this.topCranePosition[2] - 4*Math.cos(this.topCraneAngle);

      console.log(this.topCraneAngle);
	}

};
