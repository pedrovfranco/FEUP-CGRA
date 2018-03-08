/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

/*
class MyTriangle extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);
		this.slices = slices;
		this.stacks = stacks;

		this.alpha = 2*Math.PI/slices;
		this.h = Math.cos(this.alpha/2);
		this.l = 2*Math.sin(this.alpha/2);

		this.initBuffers();
	}

	initBuffers()
	{
		this.vertices = [
				0, 0, 0,
				this.l, this.h, 0,
				-this.l, this.h, 0
				];

		this.indices = [
				0, 1, 2,
			];

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.normals = [
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
		];

		this.initGLBuffers();
	};


};
*/

class MyPrism extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);
		this.slices = slices;
		this.stacks = stacks;

		this.alpha = 2*Math.PI/this.slices;
		this.l = 2*Math.sin(this.alpha/2);
		this.h = Math.cos(this.alpha/2);


		this.quad = new MyQuad(scene);
	}


	display()
	{


		/*
		this.scene.rotate(this.alpha, 0, 0, 1);
		this.quad.display();

		this.scene.rotate(this.alpha, 0, 0, 1);
		this.quad.display();
		*/
		// this.scene.pushMatrix();
		//
		// this.scene.rotate(this.alpha, 0, 0, 1);
		// this.scene.translate(0, this.h, 0);
		// this.scene.rotate(-Math.PI/2, 1, 0, 0);
		// this.scene.scale(this.l, 1, 1);
		// this.quad.display();
		//
		// this.scene.popMatrix();
		// var i;
		for (var i = 0; i < this.slices; i++)
		{
			this.scene.pushMatrix();

			this.scene.rotate(this.alpha*i, 0, 0, 1);
			this.scene.translate(0, this.h, 0);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(this.l, 1, 1);
			this.quad.display();

			this.scene.popMatrix();
		}

	}
};
