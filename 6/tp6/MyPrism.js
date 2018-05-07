/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


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


class MyPrismWithTop extends CGFobject
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

		var j = this.vertices.length/3;

		for (var i = 0; i < this.slices; i++)
		{
			this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i), 0);	// A

			this.indices.push(j + i%this.slices);
			this.indices.push(j + this.slices);
			this.indices.push(j + (i + 1)%this.slices);

			this.normals.push(0, 0, -1);
		}

		this.vertices.push(0, 0, 0);
		this.normals.push(0, 0, -1);


		j = this.vertices.length/3;

		for (var i = 0; i < this.slices; i++)
		{
			this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i), 1);	// A

			this.indices.push(j + i%this.slices);
			this.indices.push(j + (i + 1)%this.slices);
			this.indices.push(j + this.slices);

			this.normals.push(0, 0, 1);
		}

		this.vertices.push(0, 0, 1);
		this.normals.push(0, 0, 1);


		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

};


class MyTrapezoidPrism extends CGFobject
{
	constructor(scene, top, bottom, stacks)
	{
		super(scene);

		this.stacks = stacks;
		this.top = top;
		this.bottom = bottom;

		this.initBuffers();
	}

	initBuffers()
	{
		this.vertices = [];
		this.indices = [];
		this.normals = [];


		//Side faces
		for (var i = 0; i < this.stacks; i++)
		{
			this.vertices.push(-this.top/2, 0.5, i/this.stacks);
			this.vertices.push(this.top/2, 0.5,  i/this.stacks);
			this.vertices.push(-this.top/2, 0.5, (i+1)/this.stacks);
			this.vertices.push(this.top/2, 0.5,  (i+1)/this.stacks);

			this.indices.push(this.vertices.length/3 - 4 + 0, this.vertices.length/3 - 4 + 2, this.vertices.length/3 - 4 + 1);
			this.indices.push(this.vertices.length/3 - 4 + 1, this.vertices.length/3 - 4 + 2, this.vertices.length/3 - 4 + 3);

			this.normals.push(0, 1, 0);
			this.normals.push(0, 1, 0);
			this.normals.push(0, 1, 0);
			this.normals.push(0, 1, 0);
		}

		for (var i = 0; i < this.stacks; i++)
		{
			this.vertices.push(-this.bottom/2, -0.5, i/this.stacks);
			this.vertices.push(-this.top/2, 0.5,  i/this.stacks);
			this.vertices.push(-this.bottom/2, -0.5, (i+1)/this.stacks);
			this.vertices.push(-this.top/2, 0.5,  (i+1)/this.stacks);

			this.indices.push(this.vertices.length/3 - 4 + 0, this.vertices.length/3 - 4 + 2, this.vertices.length/3 - 4 + 1);
			this.indices.push(this.vertices.length/3 - 4 + 1, this.vertices.length/3 - 4 + 2, this.vertices.length/3 - 4 + 3);

			this.normals.push(-2/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), -(this.top - this.bottom)/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), 0);
			this.normals.push(-2/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), -(this.top - this.bottom)/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), 0);
			this.normals.push(-2/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), -(this.top - this.bottom)/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), 0);
			this.normals.push(-2/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), -(this.top - this.bottom)/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), 0);
		}

		for (var i = 0; i < this.stacks; i++)
		{
			this.vertices.push(-this.bottom/2, -0.5, i/this.stacks);
			this.vertices.push(this.bottom/2, -0.5,  i/this.stacks);
			this.vertices.push(-this.bottom/2, -0.5, (i+1)/this.stacks);
			this.vertices.push(this.bottom/2, -0.5,  (i+1)/this.stacks);

			this.indices.push(this.vertices.length/3 - 4 + 0, this.vertices.length/3 - 4 + 1, this.vertices.length/3 - 4 + 2);
			this.indices.push(this.vertices.length/3 - 4 + 1, this.vertices.length/3 - 4 + 3, this.vertices.length/3 - 4 + 2);

			this.normals.push(0, -1, 0);
			this.normals.push(0, -1, 0);
			this.normals.push(0, -1, 0);
			this.normals.push(0, -1, 0);
		}

		for (var i = 0; i < this.stacks; i++)
		{
			this.vertices.push(this.top/2, 0.5, i/this.stacks);
			this.vertices.push(this.bottom/2, -0.5,  i/this.stacks);
			this.vertices.push(this.top/2, 0.5, (i+1)/this.stacks);
			this.vertices.push(this.bottom/2, -0.5,  (i+1)/this.stacks);

			this.indices.push(this.vertices.length/3 - 4 + 0, this.vertices.length/3 - 4 + 2, this.vertices.length/3 - 4 + 1);
			this.indices.push(this.vertices.length/3 - 4 + 1, this.vertices.length/3 - 4 + 2, this.vertices.length/3 - 4 + 3);

			this.normals.push(2/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), -(this.top - this.bottom)/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), 0);
			this.normals.push(2/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), -(this.top - this.bottom)/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), 0);
			this.normals.push(2/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), -(this.top - this.bottom)/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), 0);
			this.normals.push(2/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), -(this.top - this.bottom)/Math.sqrt(this.top*this.top - 2*this.top*this.bottom + this.bottom*this.bottom + 4), 0);
		}


		//Back base
		this.vertices.push(-this.top/2, 0.5, 0);
		this.vertices.push(this.top/2, 0.5,  0);
		this.vertices.push(-this.bottom/2, -0.5, 0);
		this.vertices.push(this.bottom/2, -0.5, 0);

		this.indices.push(this.vertices.length/3 - 4 + 0, this.vertices.length/3 - 4 + 1, this.vertices.length/3 - 4 + 2);
		this.indices.push(this.vertices.length/3 - 4 + 1, this.vertices.length/3 - 4 + 3, this.vertices.length/3 - 4 + 2);

		this.normals.push(0, 0, -1);
		this.normals.push(0, 0, -1);
		this.normals.push(0, 0, -1);
		this.normals.push(0, 0, -1);

		//Front base
		this.vertices.push(-this.top/2, 0.5, 1);
		this.vertices.push(this.top/2, 0.5,  1);
		this.vertices.push(-this.bottom/2, -0.5, 1);
		this.vertices.push(this.bottom/2, -0.5, 1);

		this.indices.push(this.vertices.length/3 - 4 + 0, this.vertices.length/3 - 4 + 2, this.vertices.length/3 - 4 + 1);
		this.indices.push(this.vertices.length/3 - 4 + 1, this.vertices.length/3 - 4 + 2, this.vertices.length/3 - 4 + 3);

		this.normals.push(0, 0, 1);
		this.normals.push(0, 0, 1);
		this.normals.push(0, 0, 1);
		this.normals.push(0, 0, 1);


		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

};
