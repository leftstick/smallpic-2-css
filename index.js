'use strict';

var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');
var glob = require('glob');

var createParent = function(out, cb) {
    var dir;
    try {
        dir = path.dirname(out);
        fs.stat(dir, function(err, stat) {
            if (err) {
                fs.mkdir(dir, function(err2) {
                    if (err2) {
                        createParent(dir, function() {
                            createParent(out, cb);
                        });
                        return;
                    }
                    cb();
                });
                return;
            }
            cb();
        });
    } catch (e) {
        process.nextTick(function() {
            cb(e);
        });
    }
};

var generator = function(pattern, options, cb) {
    glob(pattern, function(err, files) {
        if (err) {
            cb(err);
            return;
        }
        createParent(options.out, function(err) {
            if (err) {
                cb(err);
                return;
            }

            var outStream = fs.createWriteStream(options.out, {
                defaultEncoding: 'utf8'
            });

            var ignores = [];
            files.forEach(function(file) {
                var basename = path.basename(file);
                var stat = fs.statSync(file);
                if (options.picSizeLimit && stat.size > options.picSizeLimit) {
                    ignores.push(basename);
                    return;
                }
                var dimensions = sizeOf(file);
                var name = basename.substring(0, basename.indexOf('.'));

                outStream.write('.' + name + '{\n    width: ' + dimensions.width + 'px;\n    height: ' + dimensions.height + 'px;\n    background-image: url(' + options.urlRoot + basename + ');\n}\n');
            });
            outStream.end(cb);
            if (!options.quite && ignores.length) {
                console.log(require('chalk').yellow('[ ' + ignores.join(', ') + ' ] ' + (ignores.length === 1 ? 'is' : 'are') + ' ignored because of the exceeded size'));
            }
        });
    });
};

module.exports = generator;
