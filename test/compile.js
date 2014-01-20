var r = require('../lib');
var Promise = require('bluebird');
var assert = require('assert');



var run = Promise.coroutine(function* () {
    var connection, result, dbName, tableName, cursor, i, confirmation, pks, table, query, now

    try{
        connection = yield r.connect();
        assert(connection);
        console.log("Connected");
    }
    catch(e) {
        throw e;
    }



    var query = r.expr(1).add(2);

    query.compile();

    for(var i=0; i<300; i++) {
        try{
            var result = yield query.run(connection);
            assert.equal(resutl, 3);
        }
        catch(e){
            console.log(e);
        }
        //console.log(JSON.stringify(query.compile(connection)));
        //console.log(query.compile(connection).length);
    }


});

run();
