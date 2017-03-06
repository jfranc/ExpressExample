const gulp = require("gulp");
const sourcemaps = require('gulp-sourcemaps');
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");

gulp.task("min", function() {
    gulp.src(["angularjs/miApp.js", "angularjs/ctrls/**/*.js"])
        .pipe(plumber())
        .pipe(sourcemaps.init())
            .pipe(concat("all.js"))
        .pipe(sourcemaps.write())
        .pipe(plumber.stop())
        .pipe(gulp.dest("public/dist/"));
});

gulp.task("watch", function() {
    gulp.watch(["angularjs/miApp.js", "angularjs/ctrls/**/*.js"], ["min"]);
});
