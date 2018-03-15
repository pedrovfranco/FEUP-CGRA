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

		this.initBuffers();

	}

	initBuffers()
	{
		var alpha = 2*Math.PI/this.slices;
		var l = Math.sin(this.alpha/2);
		var h = Math.cos(this.alpha/2);

		this.vertices = [];
		this.indices = [];
		this.normals = [];

		for (var j = 0; j < this.stacks; j++)
		{
			for (var i = 0; i < this.slices; i++)
			{
				/*
				this.vertices.push(Math.cos(Math.PI/2 - (this.alpha/2 + i*this.alpha)), Math.cos(this.alpha/2 + i*this.alpha), 0);		// A
				this.vertices.push(Math.cos(Math.PI/2 - (this.alpha/2 + i*this.alpha)), Math.cos(this.alpha/2 + i*this.alpha), 0);		// B
				this.vertices.push(Math.cos(Math.PI/2 - (this.alpha/2 + i*this.alpha)), Math.cos(this.alpha/2 + i*this.alpha), 1);		// C
				this.vertices.push(Math.cos(Math.PI/2 - (this.alpha/2 + i*this.alpha)), Math.cos(this.alpha/2 + i*this.alpha), 1);		// D
				*/

				this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i), j/this.stacks );					// A
				this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i),  (j+1)/this.stacks);				// B
				this.vertices.push(Math.cos(alpha*(i+1)), Math.sin(alpha*(i+1)),  j/this.stacks);		// C
				this.vertices.push(Math.cos(alpha*(i+1)), Math.sin(alpha*(i+1)),  (j+1)/this.stacks);	// D

				this.indices.push(0 + 4*i + j*this.slices*4); this.indices.push(2 + 4*i + j*this.slices*4); this.indices.push(1 + 4*i + j*this.slices*4);
				this.indices.push(1 + 4*i + j*this.slices*4); this.indices.push(2 + 4*i + j*this.slices*4); this.indices.push(3 + 4*i + j*this.slices*4);

				this.normals.push(Math.cos(alpha/2*(2*i+1)), Math.sin(alpha/2*(2*i+1)), 0);
				this.normals.push(Math.cos(alpha/2*(2*i+1)), Math.sin(alpha/2*(2*i+1)), 0);
				this.normals.push(Math.cos(alpha/2*(2*i+1)), Math.sin(alpha/2*(2*i+1)), 0);
				this.normals.push(Math.cos(alpha/2*(2*i+1)),Math.sin(alpha/2*(2*i+1)), 0);

				console.log(this.normals);


			}
		}


		console.log(this.vertices);

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();

	}

/*
	display()
	{
		var alpha_loc = this.alpha;


		for (var i = 0; i < this.stacks; i++)
		{

			for (var j = 0; j < this.slices; j++)
			{
				this.scene.pushMatrix();

				this.quad.vertices = [];

				//Normals
				// this.quad.normals = [
				// 		0, Math.cos(alpha_loc*j), Math.sin(alpha_loc*j),
				// 		0, Math.cos(alpha_loc*j), Math.sin(alpha_loc*j),
				// 		0, Math.cos(alpha_loc*j), Math.sin(alpha_loc*j),
				// 		0, Math.cos(alpha_loc*j), Math.sin(alpha_loc*j),
				// ];

				// console.log(this.quad.normals);

				this.scene.translate(0, 0, i/this.stacks);
				this.scene.rotate(alpha_loc*j, 0, 0, 1);
				this.scene.translate(0, this.h, 0);
				this.scene.rotate(-Math.PI/2, 1, 0, 0);
				this.scene.scale(this.l, 1/this.stacks, 1);
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


	}

	*/
};
