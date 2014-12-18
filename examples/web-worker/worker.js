var h = require('../../virtual-hyperscript/index')
var diff = require('../../vtree/diff')

function render(count) {
	return h('div', {
		style: {
			textAlign: 'center',
			verticalAlign: 'center',
			lineHeight: (100 + count) + 'px',
			border: '1px solid red',
			width: (100 + count) + 'px',
			height: (100 + count) + 'px'
		}
	}, [String(count)])
}

var tree = null

self.onmessage = function(e) {
	var count = e.data

	if(!tree){
		tree = render(count)
		self.postMessage(tree)
	} else {
		var newTree = render(count)
		var patches = diff(tree, newTree)
		tree = newTree;
		self.postMessage(patches)
	}
}
