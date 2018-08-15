var gulp = require('gulp'),
	sass = require('gulp-sass'),
	jade = require('gulp-jade'),
	pug = require('gulp-pug'),
	uglify = require('gulp-uglifyjs'),
	minifyCSS = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
    return gulp.src('src/css/**/*')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('pug', function(){
    return gulp.src('src/index.pug') 
        .pipe(pug({
			pretty: true
		}))
        .pipe(gulp.dest('dist'))
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['sass', 'pug', 'fonts', 'img', 'scripts'], function() {
    gulp.watch('src/css/**/*', ['sass']); 
    gulp.watch('src/**/*.pug', ['pug'])
    gulp.watch('src/fonts/**/*', ['fonts'])
    gulp.watch('src/img/**/*', ['img'])
    gulp.watch('src/js/**/*.js', ['scripts']);
});

gulp.task( 'default', [ 'watch' ] )