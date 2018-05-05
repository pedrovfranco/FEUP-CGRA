/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPolygon extends CGFobject
{
	constructor(scene, slices)
	{
		super(scene);
		this.slices = slices;

		this.initBuffers();
	}

	initBuffers()
	{
		var alpha = 2*Math.PI/this.slices;

		this.vertices = [];
		this.indices = [];
		this.normals = [];

		for (var i = 0; i < this.slices; i++)
		{
			this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i), 1);		// A

			this.indices.push(i%this.slices);
			this.indices.push((i + 1)%this.slices);
			this.indices.push(this.slices); // ABC

			this.normals.push(0, 0, 1);
		}

		this.vertices.push(0, 0, 1);
		this.normals.push(0, 0, 1);


		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

};


class MyCylinder extends CGFobject
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

				this.indices.push((0 + 2*i)%(this.slices*2) + j*this.slices*2); this.indices.push((2 + 2*i)%(this.slices*2) + j*this.slices*2); this.indices.push((1 + 2*i)%(this.slices*2) + j*this.slices*2); // ACB
				this.indices.push((1 + 2*i)%(this.slices*2) + j*this.slices*2); this.indices.push((2 + 2*i)%(this.slices*2) + j*this.slices*2); this.indices.push((3 + 2*i)%(this.slices*2) + j*this.slices*2); // BCD

				this.normals.push(Math.cos(alpha*i), Math.sin(alpha*i), 0);
				this.normals.push(Math.cos(alpha*i), Math.sin(alpha*i), 0);

			}
		}

		var j = this.slices*(this.stacks)*2;

		for (var i = 0; i < this.slices; i++)
		{
			this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i), 1);		// A

			this.indices.push(j + i%this.slices);
			this.indices.push(j + (i + 1)%this.slices);
			this.indices.push(j + this.slices); // ABC

			this.normals.push(0, 0, 1);
		}

		this.vertices.push(0, 0, 1);
		this.normals.push(0, 0, 1);

		
		// console.log(this.vertices);
		// console.log(this.indices);
		// console.log(this.normals);


		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();

	}
};

