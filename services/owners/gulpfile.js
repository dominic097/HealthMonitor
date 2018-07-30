const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');

/**
 * Gulp task to Boot strap server 
 */
gulp.task('start', () => {
  nodemon({
    script: './src/server',
    ext: 'js html',
    tasks: ['lint'],
  });
});

/**
 * Gulp config for JS lint
 */
gulp.task('lint', () => (
  gulp.src(['src/**/*.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
));

/**
 * gulp default 
 */
gulp.task('default', ['start', 'lint']);
