var gen = require('../');
var should = require('should');
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');

describe('basic test', function() {

    var src = path.resolve(__dirname, 'logo');
    var dest = path.resolve(__dirname, 'tmp');
    var cssPath = path.resolve(__dirname, 'tmp', 'out.css');

    it('simple copy', function(done) {
        gen('test/logo/*.png', {out: cssPath, urlRoot: '../logo/'}, function(err) {
            should(fs.readFileSync(cssPath, {encoding: 'utf8'})).eql('.es6{\n    width: 406px;\n    height: 140px;\n    background-image: url(../logo/es6.png);\n}\n.react-logo{\n    width: 391px;\n    height: 377px;\n    background-image: url(../logo/react-logo.png);\n}\n', 'css content is incorrect');
            done();
        });
    });


    afterEach(function() {
        try {
            rimraf.sync(dest);
        } catch (e) {}
    });

});
