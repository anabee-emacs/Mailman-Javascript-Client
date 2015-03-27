'use strict';

var util = require('util'),
    connection = require('./connection'),
    domain = require('./domain');

var Client = function(baseurl, options) {
    this.connection = new connection(baseurl, options);
};
util.inherits(Client, Object);

Client.prototype.getSystem = function(/* {options,} callback */) {
    var self = this;
    var args = Array.prototype.slice.call(arguments);

    return self.connection.call('system/versions', args);
};

Client.prototype.getDomains = function() {
	throw new Error('Not yet implemented');
};

Client.prototype.toString = function() {
    var self = this;

    return '[object Client <' + self.connection + '>]';
};

Client.prototype.getPreferences = function() {
	throw new Error('Not yet implemented');
};

Client.prototype.getQuees = function() {
	throw new Error('Not yet implemented');
};

Client.prototype.getLists = function() {
	throw new Error('Not yet implemented');
};

Client.prototype.getListPage = function() {
	throw new Error('Not yet implemented');
};

Client.prototype.getMembers = function() {
	throw new Error('Not yet implemented');
};

Client.prototype.getDomain = function() {
	var self = this;
    var args = Array.prototype.slice.call(arguments);

    var options = args.shift();
    var mailHost = options['mailHost'] || null;
    var webHost = options['webHost'] || null;

    if (mailHost){
    	return self.connection.call('domains/' + mailHost, [function(err, content){
    		var callback = args.pop();

    		if (typeof callback !== 'function')
		        throw new Error('callback function is required');

		    if (err)
		    	return callback(err, null);

		    return callback(null, new domain(self.connection, content['self_link']));
    	}]);  	
    }
};

Client.prototype.deleteDomain = function() {
	throw new Error('Not yet implemented');
};

Client.prototype.createDomain = function() {
	throw new Error('Not yet implemented');
};

Client.prototype.createUser = function() {
	throw new Error('Not yet implemented');
};

Client.prototype.getUser = function() {
	throw new Error('Not yet implemented');
};

Client.prototype.getAddress = function() {
	throw new Error('Not yet implemented');
};

Client.prototype.getList = function() {
	throw new Error('Not yet implemented');
};

Client.prototype.deleteList = function() {
	throw new Error('Not yet implemented');
};


module.exports = Client;
