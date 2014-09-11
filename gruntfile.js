var semver = require('semver'),
	format = require('util').format;

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: [
            ' // ----------------------------------------------------------------------------',
            ' // <%= pkg.description %>',
            ' // v<%= pkg.version %> - Built <%= grunt.template.today("yyyy-mm-dd HH:MM") %>',
            ' // Licensed under the MIT license.',
            ' // http://buzz.jaysalvat.com/',
            ' // ----------------------------------------------------------------------------',
            ' // Copyright (C) 2010-<%= grunt.template.today("yyyy") %> Jay Salvat',
            ' // http://jaysalvat.com/',
            ' // ----------------------------------------------------------------------------',
            '\n'
        ].join('\n'),

        jshint: {
            files: ['gruntfile.js', 'src/**/*.js']
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            js: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true
                },
                src: 'src/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.js'
            },
            jsmin: {
                options: {
                    mangle: true,
                    compress: true
                },
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        exec: {
            publish: {
                cmd: [
                    'cp -r dist/ tmp/',
                    'zip -rj tmp/buzz.zip tmp/buzz.js',
                    'zip -rj tmp/buzz.zip tmp/buzz.min.js',
                    'git checkout gh-pages',
                    'rm -rf releases/latest/',
                    'cp -r tmp/ releases/<%= pkg.version %>/',
                    'cp -r tmp/ releases/latest/',
                    'git add -A releases/<%= pkg.version %>',
                    'git add -A releases/latest',
                    'git commit -m "Published v<%= pkg.version %>."',
                    'git push origin gh-pages',
                    'git checkout -',
                    'rm -rf tmp/'
                ].join(' && ')
            },
            gitFailIfDirty: {
                cmd: 'test -z "$(git status --porcelain)"'
            },
            gitAdd: {
                cmd: 'git add .'
            },
            gitCommit: {
                cmd: function(message) {
                    return format('git commit -m "Build %s"', message);
                }
            },
            gitTag: {
                cmd: function(version) {
                    return format('git tag v%s -am "%s"', version, version);
                }
            },
            gitPush: {
                cmd: [
                    'git push origin master',
                    'git push origin master --tags'
                ].join(' && ')
            }
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build',   ['jshint', 'uglify', 'metadata']);
    grunt.registerTask('publish', ['exec:publish']);

    // Audio can't be tested by PhantomJs. 
    // so just jshint. Better idea?
    grunt.registerTask('test',    ['jshint']);

    grunt.registerTask('release', 'Release lib.', function(version) {
        var pkg = grunt.file.readJSON('package.json');

        version = semver.inc(pkg.version, version) || version;

        if (!semver.valid(version) || semver.lte(version, pkg.version)) {
            grunt.fatal('Invalid version.');
        }

        pkg.version = version;
        grunt.config.data.pkg = pkg;

        grunt.task.run([
            'exec:gitFailIfDirty',
            'build',
            'metadata:' + version,
            'manifests:' + version,
            'exec:gitAdd',
            'exec:gitCommit:' + version,
            'exec:gitTag:' + version,
            'exec:gitPush',
            'exec:publish'
        ]);
    });

    grunt.registerTask('manifests', 'Update manifests.', function(version) {
        if (!semver.valid(version)) {
            grunt.fatal('Invalid version');
        }

        var pkg = grunt.file.readJSON('package.json'),
            bwr = grunt.file.readJSON('bower.json'),
            cpt = grunt.file.readJSON('component.json');

        pkg.version = version;
        bwr.version = version;
        cpt.version = version;

        grunt.file.write('package.json',   JSON.stringify(pkg, null, 2));
        grunt.file.write('bower.json',     JSON.stringify(bwr, null, 2));
        grunt.file.write('component.json', JSON.stringify(cpt, null, 2));
    });

    grunt.registerTask('metadata', 'Create metadata file.', function(version) {
        if (!version) {
            version = grunt.file.readJSON('package.json').version;
        }

        var metadata = {
            'date': grunt.template.today("yyyy-mm-dd HH:MM:ss"),
            'version': version
        };

        grunt.file.write('dist/metadata.json', JSON.stringify(metadata, null, 2));
    });
};