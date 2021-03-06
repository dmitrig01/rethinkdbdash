var config = require(__dirname+'/config.js');
var r = require(__dirname+'/../lib')(config);
var util = require(__dirname+'/util.js');
var assert = require('assert');

var uuid = util.uuid;
var It = util.It;

var uuid = util.uuid;
var dbName, tableName, pks, result;

It("Init for backtraces", function* (done) {
    try {
        dbName = uuid();
        tableName = uuid();

        result = yield r.dbCreate(dbName).run();
        assert.deepEqual(result, {created:1});

        result = yield r.db(dbName).tableCreate(tableName).run();
        assert.deepEqual(result, {created:1});

        result = yield r.db(dbName).table(tableName).insert(eval('['+new Array(100).join('{}, ')+'{}]')).run();
        assert.equal(result.inserted, 100);

        done();
    }
    catch(e) {
        console.log(e.message); done(e);
    }
})
/*
 *** NOTE ***
 *
 * Most of the backtraces are broken on the server.
 * By broken, I mean they are most of the time not precise, like when a table doesn't exists,
 * it underlines the database and the table. Or when you add a string to a number, it underlines
 * everything and not just the string.
 *
 * We still keep tests for all the terms to be sure that at least, we properly print them.
 *
 ************
 */

/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type STRING but found NUMBER in:
r.dbDrop(1)
         ^ 
*/
It('Test backtrace for r.dbDrop(1)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.dbDrop(1).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.dbDrop(1)\n         ^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type STRING but found NUMBER in:
r.dbCreate(1)
           ^ 
*/
It('Test backtrace for r.dbCreate(1)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.dbCreate(1).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.dbCreate(1)\n           ^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
//TODO Broken on the server
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 1 } ]

Error:
Expected type ARRAY but found STRING in:
r.dbList().do(function(var_1) {
    return var_1.add("a")
           ^^^^^^^^^^^^^^
})
*/
It('Test backtrace for r.dbList().do(function(x) { return x.add("a") })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.dbList().do(function(x) { return x.add("a") }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type ARRAY but found STRING in:\nr.dbList().do(function(var_1) {\n    return var_1.add(\"a\")\n           ^^^^^^^^^^^^^^\n})\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
//TODO Broken on the server
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 1 } ]

Error:
Expected type NUMBER but found STRING in:
r.expr(2).do(function(var_1) {
    return var_1.add("a")
           ^^^^^^^^^^^^^^
})
*/
It('Test backtrace for r.expr(2).do(function(x) { return x.add("a") })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr(2).do(function(x) { return x.add("a") }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr(2).do(function(var_1) {\n    return var_1.add(\"a\")\n           ^^^^^^^^^^^^^^\n})\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
//TODO Broken on the server
Frames:
[]

Error:
Table `551f695a834f94e0fe215e19441b01c9` already exists in:
r.db("7debc6e4a249569a1a6280fd6e871270").tableCreate("551f695a834f94e0fe215e19441b01c9")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.db(dbName).tableCreate(tableName)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).tableCreate(tableName).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Table `"+dbName+"."+tableName+"` already exists in:\nr.db(\""+dbName+"\").tableCreate(\""+tableName+"\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
//TODO Broken on the server
Frames:
[]

Error:
Table `nonExistingTable` does not exist in:
r.db("4ab068e0ed6b05f71dcd4b07034698c4").tableDrop("nonExistingTable")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.db(dbName).tableDrop("nonExistingTable")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).tableDrop("nonExistingTable").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Table `"+dbName+".nonExistingTable` does not exist in:\nr.db(\""+dbName+"\").tableDrop(\"nonExistingTable\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
//TODO Broken on the server
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 1 } ]

Error:
Expected type ARRAY but found STRING in:
r.db("9cdeba73602f74f7ad67f77c76a87528").tableList().do(function(var_1) {
    return var_1.add("a")
           ^^^^^^^^^^^^^^
})
*/
It('Test backtrace for r.db(dbName).tableList().do(function(x) { return x.add("a") })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).tableList().do(function(x) { return x.add("a") }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type ARRAY but found STRING in:\nr.db(\""+dbName+"\").tableList().do(function(var_1) {\n    return var_1.add(\"a\")\n           ^^^^^^^^^^^^^^\n})\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 1 }, { type: 'POS', pos: 1 } ]

Error:
Index `zoo` already exists in:
r.expr(["zoo", "zoo"]).forEach(function(var_1) {
    return r.db("428a2a382eb5982146afe283b811f367").table("32ae19310d055f18500b41db757337f2")
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        .indexCreate(var_1)
        ^^^^^^^^^^^^^^^^^^^
})
*/
It('Test backtrace for r.expr(["zoo", "zoo"]).forEach(function(index) { return r.db(dbName).table(tableName).indexCreate(index) })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr(["zoo", "zoo"]).forEach(function(index) { return r.db(dbName).table(tableName).indexCreate(index) }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Index `zoo` already exists on table `"+dbName+"."+tableName+"` in:\nr.expr([\"zoo\", \"zoo\"]).forEach(function(var_1) {\n    return r.db(\""+dbName+"\").table(\""+tableName+"\")\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n        .indexCreate(var_1)\n        ^^^^^^^^^^^^^^^^^^^\n})\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
//TODO Broken on the server
Frames:
[]

Error:
Index `nonExistingIndex` does not exist in:
r.db("91105f3567295643808ed9bab508ec25").table("35adbd4339c2fd4d285f27543e1663ec")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    .indexDrop("nonExistingIndex")
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.db(dbName).table(tableName).indexDrop("nonExistingIndex")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).indexDrop("nonExistingIndex").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Index `nonExistingIndex` does not exist on table `"+dbName+"."+tableName+"` in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    .indexDrop(\"nonExistingIndex\")\n    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
//TODO Broken on the server
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 1 } ]

Error:
Expected type ARRAY but found STRING in:
r.db("7973e432e0aed7e4b1e6951f6049157d").table("37c62a0922bc471c6d751f8f75560cb8")
    .indexList().do(function(var_1) {
        return var_1.add("a")
               ^^^^^^^^^^^^^^
    })
*/
It('Test backtrace for r.db(dbName).table(tableName).indexList().do(function(x) { return x.add("a") })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).indexList().do(function(x) { return x.add("a") }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type ARRAY but found STRING in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n    .indexList().do(function(var_1) {\n        return var_1.add(\"a\")\n               ^^^^^^^^^^^^^^\n    })\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
//TODO Broken on the server
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 1 } ]

Error:
Expected type ARRAY but found STRING in:
r.db("a0d88feb61e3d0743bde45b625e7f237").table("8e1f71fefc1f86b66348c96466951df3")
    .indexWait().do(function(var_1) {
        return var_1.add("a")
               ^^^^^^^^^^^^^^
    })
