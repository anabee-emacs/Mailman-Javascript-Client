## Mailman Javascript client

This is a light Javascript client that interfaces with the Mailman 3 REST API.

### Install
    npm i mailman-js-client

### Run
Make sure you have Mailman core running. You can even test it inside node's interactive cli:

    > var mailman = require('mailman-js');
    > var client = new mailman.client('http://localhost:8001/3.0', {username: 'restadmin', password: 'restpass'});

    > client.getSystem(function(err, result) {
        if (err)
            return console.log(err);

        console.log(result)
    });

    { mailman_version: 'GNU Mailman 3.0.0b6 (Show Don\'t Tell)',
      http_etag: '"29086ed1646c67e26f90b64017a05bc3a5874e4f"',
      python_version: '3.4.3 (default, Mar 19 2015, 04:41:17) \n[GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.56)]',
      self_link: 'http://localhost:8001/3.0/system/versions' }

    > client.getDomain({mailHost: 'example.org'}, function(err, domain) {
        if (err)
            return console.log(err);

        console.log(domain);
    });

    { connection: '<object Connection>'
      url: 'http://localhost:8001/3.0/domains/example.org',
      info: null }
    
### Functionality
At the moment, client is limited to making calls to Mailman's REST API and providing the system version and pseudo-domain Object.

