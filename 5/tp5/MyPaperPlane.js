/**
 * MyPaperPlane
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


class MyWing extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.initBuffers();
	}

	initBuffers()
	{
		this.vertices = [
			0, 0, 0,
			1, 0, 0,
			0, 1, 0,
			-1, 0, 0,
		];

		this.indices = [
			0,1,2,
			3,0,2
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}


class MyPaperPlane extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.plane = new Plane(scene, 1);

		this.wing = new MyWing(scene);

		this.time = -1;
		this.elapsed = 0;

		this.hitY = -1;
		this.hitZ = -1;
		this.hitMoment = -1;

	}

	display()
	{
		var angle = Math.PI/20;

		if (5*Math.pow(this.elapsed/1000, 0.8) < 12)
		{
			this.scene.translate(0, 5*Math.pow(this.elapsed/1000, 0.8)*Math.tan(angle), 5*Math.pow(this.elapsed/1000, 0.8));
			this.scene.rotate(-angle, 1, 0, 0);
		}
		else
		{
			if (this.hitMoment == -1)
			{
				this.hitY = 5*Math.pow(this.elapsed/1000, 0.8)*Math.tan(angle);
				this.hitZ = 5*Math.pow(this.elapsed/1000, 0.8);
				this.hitMoment = this.elapsed;
			}

			if (this.hitY - Math.pow((this.elapsed - this.hitMoment)/1000, 2)*4 > -6)
			{
				this.scene.translate(0, this.hitY - Math.pow((this.elapsed - this.hitMoment)/1000, 2)*3.3, this.hitZ + (this.elapsed - this.hitMoment)/1000/4);
				this.scene.rotate(-angle + Math.atan(-3*(this.elapsed - this.hitMoment)/1000), 1, 0, 0);
			}
			else
			{
				this.scene.translate(0, -3.9, this.hitZ-1);
			}
		}
		

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 1, 0, 0);
			this.scene.rotate(-Math.PI, 0, 1, 0);
			this.scene.scale(0.37, 1, 1);

			this.wing.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0, 0, 1);
			this.scene.rotate(Math.PI/2, 1, 0, 0);
			this.scene.rotate(-Math.PI, 0, 1, 0);
			this.scene.scale(0.37, 1, 1);

			this.wing.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 1, 0, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.1, 1, 1);
			this.scene.translate(-0.5, 0.5, 0);

			this.plane.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 1, 0, 0);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.scene.scale(0.1, 1, 1);
			this.scene.translate(0.5, 0.5, 0);

			this.plane.display();

		this.scene.popMatrix();
	}

	update(currTime)
	{
		// console.log(currTime);

		if (this.time == -1)
			this.time = currTime;

		this.elapsed = (currTime - this.time); //Time elapsed in milliseconds

		this.second = 45 + this.elapsed/1000;


		this.minute = 30 + this.second/60;
		this.second = this.second%60;

		this.hour = 3 + this.minute/60;
		this.minute = this.minute%60;

		this.hour = this.hour%12;

	}
};
