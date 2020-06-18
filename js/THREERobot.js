const THREERobot = function (V_initial, limits, scene) {
  this.THREE = new THREE.Group()

  this.robotBones = []
  this.joints = []

  const scope = this

  let parentObject = this.THREE
  // parentObject.rotation.x = Math.PI / 2

  // let colors = [
  //     0x05668D,
  //     0x028090,
  //     0x00A896,
  //     0x02C39A,
  //     0xF0F3BD,
  //     0x0
  // ]
  const colors = [
    0xaaaaaa,
    0xbbbbbb,
    0xbcbcbc,
    0xcbcbcb,
    0xcccccc,
    0x0,
  ]
  
  
  /*
  const colors = [
    0x73B0F5,
    0x5C8DC5,
    0x48709D,
    0x3C5E83,
    0x304B69,
    0x0,
  ]
  */
	var sceneObjects = [];
	function createObjects()
	{
		
		var mat = new THREE.MeshBasicMaterial({color: 0x73B0F5});
		var geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
		var cube = new THREE.Mesh(geometry, mat);
		cube.position.set(3,3,-1.6);
		
		geometry = new THREE.BoxGeometry(1, 1, 1);
		var cube2 = new THREE.Mesh(geometry, mat);
		
		cube2.position.set(0,0,1.3);
		cube.add( cube2 );		
		
		scene.add(cube);
		sceneObjects.push({o:cube,d:2.7});
	}
	
	function moveObjects()
	{
		for(var i=0;i<sceneObjects.length;i++)
		{
			var obj = sceneObjects[i];
			
			var cond = (obj.o.position.x == Robot.tcp.x / 100 && obj.o.position.y == Robot.tcp.y / 100 && (Robot.tcp.z / 100) - obj.o.position.z < obj.d);
			
			if(ATTACH && cond)
			{
				
				obj.o.position.set(Robot.tcp.x / 100,Robot.tcp.y / 100,Robot.tcp.z / 100);
				
				obj.o.rotation.set(Robot.tcp.rx * dtr,Robot.tcp.ry * dtr,Robot.tcp.rz * dtr);
				
				var dtr = 0.0174533;
				
			}
			else
			{
				obj.o.rotation.set(0,0,0);
				obj.o.position.setZ(-1.6);	
			}
		}			
	}

  function createCube(x, y, z, w, h, d, min, max, jointNumber) {
    
	const thicken = 1

    const w_thickened = Math.abs(w) + thicken
    const h_thickened = Math.abs(h) + thicken
    const d_thickened = Math.abs(d) + thicken

    const material = new THREE.MeshLambertMaterial({
      color: colors[jointNumber],
    })
	// BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
	//CylinderGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
	
	//var texture = new THREE.TextureLoader().load( 'img/task.png' );
	//const material = new THREE.MeshBasicMaterial( { map: texture } );
	
    const geometry = new THREE.BoxGeometry(w_thickened, h_thickened, d_thickened)
	
	
	  
	  
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.set(w / 2, h / 2, d / 2)
    const group = new THREE.Object3D()
    group.position.set(x, y, z)
    group.add(mesh)
	
	
	  const geometr = new THREE.BoxGeometry(3, 3, 3);
	  const loader = new THREE.TextureLoader();
	  texture = loader.load('img/logo.png');
	  texture.anisotropy = 5000;
	  const mater = new THREE.MeshBasicMaterial({
		map: texture,
	  });
	  
	  const cube = new THREE.Mesh(geometr, mater);
	  cube.rotation.x += Math.PI / 2;
	  
	  cube.position.set(-7,5,7)
	  scene.add(cube);
	  
	  
	  createObjects();
	  setInterval(moveObjects,100);

	
	

    console.log(min, max)
    // min = min / 180 * Math.PI
    // max = max / 180 * Math.PI

    const jointGeo1 = new THREE.CylinderGeometry(0.8, 0.8, 0.8 * 2, 32, 32, false, -min, 2 * Math.PI - max + min)
    const jointGeoMax = new THREE.CylinderGeometry(0.8, 0.8, 0.8 * 2, 32, 32, false, -max, max)
    const jointGeoMin = new THREE.CylinderGeometry(0.8, 0.8, 0.8 * 2, 32, 32, false, 0, -min)
    const jointMesh1 = new THREE.Mesh(jointGeo1, new THREE.MeshBasicMaterial({
      color: 0xffbb00,
    }))
    const jointMeshMax = new THREE.Mesh(jointGeoMax, new THREE.MeshBasicMaterial({
      color: 0x009900,
    }))
    const jointMeshMin = new THREE.Mesh(jointGeoMin, new THREE.MeshBasicMaterial({
      color: 0xdd2200,
    }))

    const joint = new THREE.Group()
    // joint.add(jointMesh1, jointMesh2)
    joint.add(jointMeshMax, jointMeshMin, jointMesh1)

    scope.joints.push(joint)

    switch (jointNumber) {
      case 0:
        joint.rotation.x = Math.PI / 2
        break
      case 1:
        // joint.rotation.x = Math.PI / 2
        break
      case 2:
        // joint.rotation.x = Math.PI / 2
        break
      case 3:
        joint.rotation.z = Math.PI / 2
        // joint.rotation.y = Math.PI
        break
      case 4:
        // joint.rotation.x = Math.PI / 2
        joint.rotation.y = Math.PI / 2
        break
      case 5:
        joint.rotation.x = Math.PI / 2
        group.rotation.y = Math.PI / 2
        // group.rotation.z = Math.PI
        // group.rotation.z = -Math.PI / 2
        // group.rotation.y += Math.PI
        // joint.rotation.z = +Math.PI / 2
        // const axisHelper = new THREE.AxisHelper(3)
        // axisHelper.rotation.x = Math.PI
        // group.add(axisHelper)
        const arrowZ = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 3, 0x0000ff)
        arrowZ.line.material.linewidth = 4
        group.add(arrowZ)
        const arrowY = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 3, 0x00ff00)
        arrowY.line.material.linewidth = 4
        group.add(arrowY)
        const arrowX = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 3, 0xff0000)
        arrowX.line.material.linewidth = 4
        group.add(arrowX)
        // joint.add(getVectorArrow([0,0,0],[0,0,5]))
        break
    }

    group.add(joint)
    return group
  }

  let x = 0,
    y = 0,
    z = 0
  V_initial.push([0, 0, 0]) // add a 6th pseudo link for 6 axis
  for (let i = 0; i < V_initial.length; i++) {
    const link = V_initial[i]

    const linkGeo = createCube(x, y, z, link[0], link[1], link[2], limits[i][0], limits[i][1], i)
    x = link[0]
    y = link[1]
    z = link[2]
    console.log(link[0], link[1], link[2])
    parentObject.add(linkGeo)
    parentObject = linkGeo
    this.robotBones.push(linkGeo)
  }

  scene.add(this.THREE)
  

  this.angles = [0, 0, 0, 0, 0, 0]
}

