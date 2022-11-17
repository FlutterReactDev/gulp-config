$(document).ready(function () {
  $("#menu").on("click", "a", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id = $(this).attr("href"),
      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;

    //анимируем переход на расстояние - top за 1500 мс
    $("body,html").animate({ scrollTop: top }, 1500);
  });

  $("#menu2").on("click", "a", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id = $(this).attr("href"),
      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;

    //анимируем переход на расстояние - top за 1500 мс
    $("body,html").animate({ scrollTop: top }, 1500);
  });

  const items = document.querySelectorAll(".item");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });

  $("ul.tabs li").click(function () {
    var tab_id = $(this).attr("data-tab");

    $("ul.tabs li").removeClass("current");
    $(".tab-content").removeClass("current");

    $(this).addClass("current");
    $("#" + tab_id).addClass("current");
  });

  $(".slider_mini").slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(".slider_products").slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(".header__slider").slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(".navigation li").hover(function () {
    var isHovered = $(this).is(":hover");
    if (isHovered) {
      $(this).children("ul").stop().slideDown(300);
    } else {
      $(this).children("ul").stop().slideUp(300);
    }
  });

  const burger = document.querySelector(".burger");
  const navbar = document.querySelector(".mt-mobile");
  const body = document.querySelector("body");

  burger.addEventListener("click", () => {
    navbar.classList.toggle("nav-open");
    body.classList.toggle("body-open");
    burger.classList.toggle("burger-open");
  });

  $("div#tit1").click(function () {
    $("div#more__bl1").css("display", "block");
    $("div#tit1").css("display", "none");
  });

  $("div#tit2").click(function () {
    $("div#more__bl2").css("display", "block");
    $("div#tit2").css("display", "none");
  });

  $("div#tit3").click(function () {
    $("div#more__bl3").css("display", "block");
    $("div#tit3").css("display", "none");
  });

  $("div#tit4").click(function () {
    $("div#more__bl4").css("display", "block");
    $("div#tit4").css("display", "none");
  });

  $(".filtr__tit").on("click", function (e) {
    $(".modul-1").css("display", "block");
    $("body").css("overflow", "hidden");
  });

  $(".filtr__pop__tit").on("click", function (e) {
    $(".modul-6").css("display", "block");
    $("body").css("overflow", "hidden");
  });

  $("a.highslide").on("click", function (e) {
    $(".modul-7").css("display", "flex");
    $("body").css("overflow", "hidden");
  });

  $(".close__tits.close").on("click", function (e) {
    $(".modul-1").css("display", "none");
    $(".modul-6").css("display", "none");
    $("body").css("overflow", "auto");
  });

  $(".closes").on("click", function (e) {
    $(".modul-7").css("display", "none");
    $("body").css("overflow", "auto");
  });

  $("a#is1").click(function () {
    $("a#is1").css("display", "none");
  });

  $("a#is2").click(function () {
    $("a#is2").css("display", "none");
  });

  $("a#is3").click(function () {
    $("a#is3").css("display", "none");
  });

  $("a#is4").click(function () {
    $("a#is4").css("display", "none");
  });

 
});

$(".carts").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  autoplay: false,
  arrows: false,
  dots: false,
  asNavFor: ".iss",
});

$(".iss").slick({
  slidesToShow: 5,
  vertical: true,
  verticalSwiping: true,
  slidesToScroll: 1,
  asNavFor: ".carts",
  active: true,
  autoplay: false,
  dots: false,
  arrows: false,
  centerPadding: "5px",
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 1260,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 5,
        arrows: false,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 4,
        dots: false,
        arrows: false,
        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 565,
      settings: {
        slidesToShow: 6,
        dots: false,
        arrows: false,
        slidesToScroll: 1,
      },
    },
  ],
});

$(".carts2").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  autoplay: false,
  arrows: true,
  dots: false,
  asNavFor: ".iss2",
});

$(".iss2").slick({
  slidesToShow: 6,
  slidesToScroll: 1,
  vertical: true,
  verticalSwiping: true,
  asNavFor: ".carts2",
  active: true,
  autoplay: false,
  dots: false,
  arrows: false,
  centerPadding: "5px",
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        dots: false,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 5,
        arrows: false,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 4,
        dots: false,
        arrows: false,
        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 565,
      settings: {
        slidesToShow: 6,
        dots: false,
        arrows: false,
        slidesToScroll: 1,
      },
    },
  ],
});

$(".carts3").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  autoplay: false,
  arrows: false,
  dots: false,
  asNavFor: ".iss3",
});

$(".iss3").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: ".carts3",
  active: true,
  autoplay: false,
  dots: false,
  arrows: true,
  centerPadding: "5px",
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        arrows: true,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 590,
      settings: {
        slidesToShow: 5,
        dots: false,
        arrows: true,
        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 420,
      settings: {
        slidesToShow: 5,
        dots: false,
        arrows: true,
        slidesToScroll: 1,
      },
    },
  ],
});

$(".highslide").click(function () {
  $(".slick.is.slick-slide.slick-active").click();
});

function hoverOnleft() {
  document.getElementById("bg").classList.add("active");
}

function hoverOffleft() {
  document.getElementById("bg").classList.remove("active");
}