*/
It('Test backtrace for r.db(dbName).table(tableName).indexWait().do(function(x) { return x.add("a") })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).indexWait().do(function(x) { return x.add("a") }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type ARRAY but found STRING in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n    .indexWait().do(function(var_1) {\n        return var_1.add(\"a\")\n               ^^^^^^^^^^^^^^\n    })\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Index `bar` was not found in:
r.db("d095569a80834591e8053539e111299a").table("be4967584fdf58b6a5dab0cd633ba046")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    .indexWait("foo", "bar")
*/
It('Test backtrace for r.db(dbName).table(tableName).indexWait("foo", "bar")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).indexWait("foo", "bar").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Index `bar` was not found on table `"+dbName+"."+tableName+"` in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    .indexWait(\"foo\", \"bar\")\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
//TODO Broken on the server
Frames:
[ { type: 'POS', pos: 1 } ]

Error:
Expected type NUMBER but found STRING in:
r.db("340daf900a4168235e5e21e53f8ccdd1").table("9276ce6940b79f4b4f64ab7812532c6e")
    .indexStatus().and(r.expr(1).add("a"))
                       ^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.db(dbName).table(tableName).indexStatus().and( r.expr(1).add("a"))', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).indexStatus().and( r.expr(1).add("a")).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n    .indexStatus().and(r.expr(1).add(\"a\"))\n                       ^^^^^^^^^^^^^^^^^^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
//TODO Broken on the server
Frames:
[ { type: 'POS', pos: 1 }, { type: 'POS', pos: 0 } ]

Error:
Index `bar` was not found in:
r.db("ac3121b4d58dae39ed8b4ccd6828c3fa").table("1ea1431ffa29a51ce3d2fe9cd192a905")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    .indexStatus("foo", "bar").do(function(var_1) {
        return var_1.add("a")
    })
*/
It('Test backtrace for r.db(dbName).table(tableName).indexStatus("foo", "bar").do(function(x) { return x.add("a") })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).indexStatus("foo", "bar").do(function(x) { return x.add("a") }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Index `bar` was not found on table `"+dbName+"."+tableName+"` in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    .indexStatus(\"foo\", \"bar\").do(function(var_1) {\n        return var_1.add(\"a\")\n    })\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})

/*
Frames:
[ 0 ]

Error:
Table `882c5069473a016b03069a24679271c5.nonExistingTable` does not exist in:
r.db("882c5069473a016b03069a24679271c5").table("nonExistingTable").update({
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^         
    foo: "bar"
})
*/
It('Test backtrace for r.db(dbName).table("nonExistingTable").update({foo: "bar"})', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table("nonExistingTable").update({foo: "bar"}).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Table `"+dbName+".nonExistingTable` does not exist in:\nr.db(\""+dbName+"\").table(\"nonExistingTable\").update({\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^         \n    foo: \"bar\"\n})\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ 0 ]

Error:
Table `8d192301ed6e6937c7d2e6d836f79b20.nonExistingTable` does not exist in:
r.db("8d192301ed6e6937c7d2e6d836f79b20").table("nonExistingTable").update(function(var_1) {
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                         
    return var_1("foo")
})
*/
It('Test backtrace for r.db(dbName).table("nonExistingTable").update(function(doc) { return doc("foo") })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table("nonExistingTable").update(function(doc) { return doc("foo") }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Table `"+dbName+".nonExistingTable` does not exist in:\nr.db(\""+dbName+"\").table(\"nonExistingTable\").update(function(var_1) {\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                         \n    return var_1(\"foo\")\n})\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
//TODO Broken on the server
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Table `nonExistingTable` does not exist in:
r.db("e7e04bbadd0f0b43f3561b32f2e1b5d6").table("nonExistingTable").replace({
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^          
    foo: "bar"
})
*/
It('Test backtrace for r.db(dbName).table("nonExistingTable").replace({foo: "bar"})', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table("nonExistingTable").replace({foo: "bar"}).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Table `"+dbName+".nonExistingTable` does not exist in:\nr.db(\""+dbName+"\").table(\"nonExistingTable\").replace({\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^          \n    foo: \"bar\"\n})\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
//TODO Broken on the server
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Table `nonExistingTable` does not exist in:
r.db("9ca06265cbe173eeb27decb1baedb031").table("nonExistingTable").replace(function(var_1) {
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                          
    return var_1("foo")
})
*/
It('Test backtrace for r.db(dbName).table("nonExistingTable").replace(function(doc) { return doc("foo") })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table("nonExistingTable").replace(function(doc) { return doc("foo") }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Table `"+dbName+".nonExistingTable` does not exist in:\nr.db(\""+dbName+"\").table(\"nonExistingTable\").replace(function(var_1) {\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                          \n    return var_1(\"foo\")\n})\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
//TODO Broken on the server
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Table `nonExistingTable` does not exist in:
r.db("0ec51cb31ddf56339cd7acab73b08a2c").table("nonExistingTable").delete()
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.db(dbName).table("nonExistingTable").delete()', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table("nonExistingTable").delete().run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Table `"+dbName+".nonExistingTable` does not exist in:\nr.db(\""+dbName+"\").table(\"nonExistingTable\").delete()\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^         \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
//TODO Broken on the server
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Table `nonExistingTable` does not exist in:
r.db("a01528b1d8902639d48b9c0adcc397a5").table("nonExistingTable").sync()
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.db(dbName).table("nonExistingTable").sync()', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table("nonExistingTable").sync().run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Table `"+dbName+".nonExistingTable` does not exist in:\nr.db(\""+dbName+"\").table(\"nonExistingTable\").sync()\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^       \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Database `nonExistingDb` does not exist in:
r.db("nonExistingDb").table("nonExistingTable")
^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.db("nonExistingDb").table("nonExistingTable")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db("nonExistingDb").table("nonExistingTable").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Database `nonExistingDb` does not exist in:\nr.db(\"nonExistingDb\").table(\"nonExistingTable\")\n^^^^^^^^^^^^^^^^^^^^^                          \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
//TODO Broken on the server
Frames:
[]

Error:
Table `nonExistingTable` does not exist in:
r.db("d1869ecfd2f2e939f5f9ff18b7293370").table("nonExistingTable")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.db(dbName).table("nonExistingTable")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table("nonExistingTable").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Table `"+dbName+".nonExistingTable` does not exist in:\nr.db(\""+dbName+"\").table(\"nonExistingTable\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 1 } ]

Error:
Expected type NUMBER but found NULL in:
r.db("9a3275b288394920100ca6cd5d9ebc77").table("aaf8fd26eb4093b4bcd1c051acd44b80")
    .get(1).do(function(var_1) {
        return var_1.add(3)
               ^^^^^^^^^^^^
    })
*/
It('Test backtrace for r.db(dbName).table(tableName).get(1).do(function(x) { return x.add(3) })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).get(1).do(function(x) { return x.add(3) }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found NULL in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n    .get(1).do(function(var_1) {\n        return var_1.add(3)\n               ^^^^^^^^^^^^\n    })\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})

/*
Frames:
[ 1 ]

Error:
Expected type DATUM but found SELECTION:
OPAQUE SELECTION ON table(0c2967f3799eb2025b4cd92342dfe4a9) in:
r.db("cd911f3c958c1ec7637f7f2dc2827245").table("0c2967f3799eb2025b4cd92342dfe4a9")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    .getAll(1, 2, 3).do(function(var_1) {
    ^^^^^^^^^^^^^^^^                     
        return var_1.add(3)
    })
*/
It('Test backtrace for r.db(dbName).table(tableName).getAll(1, 2, 3).do(function(x) { return x.add(3) })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).getAll(1, 2, 3).do(function(x) { return x.add(3) }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type DATUM but found SELECTION:\nOPAQUE SELECTION ON table("+tableName+") in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    .getAll(1, 2, 3).do(function(var_1) {\n    ^^^^^^^^^^^^^^^^                     \n        return var_1.add(3)\n    })\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})




/*
Frames:
[ 1 ]

Error:
Expected type DATUM but found SELECTION:
OPAQUE SELECTION ON table(2fb59ffdec1b6605369953703547f82d) in:
r.db("52bdcbc788f0c0b00357fa1840f62a81").table("2fb59ffdec1b6605369953703547f82d")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    .getAll(1, 2, 3, {
    ^^^^^^^^^^^^^^^^^^
        index: "foo"
        ^^^^^^^^^^^^
    }).do(function(var_1) {
    ^^                     
        return var_1.add(3)
    })
*/
It('Test backtrace for r.db(dbName).table(tableName).getAll(1, 2, 3, { index: "foo"}).do(function(x) { return x.add(3) })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).getAll(1, 2, 3, { index: "foo"}).do(function(x) { return x.add(3) }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type DATUM but found SELECTION:\nOPAQUE SELECTION ON table("+tableName+") in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    .getAll(1, 2, 3, {\n    ^^^^^^^^^^^^^^^^^^\n        index: \"foo\"\n        ^^^^^^^^^^^^\n    }).do(function(var_1) {\n    ^^                     \n        return var_1.add(3)\n    })\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ 1 ]

Error:
Expected type DATUM but found TABLE:
table("b8fa3b904a14980f85331232001b56c6") in:
r.db("b0a7a9647877bf2ff7b42aad5ff5449a").table("b8fa3b904a14980f85331232001b56c6")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    .between(2, 3, {
    ^^^^^^^^^^^^^^^^
        index: "foo"
        ^^^^^^^^^^^^
    }).do(function(var_1) {
    ^^                     
        return var_1.add(3)
    })
*/
It('Test backtrace for r.db(dbName).table(tableName).between(2, 3, { index: "foo"}).do(function(x) { return x.add(3) })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).between(2, 3, { index: "foo"}).do(function(x) { return x.add(3) }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type DATUM but found TABLE:\ntable(\""+tableName+"\") in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    .between(2, 3, {\n    ^^^^^^^^^^^^^^^^\n        index: \"foo\"\n        ^^^^^^^^^^^^\n    }).do(function(var_1) {\n    ^^                     \n        return var_1.add(3)\n    })\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})




/*
Frames:
[ 1 ]

Error:
Expected type DATUM but found SELECTION:
OPAQUE SELECTION ON table(775cb364800937836f7ecaafc6405cf0) in:
r.db("39ae0baa00e8cb2da57783c544f569d3").table("775cb364800937836f7ecaafc6405cf0")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    .filter({
    ^^^^^^^^^
        foo: "bar"
        ^^^^^^^^^^
    }).do(function(var_1) {
    ^^                     
        return var_1.add(3)
    })
*/
It('Test backtrace for r.db(dbName).table(tableName).filter({foo: "bar"}).do(function(x) { return x.add(3) })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).filter({foo: "bar"}).do(function(x) { return x.add(3) }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type DATUM but found SELECTION:\nOPAQUE SELECTION ON table("+tableName+") in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    .filter({\n    ^^^^^^^^^\n        foo: \"bar\"\n        ^^^^^^^^^^\n    }).do(function(var_1) {\n    ^^                     \n        return var_1.add(3)\n    })\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})
    


/*
Frames:
[ { type: 'POS', pos: 1 } ]

Error:
Expected type SEQUENCE but found FUNCTION:
OPAQUE VALUE FUNCTION in:
r.expr([1, 2, 3]).innerJoin(function(var_1, var_2) {
                            ^^^^^^^^^^^^^^^^^^^^^^^^
    return var_1.eq(var_2("bar").add(1))
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
}, r.db("3fdf480de398b8b0c5dee11b4594a38d").table("5f728046b728da8d63ace65a40aca6a6"))
^
*/
It('Test backtrace for r.expr([1,2,3]).innerJoin( function(left, right) { return left.eq(right("bar").add(1)) }, r.db(dbName).table(tableName))', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).innerJoin( function(left, right) { return left.eq(right("bar").add(1)) }, r.db(dbName).table(tableName)).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type SEQUENCE but found FUNCTION:\nOPAQUE VALUE FUNCTION in:\nr.expr([1, 2, 3]).innerJoin(function(var_1, var_2) {\n                            ^^^^^^^^^^^^^^^^^^^^^^^^\n    return var_1.eq(var_2(\"bar\").add(1))\n    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n}, r.db(\""+dbName+"\").table(\""+tableName+"\"))\n^                                                                                     \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 2 },
  { type: 'POS', pos: 1 },
  { type: 'POS', pos: 0 } ]

Error:
Expected type NUMBER but found STRING in:
r.expr([1, 2, 3]).innerJoin([1, 2, 3], function(var_1, var_2) {
    return r.expr(1).add("str").add(var_1.eq(var_2("bar").add(1)))
           ^^^^^^^^^^^^^^^^^^^^                                   
})
*/
It('Test backtrace for r.expr([1,2,3]).innerJoin(r.expr([1,2,3]), function(left, right) { return r.expr(1).add("str").add(left.eq(right("bar").add(1))) })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).innerJoin(r.expr([1,2,3]), function(left, right) { return r.expr(1).add("str").add(left.eq(right("bar").add(1))) }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr([1, 2, 3]).innerJoin([1, 2, 3], function(var_1, var_2) {\n    return r.expr(1).add(\"str\").add(var_1.eq(var_2(\"bar\").add(1)))\n           ^^^^^^^^^^^^^^^^^^^^                                   \n})\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 1 } ]

Error:
Expected type SEQUENCE but found FUNCTION:
OPAQUE VALUE FUNCTION in:
r.expr([1, 2, 3]).outerJoin(function(var_1, var_2) {
                            ^^^^^^^^^^^^^^^^^^^^^^^^
    return var_1.eq(var_2("bar").add(1))
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
}, r.db("5f21a25338fff022c0f698f8681c03c0").table("1653b107790bf38e48448f3db99ab776"))
^
*/
It('Test backtrace for r.expr([1,2,3]).outerJoin( function(left, right) { return left.eq(right("bar").add(1)) }, r.db(dbName).table(tableName))', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).outerJoin( function(left, right) { return left.eq(right("bar").add(1)) }, r.db(dbName).table(tableName)).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type SEQUENCE but found FUNCTION:\nOPAQUE VALUE FUNCTION in:\nr.expr([1, 2, 3]).outerJoin(function(var_1, var_2) {\n                            ^^^^^^^^^^^^^^^^^^^^^^^^\n    return var_1.eq(var_2(\"bar\").add(1))\n    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n}, r.db(\""+dbName+"\").table(\""+tableName+"\"))\n^                                                                                     \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 1 } ]

Error:
Cannot perform get_field on a non-object non-sequence `1` in:
r.expr([1, 2, 3]).eqJoin("id", r.db("5500af7b5c2c94b2672a5f0029512757").table("85bbcc72331aa82bfe0306204997613e"))
                         ^^^^                                                                                     
    .add(1)
*/
It('Test backtrace for r.expr([1,2,3]).eqJoin("id", r.db(dbName).table(tableName)).add(1)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).eqJoin("id", r.db(dbName).table(tableName)).add(1).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot perform get_field on a non-object non-sequence `1` in:\nr.expr([1, 2, 3]).eqJoin(\"id\", r.db(\""+dbName+"\").table(\""+tableName+"\"))\n                         ^^^^                                                                                     \n    .add(1)\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 },
  { type: 'POS', pos: 0 },
  { type: 'POS', pos: 1 } ]

Error:
Cannot perform get_field on a non-object non-sequence `1` in:
r.expr([1, 2, 3]).eqJoin("id", r.db("2c1030e5160e4af3bb19923d43fe7d6c").table("8895da1f043cb7443f322ce849d7fced"))
                         ^^^^                                                                                     
    .zip().add(1)
*/
It('Test backtrace for r.expr([1,2,3]).eqJoin("id", r.db(dbName).table(tableName)).zip().add(1)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).eqJoin("id", r.db(dbName).table(tableName)).zip().add(1).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot perform get_field on a non-object non-sequence `1` in:\nr.expr([1, 2, 3]).eqJoin(\"id\", r.db(\""+dbName+"\").table(\""+tableName+"\"))\n                         ^^^^                                                                                     \n    .zip().add(1)\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type ARRAY but found NUMBER in:
r.expr([1, 2, 3]).map(function(var_1) {
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    return var_1
    ^^^^^^^^^^^^
}).add(1)
^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).map(function(v) { return v}).add(1)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).map(function(v) { return v}).add(1).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type ARRAY but found NUMBER in:\nr.expr([1, 2, 3]).map(function(var_1) {\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    return var_1\n    ^^^^^^^^^^^^\n}).add(1)\n^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Cannot perform has_fields on a non-object non-sequence `1` in:
r.expr([1, 2, 3]).withFields("foo", "bar").add(1)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).withFields("foo", "bar").add(1)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).withFields("foo", "bar").add(1).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot perform has_fields on a non-object non-sequence `1` in:\nr.expr([1, 2, 3]).withFields(\"foo\", \"bar\").add(1)\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^       \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Cannot convert NUMBER to SEQUENCE in:
r.expr([1, 2, 3]).concatMap(function(var_1) {
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    return var_1
    ^^^^^^^^^^^^
}).add(1)
^^
*/
It('Test backtrace for r.expr([1,2,3]).concatMap(function(v) { return v}).add(1)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).concatMap(function(v) { return v}).add(1).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot convert NUMBER to SEQUENCE in:\nr.expr([1, 2, 3]).concatMap(function(var_1) {\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    return var_1\n    ^^^^^^^^^^^^\n}).add(1)\n^^       \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 1 } ]

Error:
Cannot perform get_field on a non-object non-sequence `2` in:
r.expr([1, 2, 3]).orderBy("foo").add(1)
                          ^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).orderBy("foo").add(1)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).orderBy("foo").add(1).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot perform get_field on a non-object non-sequence `2` in:\nr.expr([1, 2, 3]).orderBy(\"foo\").add(1)\n                          ^^^^^        \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 1 } ]

Error:
Expected type NUMBER but found STRING in:
r.expr([1, 2, 3]).skip("foo").add(1)
                       ^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).skip("foo").add(1)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).skip("foo").add(1).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr([1, 2, 3]).skip(\"foo\").add(1)\n                       ^^^^^        \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 1 } ]

Error:
Expected type NUMBER but found STRING in:
r.expr([1, 2, 3]).limit("foo").add(1)
                        ^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).limit("foo").add(1)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).limit("foo").add(1).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr([1, 2, 3]).limit(\"foo\").add(1)\n                        ^^^^^        \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 1 } ]

Error:
Expected type NUMBER but found STRING in:
r.expr([1, 2, 3]).slice("foo", "bar").add(1)
                        ^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).slice("foo", "bar").add(1)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).slice("foo", "bar").add(1).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr([1, 2, 3]).slice(\"foo\", \"bar\").add(1)\n                        ^^^^^               \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 1 } ]

Error:
Expected type NUMBER but found STRING in:
r.expr([1, 2, 3]).nth("bar").add(1)
                      ^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).nth("bar").add(1)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).nth("bar").add(1).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr([1, 2, 3]).nth(\"bar\").add(1)\n                      ^^^^^        \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type ARRAY but found STRING in:
r.expr([1, 2, 3]).indexes_of("bar").add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).indexesOf("bar").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).indexesOf("bar").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type ARRAY but found STRING in:\nr.expr([1, 2, 3]).indexes_of(\"bar\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[]

Error:
Expected type NUMBER but found BOOL in:
r.expr([1, 2, 3]).isEmpty().add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).isEmpty().add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).isEmpty().add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found BOOL in:\nr.expr([1, 2, 3]).isEmpty().add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type ARRAY but found STRING in:
r.expr([1, 2, 3]).union([5, 6]).add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).union([5,6]).add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).union([5,6]).add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type ARRAY but found STRING in:\nr.expr([1, 2, 3]).union([5, 6]).add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 1 } ]

Error:
Expected type NUMBER but found STRING in:
r.expr([1, 2, 3]).sample("Hello")
                         ^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).sample("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).sample("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr([1, 2, 3]).sample(\"Hello\")\n                         ^^^^^^^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[]

Error:
Expected type NUMBER but found STRING in:
r.expr([1, 2, 3]).count(function() {
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    return true
    ^^^^^^^^^^^
}).add("Hello")
^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).count(function() { return true}).add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).count(function() { return true}).add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr([1, 2, 3]).count(function() {\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    return true\n    ^^^^^^^^^^^\n}).add(\"Hello\")\n^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[]

Error:
Expected type ARRAY but found STRING in:
r.expr([1, 2, 3]).distinct().add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).distinct().add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).distinct().add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type ARRAY but found STRING in:\nr.expr([1, 2, 3]).distinct().add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[]

Error:
Expected type NUMBER but found BOOL in:
r.expr([1, 2, 3]).contains("foo", "bar").add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).contains("foo", "bar").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).contains("foo", "bar").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found BOOL in:\nr.expr([1, 2, 3]).contains(\"foo\", \"bar\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 0 } ]

Error:
Expected type SELECTION but found DATUM:
[1, 2, 3] in:
r.expr([1, 2, 3]).update(r.row("foo")).add("Hello")
^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).update(r.row("foo")).add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).update(r.row("foo")).add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type SELECTION but found DATUM:\n[1, 2, 3] in:\nr.expr([1, 2, 3]).update(r.row(\"foo\")).add(\"Hello\")\n^^^^^^^^^^^^^^^^^                                  \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Cannot perform pluck on a non-object non-sequence `1` in:
r.expr([1, 2, 3]).pluck("foo").add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).pluck("foo").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).pluck("foo").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot perform pluck on a non-object non-sequence `1` in:\nr.expr([1, 2, 3]).pluck(\"foo\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Cannot perform without on a non-object non-sequence `1` in:
r.expr([1, 2, 3]).without("foo").add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).without("foo").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).without("foo").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot perform without on a non-object non-sequence `1` in:\nr.expr([1, 2, 3]).without(\"foo\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Cannot perform merge on a non-object non-sequence `1` in:
r.expr([1, 2, 3]).merge("foo").add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).merge("foo").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).merge("foo").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot perform merge on a non-object non-sequence `1` in:\nr.expr([1, 2, 3]).merge(\"foo\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[]

Error:
Expected type ARRAY but found STRING in:
r.expr([1, 2, 3]).append("foo").add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).append("foo").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).append("foo").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type ARRAY but found STRING in:\nr.expr([1, 2, 3]).append(\"foo\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[]

Error:
Expected type ARRAY but found STRING in:
r.expr([1, 2, 3]).prepend("foo").add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).prepend("foo").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).prepend("foo").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type ARRAY but found STRING in:\nr.expr([1, 2, 3]).prepend(\"foo\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Cannot convert STRING to SEQUENCE in:
r.expr([1, 2, 3]).difference("foo").add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).difference("foo").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).difference("foo").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot convert STRING to SEQUENCE in:\nr.expr([1, 2, 3]).difference(\"foo\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type ARRAY but found STRING in:
r.expr([1, 2, 3]).setInsert("foo").add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).setInsert("foo").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).setInsert("foo").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type ARRAY but found STRING in:\nr.expr([1, 2, 3]).setInsert(\"foo\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type ARRAY but found STRING in:
r.expr([1, 2, 3]).setUnion("foo").add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).setUnion("foo").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).setUnion("foo").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type ARRAY but found STRING in:\nr.expr([1, 2, 3]).setUnion(\"foo\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type ARRAY but found STRING in:
r.expr([1, 2, 3]).setIntersection("foo").add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).setIntersection("foo").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).setIntersection("foo").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type ARRAY but found STRING in:\nr.expr([1, 2, 3]).setIntersection(\"foo\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Cannot perform get_field on a non-object non-sequence `1` in:
r.expr([1, 2, 3])("foo").add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3])("foo").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3])("foo").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot perform get_field on a non-object non-sequence `1` in:\nr.expr([1, 2, 3])(\"foo\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Cannot perform has_fields on a non-object non-sequence `1` in:
r.expr([1, 2, 3]).hasFields("foo").add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).hasFields("foo").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).hasFields("foo").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot perform has_fields on a non-object non-sequence `1` in:\nr.expr([1, 2, 3]).hasFields(\"foo\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type NUMBER but found STRING in:
r.expr([1, 2, 3]).insertAt("foo", 2).add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).insertAt("foo", 2).add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).insertAt("foo", 2).add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr([1, 2, 3]).insertAt(\"foo\", 2).add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type NUMBER but found STRING in:
r.expr([1, 2, 3]).spliceAt("foo", 2).add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).spliceAt("foo", 2).add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).spliceAt("foo", 2).add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr([1, 2, 3]).spliceAt(\"foo\", 2).add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type NUMBER but found STRING in:
r.expr([1, 2, 3]).deleteAt("foo", 2).add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).deleteAt("foo", 2).add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).deleteAt("foo", 2).add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr([1, 2, 3]).deleteAt(\"foo\", 2).add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type NUMBER but found STRING in:
r.expr([1, 2, 3]).changeAt("foo", 2).add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).changeAt("foo", 2).add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).changeAt("foo", 2).add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr([1, 2, 3]).changeAt(\"foo\", 2).add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type OBJECT but found ARRAY in:
r.expr([1, 2, 3]).keys().add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).keys().add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).keys().add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type OBJECT but found ARRAY in:\nr.expr([1, 2, 3]).keys().add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 0 } ]

