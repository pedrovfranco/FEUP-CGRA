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
			this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i), 1);		

			this.indices.push(i%this.slices);
			this.indices.push((i + 1)%this.slices);
			this.indices.push(this.slices); 

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

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();

	}
};

class MyBase extends CGFobject
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
		this.texCoords = [];

		for (var i = 0; i < this.slices; i++)
		{
			this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i), 0);		// A

			this.indices.push(i%this.slices);
			this.indices.push((i + 1)%this.slices);
			this.indices.push(this.slices);

			this.normals.push(0, 0, 1);

			this.texCoords.push((Math.cos(alpha*i) + 1)/2, (-Math.sin(alpha*i) + 1)/2);
		}

		this.vertices.push(0, 0, 0,);
		this.normals.push(0, 0, 1);
		this.texCoords.push(1/2, 1/2);

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
};


class MyCylinderWihoutBases extends CGFobject
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

				var ang = alpha*i;
				var strip = ang/(2*Math.PI);

				this.texCoords.push(j/this.stacks, alpha*i/(2*Math.PI));
				this.texCoords.push((j+1)/this.stacks, alpha*i/(2*Math.PI));

			}
		}


		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
};

class MyCylinderForTexture extends CGFobject
{

	constructor(scene,slices,stacks){


		super(scene);

		//Objects Declaration
	    this.lowerBase = new MyCylinderWihoutBases(scene,slices,stacks);
		this.oneSide = new MyBase(scene,slices);
		this.otherSide = new MyBase(scene,slices);

	}

	display(){

	this.scene.pushMatrix();
	    this.scene.translate(0,1,0);
	    this.scene.rotate(Math.PI/2, 1,0,0);
	    this.scene.scale(0.9,0.9,0.9);
	    this.lowerBase.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	    this.scene.translate(0,1,0);
	    this.scene.rotate(-Math.PI/2, 1,0,0);
	    this.scene.scale(0.9,0.9,0.9);
	    this.oneSide.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
        this.scene.translate(0,0.25,0);
	    this.scene.rotate(Math.PI/2, 1,0,0);
	    this.scene.scale(0.9,0.9,0.9);
	    this.otherSide.display();
	this.scene.popMatrix();

	}
}