'use strict';

var util = require('util');

function Domain(connection, url) {
	this.connection = connection;
	this.url = url;
	this.info = null;
};
util.inherits(Domain, Object);

Domain.prototype.toString = function() {
    var self = this;

    return '[object Domain <' + self.url + '>]';
};

module.exports = Domain;