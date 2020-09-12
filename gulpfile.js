const gulp = require("gulp");
const ts = require("gulp-typescript");
const spawn = require("child_process").spawn;
const clean = require("gulp-clean");
const minify = require("gulp-minify");
let node;

gulp.task("clean", function () {
    return gulp.src("serve", {read: false})
        .pipe(clean());
});

gulp.task("build", () => {
    const tsProject = ts.createProject("tsconfig.json");

    const result = tsProject.src().pipe(tsProject());

    return result.js
    .pipe(gulp.dest("serve"));
});

gulp.task('moveHtml', () => {
  return gulp.src("./src/public/*.html")
      .pipe(gulp.dest("serve/public"));
});

gulp.task('serve', () => {
    if (node) { console.log("Killing node!"); node.kill(); }
    node = spawn('node', ['serve/server.js'], {stdio: 'inherit'})
    node.on('close', function (code) {
      if (code === 8) {
        gulp.log('Error detected, waiting for changes...');
      }
    });
});

gulp.task("default", gulp.series("clean", "build", "moveHtml", "serve" ));

exports.default = () => {
  const run = gulp.series("clean", "build", "moveHtml", "serve" );
  run();
  gulp.watch("src/**", done => { run(); done();});
};

process.on('exit', function() {
    if (node) node.kill()
});