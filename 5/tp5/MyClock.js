/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


class MyCylinderWithBase extends CGFobject
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
			for (var i = 0; i < this.slices; i++)
			{

				this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i), j/this.stacks );				// A
				this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i),  (j+1)/this.stacks);			// B

				this.indices.push((0 + 2*i)%(this.slices*2) + j*this.slices*2); this.indices.push((2 + 2*i)%(this.slices*2) + j*this.slices*2); this.indices.push((1 + 2*i)%(this.slices*2) + j*this.slices*2); // ACB
				this.indices.push((1 + 2*i)%(this.slices*2) + j*this.slices*2); this.indices.push((2 + 2*i)%(this.slices*2) + j*this.slices*2); this.indices.push((3 + 2*i)%(this.slices*2) + j*this.slices*2); // BCD

				this.normals.push(Math.cos(alpha*i), Math.sin(alpha*i), 0);
				this.normals.push(Math.cos(alpha*i), Math.sin(alpha*i), 0);

				this.texCoords.push(0, 0);
				this.texCoords.push(0, 0);

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

			this.texCoords.push((Math.cos(alpha*i) + 1)/2, (-Math.sin(alpha*i) + 1)/2);
		}

		this.vertices.push(0, 0, 1);
		this.normals.push(0, 0, 1);
		this.texCoords.push(0.5, 0.5);
	
		// console.log(this.vertices);
		// console.log(this.indices);
		// console.log(this.normals);

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
};

class MyClock extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);
		this.slices = slices;
		this.stacks = stacks;

		this.clock = new MyCylinderWithBase(scene, slices, stacks);

		this.hand1 = new MyClockHand(scene, 0);
		this.hand2 = new MyClockHand(scene, 90);
		this.hand3 = new MyClockHand(scene, 180);
	}

	display()
	{
		this.clock.display();

		this.scene.translate(0, 0, 1.1);

		this.hand1.display();
		this.hand2.display();
		this.hand3.display();
	}
};

class MyClockHand extends CGFobject
{
	constructor(scene, angle)
	{
		super(scene);

		this.setAngle(angle)		
	}

	setAngle(angle)
	{
		this.angle = angle*Math.PI/180;

		this.vertices = [
			-0.05*Math.cos(-this.angle), -0.05*Math.sin(-this.angle), 0,
			-Math.sin(-this.angle) - 0.02*Math.cos(-this.angle), Math.cos(-this.angle) - 0.02*Math.sin(-this.angle), 0,
			0.05*Math.cos(-this.angle), 0.05*Math.sin(-this.angle), 0,
			0.02*Math.cos(-this.angle) - Math.sin(-this.angle), 0.02*Math.sin(-this.angle) + Math.cos(-this.angle), 0
		];

		this.initBuffers();
	}

	initBuffers()
	{
		this.indices = [
			0, 2, 3,
			0, 3, 1
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

	
		// console.log(this.vertices);
		// console.log(this.indices);
		// console.log(this.normals);

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();

	}
};