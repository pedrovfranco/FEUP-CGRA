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

function millisecondsToDays(ms)
{
	return (ms/24/60/60/1000);
}

function millisecondsToHours(ms)
{
	var seconds = ms/1000;

	var secondsFromMidnight = seconds % (24*60*60);

	return (secondsFromMidnight/60/60 + 1);
}

function millisecondsToMinutes(ms)
{
	var hours = millisecondsToHours(ms);
	return ((hours*60)% 60);
}

function millisecondsToSeconds(ms)
{
	var minutes = millisecondsToMinutes(ms);
	return ((minutes*60)% 60);
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

		this.hourhand = new MyClockHand(scene, 0, 2.3, 0.5, 2.3);
		this.minutehand = new MyClockHand(scene, 0, 1.5, 0.65, 1.5);
		this.secondhand = new MyClockHand(scene, 0, 0.8, 0.75, 0.8);

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

			this.handAppearance.apply();
			this.hourhand.display();

			this.hourhand.setAngle(getHourAngle(this.hour));

		this.scene.popMatrix();

		this.scene.pushMatrix();

			this.minutehand.display();

			this.minutehand.setAngle(getMinuteAngle(this.minute));

		this.scene.popMatrix();

		this.scene.pushMatrix();

			this.secondhand.display();

			this.secondhand.setAngle(getSecondAngle(this.second));

		this.scene.popMatrix();
		
	}

	update(currTime)
	{
		// console.log(currTime);

		// if (this.time == -1)
		// 	this.time = currTime;

		// var deltaTime = (currTime - this.time); //Time elapsed in milliseconds

		// this.second = 45 + deltaTime/1000;


		// this.minute = 30 + this.second/60;
		// this.second = this.second%60;

		// this.hour = 3 + this.minute/60;
		// this.minute = this.minute%60;

		// this.hour = this.hour%12;

		this.hour = millisecondsToHours(currTime);
		this.minute = millisecondsToMinutes(currTime);
		this.second = millisecondsToSeconds(currTime);

		// console.log(this.hour);
		// console.log(this.minute);
		// console.log(this.second);

	}
};

class MyClockHand extends CGFobject
{
	constructor(scene, angle, scaleX, scaleY, scaleZ)
	{
		super(scene);

		this.setAngle(angle);

		this.scaleX = scaleX;
		this.scaleY = scaleY;
		this.scaleZ = scaleZ;

		this.cylinder = new MyCylinderWithBase(scene, 12, 2);
	}

	setAngle(angle)
	{
		this.angle = angle*Math.PI/180;
	}

	display()
	{
		this.scene.pushMatrix();
			
			this.scene.rotate(-this.angle, 0, 0, 1);
			this.scene.scale(this.scaleX, this.scaleY, this.scaleZ);

			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(0.008, 0.008, 1);

			this.cylinder.display();

		this.scene.popMatrix();
	}
};