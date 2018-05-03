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

		this.topPartII = new MyPrism(scene, 3, 1);
		this.topPart = new MyPrism(scene, 4, 1);
		this.body = new MyPrism(scene, 4, 1);
		this.tire = new MyTire(scene, 35, 1);
		
	};

	display()
	{

		//back right tire	
		this.scene.pushMatrix();
		this.scene.translate(0, 1, 0.5);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.tire.display();
		this.scene.popMatrix();

		//back left tire
		this.scene.pushMatrix();
		this.scene.translate(-2.0, 1, 0.5);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.tire.display();
		this.scene.popMatrix();

		//front right tire
		this.scene.pushMatrix();
		this.scene.translate(0, 1, 4.5);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.tire.display();
		this.scene.popMatrix();
		
		//front left tire
		this.scene.pushMatrix();
		this.scene.translate(0, 1, 4.5);
		this.scene.translate(-2.0, 0, 0);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.tire.display();
		this.scene.popMatrix()


		//top part
		this.scene.pushMatrix();
		this.scene.scale(3,1.5,6);
		this.scene.translate(-0.35,0.7,0.4);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.rotate(Math.PI/4, 0, 0, 1);
		this.body.display();
		this.scene.popMatrix();

		//the other top part
		this.scene.pushMatrix();
		this.scene.scale(3,1.75,2.5);
		this.scene.translate(-0.35,1.5,0.85);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.rotate(Math.PI/4, 0, 0, 1);
		this.topPart.display();
		this.scene.popMatrix();

		//meh
		this.scene.pushMatrix();
		this.scene.scale(4,1.8, 1);
		this.scene.translate(-0.75,1.5,-0.2);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.topPartII.display();
		this.scene.popMatrix();

		//meh part II

		//meh
		this.scene.pushMatrix();
		this.scene.scale(4.15,1.85, 1);
		this.scene.translate(0.25,1.5, 4.4);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.topPartII.display();
		this.scene.popMatrix();
	};
};
