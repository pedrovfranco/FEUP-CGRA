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

				if (i > 0) // Indices must be from vertices already assigned, so indices are built for (i-1) while the vertices and normals are built for i 
				{
					this.indices.push(0 + 2*(i-1) + j*this.slices*2); this.indices.push(2 + 2*(i-1) + j*this.slices*2); this.indices.push(1 + 2*(i-1) + j*this.slices*2); // ACB
					this.indices.push(1 + 2*(i-1) + j*this.slices*2); this.indices.push(2 + 2*(i-1) + j*this.slices*2); this.indices.push(3 + 2*(i-1) + j*this.slices*2); // BCD	
				}

				this.normals.push(Math.cos(alpha*i), Math.sin(alpha*i), 0);
				this.normals.push(Math.cos(alpha*i), Math.sin(alpha*i), 0);

			}

			// Indices for i = this.slices - 1
			this.indices.push((0 + 2*(this.slices - 1))%(this.slices*2) + j*this.slices*2); this.indices.push((2 + 2*(this.slices - 1))%(this.slices*2) + j*this.slices*2); this.indices.push((1 + 2*(this.slices - 1))%(this.slices*2) + j*this.slices*2); // ACB
			this.indices.push((1 + 2*(this.slices - 1))%(this.slices*2) + j*this.slices*2); this.indices.push((2 + 2*(this.slices - 1))%(this.slices*2) + j*this.slices*2); this.indices.push((3 + 2*(this.slices - 1))%(this.slices*2) + j*this.slices*2); // BCD	
		}

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();

	}

};
