const browserSync = require('browser-sync');
const Gulp = require('gulp');
const Scss = require('gulp-sass');
const UglifyCSS = require('gulp-uglifycss');

// SCSS ===> CSS (Assets)
Gulp.task('scss', () => Gulp.src('./src/app/scss/*.scss')
    .pipe(Scss({outputStyle:'expanded'}))
    .on('error',Scss.logError)
    .pipe(Gulp.dest('./src/assets/css/'))
);

// CSS === Uglify ===> UglyCSS (Public)
Gulp.task('css', () => Gulp.src('./src/assets/css/*.css')
    .pipe(UglifyCSS({
        maxLineLen:     1,
        uglyComments:   true,
    }))
    .pipe(Gulp.dest('./src/public/css/'))
);

Gulp.task('run',Gulp.series(['scss','css']));

Gulp.task('watch', () => {

    browserSync({
        server:{
            baseDir:'.'
        }
    });

    Gulp.watch('./index.html').on('change',browserSync.reload);
    Gulp.watch('./src/app/scss/', Gulp.series(['scss']));
    Gulp.watch('./src/assets/css/*.css', Gulp.series(['css'])).on('change',browserSync.reload);
});

Gulp.task('default',Gulp.series('run','watch'));
