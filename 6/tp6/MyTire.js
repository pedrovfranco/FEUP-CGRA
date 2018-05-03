/**
 * MyTire
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

		var j = this.slices*(this.stacks)*2; //Number of side face vertices.

		for (var i = 0; i < this.slices; i++)
		{
			this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i), 1);		// A

			this.indices.push(j + i%this.slices);
			this.indices.push(j + (i + 1)%this.slices);
			this.indices.push(j + this.slices);

			this.normals.push(0, 0, 1);

			this.texCoords.push((Math.cos(alpha*i) + 1)/2, (-Math.sin(alpha*i) + 1)/2);
		}

		this.vertices.push(0, 0, 1);
		this.normals.push(0, 0, 1);
		this.texCoords.push(0.5, 0.5);

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
};

class MyTire extends CGFobject {

	constructor(scene,slices,stacks){

		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		
		this.tire = new MyCylinderWithBase(scene,slices,stacks);

		this.tireAppearance = new CGFappearance(this.scene);
		this.tireAppearance.loadTexture("../resources/images/tireFront.jpg");
		
	}

	display(){

		this.scene.pushMatrix();
		this.tireAppearance.apply();
		this.tire.display();
		this.scene.popMatrix();
	}

}

