'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

gulp.task('scripts', function() {
    return gulp.src('frontend/app/*.js')
            .pipe(livereload());
});

gulp.task('html',function(){
    return gulp.src('frontend/app/index.html')
            .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('frontend/app/**/*.js', ['scripts']);
    gulp.watch('frontend/app/**/*.html', ['html']);
});

gulp.task('server',function(){
    nodemon({
        'script': 'server.js',
        'ignore': 'public/js/*.js'
    });
});

gulp.task('serve', ['server','watch']);
