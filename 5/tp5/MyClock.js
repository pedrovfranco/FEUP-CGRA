/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function getHour(hour, minute, second)
{
	var min = getMinute(minute, second);
	return hour + min/60;
}

function getMinute(minute, second)
{
	return minute + second/60;
}

function getHourAngle(hour)
{
	return 360*hour/12;
}

function getMinuteAngle(minute)
{
	return 360*minute/60;
}

function getSecondAngle(second)
{
	return 360*second/60;
}

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
		this.hand2 = new MyClockHand(scene, 0);
		this.hand3 = new MyClockHand(scene, 0);

		this.handAppearance = new CGFappearance(this.scene);
		this.handAppearance.loadTexture("../resources/images/black.png");

		this.defaultAppearance = new CGFappearance(this.scene);

		this.hour = 3;
		this.minute = 30;
		this.second = 45;
	
		this.time = -1;
	}

	display()
	{

		this.clock.display();

		this.scene.translate(0, 0, 1.05);

		this.scene.pushMatrix();

			this.scene.scale(0.6, 0.6, 0.6);

			this.handAppearance.apply();
			this.hand1.display();

			this.hand1.setAngle(getHourAngle(getHour(this.hour, this.minute, this.second)));

		this.scene.popMatrix();

		this.scene.pushMatrix();

			this.scene.scale(0.7, 0.7, 0.7);

			this.hand2.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

			this.scene.scale(0.8, 0.8, 0.8);

			this.hand3.display();

		this.scene.popMatrix();
		
		
		this.hand3.setAngle(getSecondAngle(this.second));
	}

	update(currTime)
	{
		// console.log(currTime);

		if (this.time == -1)
			this.time = currTime;

		var deltaTime = (currTime - this.time); //Time elapsed in milliseconds

		this.second = deltaTime/1000;


		this.minute = this.second/60;
		this.second = this.second%60;

		this.hour = this.minute/60;
		this.minute = this.minute%60;

		console.log(this.hour);
		console.log(this.minute);
		console.log(this.second);

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

		this.texCoords = [
			0, 1,
			0, 0,
			1, 1,
			1, 0
		];

	
		// console.log(this.vertices);
		// console.log(this.indices);
		// console.log(this.normals);

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();

	}
};