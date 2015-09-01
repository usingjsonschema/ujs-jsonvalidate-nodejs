/**
 * Unit tests for validate module
 */
var assert = require ("assert");
var fs = require ("fs");
var path = require ("path");
var testServer = require ("./testServer.js");

var v = require ("../lib/validate");
var SafeFileError = require ("ujs-safefile").SafeFileError;
var cc = SafeFileError.prototype;

before (function () {
    testServer.createTestServer (8081);
});

after (function () {
    testServer.closeTestServer ();
});

// get path to test directory for location of test files
var base = path.join (path.dirname (fs.realpathSync (__filename)));

describe ("validate", function () {
    describe ("handle data file does not exist error", function () {
        it ("should have result code DOES_NOT_EXIST", function (done) {
            v.validate (base + "/nofile.json", base + "/schema1.json", [], null, function (code, data, message) {
                assert.strictEqual (code, cc.DOES_NOT_EXIST);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle schema file does not exist error", function () {
        it ("should have result code DOES_NOT_EXIST", function (done) {
            v.validate (base + "/valid1.json", base + "/nofile.json", [], null, function (code, data, message) {
                assert.strictEqual (code, cc.DOES_NOT_EXIST);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle ref file does not exist error", function () {
        it ("should have result code DOES_NOT_EXIST", function (done) {
            v.validate (base + "/valid1.json", base + "/schema1.json", [base + "/nofile.json"], null, function (code, data, message) {
                assert.strictEqual (code, cc.DOES_NOT_EXIST);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle jsdb file does not exist error", function () {
        it ("should have result code DOES_NOT_EXIST", function (done) {
            v.validate (base + "/valid1.json", base + "/schema1.json", null, base + "/nofile.json", function (code, data, message) {
                assert.strictEqual (code, cc.DOES_NOT_EXIST);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle data file invalid name error", function () {
        it ("should have result code INVALID_NAME", function (done) {
            v.validate (null, base + "/schema1.json", null, null, function (code, data, message) {
                assert.strictEqual (code, cc.INVALID_NAME);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle schema file invalid name error", function () {
        it ("should have result code INVALID_NAME", function (done) {
            v.validate (base + "/valid1.json", null, null, null, function (code, data, message) {
                assert.strictEqual (code, cc.INVALID_NAME);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle data file invalid JSON error", function () {
        it ("should have result code INVALID_JSON", function (done) {
            v.validate (base + "/invalid.json", base + "/schema1.json", null, null, function (code, data, message) {
                assert.strictEqual (code, v.INVALID_JSON);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle schema file invalid JSON error", function () {
        it ("should have result code INVALID_JSON", function (done) {
            v.validate (base + "/valid1.json", base + "/invalid.json", null, null, function (code, data, message) {
                assert.strictEqual (code, v.INVALID_JSON);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle data file invalid JSON error", function () {
        it ("should have result code INVALID_JSON", function (done) {
            v.validate (base + "/valid1.json", base + "/schema1.json", [base + "/invalid.json"], null, function (code, data, message) {
                assert.strictEqual (code, v.INVALID_JSON);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle data file invalid JSON error", function () {
        it ("should have result code INVALID_JSON", function (done) {
            v.validate (base + "/valid1.json", base + "/schema1.json", null, base + "/invalid.json", function (code, data, message) {
                assert.strictEqual (code, v.INVALID_JSON);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle ref file missing ID error", function () {
        it ("should have result code MISSING_ID", function (done) {
            v.validate (base + "/valid1.json", base + "/schema1.json", [base + "/valid1.json"], null, function (code, data, message) {
                assert.strictEqual (code, v.MISSING_ID);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });
});

describe ("validate2", function () {
    describe ("valid JSON", function () {
        it ("should have result code VALID", function (done) {
            v.validate (base + "/valid1.json", base + "/schema1.json", [], null, function (code, data, message) {
                assert.strictEqual (code, v.VALID);
                assert.notStrictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("valid JSON with file ref", function () {
        it ("should have result code VALID", function (done) {
            v.validate (base + "/valid2.json", base + "/schema2.json", [base + "/ref2.json"], null, function (code, data, message) {
                assert.strictEqual (code, v.VALID);
                assert.notStrictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("valid JSON with http ref", function () {
        it ("should have result code VALID", function (done) {
            v.validate (base + "/valid5.json", base + "/schema5.json", [], null, function (code, data, message) {
                assert.strictEqual (code, v.VALID);
                assert.notStrictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("valid JSON with JSDB ref", function () {
        it ("should have result code VALID", function (done) {
            v.validate (base + "/valid3.json", base + "/schema3.json", null, base + "/jsdb3.json", function (code, data, message) {
                assert.strictEqual (code, v.VALID);
                assert.notStrictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("invalid JSON", function () {
        it ("should have result code VALIDATION_ERROR", function (done) {
            v.validate (base + "/invalid1.json", base + "/schema1.json", [], null, function (code, data, message) {
                assert.strictEqual (code, v.VALIDATION_ERROR);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("invalid JSON with file ref", function () {
        it ("should have result code VALIDATION_ERROR", function (done) {
            v.validate (base + "/invalid2.json", base + "/schema2.json", [base + "/ref2.json"], null, function (code, data, message) {
                assert.strictEqual (code, v.VALIDATION_ERROR);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("invalid JSON with http ref", function () {
        it ("should have result code VALIDATION_ERROR", function (done) {
            v.validate (base + "/invalid5.json", base + "/schema5.json", [], null, function (code, data, message) {
                assert.strictEqual (code, v.VALIDATION_ERROR);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("invalid JSON with JSDB ref", function () {
        it ("should have result code VALIDATION_ERROR", function (done) {
            v.validate (base + "/invalid3.json", base + "/schema3.json", null, base + "/jsdb3.json", function (code, data, message) {
                assert.strictEqual (code, v.VALIDATION_ERROR);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("valid JSON with 3 depth JSDB ref", function () {
        it ("should have result code VALID", function (done) {
            v.validate (base + "/valid4.json", base + "/schema4.json", null, base + "/jsdb4.json", function (code, data, message) {
                assert.strictEqual (code, v.VALID);
                assert.notStrictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("invalid JSON with 3 depth JSDB ref", function () {
        it ("should have result code VALIDATION_ERROR", function (done) {
            v.validate (base + "/invalid4.json", base + "/schema4.json", null, base + "/jsdb4.json", function (code, data, message) {
                assert.strictEqual (code, v.VALIDATION_ERROR);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });
});
