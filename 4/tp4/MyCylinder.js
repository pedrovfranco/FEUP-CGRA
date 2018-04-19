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

		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		for (var j = 0; j < this.stacks; j++)
		{
			for (var i = 0; i <= this.slices; i++)
			{

				this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i), j/this.stacks);				// A
				this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i),  (j+1)/this.stacks);			// B

				if (i < this.slices)
				{
					this.indices.push((0 + 2*i)%((this.slices + 1)*2) + j*(this.slices + 1)*2); this.indices.push((2 + 2*i)%((this.slices + 1)*2) + j*(this.slices + 1)*2); this.indices.push((1 + 2*i)%((this.slices + 1)*2) + j*(this.slices + 1)*2); // ACB
					this.indices.push((1 + 2*i)%((this.slices + 1)*2) + j*(this.slices + 1)*2); this.indices.push((2 + 2*i)%((this.slices + 1)*2) + j*(this.slices + 1)*2); this.indices.push((3 + 2*i)%((this.slices + 1)*2) + j*(this.slices + 1)*2); // BCD
				}

				this.normals.push(Math.cos(alpha*i), Math.sin(alpha*i), 0);
				this.normals.push(Math.cos(alpha*i), Math.sin(alpha*i), 0);

				this.texCoords.push(1 - i/this.slices, j/this.stacks);
				this.texCoords.push(1 - i/this.slices, (j+1)/this.stacks);
			}

		}

		console.log(this.vertices);
		console.log(this.indices);
		console.log(this.normals);
		console.log(this.texCoords);

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();

	}
};
