class TPscene extends CGFscene
{
    constructor()
    {
        super();
    }


    init(application) 
    {
        super.init(application);

        this.initCameras();

        this.initLights();


        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis=new CGFaxis(this);
        this.table = new MyTable(this);
        this.floor = new MyFloor(this);

    };

    initLights() 
    {

        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
        this.lights[0].enable();
        this.lights[0].update();
    
    };

    initCameras() 
    {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    };

    setDefaultAppearance() 
    {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.0, 0.8, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);	
    };

    display() 
    {
        // ---- BEGIN Background, camera and axis setup
        
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        this.setDefaultAppearance();

        this.pushMatrix();

        this.translate(4,0,3);

        this.table.display();

        this.popMatrix();

        
        this.pushMatrix();

        this.translate(4,0,3);

        this.floor.display();

        this.popMatrix();
     

   
    };

};
