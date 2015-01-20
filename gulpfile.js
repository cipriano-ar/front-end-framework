// Include Gulp

var gulp = require('gulp');

// Include our plugins

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var ruby_sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');

// Lint Task: check for typos

gulp.task('lint', function() {
	return gulp.src('src/js/*js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

// Minify and Move JS files

gulp.task('scripts', function (){
	return gulp.src(['src/js/*.js',
		'bower_components/requirejs/require.js',
		'bower_components/responsive-nav/responsive-nav.js'])
	.pipe(uglify())
	.pipe(gulp.dest('assets/js'));
});

// Compass SASS

gulp.task('sass', function(){
	return gulp.src('src/sass/styles.scss')
	.pipe(sass({
		compass:true,
		style:'compressed'
	}))
	.on('error', function(err) {console.log(err.message);})
	.pipe(gulp.dest('assets/css'))
});

// Watch files for changes

gulp.task('watch', function() {
	gulp.watch('src/js/*.js', ['lint', 'scripts']);
	gulp.watch('src/sass/*.scss', ['sass']);
});

//Default Task

gulp.task('default', ['lint','scripts','watch','sass']);