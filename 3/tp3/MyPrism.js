/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


class MyTriangle extends CGFobject
{
	constructor(scene, slices)
	{
		super(scene);

		this.alpha = 2*Math.PI/slices;
		this.h = Math.cos(this.alpha/2);
		this.l = 2*Math.sin(this.alpha/2);

		this.initBuffers();
	}

	initBuffers()
	{
		this.vertices = [
				0, 0, 0,
				this.l/2, this.h, 0,
				-this.l/2, this.h, 0
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


class MyPolygon extends CGFobject
{
	constructor(scene, slices)
	{
		super(scene);

		this.slices = slices;

		this.alpha = 2*Math.PI/slices;
		this.h = Math.cos(this.alpha/2);
		this.l = 2*Math.sin(this.alpha/2);

		this.triangle = new MyTriangle(scene, slices);

	}

	display()
	{

		for (var i = 0; i < this.slices; i++)
		{
			this.scene.pushMatrix();

			this.scene.rotate(this.alpha*i, 0, 0, 1);
			this.triangle.display();

			this.scene.popMatrix();
		}

	}


};


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
		// this.polygon = new MyPolygon(scene, slices);
	}


	display()
	{
		this.scene.translate(0, 0, this.stacks - 1);

		var alpha_loc = this.alpha;

		for (var i = 0; i < this.stacks; i++)
		{

			for (var j = 0; j < this.slices; j++)
			{
				this.scene.pushMatrix();

				//Normals
				this.quad.normals = [
						0, Math.cos(alpha_loc*j), Math.sin(alpha_loc*j),
						0, Math.cos(alpha_loc*j), Math.sin(alpha_loc*j),
						0, Math.cos(alpha_loc*j), Math.sin(alpha_loc*j),
						0, Math.cos(alpha_loc*j), Math.sin(alpha_loc*j),
				];

				// console.log(this.quad.normals);

				this.scene.translate(0, 0, -i + 0.5);
				this.scene.rotate(alpha_loc*j, 0, 0, 1);
				this.scene.translate(0, this.h, 0);
				this.scene.rotate(-Math.PI/2, 1, 0, 0);
				this.scene.scale(this.l, 1, 1);
				this.quad.display();

				this.scene.popMatrix();
			}
		}

		/* Bases of the prism
		
		this.scene.pushMatrix();

		this.scene.translate(0, 0, 1);
		this.polygon.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		this.scene.translate(0, 0, -this.stacks + 1);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.polygon.display();

		this.scene.popMatrix();

		this.scene.translate(0, 0, this.stacks - 1);

		*/
	}
};
