/**
 * Unit tests for validate module
 */
var assert = require ("assert");
var fs = require ("fs");
var path = require ("path");

var v = require ("../lib/validate");
var SafeFileError = require ("ujs-safefile").SafeFileError;
var cc = SafeFileError.prototype;

// get path to test directory for location of test files
var path = path.join (path.dirname (fs.realpathSync (__filename)));

describe ("validate", function () {
    describe ("handle data file does not exist error", function () {
        it ("should have result code DOES_NOT_EXIST", function (done) {
            v.validate (path + "/nofile.json", path + "/schema1.json", [], null, function (code, data, message) {
                assert.strictEqual (code, cc.DOES_NOT_EXIST);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle schema file does not exist error", function () {
        it ("should have result code DOES_NOT_EXIST", function (done) {
            v.validate (path + "/valid1.json", path + "/nofile.json", [], null, function (code, data, message) {
                assert.strictEqual (code, cc.DOES_NOT_EXIST);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle ref file does not exist error", function () {
        it ("should have result code DOES_NOT_EXIST", function (done) {
            v.validate (path + "/valid1.json", path + "/schema1.json", [path + "/nofile.json"], null, function (code, data, message) {
                assert.strictEqual (code, cc.DOES_NOT_EXIST);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle jsdb file does not exist error", function () {
        it ("should have result code DOES_NOT_EXIST", function (done) {
            v.validate (path + "/valid1.json", path + "/schema1.json", null, path + "/nofile.json", function (code, data, message) {
                assert.strictEqual (code, cc.DOES_NOT_EXIST);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle data file invalid name error", function () {
        it ("should have result code INVALID_NAME", function (done) {
            v.validate (null, path + "/schema1.json", null, null, function (code, data, message) {
                assert.strictEqual (code, cc.INVALID_NAME);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle schema file invalid name error", function () {
        it ("should have result code INVALID_NAME", function (done) {
            v.validate (path + "/valid1.json", null, null, null, function (code, data, message) {
                assert.strictEqual (code, cc.INVALID_NAME);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle data file invalid JSON error", function () {
        it ("should have result code INVALID_JSON", function (done) {
            v.validate (path + "/invalid.json", path + "/schema1.json", null, null, function (code, data, message) {
                assert.strictEqual (code, v.INVALID_JSON);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle schema file invalid JSON error", function () {
        it ("should have result code INVALID_JSON", function (done) {
            v.validate (path + "/valid1.json", path + "/invalid.json", null, null, function (code, data, message) {
                assert.strictEqual (code, v.INVALID_JSON);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle data file invalid JSON error", function () {
        it ("should have result code INVALID_JSON", function (done) {
            v.validate (path + "/valid1.json", path + "/schema1.json", [path + "/invalid.json"], null, function (code, data, message) {
                assert.strictEqual (code, v.INVALID_JSON);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle data file invalid JSON error", function () {
        it ("should have result code INVALID_JSON", function (done) {
            v.validate (path + "/valid1.json", path + "/schema1.json", null, path + "/invalid.json", function (code, data, message) {
                assert.strictEqual (code, v.INVALID_JSON);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("handle ref file missing ID error", function () {
        it ("should have result code MISSING_ID", function (done) {
            v.validate (path + "/valid1.json", path + "/schema1.json", [path + "/valid1.json"], null, function (code, data, message) {
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
            v.validate (path + "/valid1.json", path + "/schema1.json", [], null, function (code, data, message) {
                assert.strictEqual (code, v.VALID);
                assert.notStrictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("valid JSON with file ref", function () {
        it ("should have result code VALID", function (done) {
            v.validate (path + "/valid2.json", path + "/schema2.json", [path + "/ref2.json"], null, function (code, data, message) {
                assert.strictEqual (code, v.VALID);
                assert.notStrictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("valid JSON with JSDB ref", function () {
        it ("should have result code VALID", function (done) {
            v.validate (path + "/valid3.json", path + "/schema3.json", null, path + "/jsdb3.json", function (code, data, message) {
                assert.strictEqual (code, v.VALID);
                assert.notStrictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("invalid JSON", function () {
        it ("should have result code VALIDATION_ERROR", function (done) {
            v.validate (path + "/invalid1.json", path + "/schema1.json", [], null, function (code, data, message) {
                assert.strictEqual (code, v.VALIDATION_ERROR);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("invalid JSON with file ref", function () {
        it ("should have result code VALIDATION_ERROR", function (done) {
            v.validate (path + "/invalid2.json", path + "/schema2.json", [path + "/ref2.json"], null, function (code, data, message) {
                assert.strictEqual (code, v.VALIDATION_ERROR);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("invalid JSON with JSDB ref", function () {
        it ("should have result code VALIDATION_ERROR", function (done) {
            v.validate (path + "/invalid3.json", path + "/schema3.json", null, path + "/jsdb3.json", function (code, data, message) {
                assert.strictEqual (code, v.VALIDATION_ERROR);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("valid JSON with 3 depth JSDB ref", function () {
        it ("should have result code VALID", function (done) {
            v.validate (path + "/valid4.json", path + "/schema4.json", null, path + "/jsdb4.json", function (code, data, message) {
                assert.strictEqual (code, v.VALID);
                assert.notStrictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });

    describe ("invalid JSON with 3 depth JSDB ref", function () {
        it ("should have result code VALIDATION_ERROR", function (done) {
            v.validate (path + "/invalid4.json", path + "/schema4.json", null, path + "/jsdb4.json", function (code, data, message) {
                assert.strictEqual (code, v.VALIDATION_ERROR);
                assert.strictEqual (data, null);
                assert.notStrictEqual (message, null);
                done ();
            });
        });
    });
});
