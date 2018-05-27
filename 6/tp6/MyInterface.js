 class MyInterface extends CGFinterface {


	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	}
	
	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) {
		// call CGFinterface init
		super.init(application);

		this.gui = new dat.GUI();

		//Speed Variation
		this.gui.add(this.scene, 'speed', 0, 3);

		//Axis Visibility
		this.gui.add(this.scene, 'axis');

		//Car Attributes Folder
		var car = this.gui.addFolder("Carro");
		car.open();

		car.add(this.scene, 'length', 4, 5);
		car.add(this.scene, 'axelDistance', 2, 3.5);
		car.add(this.scene, 'tireDiameter', 0.7, 1.1);
		car.add(this.scene, 'width', 1.8, 2.5);
		car.add(this.scene, 'height', 1.2, 2.0);

		//Lights Folder
		var luzes = this.gui.addFolder("Luzes");
		luzes.open();

		luzes.add(this.scene, 'luz0');
		luzes.add(this.scene, 'luz1');
		luzes.add(this.scene, 'luz2');
		luzes.add(this.scene, 'luz3');
		luzes.add(this.scene, 'luz4');

		//Textures Folder
		var tex = this.gui.addFolder("Texturas");
		tex.open();

		tex.add(this.scene, 'terreno', this.scene.terrainAppearancesList);
		tex.add(this.scene, 'carro', this.scene.carAppearancesList);
		
		this.initKeys();
		return true;
	};

	/**
	 * processKeyboard
	 * @param event {Event}
	 */
	initKeys()
	{
		this.scene.gui=this;
		this.processKeyboard=function(){};
		this.activeKeys={};
	}


	processKeyDown(event)
	{
		this.activeKeys[event.code]=true;
	};

	processKeyUp(event)
	{
		this.activeKeys[event.code]=false;
	};

	isKeyPressed(keyCode)
	{
		return this.activeKeys[keyCode] || false;
	}
};

