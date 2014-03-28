var config = require(__dirname+'/config.js');
var r = require(__dirname+'/../lib')();
var assert = require('assert');

var connection; // global connection
var dbName, tableName;

function s4() {
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
};

function uuid() {
    return s4()+s4()+s4()+s4()+s4()+s4()+s4()+s4();
}

describe("", function() {
    it("Create table", function(done) {
        dbName = uuid();
        tableName = uuid();

        r.dbCreate(dbName).run().then(function(result) {
            assert.deepEqual(result, {created: 1});
            done();
        }).error(function(error) {
            done(error);
        })
    })
})