Error:
Expected type STRING but found ARRAY in:
r.expr([1, 2, 3]).match("foo").add("Hello")
^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).match("foo").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).match("foo").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found ARRAY in:\nr.expr([1, 2, 3]).match(\"foo\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^                          \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[]

Error:
Expected type ARRAY but found STRING in:
r.expr([1, 2, 3]).add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type ARRAY but found STRING in:\nr.expr([1, 2, 3]).add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[]

Error:
Expected type NUMBER but found ARRAY in:
r.expr([1, 2, 3]).sub("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).sub("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).sub("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found ARRAY in:\nr.expr([1, 2, 3]).sub(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type NUMBER but found STRING in:
r.expr([1, 2, 3]).mul("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).mul("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).mul("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr([1, 2, 3]).mul(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type NUMBER but found ARRAY in:
r.expr([1, 2, 3]).div("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).div("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).div("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found ARRAY in:\nr.expr([1, 2, 3]).div(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type NUMBER but found ARRAY in:
r.expr([1, 2, 3]).mod("Hello")
^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).mod("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).mod("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found ARRAY in:\nr.expr([1, 2, 3]).mod(\"Hello\")\n^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 1 } ]

Error:
Expected type STRING but found NUMBER in:
r.expr([1, 2, 3]).and(r.expr("Hello").add(2))
                      ^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).and(r.expr("Hello").add(2))', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).and(r.expr("Hello").add(2)).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.expr([1, 2, 3]).and(r.expr(\"Hello\").add(2))\n                      ^^^^^^^^^^^^^^^^^^^^^^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 1 } ]

Error:
Expected type STRING but found NUMBER in:
r.expr(false).or(r.expr("Hello").add(2))
                 ^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr(false).or(r.expr("Hello").add(2))', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr(false).or(r.expr("Hello").add(2)).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.expr(false).or(r.expr(\"Hello\").add(2))\n                 ^^^^^^^^^^^^^^^^^^^^^^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 1 } ]

Error:
Expected type STRING but found NUMBER in:
r.expr([1, 2, 3]).eq(r.expr("Hello").add(2))
                     ^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).eq(r.expr("Hello").add(2))', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).eq(r.expr("Hello").add(2)).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.expr([1, 2, 3]).eq(r.expr(\"Hello\").add(2))\n                     ^^^^^^^^^^^^^^^^^^^^^^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 1 } ]

Error:
Expected type STRING but found NUMBER in:
r.expr([1, 2, 3]).ne(r.expr("Hello").add(2))
                     ^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).ne(r.expr("Hello").add(2))', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).ne(r.expr("Hello").add(2)).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.expr([1, 2, 3]).ne(r.expr(\"Hello\").add(2))\n                     ^^^^^^^^^^^^^^^^^^^^^^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 1 } ]

Error:
Expected type STRING but found NUMBER in:
r.expr([1, 2, 3]).gt(r.expr("Hello").add(2))
                     ^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).gt(r.expr("Hello").add(2))', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).gt(r.expr("Hello").add(2)).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.expr([1, 2, 3]).gt(r.expr(\"Hello\").add(2))\n                     ^^^^^^^^^^^^^^^^^^^^^^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 1 } ]

Error:
Expected type STRING but found NUMBER in:
r.expr([1, 2, 3]).lt(r.expr("Hello").add(2))
                     ^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).lt(r.expr("Hello").add(2))', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).lt(r.expr("Hello").add(2)).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.expr([1, 2, 3]).lt(r.expr(\"Hello\").add(2))\n                     ^^^^^^^^^^^^^^^^^^^^^^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 1 } ]

