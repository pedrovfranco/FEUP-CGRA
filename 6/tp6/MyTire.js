/**
 * MyTire
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
class MyTire extends CGFobject {

	constructor(scene, slices, stacks){

		super(scene);
		
		//Objects Declaration
		this.cylinder = new MyCylinderWihoutBases(scene, slices, stacks);
		this.base = new MyBase(scene, slices);

		//Side Texture
		this.cylinderAppearance = new CGFappearance(this.scene);
		this.cylinderAppearance.loadTexture("../resources/images/tireSide.jpg");

		//Front Texture
		this.baseAppearance = new CGFappearance(this.scene);
		this.baseAppearance.loadTexture("../resources/images/tireFront.jpg");
		
	}

	display(){

		this.scene.pushMatrix();
			this.cylinderAppearance.apply();
			this.cylinder.display();

			this.scene.pushMatrix();
				this.scene.rotate(Math.PI, 0, 1, 0);
				this.baseAppearance.apply();
				this.base.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(0, 0, 1);
				this.base.display();
			this.scene.popMatrix();

		this.scene.popMatrix();
	}

}

