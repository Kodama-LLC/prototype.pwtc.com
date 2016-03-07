var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    compass      = require('gulp-compass'),
    autoprefix   = require('gulp-autoprefixer'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    plumber      = require('gulp-plumber'),
    rename       = require('gulp-rename'),
    notify       = require('gulp-notify'),
    watch        = require('gulp-watch'),
    livereload   = require('gulp-livereload');

var plumberErrorHandler = { errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
})};

gulp.task('default', [
    'images',
    'scripts',
    'compass',
    'watch'
]);

gulp.task('images', function(){
    gulp.src('web/images/source/**/*.{png,jpg,gif,svg}').pipe(plumber(plumberErrorHandler))
        .pipe(rename({ suffix: '.min' }))
        .pipe(imagemin({
            optimizationLevel: 7,
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('web/images/manified'))
        .pipe(livereload());
});

gulp.task('scripts', function(){
    gulp.src(['node_modules/foundation-sites/dist/foundation.js', 'web/js/app.js'])
        .pipe(concat('app.js'))
        .pipe(plumber(plumberErrorHandler))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('web/js'))
        .pipe(livereload());
});

gulp.task('compass', function(){
    gulp.src('web/scss/**/*.scss').pipe(plumber(plumberErrorHandler))
        .pipe(compass({
            sass: 'web/scss',
            css: 'web/stylesheets',
            font: 'web/fonts',
            javascript: 'web/js',
            image: 'web/images',
            import_path: [
                'node_modules/foundation-sites/scss'
            ],
            style: 'nested',
            comments: true,
            source_map: true,
            time: true
        }))
        .pipe(autoprefix('last 4 version'))
        .pipe(gulp.dest('web/stylesheets'))
        .pipe(livereload());
});

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('web/images/source/**/*.{png,jpg,gif,svg}', ['images']);
    gulp.watch('web/js/app.js', ['scripts']);
    gulp.watch('web/scss/**/*.scss', ['compass']);
});