Error:
Expected type STRING but found NUMBER in:
r.expr([1, 2, 3]).le(r.expr("Hello").add(2))
                     ^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).le(r.expr("Hello").add(2))', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).le(r.expr("Hello").add(2)).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.expr([1, 2, 3]).le(r.expr(\"Hello\").add(2))\n                     ^^^^^^^^^^^^^^^^^^^^^^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 1 } ]

Error:
Expected type STRING but found NUMBER in:
r.expr([1, 2, 3]).ge(r.expr("Hello").add(2))
                     ^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).ge(r.expr("Hello").add(2))', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).ge(r.expr("Hello").add(2)).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.expr([1, 2, 3]).ge(r.expr(\"Hello\").add(2))\n                     ^^^^^^^^^^^^^^^^^^^^^^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 1 } ]

Error:
Expected type STRING but found NUMBER in:
r.expr([1, 2, 3]).not().add(r.expr("Hello").add(2))
                            ^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).not().add(r.expr("Hello").add(2))', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).not().add(r.expr("Hello").add(2)).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.expr([1, 2, 3]).not().add(r.expr(\"Hello\").add(2))\n                            ^^^^^^^^^^^^^^^^^^^^^^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type NUMBER but found STRING in:
r.now().add("Hello")
^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.now().add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.now().add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.now().add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Error in time logic: Year is out of valid range: 1400..10000 in:
r.time(1023, 11, 3, "Z").add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.time(1023, 11, 3, "Z").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.time(1023, 11, 3, "Z").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Error in time logic: Year is out of valid range: 1400..10000 in:\nr.time(1023, 11, 3, \"Z\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[]

Error:
Expected type NUMBER but found STRING in:
r.epochTime(12132131).add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.epochTime(12132131).add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.epochTime(12132131).add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.epochTime(12132131).add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 0 } ]

