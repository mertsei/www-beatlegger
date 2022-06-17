const gulp         = require('gulp');
const browserSync  = require('browser-sync');
const sass         = require('gulp-sass')(require('sass'));
const cleanCSS     = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename       = require("gulp-rename");
const htmlmin      = require("gulp-htmlmin");
const replace      = require("gulp-replace");

// reload on changes
gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/js/*.js").on('change', browserSync.reload);
});

// process styles
gulp.task('styles',function(){
    return gulp.src([
        'src/sass/**/*.+(scss|sass)',
        'src/css/**/*.+(css)'
    ])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

// process htmls
gulp.task('html', function(){
    return gulp.src([
        "src/*.html"
    ])
    .pipe(replace( 'sass/index.sass', 'css/index.min.css') )
    .pipe(replace( 'css/fonts.css', 'css/fonts.min.css') )
    .pipe(replace( 'js/index.js', 'js/bundle.js') )
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

// watch the files and reload on changes
gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("src/css/**/*.+(css)", gulp.parallel('styles'));
    gulp.watch("src/*.html", gulp.parallel('html'));
});

// launch functions above
gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html'));


// Standalone functions, call manually
// move fonts
gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

// move img and icons folders contents
gulp.task('images', function() {
    return gulp.src(['src/img/**/*', 'src/icons/**/*'], {base: './src/'})
    .pipe(gulp.dest('dist'));
});