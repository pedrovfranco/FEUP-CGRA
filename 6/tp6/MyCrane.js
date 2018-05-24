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
		this.littleString = new MyCylinderWihoutBases(scene,slices,stacks);
		this.magnet = new MyCylinderWihoutBases(scene,slices,stacks);
		this.magnetTop = new MyBase(scene,slices);
		this.magnetBottom = new MyBase(scene,slices);

		this.armAppearance = new CGFappearance(this.scene);
		this.armAppearance.loadTexture("../resources/images/black.png");

		this.baseAppearance = new CGFappearance(this.scene);
		this.baseAppearance.loadTexture("../resources/images/black.png");

        this.time = -1;
		this.elapsed = 0;

		this.rotationSpeed = 0;
		this.maxAngle   = Math.PI;
	
		this.deltaTime = -1;
		this.guiSpeed = 1;
	}

	display(){

	this.scene.rotate(this.rotationSpeed, 1,0,0);

	this.scene.pushMatrix();
	this.scene.translate(0,8.75,-8);
	this.scene.rotate(Math.PI/4,1,0,0);
	this.scene.scale(1/3,1/3,4);
	this.armAppearance.apply();
	this.shorterArm.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,8.75,-8);
	this.scene.rotate(Math.PI/2,1,0,0);
	this.scene.scale(1/20,1/20,2);
	this.baseAppearance.apply();
	this.littleString.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,7,-8);
	this.scene.rotate(Math.PI/2,1, 0,0);
	this.scene.scale(0.9,0.9,0.3);
	this.baseAppearance.apply();
	this.magnet.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,7,-8);
	this.scene.rotate(-Math.PI/2,1, 0,0);
	this.scene.scale(0.9,0.9,0.3);
	this.baseAppearance.apply();
	this.magnetTop.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,6.7,-8);
	this.scene.rotate(Math.PI/2,1, 0,0);
	this.scene.scale(0.9,0.9,0.3);
	this.baseAppearance.apply();
	this.magnetBottom.display();
	this.scene.popMatrix();

	}
	

	update(currTime)
	{
	if (this.time == -1)
			this.time = currTime;

		this.deltaTime = (currTime - this.time - this.elapsed)/1000;

		this.elapsed = currTime - this.time; //Time elapsed from start in milliseconds
		
		this.rotationSpeed += this.deltaTime;
	};

};

class MyCrane extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);
		
		this.base = new MyCylinderWihoutBases(scene,slices, stacks);
		this.baseTop = new MyBase(scene, slices);
		this.baseAppearance = new CGFappearance(this.scene);
		this.baseAppearance.loadTexture("../resources/images/black.png");

		this.arm = new MyPrismWithTop(scene, 4, 1);
		this.armAppearance = new CGFappearance(this.scene);
		this.armAppearance.loadTexture("../resources/images/black.png");

		this.lowerBase = new MyCylinderWihoutBases(scene,slices,stacks);
		this.oneSide = new MyBase(scene,slices);
		this.otherSide = new MyBase(scene,slices);

		this.topCrane = new MyUpperCrane(scene,slices,stacks);
        this.time = -1;
		this.elapsed = 0;

		this.rotationSpeed = 0;
	
		this.deltaTime = -1;
		this.guiSpeed = 1;
	}

	display(){

	this.scene.rotate(this.rotationSpeed, 0,1,0);

	this.scene.pushMatrix();
	this.scene.translate(0,1,0);
	this.scene.rotate(Math.PI/2,1, 0,0);
	this.baseAppearance.apply();
	this.base.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,1,0);
	this.scene.rotate(-Math.PI/2,1, 0,0);
	this.baseAppearance.apply();
	this.baseTop.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,6,-5);
	this.scene.rotate(Math.PI/4,1,0,0);
	this.scene.scale(0.4,0.4,8);
	this.armAppearance.apply();
	this.arm.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-0.45,6,-5);
	this.scene.rotate(Math.PI/2,0, 1,0);
	this.scene.scale(0.9,0.9,0.9);
	this.baseAppearance.apply();
	this.lowerBase.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-0.45,6,-5);
	this.scene.rotate(-Math.PI/2,0, 1,0);
	this.scene.scale(0.9,0.9,0.9);
	this.baseAppearance.apply();
	this.oneSide.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0.4,6,-5);
	this.scene.rotate(Math.PI/2,0, 1,0);
	this.scene.scale(0.9,0.9,0.9);
	this.baseAppearance.apply();
	this.otherSide.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
//	this.topCrane.display();
	this.scene.popMatrix();

	}


	update(currTime)
	{
	if (this.time == -1)
			
		this.time = currTime;

		this.deltaTime = (currTime - this.time - this.elapsed)/1000;

		this.elapsed = currTime - this.time; //Time elapsed from start in milliseconds

	//	if(deltaTime != Math.PI) {
		this.rotationSpeed += this.deltaTime;
	//	}
		
		this.topCrane.update(currTime);
	
	};

};