THREERobot.prototype = {
  setAngles(angles) {
    this.angles = angles
    this.robotBones[0].rotation.z = angles[0]
    this.robotBones[1].rotation.y = angles[1]
    this.robotBones[2].rotation.y = angles[2]
    this.robotBones[3].rotation.x = angles[3]
    this.robotBones[4].rotation.y = angles[4]
    this.robotBones[5].rotation.z = angles[5]
  },

  setAngle(index, angle) {
    this.angles[index] = angle
    this.setAngles(this.angles)
  },

  highlightJoint(jointIndex, hexColor) {
    if (jointIndex >= this.joints.length) {
      console.warn(`cannot highlight joint: ${jointIndex} (out of index: ${this.joints.length})`)
    }
    if (hexColor) {
      this._colorObjectAndChildren(this.joints[jointIndex], hexColor)
    } else {
      this._resetObjectAndChildrenColor(this.joints[jointIndex])
    }
  },

  _colorObjectAndChildren(object, hexColor) {
    const scope = this
    object.traverse((node) => {
      scope._colorObject(node, hexColor)
    })
  },

  _colorObject(object, hexColor) {
    if (object.material) {
      if (!object.initalMaterial) {
        object.initalMaterial = object.material
      }
      object.material = object.material.clone()
      object.material.color.setHex(hexColor)
    }
  },

  _resetObjectAndChildrenColor(object, hexColor) {
    const scope = this
    object.traverse((node) => {
      scope._resetObjectColor(node)
    })
  },

  _resetObjectColor(object) {
    if (object.initalMaterial) {
      object.material = object.initalMaterial
    }
  },

}
