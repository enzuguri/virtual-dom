var patch = require('../../vdom/patch')
var createElement = require('../../vdom/create-element')

var tStart = 0
var tEnd = 0

function benchmarkRoundTrip(){
	var diff = tEnd - tStart
	console.log("Completed roundtrip in", diff)
}

var rootNode = null;

var worker = new Worker("worker.js")
worker.onmessage = function(e) {
	if(!rootNode) {
		var tree = e.data
		rootNode = createElement(tree)
		document.body.appendChild(rootNode)
	} else {
		var patches = e.data
		rootNode = patch(rootNode, patches)
	}
	tEnd = window.performance.now()
	benchmarkRoundTrip()
}

var count = 0;

setInterval(function () {
	tStart = window.performance.now()
	worker.postMessage(count)
	count++;
}, 1000);
