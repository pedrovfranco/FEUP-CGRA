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

		this.initLights();

		this.enableTextures(true);

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		this.materialDefault = new CGFappearance(this);

		// Scene elements
		this.table = new MyTable(this);

		var scaleX = 2;
		var scaleY = 3;

		this.wall = new MyQuad(this, 0 - (scaleY-1)/2, 1 + (scaleY-1)/2, 0 - (scaleX-1)/2, 1 + (scaleX-1)/2);

		this.floor = new MyQuad(this, 0, 10, 0, 12);

		this.boardA = new Plane(this, BOARD_A_DIVISIONS);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS);

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

		this.floorAppearance = new CGFappearance(this);
		this.floorAppearance.loadTexture("../resources/images/floor.png");

		this.windowAppearance = new CGFappearance(this);
		this.windowAppearance.loadTexture("../resources/images/window.png");
		this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

		this.boardAppearance = new CGFappearance(this);
		this.boardAppearance.loadTexture("../resources/images/board.png");

		this.boardAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.boardAppearance.setDiffuse(0.2, 0.2, 0.2, 1);
		this.boardAppearance.setSpecular(0.5, 0.5, 0.5, 1);
		this.boardAppearance.setShininess(50);

		this.slidesAppearance = new CGFappearance(this);
		this.slidesAppearance.loadTexture("../resources/images/slides.png");

		this.slidesAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.slidesAppearance.setDiffuse(1, 1, 1, 1);
		this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 1);
		this.slidesAppearance.setShininess(10);

		this.clockAppearance = new CGFappearance(this);
		this.clockAppearance.loadTexture("../resources/images/clock.png");

		this.clock = new MyClock(this, 12, 1);
		this.clockhand = new MyClockHand(this, 90);
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
 		this.setGlobalAmbientLight(0, 0, 0, 1.0);

		// Positions for four lights
		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)

		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)
		this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0,1.0,0,1.0);
		this.lights[0].enable(); //Material A

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable(); //Material B


		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1);
		this.lights[2].setQuadraticAttenuation(0);

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1, 1, 1, 1);
		this.lights[2].enable();


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

		this.lights[4].setPosition(0, 8/2, 15/2, 1.0); // this.scale(15, 8, 0.2);
		this.lights[4].setVisible(true); // show marker on light position (different from enabled)

		// this.lights[5].setConstantAttenuation(0);
		// this.lights[5].setLinearAttenuation(0);
		// this.lights[5].setQuadraticAttenuation(0);

		this.lights[5].setAmbient(0, 0, 0, 1);
		this.lights[5].setDiffuse(1.0, 0, 10, 1.0);
		this.lights[5].setSpecular(1.0, 0, 0, 1.0);
		this.lights[5].enable();

		this.lights[5].setPosition(7.5, 6.9, 2);
		this.lights[5].setVisible(true);

	};

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}


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
		this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		// Floor
		this.pushMatrix();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(15, 15, 0.2);
			this.floorAppearance.apply();
			this.floor.display();
		this.popMatrix();


		// Left Wall
		this.pushMatrix();	
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);
			this.windowAppearance.apply();
			this.wall.display();
		this.popMatrix();

		this.materialDefault.apply();

		// Plane Wall
		this.pushMatrix();
			this.translate(7.5, 4, 0);
			this.scale(15, 8, 0.2);
			this.wall.display();
		this.popMatrix();

		// First Table
		this.pushMatrix();
			this.translate(5, 0, 8);
			this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
			this.translate(12, 0, 8);
			this.table.display();
		this.popMatrix();

		// Board A
		this.pushMatrix();
			this.translate(4, 4, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

			this.slidesAppearance.apply();
			this.boardA.display();
		this.popMatrix();

		// Board B
		this.pushMatrix();
			this.translate(11, 4, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

			this.boardAppearance.apply();
			this.boardB.display();
		this.popMatrix();

		// Clock
		this.pushMatrix();
			this.translate(7.5, 6.9, 0);
			this.scale(1, 1, 1/4);

			this.clockAppearance.apply();
			this.clock.display();
		this.popMatrix();

		// // ClockHand
		// this.pushMatrix();
		// 	// this.translate(0.5, 0, 0.5);
		// 	// this.scale(1, 1, 1/4);
		// 	// this.rotate(-90*Math.PI/180, 0, 0, 1);

		// 	this.clockhand.display();
		// this.popMatrix();


		// ---- END Scene drawing section
	};
};