Error:
Invalid date string `UnvalidISO961String` (got `U` but expected a digit) in:
r.ISO8601("UnvalidISO961String").add("Hello")
          ^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.ISO8601("UnvalidISO961String").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.ISO8601("UnvalidISO961String").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Invalid date string `UnvalidISO961String` (got `U` but expected a digit) in:\nr.ISO8601(\"UnvalidISO961String\").add(\"Hello\")\n          ^^^^^^^^^^^^^^^^^^^^^              \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Timezone `noTimezone` does not start with `-` or `+` in:
r.now().inTimezone("noTimezone").add("Hello")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.now().inTimezone("noTimezone").add("Hello")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.now().inTimezone("noTimezone").add("Hello").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Timezone `noTimezone` does not start with `-` or `+` in:\nr.now().inTimezone(\"noTimezone\").add(\"Hello\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^             \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type STRING but found BOOL in:
r.now().timezone().add(true)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.now().timezone().add(true)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.now().timezone().add(true).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found BOOL in:\nr.now().timezone().add(true)\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type NUMBER but found BOOL in:
r.now().during(r.now(), r.now()).add(true)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.now().during(r.now(), r.now()).add(true)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.now().during(r.now(), r.now()).add(true).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found BOOL in:\nr.now().during(r.now(), r.now()).add(true)\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type NUMBER but found BOOL in:
r.now().timeOfDay().add(true)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.now().timeOfDay().add(true)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.now().timeOfDay().add(true).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found BOOL in:\nr.now().timeOfDay().add(true)\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[]

Error:
Expected type NUMBER but found BOOL in:
r.now().year().add(true)
^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.now().year().add(true)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.now().year().add(true).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found BOOL in:\nr.now().year().add(true)\n^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type NUMBER but found BOOL in:
r.now().month().add(true)
^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.now().month().add(true)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.now().month().add(true).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found BOOL in:\nr.now().month().add(true)\n^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type NUMBER but found BOOL in:
r.now().day().add(true)
^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.now().day().add(true)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.now().day().add(true).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found BOOL in:\nr.now().day().add(true)\n^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type NUMBER but found BOOL in:
r.now().dayOfWeek().add(true)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.now().dayOfWeek().add(true)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.now().dayOfWeek().add(true).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found BOOL in:\nr.now().dayOfWeek().add(true)\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type NUMBER but found BOOL in:
r.now().dayOfYear().add(true)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.now().dayOfYear().add(true)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.now().dayOfYear().add(true).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found BOOL in:\nr.now().dayOfYear().add(true)\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[]

Error:
Expected type NUMBER but found BOOL in:
r.now().hours().add(true)
^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.now().hours().add(true)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.now().hours().add(true).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found BOOL in:\nr.now().hours().add(true)\n^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type NUMBER but found BOOL in:
r.now().minutes().add(true)
^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.now().minutes().add(true)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.now().minutes().add(true).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found BOOL in:\nr.now().minutes().add(true)\n^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type NUMBER but found BOOL in:
r.now().seconds().add(true)
^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.now().seconds().add(true)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.now().seconds().add(true).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found BOOL in:\nr.now().seconds().add(true)\n^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type STRING but found BOOL in:
r.now().toISO8601().add(true)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.now().toISO8601().add(true)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.now().toISO8601().add(true).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found BOOL in:\nr.now().toISO8601().add(true)\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type NUMBER but found BOOL in:
r.now().toEpochTime().add(true)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.now().toEpochTime().add(true)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.now().toEpochTime().add(true).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found BOOL in:\nr.now().toEpochTime().add(true)\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 0 },
  { type: 'POS', pos: 1 },
  { type: 'POS', pos: 0 },
  { type: 'POS', pos: 0 } ]

