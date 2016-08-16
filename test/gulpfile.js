let gulp = require('gulp')
let sass = require('gulp-sass')

gulp.task('sass', ()=>{
    return gulp.src('./index.scss')
        .pipe(sass().on('error', function(err){ console.log(err) } ))
        .pipe(gulp.dest('./'))
})

gulp.task('default', ['sass'], ()=>{
    gulp.watch('./index.scss', ['sass'])
})
