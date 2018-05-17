var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	init(application)
	{
		super.init(application);

		this.initCameras();

		this.luz0 = true;
		this.luz1 = true;
		this.luz2 = true;
		this.luz3 = true;
		this.luz4 = true;

		this.initLights();

		this.enableTextures(true);

		this.gl.clearColor(0.0, 0.5, 1.0, 0.8);
		this.gl.clearDepth(90.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = true;

		this.Axis = new CGFaxis(this);

		this.speed = 3;

		this.length = 5;
		this.axelDistance = 3;
		this.tireDiameter = 1;
		this.width = 2.2;
		this.height = 2;

				//Terrain Altimetry
		
		this.altimetry = [];

		var foobar = 0;
		var sobar;

		for(var j = 0; j < 52; j++){

			 var column = [];

			for(var i = 0; i < 52; i++){
				foobar += (Math.random() - 0.5)/7; // [-0.1, 0.1[

				column.push(foobar);
			}

			this.altimetry.push(column);
		}


	   this.altimetry2= [[ 0 , 0],
						 [ 0 , 0 ]
						 ];

		this.terrain = new MyTerrain(this, 50, 4, 4, this.altimetry);
		this.car = new MyVehicle(this);
		

		this.materialDefault = new CGFappearance(this);

		this.backgroundAppearance = new CGFappearance(this);
		this.backgroundAppearance.loadTexture("../resources/images/sky.jpg");
		this.backgroundAppearance.setAmbient(1, 1, 1, 1);
		this.backgroundAppearance.setDiffuse(1, 1, 1, 1);
		this.backgroundAppearance.setSpecular(1, 1, 1, 1);
		this.backgroundAppearance.setShininess(0);

		// Materials
		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		this.materialA.setSpecular(0,0.2,0.8,1);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0.8,0.8,0.8,1);
		this.materialB.setShininess(120);

		

		this.terrainGrass = new CGFappearance(this);
		this.terrainGrass.loadTexture("../resources/images/grass2.jpg");

		this.terrainSand = new CGFappearance(this);
		this.terrainSand.loadTexture("../resources/images/sand.jpg");

		this.terrainRock = new CGFappearance(this);
		this.terrainRock.loadTexture("../resources/images/rock.jpg");

		this.terrainAppearances = [this.terrainGrass, this.terrainSand, this.terrainRock];

		this.terrainAppearancesList = ['Grass', 'Sand', 'Rock'];
	
		this.currTerrainApperance = 0;
		this.terreno = this.terrainAppearancesList[this.currTerrainApperance];

		this.semisphere = new MySemiSphereReversed(this, 50, 50);

		this.framerate = 60;

		this.setUpdatePeriod(1000/this.framerate);
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
 		this.setGlobalAmbientLight(1, 1, 1, 0);		
	
		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0,1.0,0,1.0);
		this.lights[0].enable(); //Material A

		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)
		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable(); //Material A

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1);
		this.lights[2].setQuadraticAttenuation(0);
		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1, 1, 1, 1);
		this.lights[2].enable(); //Material A

		this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(0.2);
		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0,1.0,0,1.0);
		this.lights[3].enable(); //Material A

		this.lights[4].setConstantAttenuation(0);
		this.lights[4].setLinearAttenuation(0);
		this.lights[4].setQuadraticAttenuation(0.2);
		this.lights[4].setAmbient(0, 0, 0, 1);
		this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setSpecular(1.0,1.0,0,1.0);
		this.lights[4].enable();
		this.lights[4].setPosition(0, 8/2, 15/2, 1.0); // this.scale(15, 8, 0.2);
		this.lights[4].setVisible(true); // show marker on light position (different from enabled)

	};

	updateLights()
	{
		this.enableLights = [this.luz0, this.luz1, this.luz2, this.luz3, this.luz4];

		for (var i = 0; i < this.lights.length; i++)
			if (this.enableLights[i])
				this.lights[i].update();
	}

	update(currTime)
	{
		this.checkKeys();
		this.car.update(currTime, this.length, this.axelDistance, this.tireDiameter, this.width, this.height);
	}

	find(arr, value)
	{
		for (var i = 0; i < arr.lengh; i++)
		{
			if (arr[i] == value)
				return i;
		}

		return -1;
	}

	doSomething(){

		console.log("Doing something...");
	};

	checkKeys()
	{
		var text="Keys pressed:";
		var keysPressed=false;

		if (this.gui.isKeyPressed("KeyW"))
		{
			text+=" W";
			keysPressed=true;
			this.car.setAcceleration(1);

		
		}	
		
		else if (this.gui.isKeyPressed("KeyS"))
		{
			text+=" S";
			keysPressed=true;
			this.car.setAcceleration(-1);
		}

		else this.car.setAcceleration(0);

		if (this.gui.isKeyPressed("KeyA")){

			text+=" A";
			keysPressed=true;
			this.car.setRotSpeed(0.1);
			
		}
		else if (this.gui.isKeyPressed("KeyD"))
		{
			text+=" D";
			keysPressed=true;
			this.car.setRotSpeed(-0.1);
		}
		else
			this.car.setRotSpeed(0);

		if (keysPressed)
			console.log(text);
	};

	display()
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		if (this.axis)
			this.Axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup


		//Terrain
		this.pushMatrix();
			this.scale(50, 50, 50);
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.terrainAppearances[this.find(this.terrainAppearancesList, this.terreno)].apply();
			this.terrain.display();
		this.popMatrix();

		//Car
		this.pushMatrix();
			this.car.display();
		this.popMatrix();

		// //SemiSphere
		 this.pushMatrix();
		 	this.translate(0, -5, 0);
		 	this.scale(50, 50, 50);
		 	this.rotate(-Math.PI/2, 1, 0, 0);
			
		 	this.backgroundAppearance.apply();
		 	this.semisphere.display();
		 this.popMatrix();

		 // //SemiSphere
		 this.pushMatrix();
		 	this.translate(0, -5, 0);
		 	this.scale(50, 50, 50);
		 	this.rotate(Math.PI/2, 1, 0, 0);
			
		 	this.backgroundAppearance.apply();
		 	this.semisphere.display();
		 this.popMatrix();


		//Prism
		this.pushMatrix();
			// this.prism.display();
		this.popMatrix();

		// ---- BEGIN Scene drawing section

		// ---- END Scene drawing section
	};
};
