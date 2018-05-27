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

		//Car Pre-defined Attributes
		this.speed = 1;
		this.length = 5;
		this.axelDistance = 3;
		this.tireDiameter = 1;
		this.width = 2.2;
		this.height = 2;

		//Background Rotation Variable
		this.skyRotation = 0;

		//Terrain Altimetry
		this.altimetry = [
		[0.2, 0.1, 0.3, 0.2, 0.2, 0.1, 0.3, 0.4, 0.3, 0.1, 0.2],
		[0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 0.5, 0.3],
		[0.3, 0.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.4, 0.6],
		[0.4, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.3, 0.5],
		[0.2, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7, 1.0, 1.3],
		[0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.9, 1.2, 1.6],
		[0.3, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.5, 0.7],
		[0.2, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.6, 1.0, 1.2],
		[0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.4, 0.7, 0.9],
		[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.4, 0.6],
		[0.1, 0.0, 0.1, 0.2, 0.3, 0.1, 0.2, 0.2, 0.1, 0.3, 0.5]
		];

	   //Platform Altimetry
	   this.altimetry2= [[ 0.1 , 0.1],[ 0.1 , 0.1 ]];

		//Object Declaration (?)
		this.terrain = new MyTerrain(this, 10, 5, 5, this.altimetry);
		this.car = new MyVehicle(this);
		this.crane = new MyCrane(this, 100, 1);
		this.crane.setCar(this.car);
		this.platform = new MyTerrain(this, 1, 2, 2, this.altimetry2);
		this.semisphere = new MySemiSphereReversed(this, 50, 50);

		//Material Default
		this.materialDefault = new CGFappearance(this);

		//Sky Texture
		this.backgroundAppearance = new CGFappearance(this);
		this.backgroundAppearance.loadTexture("../resources/images/sky.jpg");
		this.backgroundAppearance.setAmbient(1, 1, 1, 1);
		this.backgroundAppearance.setDiffuse(1, 1, 1, 1);
		this.backgroundAppearance.setSpecular(1, 1, 1, 1);
		this.backgroundAppearance.setShininess(0);

		//Terrain Textures
		this.terrainGrass = new CGFappearance(this);
		this.terrainGrass.loadTexture("../resources/images/grass2.jpg");

		this.terrainSand = new CGFappearance(this);
		this.terrainSand.loadTexture("../resources/images/sand.jpg");

		this.terrainRock = new CGFappearance(this);
		this.terrainRock.loadTexture("../resources/images/rock.jpg");
	
		this.currTerrainApperance = 0;
		this.terrainAppearances = [this.terrainGrass, this.terrainSand, this.terrainRock];
		this.terrainAppearancesList = ['Grass', 'Sand', 'Rock'];
		this.terreno = this.terrainAppearancesList[this.currTerrainApperance];

		//Car Textures
		this.whiteCar = new CGFappearance(this);
		this.whiteCar.loadTexture("../resources/images/car.png");

		this.redCar = new CGFappearance(this);
		this.redCar.loadTexture("../resources/images/Redcar.png");

		this.blueCar = new CGFappearance(this);
		this.blueCar.loadTexture("../resources/images/Bluecar.png");

		this.PimpMyRide = new CGFappearance(this);
		this.PimpMyRide.loadTexture("../resources/images/PimpMyRide.png");

		this.currCarAppearance = 0;
		this.carAppearances = [this.blueCar, this.whiteCar, this.redCar, this.PimpMyRide];
		this.carAppearancesList = ['Blue', 'White', 'Red', 'PimpMyRide'];
		this.carro = this.carAppearancesList[this.currCarAppearance];
		
		//Platforms Texture
		this.platAppearance = new  CGFappearance(this);
		this.platAppearance.loadTexture("../resources/images/platform.jpg");

		//Framerate
		this.framerate = 20;
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
		this.lights[0].setVisible(true); 
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0,1.0,0,1.0);
		this.lights[0].enable(); 

		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setVisible(true); 
		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable(); 

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		this.lights[2].setVisible(true); 
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1);
		this.lights[2].setQuadraticAttenuation(0);
		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1, 1, 1, 1);
		this.lights[2].enable();

		this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		this.lights[3].setVisible(true);
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(0.2);
		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0,1.0,0,1.0);
		this.lights[3].enable(); 

		this.lights[4].setConstantAttenuation(0);
		this.lights[4].setLinearAttenuation(0);
		this.lights[4].setQuadraticAttenuation(0.2);
		this.lights[4].setAmbient(0, 0, 0, 1);
		this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setSpecular(1.0,1.0,0,1.0);
		this.lights[4].enable();
		this.lights[4].setPosition(0, 8/2, 15/2, 1.0); 
		this.lights[4].setVisible(true); 

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
		this.skyRotation += 0.0125;
		this.checkKeys();
		this.car.update(currTime, this.length, this.axelDistance, this.tireDiameter, this.width, this.height, this.speed);
		this.crane.update(currTime);
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
		else
			this.car.setAcceleration(0);

		if (this.gui.isKeyPressed("KeyA"))
		{
			text+=" A";
			keysPressed=true;
			this.car.setRotAcceleration(1);

		}
		else if (this.gui.isKeyPressed("KeyD"))
		{
			text+=" D";
			keysPressed=true;
			this.car.setRotAcceleration(-1);
		}
		else
			this.car.setRotAcceleration(0);

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

		//Update Terrain Texture
		this.currTerrainApperance = this.terrainAppearancesList.indexOf(this.terreno);

		//Update Car Texture
		this.car.setAppearance(this.carAppearances[this.currCarAppearance]);
		this.currCarAppearance = this.carAppearancesList.indexOf(this.carro);

		// ---- BEGIN Scene drawing section

		//Terrain
		this.pushMatrix();
		    this.scale(50, 50, 50);
		    this.rotate(-Math.PI/2, 1, 0, 0);
		    this.terrainAppearances[this.currTerrainApperance].apply();
		    this.terrain.display();
		this.popMatrix();

		//Inverted Terrain
		this.pushMatrix();
		    this.scale(50, 50, 50);
		    this.rotate(Math.PI/2, 1, 0, 0);
		    this.terrainAppearances[this.currTerrainApperance].apply();
		    this.platform.display();
		this.popMatrix();

		//Car
		this.pushMatrix();
			if (!this.crane.displayCar)
				 this.car.display();		
		this.popMatrix();

		//SemiSphere
		 this.pushMatrix();
		     this.translate(0, -5, 0);
		     this.scale(50, 50, 50);
		     this.rotate(-Math.PI/2, 1, 0, 0);
		     this.rotate(this.skyRotation,0,0,1);
		     this.backgroundAppearance.apply();
		     this.semisphere.display();
		 this.popMatrix();

		 //Inverted SemiSphere
		 this.pushMatrix();
		     this.translate(0, -5, 0);
		     this.scale(50, 50, 50);
		     this.rotate(Math.PI/2, 1, 0, 0);
		      this.rotate(this.skyRotation,0,0,1);
		     this.backgroundAppearance.apply();
		     this.semisphere.display();
		 this.popMatrix();

		 //Crane
		 this.pushMatrix();
		      this.translate(8,0,0);
		      this.crane.display();
		 this.popMatrix();

		 //smallPlatform
		 this.pushMatrix();
			 this.translate(8,0,-8);
			 this.rotate(-Math.PI/2, 1,0,0);
			 this.scale(7,7,1);
			 this.platAppearance.apply();
			 this.platform.display();
		 this.popMatrix();

		 //bigPlatform
		 this.pushMatrix();
			 this.translate(8, 0, 10);
			 this.rotate(-Math.PI/2, 1,0,0);
			 this.scale(12,12,1);
			 this.platAppearance.apply();
			 this.platform.display();
		 this.popMatrix();

		// ---- END Scene drawing section
	};
};
