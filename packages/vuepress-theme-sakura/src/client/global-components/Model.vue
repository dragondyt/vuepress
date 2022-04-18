<template>
  <canvas ref="canvas" id="renderCanvas" class="w-full h-full block text-[0]" touch-action="none"></canvas>
</template>

<script setup lang="ts">

import {onMounted} from "vue";
import {
  Engine,
  Scene,
  Color3,
  ArcRotateCamera,
  MeshBuilder,
  SceneLoader,
  Sound,
  StandardMaterial,
  Texture
} from 'babylonjs';

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
function initGround(ground: Mesh) {
  const groundMat = new StandardMaterial("groundMat");
  groundMat.diffuseColor = new Color3(0, 1, 0);
  ground.material = groundMat; //Place the material property of the ground
}

function initRoof(roof: Mesh, scene: Scene) {
  const roofMat = new StandardMaterial("roofMat");
  roofMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
  roof.material = roofMat;
}

function initBox(box: Mesh) {
  //texture
  const boxMat = new StandardMaterial("boxMat");
  boxMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/cubehouse.png")
  box.material = boxMat;
}

onMounted(() => {
  // Get the canvas element from the DOM.
  const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
  // Associate a Babylon Engine to it.
  const engine = new Engine(canvas);
  const scene = new Scene(engine);

  /**** Set camera and light *****/
  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new Vector3(0, 0, 0));
  camera.attachControl(canvas, true);
  SceneLoader.Append("https://www.babylonjs.com/scenes/espilit/",
      "espilit.incremental.babylon", scene, function () {
        scene.activeCamera?.attachControl(canvas, true);
      });
  engine.runRenderLoop(() => {
    scene.render();
  });
})
</script>

<style scoped>

</style>