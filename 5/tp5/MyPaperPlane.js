/**
 * MyPaperPlane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


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
		this.elapsed = 0; //Time elapsed in milliseconds

		this.hitY = -1;
		this.hitZ = -1;
		this.hitAngle = -1;
		this.hitMoment = -1;

		this.hitMoment2 = -1;

		this.hitMoment3 = -1;

	}

	display()
	{
		var t = this.elapsed/1000;
		var x = 0;
		var z = Math.pow(t,2)*Math.pow(Math.log(t+2), 2)/2;
		var y = Math.pow(z, 2)/70;
		var angle = -Math.atan(2*z/70);


		if (z < 11.8)
		{
			this.scene.translate(x, y, z);
			this.scene.rotate(angle, 1, 0, 0);
		}
		else
		{
			if (this.hitMoment == -1)
			{
				this.hitY = y;
				this.hitZ = z;
				this.hitAngle = angle;
				this.hitMoment = this.elapsed;
			}

			t = (this.elapsed - this.hitMoment)/1000;
			x = 0;
			y = this.hitY - Math.pow(t, 2)*4.9;
			z = this.hitZ + t/4;
			angle = this.hitAngle + Math.atan(-3*t);

			if (y > -3.8)
			{
				this.scene.translate(x, y, z);
				this.scene.rotate(angle, 1, 0, 0);
			}
			else
			{
				if (this.hitMoment2 == -1)
				{
					this.hitY = y;
					this.hitZ = z;
					this.hitAngle = angle;
					this.hitMoment2 = this.elapsed;
				}

				t = (this.elapsed - this.hitMoment2)/1000;
				x = 0;
				z = this.hitZ;
				angle = this.hitAngle - 3*Math.pow(t,2) ;
				y = this.hitY - 0.04*Math.cos(angle);

				if (angle > -Math.PI)
				{
					this.scene.translate(x, y, z);
					this.scene.rotate(angle, 1, 0, 0);
				}
				else
				{
					if (this.hitMoment3 == -1)
					{
						this.hitY = y;
						this.hitZ = z;
						this.hitAngle = angle;
						this.hitMoment3 = this.elapsed;
					}

					t = (this.elapsed - this.hitMoment3)/1000;
					x = 0;
					y = -3.8759;
					z = 12.1459;
					angle = -Math.PI;

					this.scene.translate(x, y, z);
					this.scene.rotate(angle, 1, 0, 0);
				}
				
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
		if (this.time == -1)
			this.time = currTime;

		this.elapsed = (currTime - this.time); //Time elapsed in milliseconds
	}
};
