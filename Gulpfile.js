var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

// Define la tarea de donde va a tomar los estilos, depues con que va ser procesado y finalmente en donde lo colocará
gulp.task('styles', function() {
    gulp.src('./index.scss')
        .pipe(sass())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('public'));
})

gulp.task('assets', function() {
    gulp.src('assets/*')
        .pipe(gulp.dest('public'))
})

function compile(watch) {
    var bundle = browserify('./src/index.js');

    function rebundle() {
        bundle
        .transform(babel, { presets: ['env'] })
        .bundle()
        .on('error', function(err) {
            console.log(err)
            this.emit('end')
        })
        .pipe(source('index.js'))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('public')); 
    }

    if (watch) {
        bundle = watchify(bundle);
        bundle.on('update', function() {
            console.log('--> Bundling...');
            rebundle();
        });
    }

    rebundle();
}

gulp.task('build', function() {
    return compile();
});

gulp.task('watch', function() {
    return compile(true);
});

// Define la tarea por default
gulp.task('default', ['styles', 'assets', 'build'])

