var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var watch = require('gulp-watch');
var sass = require('gulp-sass');



var source = {
    js: {
        src: [
            'app/app.js',
            'app/**/module.js',
            'app/**/!(module)*.js',
            'app/*.js'
        ]
    },
    css: {
        watch: [
            'styles/css/**/*.css'
        ],
        src: [
            'styles/css/**/*.css'
        ]
    }
}

gulp.task('connect', function() {
    connect.server({
        port: 8081
    });
});

// app js
gulp.task('app-js', function() {
    gulp.src(source.js.src)
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./assets/js'));
});

// vendor js
gulp.task('vendor-js', function() {
    gulp.src(['./vendor/js/angular.js', './vendor/js/jquery.min.js', './vendor/js/**/*.js'])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('./assets/js'));
});


// vendor css
gulp.task('vendor-css', function() {
    return gulp.src('vendor/css/*.css')
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('./assets/css'));
});

// app sass
gulp.task('app-sass', function() {
    return gulp.src('./styles/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styles/css'));
});


//app-css
gulp.task('app-css', ['app-sass'], function() {
    return gulp.src(source.css.src)
        .pipe(concat('app.min.css'))
        // .pipe(nano())
        .pipe(gulp.dest('./assets/css'));
});


// watch
gulp.task('watch', function() {
    gulp.watch(source.js.src, ['app-js']);
    gulp.watch('./styles/scss/**/*.scss', ['app-sass']);
    gulp.watch(source.css.watch, ['app-css']);
});


gulp.task('default', ['vendor-js', 'vendor-css', 'app-js', 'app-sass', 'app-css', 'connect', 'watch']);
