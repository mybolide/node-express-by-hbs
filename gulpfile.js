var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var tinypng = require('gulp-tinypng-compress');




gulp.task("tinypng", function(){
    gulp.src('./static/images/src/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: 'KW8hT5AMx05TI9DVXLx_hoQOD7BDU1OM',
            sigFile: 'images/.tinypng-sigs',
            log: true
        })).on('error', function(err) {
            console.error(err.message);
        })
        .pipe(gulp.dest('./static/images'));
});


gulp.task('sassfile',function(){
    return gulp.src('./static/css/src/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'     
    }))
    .pipe(sourcemaps.write())
    .pipe( gulp.dest( './static/css' ) );
});





gulp.task('default', function() {
  // 将你的默认的任务代码放在这
  gulp.watch('./static/css/src/*.scss', ['sassfile']);
});