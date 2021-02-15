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
	
	var arrowHelper = null;
	var box = null;
	
	var xing1 = null;
	var xing2 = null;
	window.rotateObstacle = true;
	
	function lerp(a, b, t) {return a + (b - a) * t}
	function ease(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t}
	
	var t = 0, dt = 0.0002;
	
	function projectObstacle()
	{
		scene.add(obstacle);
		if(box == null)
		{
			var mat = new THREE.MeshLambertMaterial({
				color: 0x5D6D7E,
				emissive: 0x2a2a2a,
				emissiveIntensity: .5,
				side: THREE.DoubleSide
			});
			var geometry = new THREE.BoxGeometry(1, 1, 1);
			obstacle = new THREE.Mesh(geometry, mat);
			/*
			if(plane == "horizontal")
			{
				obstacle.position.set(5,0,1);
			}
			else
			{
				obstacle.position.set(3,3,1);
			}
			*/
			obstacle.scale.set(1.5, 4.5, 2.5);
			scene.add(obstacle);
			box = new THREE.BoxHelper( obstacle, 0xffff00 );
			scene.add( box );						
		}		
		
		var a = {x: 3, y: 3, z: 1}, b = {x: 4.5, y: 0.5, z: 2};
		if(plane == "horizontal")
		{
			a = {x: 5, y: -1, z: 1}; 
			b = {x: 6.5, y: 1, z: 1};			
		}
		
		
		var newX = lerp(a.x, b.x, ease(t));   // interpolate between a and b where
		var newY = lerp(a.y, b.y, ease(t));   // t is first passed through a easing
		var newZ = lerp(a.z, b.z, ease(t));   // function in this example.
		obstacle.position.set(newX, newY, newZ);  // set new position
		
		t += dt;
		
		if (t <= 0 || t >=1) 
		{
			dt = -dt; 
			waitThere = true;			
		}
		
		/*
		if(obstacleCount < 500)
		{
			obstacle.position.set(3,3,1);
		}
		else
		{
			obstacle.position.set(4.5,0.3,1.5);
			if(obstacleCount >= 1000) obstacleCount = 0;
		}
		*/
		obstacle = obstacle.rotateZ(0.0004);
		obstacle = obstacle.rotateY(0.0004);
		obstacle = obstacle.rotateX(0.0004);
		
		box.update(obstacle);
		
		if(Robot.origin == null) return;
		
		var bbox = new THREE.Box3().setFromObject(box);
		
		var origin = new THREE.Vector3(Robot.origin.x / 100, Robot.origin.y / 100, (Robot.origin.z - 80) / 100); 
		var target = new THREE.Vector3(Robot.target.tcp.x / 100, Robot.target.tcp.y / 100, (Robot.target.tcp.z - 80) / 100);
		
		
		var dir = new THREE.Vector3(); // create once an reuse it
		dir = dir.subVectors( target, origin ).normalize();
		
		var dir2 = new THREE.Vector3(); // create once an reuse it
		dir2 = dir2.subVectors( origin, target ).normalize();
		
		
		var ray = new THREE.Ray(origin,dir);
		var ray2 = new THREE.Ray(target,dir2);
		bbox.min.z = -10;
		var intersection = ray.intersectBox(bbox);
		var intersection2 = ray2.intersectBox(bbox);
		//intersection.z +=  0.8;
		//intersection2.z +=  0.8;
		
		if(intersection != null)
		{
			var obst = {};
			if(plane == "vertical")
			{

				var sin_alpha = Math.abs(target.z - origin.z) / origin.distanceTo(target);
				var cos_alpha = Math.sqrt(Math.pow(target.x - origin.x,2) + Math.pow(target.y - origin.y,2)) / origin.distanceTo(target);
				
				obst.x_up = origin.distanceTo(intersection) * 100;
				
				var p = {z: bbox.max.z};
				if(origin.z > target.z) obst.x_up -= 100 * Math.abs(p.z - intersection.z) * sin_alpha;
				
				obst.y_up = cos_alpha * (p.z - intersection.z)  * 100;

				obst.x_down = origin.distanceTo(intersection2)  * 100;
				if(origin.z < target.z) obst.x_down += 100 * Math.abs(p.z - intersection2.z) * sin_alpha;

				obst.y_down = cos_alpha * (p.z - intersection2.z)  * 100;
				
				obst.dist = origin.distanceTo(target) * 100;
				
				//obst.perimeter = intersection.distanceTo(intersection2) * 100 + obst.y_up + obst.y_down + cos_alpha * intersection.distanceTo(intersection2) * 100;
				var i1 = intersection; i1.z = cos_alpha * (p.z - intersection.z);
				var i2 = intersection2; i2.z = cos_alpha * (p.z - intersection2.z);
				
				obst.perimeter = (origin.distanceTo(i1) + i1.distanceTo(i2) + i2.distanceTo(target)) * 100;
				
				//console.log("x_up = " + obst.x_up + " x_down = " + obst.x_down);
				if(obst.x_up < obst.x_down)
				{
					Vars.obstacle = obst;
				}
				else
				{
					alert(obst.x_up + "<" + obst.x_down);
				}
			}
			else // horizontal
			{

				var sin_alpha = Math.abs(target.x - origin.x) / origin.distanceTo(target);
				var cos_alpha = Math.sqrt(Math.pow(origin.distanceTo(target),2) - Math.pow(target.x - origin.x,2)) / origin.distanceTo(target);
				
				obst.x_up = origin.distanceTo(intersection) * 100;
				
				var p = {x: bbox.min.x};
				if(origin.x > target.x) obst.x_up -= 100 * Math.abs(p.x - intersection.x) * sin_alpha;
				
				//obst.y_up = -cos_alpha * (p.x - intersection.x)  * 100;
				obst.y_up = cos_alpha * (intersection.x - p.x) * 100;
				

				obst.x_down = origin.distanceTo(intersection2)  * 100;
				
				if(origin.x < target.x) obst.x_down += 100 * Math.abs(p.x - intersection2.x) * sin_alpha;

				//obst.y_down = -cos_alpha * (p.x - intersection2.x)  * 100;
				
				obst.y_down = cos_alpha * (intersection2.x - p.x) * 100;
				
				obst.dist = origin.distanceTo(target) * 100;
				
				//obst.perimeter = intersection.distanceTo(intersection2) * 100 + obst.y_up + obst.y_down + cos_alpha * intersection.distanceTo(intersection2) * 100;
				var i1 = intersection; i1.x = cos_alpha * (p.x - intersection.x);
				var i2 = intersection2; i2.x = cos_alpha * (p.x - intersection2.x);
				
				obst.perimeter = (origin.distanceTo(i1) + i1.distanceTo(i2) + i2.distanceTo(target)) * 100;
				
				//console.log("x_up = " + obst.x_up + " x_down = " + obst.x_down);
				if(obst.x_up < obst.x_down)
				{
					Vars.obstacle = obst;
				}
				else
				{
					alert(obst.x_up + "<" + obst.x_down);
				}

			}
			
			const material = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
			var geometry = new THREE.SphereGeometry( 0.05, 0.05, 0.05 );
			if(xing1 == null)
			{
				xing1 = new THREE.Mesh( geometry, material );
				xing2 = new THREE.Mesh( geometry, material );
				scene.add( xing1 );
				scene.add( xing2 );
			}
			
			xing1.position.set(intersection.x,intersection.y,p.z);
			xing2.position.set(intersection2.x,intersection2.y,p.z);			
			
			if(arrowHelper != null)
			{
				scene.remove(arrowHelper);
			}
			
			arrowHelper = new THREE.ArrowHelper( dir, origin, obst.dist / 100, 0xc0c0c0 );
			arrowHelper.setLength(obst.dist / 100, 0.4, 0.2);
			scene.add( arrowHelper );
			
		}
		else
		{
			Vars.obstacle = null;						
		}		
	}
	
	var obstacle = null;
	
	function createObjects()
	{
		window.scene = scene;
		var mat = new THREE.MeshLambertMaterial({
				color: 0x73B0F5,
				emissive: 0x2a2a2a,
				emissiveIntensity: .5,
				side: THREE.DoubleSide
		});
		
		
		var geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
		var cube = new THREE.Mesh(geometry, mat);

		
		cube.position.set(-3,-7,-1.6);
		
		geometry = new THREE.BoxGeometry(1, 1, 1);
		var cube2 = new THREE.Mesh(geometry, mat);
		
		cube2.position.set(0,0,1.3);
		cube.add( cube2 );	
		
		scene.add(cube);
		sceneObjects.push({o:cube,d:2.7});
		
		
		
		//moveObjects();
		moveObjects();
	}
	
	
	function moveObjects()
	{
		projectObstacle();
		
		for(var i=0;i<sceneObjects.length;i++)
		{
			var obj = sceneObjects[i];
			
			var cond = (Math.abs(obj.o.position.x - Robot.tcp.x / 100) < 0.2 && Math.abs(obj.o.position.y - Robot.tcp.y / 100) < 0.2 && (Robot.tcp.z / 100) - obj.o.position.z < obj.d);
			
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
			Vars.cubelet = {x: obj.o.position.x * 100, y: obj.o.position.y * 100, z: obj.o.position.z * 100};
		}			
		
		setTimeout(moveObjects,10);
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
