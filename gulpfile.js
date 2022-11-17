import gulp from "gulp";
const { src, dest, watch, parallel, series } = gulp;
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
    
const sass = gulpSass(nodeSass);
import prefixer from "gulp-autoprefixer";
import clean from "gulp-clean-css";
import concat from "gulp-concat";
import map from "gulp-sourcemaps";
import bs from "browser-sync";
import chalk from "chalk";
import uglify from "gulp-uglify-es";
import babel from 'gulp-babel'
import changed from "gulp-changed";
import imagemin from "gulp-imagemin";
import recompress from "imagemin-jpeg-recompress";
import pngquant from "imagemin-pngquant";

import webpConv from "gulp-webp";
import multiDest from "gulp-multi-dest";
import plumber from "gulp-plumber";
import ttf2woff2 from "gulp-ttftowoff2";
import ttf2woff from "gulp-ttf2woff";
function browsersync() {
	bs.init({ 
		server: {
			baseDir: 'build/',
			host: '192.168.0.104',
		},
		
		browser: 'default',
		
		logLevel: 'info',
		logConnections: true,
		logFileChanges: true,
		open: true
	})
}
function style() {
  return src("src/scss/**/*.scss")
    .pipe(map.init())
    .pipe(
        sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(
      prefixer({
        overrideBrowserslist: ["last 8 versions"],
        browsers: [
          "Android >= 4",
          "Chrome >= 20",
          "Firefox >= 24",
          "Explorer >= 11",
          "iOS >= 6",
          "Opera >= 12",
          "Safari >= 6",
        ],
      })
    )
    .pipe(
      clean({
        level: 2,
      })
    )
    .pipe(concat("style.min.css"))
    .pipe(map.write("../sourcemaps/"))
    .pipe(dest("build/css/"))
    .pipe(bs.stream());
}

function libStyles(done) {
  const plugins = ['src/lib/slick/slick.css','src/lib/slick/slick-theme.css','node_modules/aos/dist/aos.css'];
  if (plugins.length > 0) {
    return src(plugins)
      .pipe(map.init())
      .pipe(
        sass({
          outputStyle: "compressed",
        }).on("error", sass.logError)
      )
      .pipe(concat("libs.min.css"))
      .pipe(map.write("../sourcemaps/"))
      .pipe(dest("build/css/"));
  } else {
    return done(
      console.log(
        chalk.bgYellow(
          `${chalk.bold("WARNING!")} You did not add any CSS/SCSS plugins.`
        )
      )
    );
  }
}

function devJs() {
  return src(["src/js/*.js"])
    .pipe(map.init())
    .pipe(uglify.default())
    .pipe(concat("main.min.js"))
    .pipe(map.write("../sourcemaps"))
    .pipe(dest("build/js/"))
    .pipe(bs.stream());
}

function libJs(done) {
  const plugins = ['src/lib/slick/slick.min.js','node_modules/aos/dist/aos.js'];
  if (plugins.length > 0)
    return src(plugins)
      .pipe(map.init())
      .pipe(uglify.default())
      .pipe(concat("libs.min.js"))
      .pipe(map.write("../sourcemaps"))
      .pipe(dest("build/js/"));
  else {
    return done(console.log(chalk.redBright("No added JS plugins")));
  }
}

function buildJs() {
  return src(["src/js/*.js"])
    .pipe(uglify.default())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("main.min.js"))
    .pipe(dest("build/js/"));
}

function rastr() {
  return src("src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)")
    .pipe(changed("build/img"))
    .pipe(
      imagemin(
        {
          interlaced: true,
          progressive: true,
          optimizationLevel: 5,
        },
        [
          recompress({
            loops: 6,
            min: 50,
            max: 90,
            quality: "high",
            use: [
              pngquant({
                quality: [0.8, 1],
                strip: true,
                speed: 1,
              }),
            ],
          }),
          imagemin.gifsicle(),
          imagemin.optipng(),
          imagemin.svgo(),
        ]
      )
    )
    .pipe(dest("build/img"))
    .pipe(bs.stream());
}

function webp() {
  return src("build/img/**/*.+(png|jpg|jpeg)")
    .pipe(plumber())
    .pipe(
      changed("build/img", {
        extension: ".webp",
      })
    )
    .pipe(webpConv())
    .pipe(multiDest(["src/img", "build/img"]));
}
function fonts(done) {
  src("src/fonts/**/*.ttf")
    .pipe(
      changed("build/fonts", {
        extension: ".woff2",
        hasChanged: changed.compareLastModifiedTime,
      })
    )
    .pipe(ttf2woff2())
    .pipe(dest("build/fonts"));

  src("src/fonts/**/*.ttf")
    .pipe(
      changed("build/fonts", {
        extension: "woff",
        hasChanged: changed.compareLastModifiedTime,
      })
    )
    .pipe(ttf2woff())
    .pipe(dest("build/fonts"));
  done();
}
function html() {
  return src(["src/**/*.html"]).pipe(dest("build")).pipe(bs.stream());
}
function watching() {
  watch("src/**/*.html", parallel(html));
  watch("src/**/*.scss", parallel(style));
  watch("src/**/*.js", parallel(devJs));
  watch("src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)", parallel(rastr));
  watch("build/img/**/*.+(png|jpg|jpeg)", parallel(webp));
  watch("src/fonts/**/*.ttf", parallel(fonts));
}

function build() {
   return series(libStyles,fonts,style,libJs,buildJs,rastr,webp,html)
}

export { style, libStyles, devJs, libJs, buildJs, rastr, webp, fonts, html,watching,build };

export default parallel(
  libStyles,
  style,
  fonts,
  devJs,
  libJs,
  rastr,
  webp,
  html,
  browsersync,
  watching
);
