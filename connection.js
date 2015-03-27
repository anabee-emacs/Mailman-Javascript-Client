'use strict';

var util = require('util');

function Connection(baseurl, options) {
    if (typeof baseurl === 'undefined')
        throw new Error('The base url to access the Mailman 3 REST API is required');

    if (baseurl.slice(-1) != '/')
            baseurl += '/';

    var baseurlsplit = baseurl.match(':([0-9]+).*?(/.*)$');
    this.baseurl = baseurl.replace('http://', '').replace(baseurlsplit[0], '');
    this.port = baseurlsplit[1];
    this.basepath = baseurlsplit[2];

    var options = options || {};
    this.username = options.username || null;
    this.password = options.password || null;

    if (this.username && !this.password)
        throw new TypeError('`options.password` is required when `options.username` is given');
    if (!this.username && this.password)
        throw new TypeError('`options.username` is required when `options.password` is given');
    if (!this.username)
        this.basic_auth = null;
    else
        this.basic_auth = new Buffer(this.username + ':' + this.password).toString('base64');
};

Connection.prototype.call = function call(path, args) {
    var self = this;
    
    if (typeof path === 'undefined')
        throw new Error('path is required');

    var headers = {'User-Agent': 'GNU Mailman REST client v1.0.0b1'};

    var args = args || {};
    var callback = args.pop();
    if (typeof callback !== 'function')
        throw new Error('callback function is required');
    var data = args.data || null;
    var dataArr = [];
    var encodedData = '';
    var method = args.method || null;

    if (data) {
        Object.keys(data).forEach(function(key) {
            dataArr.push(key + '=' + data[key]);
        });
        encodedData = dataArr.join('&');
        headers['Content-type'] = 'application/x-www-form-urlencoded';
    }
    
    if (!method) {
        if (!data)
            method = 'GET';
        else
            method = 'POST';
    }

    method = method.toUpperCase();

    if (self.basic_auth)
        headers['Authorization'] = 'Basic ' + self.basic_auth;

    var options = {
        host: self.baseurl,
        port: self.port,
        path: self.basepath + path,
        headers: headers
    };
    
    http.get(options, function(response) {
        var body = '';

        response.on('data', function(data) {
            body += data;
        });

        response.on('end', function() {
            callback(null, JSON.parse(body));
        });

        response.on('error', function(err) {
            callback(errr, null);
        });
    });
};

Connection.prototype.toString = function() {
    var self = this;

    return '[object Connection <' + self.connection + '>]';
};

module.exports = Connection;
