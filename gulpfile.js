const gulp = require("gulp");
const ts = require("gulp-typescript");


gulp.task("build", () => {
    const tsProject = ts.createProject("tsconfig.json");

    const result = tsProject.src().pipe(tsProject());

    return result.js
    .pipe(gulp.dest("serve"));
});

gulp.task("serve", () => {
    return run("node serve/server.js").exec();
});

gulp.task("default", gulp.series(
    "build",
    "serve"
))
  exports.default = "default";