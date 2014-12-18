var version = require("./version")
var nodeType = require("./vnodetype")

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
    this.version = version
    this.type = nodeType.VirtualText
}
