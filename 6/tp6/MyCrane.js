/**
 * MyCrane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

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

		this.lowerBase = new CylinderWihoutBases(scene,slices,stacks);
		this.oneSide = new MyBase(scene,slices);
		this.otherSide = new MyBase(scene,slices);



	}

	display(){

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
	this.scene.scale(1/2,1/2,8);
	this.armAppearance.apply();
	this.arm.display();
	this.scene.popMatrix();

	}
	
};




