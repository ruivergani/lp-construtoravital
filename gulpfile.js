const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const { spawn } = require('child_process');

// Compile Sass Function
function compilaSass() {
    return gulp.src('scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false,
        }))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());
}
gulp.task('sass', compilaSass);

// Concat all plugins CSS
function pluginsCSS() {
    return gulp.src('css/lib/*.css')
        .pipe(concat('plugins.css'))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());
}
gulp.task('plugincss', pluginsCSS);

// Concat all JS
function gulpJS() {
    return gulp.src('js/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.stream());
}
gulp.task('allJS', gulpJS);

// PHP Server Function
function phpServer() {
    const php = spawn('php', ['-S', 'localhost:8080']);
    php.stdout.on('data', data => console.log(`stdout: ${data}`));
    php.stderr.on('data', data => console.error(`stderr: ${data}`));
    php.on('close', code => console.log(`child process exited with code ${code}`));
}
gulp.task('php', phpServer);

// BrowserSync Function
function browser() {
    browserSync.init({
        proxy: 'localhost:8080',
        open: true,
        notify: false
    });
}
gulp.task('browser-sync', browser);

// Watch Function
function watch() {
    gulp.watch('scss/*.scss', compilaSass);
    gulp.watch('css/lib/*.css', pluginsCSS);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/scripts/*.js', gulpJS);
}
gulp.task('watch', watch);

// Gulp default
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'plugincss', 'allJS', 'php'));
