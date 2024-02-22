/* Lecture 12
 * CSCI 4611, Spring 2024, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class App extends gfx.GfxApp
{
    private cameraControls: gfx.OrbitControls;

    private cylinder: gfx.Mesh3;

    // --- Create the App class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();

        this.cameraControls = new gfx.OrbitControls(this.camera);
        this.cylinder = new gfx.Mesh3();
    }


    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        // Setup camera
        this.camera.setPerspectiveCamera(60, 1920/1080, 0.1, 10);

        this.cameraControls.setDistance(3);
        this.cameraControls.setOrbit(gfx.MathUtils.degreesToRadians(-22.5), 0);
        const axes = gfx.Geometry3Factory.createAxes();
        this.scene.add(axes);

        // Create an ambient light
        const ambientLight = new gfx.AmbientLight(new gfx.Color(0.25, 0.25, 0.25));
        this.scene.add(ambientLight);

        // Create a directional light
        const directionalLight = new gfx.DirectionalLight(new gfx.Color(0.5, 0.5, 0.5));
        directionalLight.position.set(-2, 1, 0)
        this.scene.add(directionalLight);

        this.createCylinderMesh(this.cylinder, 20, 2);
        //this.cylinder.material = new gfx.WireframeMaterial();
        this.scene.add(this.cylinder);
    }

    
    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        this.cameraControls.update(deltaTime);
    }

    createCylinderMesh(mesh: gfx.Mesh3, numSegments: number, height: number)
    {
        const vertices: gfx.Vector3[] = [];
        const normals: gfx.Vector3[] = [];
        const indices: number[] = [];

        const angleIncrement = (Math.PI * 2) / numSegments;

        for(let i=0; i <= numSegments; i++)
        {
            const angle = i * angleIncrement;

            // Create two vertices that make up each column
            vertices.push(new gfx.Vector3(Math.cos(angle), height/2, Math.sin(angle)));
            vertices.push(new gfx.Vector3(Math.cos(angle), -height/2, Math.sin(angle)));
        
            // Create two normals that make up each column
            normals.push(new gfx.Vector3(Math.cos(angle), 0, Math.sin(angle)));
            normals.push(new gfx.Vector3(Math.cos(angle), 0, Math.sin(angle)));
        }

        for(let i=0; i < numSegments; i++)
        {
            indices.push(i*2, i*2+2, i*2+1);
            indices.push(i*2+1, i*2+2, i*2+3);
        }

        mesh.setVertices(vertices);
        mesh.setNormals(normals);
        mesh.setIndices(indices);
    }
}