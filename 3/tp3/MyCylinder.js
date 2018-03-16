/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


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
		var l = Math.sin(this.alpha/2);
		var h = Math.cos(this.alpha/2);

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

				this.indices.push(0 + 4*i + j*this.slices*4); this.indices.push(2 + 4*i + j*this.slices*4); this.indices.push(1 + 4*i + j*this.slices*4);
				this.indices.push(1 + 4*i + j*this.slices*4); this.indices.push(2 + 4*i + j*this.slices*4); this.indices.push(3 + 4*i + j*this.slices*4);

				this.normals.push(Math.cos(alpha*i), Math.sin(alpha*i), 0);
				this.normals.push(Math.cos(alpha*i), Math.sin(alpha*i), 0);
				this.normals.push(Math.cos(alpha*(i+1)), Math.sin(alpha*(i+1)), 0);
				this.normals.push(Math.cos(alpha*(i+1)), Math.sin(alpha*(i+1)), 0);

			}
		}

		console.log(this.normals);

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();

	}

};
