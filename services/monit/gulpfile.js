const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const ts = require('gulp-typescript');
const merge = require('merge2');

// /**
//  * Gulp task to compile TS to JS
//  */
// gulp.task('scripts', function() {
//   var tsResult = gulp.src('lib/**/*.ts')
//       .pipe(ts({
//           declaration: true
//       }));

//   return merge([
//       tsResult.dts.pipe(gulp.dest('release/definitions')),
//       tsResult.js.pipe(gulp.dest('release/js'))
//   ]);
// });

/**
 * Gulp task to Boot strap server 
 */
gulp.task('start', () => {
  nodemon({
    script: './dist/server',
    ext: 'js html',
    tasks: ['lint'],
  });
});

/**
 * Gulp config for JS lint
 */
gulp.task('lint', () => (
  gulp.src(['dist/src/**/*.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
));

/**
 * gulp default 
 */
gulp.task('default', ['start', 'lint']);
