var gulp 			= require('gulp'),
	pkg				= require('./package.json'),
	autoprefixer 	= require('gulp-autoprefixer'),
	less 			= require('gulp-less'),
	cssmin 			= require('gulp-cssmin'),
	uglify 			= require('gulp-uglify');
	sequence		= require('run-sequence'),
    

gulp.task('default', function () {
    return gulp.src('src/app.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('less', function() {
	return gulp.src('./src/less/'+pkg.name+'.less')
		.pipe(less({
			paths: ['./src/less']
		}))
		.pipe(autoprefixer())
		.pipe(gulp.dest('./src/css'));
});

gulp.task('cssmin', function() {
	return gulp.src('./src/css/'+pkg.name+'.css')
		.pipe(cssmin())
		.pipe(gulp.dest('./html/css'))
});

gulp.task('css', function() {
	sequence('less', 'cssmin');
});

gulp.task('js', function() {
	sequence('uglify');
});

gulp.task('uglify', function() {
	return gulp.src('./src/js/bundle.js')
		.pipe(uglify())
		.pipe(gulp.dest('./html/js'));
});

gulp.task('watch', function() {
	gulp.watch(['./src/js/**/*.js', '!./src/js/bundle.js'], ['js']);
	gulp.watch('./src/less/**/*.less', ['css']);
});
