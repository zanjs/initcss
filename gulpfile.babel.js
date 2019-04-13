import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import minifycss from 'gulp-minify-css';

const config = {
    mincss: 'initcss.css',
    publicDir: './public'
};

const processors = [
    autoprefixer
]

const paths = {
    styles: {
        main: './src/main.scss',
        src: './src/**/*.scss',
        dest: 'assets/styles/'
    }
};

export function styles() {
    return gulp.src(paths.styles.main)
      .pipe(sass())
      .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
        }))
        .pipe(notify({ message: 'scss convert to css done.'}))
        .pipe(gulp.dest(config.publicDir + '/css'))
        .pipe(postcss(processors))
        .pipe(rename(config.mincss))
        .pipe(minifycss())
        .pipe(gulp.dest('./'))
}

function watch() {
    gulp.watch(paths.styles.src, styles);
}

gulp.task('default', styles);
gulp.task('dev', watch);
