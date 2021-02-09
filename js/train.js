function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var th_x_up = 0; //0.25;
var th_x_down = 1; //0.65;
var th_y = 1; //0.4;
var tol = 0.05;

function filter(tdata)
{
	var result = [];
	$.each(tdata, function (i, e) {
		var matchingItems = $.grep(result, function (item) {
		   
		   return (e.input[0] < th_x_up - tol) || (e.input[2] > th_x_down + tol) || (e.input[1] > th_y + 2*tol) || (e.input[3] > th_y + 2*tol);
		});
		if (matchingItems.length === 0){
			result.push(e);
		}
	});
	return result;
}

function removeDuplicates(tdata)
{
	var result = [];
	$.each(tdata, function (i, e) {
		var matchingItems = $.grep(result, function (item) {
		   var th = 0.003;
		   return Math.abs(item.input[0] - e.input[0]) < th && Math.abs(item.input[1] - e.input[1]) < th && Math.abs(item.input[2] - e.input[2]) < th && Math.abs(item.input[3] - e.input[3]) < th;
		});
		if (matchingItems.length === 0){
			result.push(e);
		}
	});
	return result;
}

function sample(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

var eval_results = [];

function storeResults()
{
	var r = {	"failure": (100 * bad_cnt / (good_cnt+bad_cnt)),
				"good":good_cnt, 
				"bad": bad_cnt, 
				"rmse_b": Math.sqrt(rmse_b / bad_cnt), 
				"rmse_n": Math.sqrt(rmse_n / bad_cnt), 
				"path": (total_path / (good_cnt + bad_cnt)), 
				"smooth": (smoothness / (good_cnt + bad_cnt)),
				"time": (total_time / (good_cnt + bad_cnt))
				};
	r["th_x_up"] = th_x_up;
	r["th_x_down"] = th_x_down;
	r["th_y"] = th_y;
	r["udata"] = udata.length;
	r["ndata"] = ndata.length;
	eval_results.push(r);
}

var udata = [];
var old_ndata_length = -1;
function train()
{
	if(ndata.length == old_ndata_length) return;
	
	if(udata.length == 0)
	{
		tdata = JSON.stringify(tdata);
		tdata = tdata.replaceAll('[\"','[');
		tdata = tdata.replaceAll('\",\"',',');
		tdata = tdata.replaceAll('\"]',']');
		tdata = JSON.parse(tdata);
		udata = tdata.slice(0,10000);
		udata = filter(udata);
	}
	
	if(ndata.length > 0)
	{
		ndata = removeDuplicates(ndata);
		for(var i=0;i<ndata.length;i++)
		{
			if(ndata[i].input[0] < th_x_up) th_x_up = ndata[i].input[0];
			if(ndata[i].input[2] > th_x_down) th_x_down = ndata[i].input[2];
			if(ndata[i].input[1] > th_y) th_y = ndata[i].input[1];
			if(ndata[i].input[3] > th_y) th_y = ndata[i].input[3];
		}		
		udata = tdata.slice(0,10000);
		udata = filter(udata);
	}
	
	old_ndata_length = ndata.length;
	console.log("udata: " + udata.length);
	
	udata = udata.concat(ndata);
	udata = removeDuplicates(udata);
	
	console.log("udata + ndata: " + udata.length);
	
	shuffle(udata);
	shuffle(udata);
	shuffle(udata);
	
	const config = {
	  learningRate: 0.1,
	  hiddenLayers: [32,32,32,32,16],
	  activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
	};

	const crossValidate = new brain.CrossValidate(brain.NeuralNetwork, config, k=3);
	const stats = crossValidate.train(udata, { log: true, iterations:5000, errorThresh: 0.0006, logPeriod: 100 }, k=3);
	console.log(stats);
	const net = crossValidate.toNeuralNetwork();

	//net.train(tdata,  { log: true, iterations:10000, errorThresh: 0.0001, logPeriod: 100 });

	function dn(x)
	{
		y = x * (MM - mm) + mm;
		return Math.round(y);
	}

	err_0 = 0;
	err_1 = 0;
	tests = 0;

	var d = new Date();
	console.log(d.getTime());
	
	for(var i=0; i< udata.length; i++)
	{

		o = net.run(udata[i].input);
		err_0 += Math.abs(udata[i].output[0] - o[0]) / udata.length;
		err_1 += Math.abs(udata[i].output[1] - o[1]) / udata.length;
		
		var test = testEllipse(100,dn(udata[i].input[0]),dn(udata[i].input[1]),dn(udata[i].input[2]),dn(udata[i].input[3]),dn(o[0]),dn(o[1]));
		if(test <= 1) tests++;
		
	}
	d = new Date();
	console.log(d.getTime());

	console.log(err_0); console.log(err_1); console.log(tests);
	
	var json = net.toJSON();
	models.push(jnn);
	jnn = JSON.stringify(json);
	
}


var models = [];