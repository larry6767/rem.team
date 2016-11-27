$(document).ready(function() {

  $("input[type='tel']").mask("+7 (999) 999-99-99");

  $("a[href='#']").click(function(e) {
      e.preventDefault();
  });

//slider
  $(".slider").slick({
      infinite: !0,
      speed: 300,
      variableWidth: !1,
      draggable: !0,
      useCSS: !0,
      dots: !0,
      prevArrow: '<div class="prev"><svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="16.813" height="31.91" viewBox="0 0 16.813 31.91"><path d="M.967 31.907c-.253 0-.506-.097-.7-.292-.386-.39-.386-1.02 0-1.41l14.148-14.252L.268 1.7C-.12 1.313-.12.68.268.29c.386-.388 1.013-.388 1.4 0L16.514 15.25c.386.39.386 1.02 0 1.41L1.667 31.615c-.193.195-.446.292-.7.292z" class="cls-1"/></svg></div>',
      nextArrow: '<div class="next"><svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="16.813" height="31.91" viewBox="0 0 16.813 31.91"><path d="M.967 31.907c-.253 0-.506-.097-.7-.292-.386-.39-.386-1.02 0-1.41l14.148-14.252L.268 1.7C-.12 1.313-.12.68.268.29c.386-.388 1.013-.388 1.4 0L16.514 15.25c.386.39.386 1.02 0 1.41L1.667 31.615c-.193.195-.446.292-.7.292z" class="cls-1"/></svg></div>',
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: !0,
      responsive: [{
          breakpoint: 1300,
          settings: {
              arrows: !1
          }
      }]
  });

//yandex map
  YMaps.jQuery(function () {
    var map = new YMaps.Map(YMaps.jQuery("#YMapsID")[0]);
    map.setCenter(new YMaps.GeoPoint(39.702118,47.232759), 15);

    // create style
    var s = new YMaps.Style();

    // create map-marker style
    s.iconStyle = new YMaps.IconStyle();
    s.iconStyle.href = "http://mers.roob.in/img/marker.png";
    s.iconStyle.size = new YMaps.Point(48, 64);
    s.iconStyle.offset = new YMaps.Point(-20, -65);

    var placemark = new YMaps.Placemark(new YMaps.GeoPoint(39.705918,47.227089), {style: s});

    placemark.name = "Intacto";
    placemark.description = "г. Ростов-на-Дону, ул. Греческого Города Волос, д. 6, оф. 513";

    map.addOverlay(placemark);

  });

  $(".map-mask").click(function (e) {
    $(".map-mask").remove();
  });


//scroll
  $(document).ready(function() {
   
   
     $("a.main-navigation__link").click(function() {
        $("html, body").animate({
           scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
           duration: 500,
           easing: "swing"
        });
        return false;
     });

     $(".produce__item a").click(function() {
        $("html, body").animate({
           scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
           duration: 500,
           easing: "swing"
        });
        return false;
     });
   
   
  });

//from submit
  $('form').submit(function(e) {
    e.preventDefault();
    ajaxSubmit($(this));
  });

  function ajaxSubmit(item) {
    console.log("ajaxSubmit" + item);
    var msg = $(item).serialize();
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: msg,
      success: function(data) {
          // $(item + " .step.active.thanks .thanks-msg").html(data);
          alert(data);
          $.arcticmodal('close');
      },
      error: function(xhr, str) {
          alert("Возникла ошибка!" + str);
      }
    });
  }

//modal content
  $(".order").click(function(argument) {
    var btn = $(this);
    var item = btn.closest(".item").children(".title").html();
    var subItem = btn.closest(".goods-filter").children(".goods__column-title").html();
    var article = btn.attr("data-vendcode");
    if (article !== undefined) {
      article = " Арт.: " + article;
    } else {
      article = ".";
    }
    if (item !== undefined) {
      item = item + " " + subItem
    } else if (item == undefined) {
      item = btn.attr("title");
      if (item == undefined) {
        item = btn.html();
      }
    }
    if (btn.hasClass("btn-order")) {
      item = "Для участия в акции сообщите нам:";
    }
    $('.modal-content').arcticmodal({
      beforeOpen: function(data, el) {
        el.find(".form-title").text(item);
        el.find("[name=target]").val(item + article);
        if (btn.hasClass("btn-order")) {
          el.find(".submit-button").remove();
          el.find("textarea").remove();
          el.find("form").append("<input class=\"submit-button\" type=\"submit\" value=\"Участвовать\">");
        } else if (btn.hasClass("more")) {
          el.find(".submit-button").remove();
          el.find("textarea").remove();
          el.find("form").append("<input class=\"submit-button\" type=\"submit\" value=\"Узнать подробнее\">");
        } else if (btn.hasClass("goods__btn")) {
          el.find(".submit-button").remove();
          el.find("textarea").remove();
          el.find("form").append("<input class=\"submit-button\" type=\"submit\" value=\"Узнать цену под ключ\">");
        } else if (btn.hasClass("mail__btn")) {
          el.find(".submit-button").remove();
          el.find("textarea").remove();
          el.find("form").append("<input class=\"submit-button\" type=\"submit\" value=\"Подписаться\">");
        } else if (btn.hasClass("manufactory__btn")) {
          el.find(".submit-button").remove();
          el.find("textarea").remove();
          el.find("form").append("<input class=\"submit-button\" type=\"submit\" value=\"Записаться\">");
        } else if (btn.hasClass("director__btn")) {
          el.find(".submit-button").remove();
          el.find("textarea").remove();
          el.find("form").append("<textarea placeholder=\"Ваш вопрос\">")
          el.find("form").append("<input class=\"submit-button\" type=\"submit\" value=\"Отправить вопрос\">");
        } else {
          el.find(".submit-button").remove();
          el.find("textarea").remove();
          el.find("form").append("<input class=\"submit-button\" type=\"submit\" value=\"Заказать\">");
        }
      }
    });
  });

});