Error:
Cannot perform get_field on a non-object non-sequence `1` in:
r.expr(1).do(function(var_1) {
    return var_1("bah").add(3)
           ^^^^^              
})
*/
It('Test backtrace for r.expr(1).do(function(boo) { return boo("bah").add(3); })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr(1).do(function(boo) { return boo("bah").add(3); }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot perform get_field on a non-object non-sequence `1` in:\nr.expr(1).do(function(var_1) {\n    return var_1(\"bah\").add(3)\n           ^^^^^              \n})\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})

/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type NUMBER but found STRING in:
r.branch(r.expr(1).add("hello"), "Hello", "World")
         ^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.branch( r.expr(1).add("hello"), "Hello", "World")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.branch( r.expr(1).add("hello"), "Hello", "World").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.branch(r.expr(1).add(\"hello\"), \"Hello\", \"World\")\n         ^^^^^^^^^^^^^^^^^^^^^^               \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Cannot convert NUMBER to SEQUENCE in:
r.expr(1).forEach(function(var_1) {
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    return var_1("bar")
    ^^^^^^^^^^^^^^^^^^^
})
^^
*/
It('Test backtrace for r.expr(1).forEach(function(foo) { return foo("bar") })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr(1).forEach(function(foo) { return foo("bar") }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot convert NUMBER to SEQUENCE in:\nr.expr(1).forEach(function(var_1) {\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    return var_1(\"bar\")\n    ^^^^^^^^^^^^^^^^^^^\n})\n^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[]

Error:
foo in:
r.error("foo")
^^^^^^^^^^^^^^
*/
It('Test backtrace for r.error("foo")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.error("foo").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "foo in:\nr.error(\"foo\")\n^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[]

Error:
Expected type STRING but found NUMBER in:
r.expr({
^^^^^^^^
    a: 1
    ^^^^
})("b").default("bar").add(2)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr({a:1})("b").default("bar").add(2)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr({a:1})("b").default("bar").add(2).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.expr({\n^^^^^^^^\n    a: 1\n    ^^^^\n})(\"b\").default(\"bar\").add(2)\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type NUMBER but found OBJECT in:
r.expr({
^^^^^^^^
    a: 1
    ^^^^
}).add(2)
^^^^^^^^^
*/
It('Test backtrace for r.expr({a:1}).add(2)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr({a:1}).add(2).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found OBJECT in:\nr.expr({\n^^^^^^^^\n    a: 1\n    ^^^^\n}).add(2)\n^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type NUMBER but found OBJECT in:
r.expr({
^^^^^^^^
    a: 1
    ^^^^
}).add(r.js("2"))
^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr({a:1}).add(r.js("2"))', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr({a:1}).add(r.js("2")).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found OBJECT in:\nr.expr({\n^^^^^^^^\n    a: 1\n    ^^^^\n}).add(r.js(\"2\"))\n^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Cannot coerce NUMBER to ARRAY in:
r.expr(2).coerceTo("ARRAY")
^^^^^^^^^
*/
It('Test backtrace for r.expr(2).coerceTo("ARRAY")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr(2).coerceTo("ARRAY").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot coerce NUMBER to ARRAY in:\nr.expr(2).coerceTo(\"ARRAY\")\n^^^^^^^^^                  \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type NUMBER but found STRING in:
r.expr(2).add("foo").typeOf()
^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr(2).add("foo").typeOf()', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr(2).add("foo").typeOf().run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr(2).add(\"foo\").typeOf()\n^^^^^^^^^^^^^^^^^^^^         \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type NUMBER but found STRING in:
r.expr(2).add("foo").info()
^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr(2).add("foo").info()', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr(2).add("foo").info().run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr(2).add(\"foo\").info()\n^^^^^^^^^^^^^^^^^^^^       \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 1 } ]

Error:
Failed to parse "foo" as JSON in:
r.expr(2).add(r.json("foo"))
              ^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr(2).add(r.json("foo"))', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr(2).add(r.json("foo")).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Failed to parse \"foo\" as JSON in:\nr.expr(2).add(r.json(\"foo\"))\n              ^^^^^^^^^^^^^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
undefined

Error:
Unrecognized option `nonValid` in `replace` after:
r.db("791087f7a75b40ba6a89f96cafefa643").table("da63855c1650bdd5e653662750771333")
Available options are returnVals <bool>, durability <string>, nonAtomic <bool>
*/
It('Test backtrace for r.db(dbName).table(tableName).replace({a:1}, {nonValid:true})', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).replace({a:1}, {nonValid:true}).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Unrecognized option `nonValid` in `replace` after:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\nAvailable options are returnVals <bool>, durability <string>, nonAtomic <bool>") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Durability option `softt` unrecognized (options are "hard" and "soft") in:
r.db("5d7b30df7dbc84066b5d408ae5c83a2e").table("375d7c3c7453e93ff2ed124d468a24cc")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    .replace({
    ^^^^^^^^^^
        a: 1
        ^^^^
    }, {
    ^^^^
        durability: "softt"
        ^^^^^^^^^^^^^^^^^^^
    })
    ^^
*/
It('Test backtrace for r.db(dbName).table(tableName).replace({a:1}, {durability: "softt"})', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).replace({a:1}, {durability: "softt"}).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Durability option `softt` unrecognized (options are \"hard\" and \"soft\") in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    .replace({\n    ^^^^^^^^^^\n        a: 1\n        ^^^^\n    }, {\n    ^^^^\n        durability: \"softt\"\n        ^^^^^^^^^^^^^^^^^^^\n    })\n    ^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 1 }, { type: 'POS', pos: 1 } ]

Error:
Expected type NUMBER but found STRING in:
r.expr([1, 2]).map(r.row.add("eh"))
                   ^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2]).map(r.row.add("eh"))', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2]).map(r.row.add("eh")).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr([1, 2]).map(r.row.add(\"eh\"))\n                   ^^^^^^^^^^^^^^^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 },
  { type: 'POS', pos: 0 },
  { type: 'POS', pos: 0 },
  { type: 'POS', pos: 0 },
  { type: 'POS', pos: 0 },
  { type: 'POS', pos: 0 } ]

Error:
Table `test.foo` does not exist in:
r.table("foo").add(1).add(1).add("hello-super-long-string").add("another-long-string")
^^^^^^^^^^^^^^                                                                        
    .add("one-last-string").map(function(var_1) {
        return r.expr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).map(function(var_2) {
            return var_2("b").add("hello-super-long-string").add("another-long-string").add("one-last-string")
                .add("hello-super-long-string").add("another-long-string").add("one-last-string")
                .add("hello-super-long-string").add("another-long-string").add("one-last-string")
                .add("hello-super-long-string").add("another-long-string").add("one-last-string")
                .add("hello-super-long-string").add("another-long-string").add("one-last-string")
                .mul(var_2("b")).merge({
                    firstName: "xxxxxx",
                    lastName: "yyyy",
                    email: "xxxxx@yyyy.com",
                    phone: "xxx-xxx-xxxx"
                })
        }).add(2).map(function(var_3) {
            return var_3.add("hello-super-long-string").add("another-long-string").add("one-last-string")
                .add("hello-super-long-string").add("another-long-string").add("one-last-string")
                .add("hello-super-long-string").add("another-long-string").add("one-last-string")
                .add("hello-super-long-string").add("another-long-string").add("one-last-string")
                .add("hello-super-long-string").add("another-long-string").add("one-last-string")
        })
    })
*/
It('Test backtrace for r.table("foo").add(1).add(1).add("hello-super-long-string").add("another-long-string").add("one-last-string").map( function(doc) { return r.expr([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]).map(function(test) { return test("b").add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string").mul(test("b")).merge({ firstName: "xxxxxx", lastName: "yyyy", email: "xxxxx@yyyy.com", phone: "xxx-xxx-xxxx" }); }).add(2).map(function(doc) { return doc.add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string") }); })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.table("foo").add(1).add(1).add("hello-super-long-string").add("another-long-string").add("one-last-string").map( function(doc) { return r.expr([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]).map(function(test) { return test("b").add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string").mul(test("b")).merge({ firstName: "xxxxxx", lastName: "yyyy", email: "xxxxx@yyyy.com", phone: "xxx-xxx-xxxx" }); }).add(2).map(function(doc) { return doc.add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string").add("hello-super-long-string").add("another-long-string").add("one-last-string") }); }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Table `test.foo` does not exist in:\nr.table(\"foo\").add(1).add(1).add(\"hello-super-long-string\").add(\"another-long-string\")\n^^^^^^^^^^^^^^                                                                        \n    .add(\"one-last-string\").map(function(var_1) {\n        return r.expr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).map(function(var_2) {\n            return var_2(\"b\").add(\"hello-super-long-string\").add(\"another-long-string\").add(\"one-last-string\")\n                .add(\"hello-super-long-string\").add(\"another-long-string\").add(\"one-last-string\")\n                .add(\"hello-super-long-string\").add(\"another-long-string\").add(\"one-last-string\")\n                .add(\"hello-super-long-string\").add(\"another-long-string\").add(\"one-last-string\")\n                .add(\"hello-super-long-string\").add(\"another-long-string\").add(\"one-last-string\")\n                .mul(var_2(\"b\")).merge({\n                    firstName: \"xxxxxx\",\n                    lastName: \"yyyy\",\n                    email: \"xxxxx@yyyy.com\",\n                    phone: \"xxx-xxx-xxxx\"\n                })\n        }).add(2).map(function(var_3) {\n            return var_3.add(\"hello-super-long-string\").add(\"another-long-string\").add(\"one-last-string\")\n                .add(\"hello-super-long-string\").add(\"another-long-string\").add(\"one-last-string\")\n                .add(\"hello-super-long-string\").add(\"another-long-string\").add(\"one-last-string\")\n                .add(\"hello-super-long-string\").add(\"another-long-string\").add(\"one-last-string\")\n                .add(\"hello-super-long-string\").add(\"another-long-string\").add(\"one-last-string\")\n        })\n    })\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ 'b' ]

Error:
Expected type NUMBER but found STRING in:
r.expr({
    a: 1,
    b: r.expr(1).add("eh")
       ^^^^^^^^^^^^^^^^^^^
})
*/
It('Test backtrace for r.expr({a:1, b:r.expr(1).add("eh")})', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr({a:1, b:r.expr(1).add("eh")}).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr({\n    a: 1,\n    b: r.expr(1).add(\"eh\")\n       ^^^^^^^^^^^^^^^^^^^\n})\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})




/*
Frames:
[]

Error:
Expected type NUMBER but found OBJECT in:
r.db("330a8b0e7ff2501e855f0d45aebe6006").table("80179c85b797f92a3abbb0e40e7b06a3")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    .replace({
    ^^^^^^^^^^
        a: 1
        ^^^^
    }, {
    ^^^^
        durability: "soft"
        ^^^^^^^^^^^^^^^^^^
    }).add(2)
    ^^^^^^^^^
*/
It('Test backtrace for r.db(dbName).table(tableName).replace({a:1}, {durability:"soft"}).add(2)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).replace({a:1}, {durability:"soft"}).add(2).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found OBJECT in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    .replace({\n    ^^^^^^^^^^\n        a: 1\n        ^^^^\n    }, {\n    ^^^^\n        durability: \"soft\"\n        ^^^^^^^^^^^^^^^^^^\n    }).add(2)\n    ^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'OPT', opt: 'durability' } ]

Error:
Expected type NUMBER but found STRING in:
r.db("83db41722b445306270f0129b6bcbde0").table("1264cb52a222e32026ce2d67ac27bc23")
    .replace({
        a: 1
    }, {
       ^
        durability: r.expr(1).add("heloo")
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    })
    ^
*/
It('Test backtrace for r.db(dbName).table(tableName).replace({a:1}, {durability:r.expr(1).add("heloo")})', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).replace({a:1}, {durability:r.expr(1).add("heloo")}).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n    .replace({\n        a: 1\n    }, {\n       ^\n        durability: r.expr(1).add(\"heloo\")\n        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    })\n    ^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'OPT', opt: 'durability' } ]

Error:
Expected type NUMBER but found STRING in:
r.db("6dddeb36901f203298878f980598ce0a").table("5510e0388d908dca1fa4a6dbf00c2852")
    .replace({
        a: 1
    }, {
       ^
        durability: r.expr(1).add("heloo")
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    })
    ^
*/
It('Test backtrace for r.db(dbName).table(tableName).replace({a:1}, {durability:r.expr(1).add("heloo")})', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).replace({a:1}, {durability:r.expr(1).add("heloo")}).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n    .replace({\n        a: 1\n    }, {\n       ^\n        durability: r.expr(1).add(\"heloo\")\n        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    })\n    ^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})

/*
Frames:
[ 'a' ]

Error:
Expected type NUMBER but found STRING in:
r.expr({
    a: r.expr(1).add("eh"),
       ^^^^^^^^^^^^^^^^^^^ 
    b: 2
})
*/
It('Test backtrace for r.expr({a:r.expr(1).add("eh"), b: 2})', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr({a:r.expr(1).add("eh"), b: 2}).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr({\n    a: r.expr(1).add(\"eh\"),\n       ^^^^^^^^^^^^^^^^^^^ \n    b: 2\n})\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type ARRAY but found STRING in:
r.expr([1, 2, 3]).add("eh")
^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).add("eh")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).add("eh").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type ARRAY but found STRING in:\nr.expr([1, 2, 3]).add(\"eh\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[]

Error:
Expected type NUMBER but found OBJECT in:
r.expr({
^^^^^^^^
    a: 1
    ^^^^
}).add("eh")
^^^^^^^^^^^^
*/
It('Test backtrace for r.expr({a:1}).add("eh")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr({a:1}).add("eh").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found OBJECT in:\nr.expr({\n^^^^^^^^\n    a: 1\n    ^^^^\n}).add(\"eh\")\n^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})



/*
Frames:
[ { type: 'POS', pos: 1 } ]

Error:
Cannot perform get_field on a non-object non-sequence `1` in:
r.expr([1, 2, 3]).group("foo")
                        ^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).group("foo")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).group("foo").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot perform get_field on a non-object non-sequence `1` in:\nr.expr([1, 2, 3]).group(\"foo\")\n                        ^^^^^ \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})

/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type GROUPED_DATA but found DATUM:
[1, 2, 3] in:
r.expr([1, 2, 3]).ungroup()
^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3]).ungroup()', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3]).ungroup().run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type GROUPED_DATA but found DATUM:\n[1, 2, 3] in:\nr.expr([1, 2, 3]).ungroup()\n^^^^^^^^^^^^^^^^^          \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})

/*
Frames:
[]

Error:
Expected type NUMBER but found STRING in:
r.expr([1, 2, 3, "hello"]).sum()
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3,"hello"]).sum()', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3,"hello"]).sum().run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr([1, 2, 3, \"hello\"]).sum()\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Expected type NUMBER but found STRING in:
r.expr([1, 2, 3, "hello"]).avg()
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([1,2,3,"hello"]).avg()', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([1,2,3,"hello"]).avg().run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr([1, 2, 3, \"hello\"]).avg()\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[]

Error:
Cannot take the min of an empty stream.  (If you passed `min` a field name, it may be that no elements of the stream had that field.) in:
r.expr([]).min()
^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([]).min()', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([]).min().run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot take the min of an empty stream.  (If you passed `min` a field name, it may be that no elements of the stream had that field.) in:\nr.expr([]).min()\n^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})

/*
Frames:
[]

Error:
Cannot take the max of an empty stream.  (If you passed `max` a field name, it may be that no elements of the stream had that field.) in:
r.expr([]).max()
^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([]).max()', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([]).max().run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot take the max of an empty stream.  (If you passed `max` a field name, it may be that no elements of the stream had that field.) in:\nr.expr([]).max()\n^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})

/*
Frames:
[]

Error:
Cannot take the average of an empty stream.  (If you passed `avg` a field name, it may be that no elements of the stream had that field.) in:
r.expr([]).avg()
^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.expr([]).avg()', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr([]).avg().run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Cannot take the average of an empty stream.  (If you passed `avg` a field name, it may be that no elements of the stream had that field.) in:\nr.expr([]).avg()\n^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type STRING but found NUMBER in:
r.expr(1).upcase()
^^^^^^^^^
*/
It('Test backtrace for r.expr(1).upcase()', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr(1).upcase().run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.expr(1).upcase()\n^^^^^^^^^         \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})

/*
Frames:
[ { type: 'POS', pos: 0 } ]

Error:
Expected type STRING but found NUMBER in:
r.expr(1).downcase()
^^^^^^^^^
*/
It('Test backtrace for r.expr(1).downcase()', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr(1).downcase().run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.expr(1).downcase()\n^^^^^^^^^           \n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})

/*
Frames:
[ { type: 'POS', pos: 0 },
  { type: 'POS', pos: 1 },
  { type: 'POS', pos: 0 } ]

Error:
Expected type STRING but found NUMBER in:
r.expr(1).do(function(var_1) {
    return r.expr(1).object(2)
           ^^^^^^^^^          
})
*/
It('Test backtrace for r.expr(1).do(function(v) { return r.object(1, 2) })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr(1).do(function(v) { return r.object(1, 2) }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.expr(1).do(function(var_1) {\n    return r.expr(1).object(2)\n           ^^^^^^^^^          \n})\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})


/*
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 1 } ]

Error:
OBJECT expects an even number of arguments (but found 1) in:
r.expr(1).do(function(var_1) {
    return r.expr("a").object()
           ^^^^^^^^^^^^^^^^^^^^
})
*/
It('Test backtrace for r.expr(1).do(function(v) { return r.object("a") })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.expr(1).do(function(v) { return r.object("a") }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "OBJECT expects an even number of arguments (but found 1) in:\nr.expr(1).do(function(var_1) {\n    return r.expr(\"a\").object()\n           ^^^^^^^^^^^^^^^^^^^^\n})\n") {
            done()
        }
        else {
            console.log(e.message); done(e);
        }
    }
})

/*
Frames:
[]

Error:
Expected type NUMBER but found STRING in:
r.random(2, 3).sub("foo")
^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.random(2, 3, {float: true}).sub("foo")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.random(2, 3, {float: true}).sub("foo").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.random(2, 3).sub(\"foo\")\n^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            done(e);
        }
    }
})


/*
Frames:
[ 0 ]

Error:
Expected type NUMBER but found STRING in:
r.random("foo", "bar")
         ^^^^^
*/
It('Test backtrace for r.random("foo", "bar")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.random("foo", "bar").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.random(\"foo\", \"bar\")\n         ^^^^^      \n") {
            done()
        }
        else {
            done(e);
        }
    }
})

/*
Frames:
undefined

Error:
`random` takes at most 3 arguments, 4 provided after:
r.undefined()
*/
It('Test backtrace for r.random("foo", "bar", "bar", "bar")', function* (done) {
    try {
        r.nextVarId=1;
        yield r.random("foo", "bar", "bar", "bar").run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "`random` takes at most 3 arguments, 4 provided after:\nr.undefined()") {
            done()
        }
        else {
            done(e);
        }
    }
})

/*
Frames:
[ 0 ]

Error:
Expected type DATUM but found SEQUENCE:
OPAQUE VALUE SEQUENCE in:
r.db("bd98452de5ea16f3572ed0d404a2e99c").table("c966dac895ef558f3dfdbfb8be003374")
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    .changes().add(2)
    ^^^^^^^^^^
*/
It('Test backtrace for r.db(dbName).table(tableName).changes().add(2)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.db(dbName).table(tableName).changes().add(2).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type DATUM but found SEQUENCE:\nOPAQUE VALUE SEQUENCE in:\nr.db(\""+dbName+"\").table(\""+tableName+"\")\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n    .changes().add(2)\n    ^^^^^^^^^^       \n") {
            done()
        }
        else {
            done(e);
        }
    }
})

/*
Frames:
[ 0 ]

Error:
Error in HTTP GET of ``: URL using bad/illegal format or missing URL in:
r.http("").add(2)
^^^^^^^^^^
*/
It('Test backtrace for r.http("").add(2)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.http("").add(2).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Error in HTTP GET of ``: URL using bad/illegal format or missing URL in:\nr.http(\"\").add(2)\n^^^^^^^^^^       \n") {
            done()
        }
        else {
            done(e);
        }
    }
})

/*
Frames:
[]

Error:
Expected type STRING but found NUMBER in:
r.args(["foo", "bar"]).add(2)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
It('Test backtrace for r.args(["foo", "bar"]).add(2)', function* (done) {
    try {
        r.nextVarId=1;
        yield r.args(["foo", "bar"]).add(2).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type STRING but found NUMBER in:\nr.args([\"foo\", \"bar\"]).add(2)\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n") {
            done()
        }
        else {
            done(e);
        }
    }
})

/*
Frames:
[ { type: 'POS', pos: 0 }, { type: 'POS', pos: 1 } ]

Error:
Expected type NUMBER but found STRING. in:
r.expr(1).do(function(var_1) {
    return var_1.add("foo")
           ^^^^^^^^^^^^^^^^
})
*/
It('Test backtrace for r.do(1,function( b) { return b.add("foo") })', function* (done) {
    try {
        r.nextVarId=1;
        yield r.do(1,function( b) { return b.add("foo") }).run()
        done(new Error("Should have thrown an error"))
    }
    catch(e) {
        if (e.message === "Expected type NUMBER but found STRING in:\nr.expr(1).do(function(var_1) {\n    return var_1.add(\"foo\")\n           ^^^^^^^^^^^^^^^^\n})\n") {
            done()
        }
        else {
            done(e);
        }
    }
})

