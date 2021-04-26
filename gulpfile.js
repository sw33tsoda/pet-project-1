const browserSync = require('browser-sync');
const Gulp = require('gulp');
const Scss = require('gulp-sass');
const TypeScript = require('gulp-typescript');
const UglifyCSS = require('gulp-uglifycss');
const UglifyJS = require('gulp-uglify');

// SCSS ===> CSS (Assets)
Gulp.task('scss', () => Gulp.src('./src/app/scss/*.scss')
    .pipe(Scss({outputStyle:'expanded'}))
    .on('error',Scss.logError)
    .pipe(Gulp.dest('./src/assets/css/'))
);

// CSS === Uglify ===> UglyCSS (Public)
// Gulp.task('css', () => Gulp.src('./src/assets/css/*.css')
//     .pipe(UglifyCSS({
//         maxLineLen:     1,
//         uglyComments:   true,
//     }))
//     .pipe(Gulp.dest('./src/public/css/'))
// );

Gulp.task('typescript', () => Gulp.src('./src/app/ts/*.ts')
    .pipe(TypeScript({
        removeComments: true,
    }))
    .pipe(Gulp.dest('./src/assets/js/'))
);

// Gulp.task('javascript', () => Gulp.src('./src/assets/js/*.js')
//     .pipe(UglifyJS())
//     .pipe(Gulp.dest('./src/public/js/'))
// );

Gulp.task('run',Gulp.series(['scss'],['typescript']));

Gulp.task('watch', () => {

    browserSync({
        server:{
            baseDir:'./'
        }
    });

    // Watching HTML
    Gulp.watch('./index.html').on('change',browserSync.reload);

    // Watching CSS
    Gulp.watch('./src/app/scss/', Gulp.series(['scss']));
    // Gulp.watch('./src/assets/css/*.css', Gulp.series(['css']));
    Gulp.watch('./src/assets/css/*.css').on('change',browserSync.reload);

    // Watching Javascript
    Gulp.watch('./src/app/ts/', Gulp.series(['typescript']));
    // Gulp.watch('./src/assets/js/*.js', Gulp.series(['javascript']));
    Gulp.watch('./src/assets/js/*.js').on('change',browserSync.reload);
    console.log(`
        ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤\n
        ❤                sw33tsoda                ❤\n
        ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤
    `);
});

Gulp.task('default',Gulp.series('run','watch'));
