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


// class MyPolygon extends CGFobject
// {
// 	constructor(scene, slices)
// 	{
// 		super(scene);

// 		this.slices = slices;

// 		this.alpha = 2*Math.PI/slices;

// 		this.triangle = new MyTriangle(scene, slices);

// 	}

// 	display()
// 	{

// 		for (var i = 0; i < this.slices; i++)
// 		{
// 			this.scene.pushMatrix();

// 			this.scene.rotate(this.alpha*i, 0, 0, 1);
// 			this.triangle.display();

// 			this.scene.popMatrix();
// 		}

// 	}


// };


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

		this.vertices = [];
		this.indices = [];
		this.normals = [];

		for (var j = 0; j < this.stacks; j++)
		{
			for (var i = 0; i < this.slices; i++)
			{

				this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i), j/this.stacks );				// A
				this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i),  (j+1)/this.stacks);			// B
				this.vertices.push(Math.cos(alpha*(i+1)), Math.sin(alpha*(i+1)),  j/this.stacks);		// C
				this.vertices.push(Math.cos(alpha*(i+1)), Math.sin(alpha*(i+1)),  (j+1)/this.stacks);	// D

				this.indices.push(0 + 4*i + j*this.slices*4); this.indices.push(2 + 4*i + j*this.slices*4); this.indices.push(1 + 4*i + j*this.slices*4); // ACB 
				this.indices.push(1 + 4*i + j*this.slices*4); this.indices.push(2 + 4*i + j*this.slices*4); this.indices.push(3 + 4*i + j*this.slices*4); // BCD

				this.normals.push(Math.cos(alpha/2*(2*i+1)), Math.sin(alpha/2*(2*i+1)), 0);
				this.normals.push(Math.cos(alpha/2*(2*i+1)), Math.sin(alpha/2*(2*i+1)), 0);
				this.normals.push(Math.cos(alpha/2*(2*i+1)), Math.sin(alpha/2*(2*i+1)), 0);
				this.normals.push(Math.cos(alpha/2*(2*i+1)), Math.sin(alpha/2*(2*i+1)), 0);

			}
		}

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();

	}

};
