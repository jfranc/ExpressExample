const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");

gulp.task("min", function() {
    gulp.src(["public/angularjs/miApp.js", "public/angularjs/ctrls/**/*.js"])
        .pipe(plumber())
        .pipe(concat("all.js"))
        .pipe(plumber.stop())
        .pipe(gulp.dest("public/dist/"));
});

gulp.task("watch", function() {
    gulp.watch(["public/angularjs/miApp.js", "public/angularjs/ctrls/**/*.js"], ["min"]);
});
