import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer, Pass } from 'three/examples/jsm/postprocessing/EffectComposer.js';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { BleachBypassShader } from 'three/examples/jsm/shaders/BleachBypassShader.js';
import { ColorCorrectionShader } from 'three/examples/jsm/shaders/ColorCorrectionShader.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

export default class Create3D  {

    composer: EffectComposer
    effectFXAA: ShaderPass
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    camera: THREE.PerspectiveCamera
    control: OrbitControls

    constructor(scene: THREE.Scene,renderer: THREE.WebGLRenderer,camera: THREE.PerspectiveCamera,control:OrbitControls) {
        this.scene = scene;
        this.renderer = renderer
        this.camera = camera;
        this.control = control;
        this.composer = new EffectComposer(this.renderer);
        this.effectFXAA = new ShaderPass(FXAAShader);
    }


    setControl() {
        this.control.minDistance = 0;
        this.control.maxDistance = 200;
        this.control.enableDamping = true;
    }

    generateMaterial(lightPosition: THREE.Vector3, lightColor: String, lightIntensity: String, translucencyColor: String) {
        
        var Uniforms = {
            u_lightPos: {
              type: 'v3',
              value: lightPosition,
            },
        };
        
      
          var Material = new THREE.ShaderMaterial({
            uniforms: Uniforms,
            fragmentShader: `
              varying vec3 v_fragmentPos;
              varying vec3 v_normal;
              uniform vec3 u_lightPos;
              void main(void)
              {
                  vec3 _LightColor0 = vec3(${ lightColor });;  
                  float _LightIntensity0 = ${ lightIntensity };
                  vec3 translucencyColor = vec3(${translucencyColor });;
                  vec3 toLightVector = u_lightPos - v_fragmentPos;
                  float lightDistanceSQ = dot(toLightVector, toLightVector);
                  vec3 lightDir = normalize(toLightVector);
                  float ndotl = max(0.0, dot(v_normal, lightDir));
                  float inversendotl = step(0.0, dot(v_normal, -lightDir));
                  vec3 lightColor = _LightColor0.rgb * ndotl / lightDistanceSQ * _LightIntensity0; 
                  vec3 subsurfacecolor = translucencyColor.rgb * inversendotl / lightDistanceSQ * _LightIntensity0;
                  vec3 final = subsurfacecolor + lightColor;
                  gl_FragColor=vec4(final,1.0);
              }`,
            vertexShader: `
              varying vec3 v_fragmentPos;
              varying vec3 v_normal;
                          
              void main()
              {
                  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                  v_fragmentPos =  (modelMatrix * vec4( position, 1.0 )).xyz;
                  v_normal =  (modelMatrix * vec4( normal, 0.0 )).xyz;
                  gl_Position = projectionMatrix * mvPosition;
              }
            `
          });
          return Material;
    }

    load(path: string){
        const loader = new THREE.ObjectLoader();
        return loader.load(
            path,
            (obj) => {               
            var round1 = obj.getObjectByName("001");
            if (round1 instanceof THREE.Mesh) {
                var lightPosition = new THREE.Vector3(-0.6, 1.5, 0.60);
                    
                round1.material = this.generateMaterial(
                    lightPosition,
                    '0.25,0.88,0.50',
                    '1.2',
                    '0.11,0.80,0.44' 
                );
                }
                
                var round2 = obj.getObjectByName("004");
                if (round2 instanceof THREE.Mesh) {
                    var lightPosition = new THREE.Vector3(-0.6, 1.5, 0.60);
                    round2.material = this.generateMaterial(
                        lightPosition,
                        '0.25,0.88,0.50',
                        '1.2',
                        '0.11,0.80,0.44' 
                    );
                }
                var folder = obj.getObjectByName("002");
                if (folder instanceof THREE.Mesh) {
                    var lightPosition = new THREE.Vector3(0.8, 1.15, 0.60);
                    folder.material = this.generateMaterial(
                        lightPosition,
                        '1.00,0.37,0.09',
                        '1.2',
                        '1.00,0.37,0.09' 
                    );
                }

                var paper = obj.getObjectByName("005");
                if (paper instanceof THREE.Mesh) {
                    var lightPosition = new THREE.Vector3(0.8, 1.15, 0.60);
                    paper.material = this.generateMaterial(
                        lightPosition,
                        '1.00,1.00,1.00',
                        '1.2',
                        '1.00,1.00,1.00' 
                    );
                }
                
                var cube = obj.getObjectByName("003");
                if (cube instanceof THREE.Mesh) {
                    var lightPosition = new THREE.Vector3(0.4, 0.4, 0.2);
                        
                    cube.material = this.generateMaterial(
                        lightPosition,
                        '1.0, 0.5, 0.5',
                        '1.5',
                        '1.0,0.47,0.46' 
                    );
                }
                
                this.scene.add(obj);
            },
          (err) => {
          }
        );
    }

    createComposer() {
        this.renderer.autoClear = false;

        const renderModel = new RenderPass(this.scene, this.camera);
        const effectBleach = new ShaderPass(BleachBypassShader);
        const effectColor = new ShaderPass(ColorCorrectionShader);
        const gammaCorrection = new ShaderPass(GammaCorrectionShader);

        this.effectFXAA.uniforms["resolution"].value.set(1 / window.innerWidth, 1 / window.innerHeight);

        effectBleach.uniforms["opacity"].value = 0.2;
        effectColor.uniforms["powRGB"].value.set(1.4, 1.45, 1.45);
        effectColor.uniforms["mulRGB"].value.set(1.1, 1.1, 1.1);

        this.composer.addPass(renderModel);
        this.composer.addPass(this.effectFXAA);
        this.composer.addPass(effectBleach);
        this.composer.addPass(effectColor);
        this.composer.addPass(gammaCorrection);
    }
    
    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
        this.composer.setSize(width, height);

        this.effectFXAA.uniforms.resolution.value.set(1 / width, 1 / height);
    }

    responsiveResize(size:number[]){

        this.camera.aspect = size[0] / size[1];
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(size[0], size[1]);
        this.composer.setSize(size[0], size[1]);

        // this.effectFXAA.uniforms.resolution.value.set(1 / size[0], 1 / size[1]);
    }

}