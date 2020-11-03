var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

gulp.task("bundle", function () {
    return browserify({
        entries: "./app/main.jsx",
        debug: true
    }).transform(reactify)
    .transform('reactify',{harmony:false, es6module:true})
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("app/dist"))
});

gulp.task("copy", ["bundle"], function () {
    return gulp.src(["app/index.ejs","app/lib/bootstrap-css/css/bootstrap.min.css","app/style.css"])
        .pipe(gulp.dest("app/dist"));
});

gulp.task("default",["copy"],function(){
   console.log("Gulp completed..."); 
});


// var gulp = require('gulp');
// var browserify = require('browserify');
// var source = require('vinyl-source-stream');
// var gutil = require('gulp-util');
// var babelify = require('babelify');
// var notifier = require('node-notifier');
// var watchify = require('watchify');

// // External dependencies you do not want to rebundle while developing,
// // but include in your application deployment
// var dependencies = [
//     'react',
//     'react-dom'
// ];

// // Gulp tasks
// // ----------------------------------------------------------------------------
// gulp.task('scripts', function () {
//     bundleApp(true);
// });

// gulp.task('deploy', function (){
//     bundleApp(true);
// });

// gulp.task('watch', function () {
//     gulp.watch([
//     './app/dist/*.js'
//   ], ['scripts']);
// });


// var notify = function(title, message) {
//   notifier.notify({
//     title: title,
//     message: message
//   });
//   gutil.log(title + ': ' + message);
// };

// // When running 'gulp' on the terminal this task will fire.
// // It will start watching for changes in every .js file.
// // If there's a change, the task 'scripts' defined above will fire.
// gulp.task('default', ['scripts','watch']);

// var reactFiles = {
//   path: [
//     {
//       from: ['app/components/header.jsx'],
//       to: 'header.jsx'
//     },
//     {
//       from: ['app/components/home.jsx'],
//       to: 'home.jsx'
//     }
//     //     {
//     //   from: ['app/controller/login.js'],
//     //   to: 'login.js'
//     // }
//   ],
//   watchPath: ['web/controller/*.js']
// };

// // Private Functions
// // ----------------------------------------------------------------------------
// function bundleApp(isProduction) {
//     // Browserify will bundle all our js files together in to one and will let
//     // us use modules in the front end.
//   var finished = 0;
//   reactFiles.path.map(function(reactModuleEntry){
//     var appBundler = browserify(reactModuleEntry.from)
//     .transform(babelify, { presets: ['es2015', 'react'] })
//     .bundle();

//     appBundler.pipe(source(reactModuleEntry.to))
//     .pipe(gulp.dest('app/dist'))
//     .on('finish', function() {
//             finished++;
//             if (finished === (reactFiles.path.length - 1)) {
//               notify('Reactify', 'build: done')
//               //done();
//             }
//           });
//   });

// }