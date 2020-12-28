

function testEllipse(x_tgt, x_upo, y_upo, x_dwno, y_dwno, b, n)
{
	h = x_tgt / 2;
	k = 0;
	test = 0;
	
	test1 = Math.pow(Math.abs(x_upo - h),n) / Math.pow((x_tgt/2),n) + Math.pow(Math.abs(y_upo - k),n) / Math.pow(b,n)
	test2 = Math.pow(Math.abs(x_dwno - h),n) / Math.pow((x_tgt/2),n) + Math.pow(Math.abs(y_dwno - k),n) / Math.pow(b,n)
	
	if(isNaN(test))
	{
		console.log(test);
	}
	
	if(test1 > test2) return test1;
	return test2;	
}

function evaluateArc(x_tgt,b,n)
{
	var old_y = 0;
	var arc = 0;
	for (var j=1; j<=100;j++)
	{
		x = j - 50;
		y = b * Math.pow((1 - Math.pow(Math.abs(x/(x_tgt/2)),n)),(1/n));
		if(j == 1)
		{
			arc = arc + Math.sqrt(y*y + 1) 
		}
		else
		{
			arc = arc + Math.sqrt((y - old_y)*(y - old_y) + 1) 
		}
		old_y = y;
	}	
	return arc;
}


function ellipseParams(x_tgt, x_upo, y_upo, x_dwno, y_dwno)
{
	var best_b = -1;
	var best_n = -1;
	var best_arc = 1000000;
 	var n = 10;
	
    while(true)
        {
            n = n - 0.1;
			var b = y_upo + 10;
            
            while(true)
			{
				b = b - 0.1;
				test = testEllipse(x_tgt, x_upo, y_upo, x_dwno, y_dwno, b, n);
				if(test > 1.001)
				{
					b = b + 0.5;
					break;
				}
				else
				{
					var arc = evaluateArc(x_tgt,b,n);
						if(arc < best_arc)
						{
							best_arc = arc;
							best_b = b;
							best_n = n;							
						}
					
				}
			}
			
			if(n < 1)
			{
				break;				
			}
        }

        
	return [best_b + 0.1,best_n + 0.1];
}

function generateEllipsePoints(x_tgt,b,n)
{
	x = [];
	y = [];
	for (var j=0; j<101; j++){
		// abs( y / b ) ^ 3 = 1 - abs( x / a ) ^ 3
		x[j] = j - 50;
		y[j] = b * Math.pow((1 - Math.pow(Math.abs(x[j]/(x_tgt/2)),n)),(1/n));   
		x[j] = j;
	} 
	
	return {x: x, y: y};
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function moveToOD(Params, Vars, tgt)
{
	await timeout(50);
		if(window.Vars.obstacle == null)
		{
			await driveTo(Params, Vars, tgt);
			return;		
		}
		var cur_x = parseFloat($("#x").val() + "");
		var cur_y = parseFloat($("#y").val() + "");
		var cur_z = parseFloat($("#z").val() + "");
		var cur_rx = parseFloat($("#rx").val() + "");
		var cur_ry = parseFloat($("#ry").val() + "");
		var cur_rz = parseFloat($("#rz").val() + "");
		
		var increment_x = (tgt.tcp.x - cur_x) / 101;
		var increment_y = (tgt.tcp.y - cur_y) / 101;
		var increment_z = (tgt.tcp.z - cur_z) / 101;
		
		var max_z = Vars.obstacle.y_up;
		
		var sf = 100 / window.Vars.obstacle.dist;
		
		var bn = ellipseParams(100, window.Vars.obstacle.x_up * sf, window.Vars.obstacle.y_up, window.Vars.obstacle.x_down * sf, window.Vars.obstacle.y_down);
		
		var points = generateEllipsePoints(100,bn[0],bn[1]);
		
		for(var i=0;i<points.x.length;i++)
		{
			var target = {tcp: {}};
			target.tcp.x = cur_x + (i + 1) * increment_x;
			target.tcp.y = cur_y + (i + 1) * increment_y;

			target.tcp.z = cur_z + points.y[i] + (i + 1) * increment_z;
			//if(target.tcp.z > max_z + 10) target.tcp.z = max_z + 10;
			
			target.tcp.rx = cur_rx;
			target.tcp.ry = cur_ry;
			target.tcp.rz = cur_rz;
			
			await driveTo(Params, Vars, target);
		}
		
		
		

}
