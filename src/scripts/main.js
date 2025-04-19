$(document).ready(function () {
  $(".image-link").magnificPopup({
    type: "image",
    mainClass: "mfp-with-zoom",
    zoom: {
      enabled: true,
      duration: 300,
      easing: "ease-in-out",
      opener: function (openerElement) {
        return openerElement.is("img") ? openerElement : openerElement.find("img");
      },
    },
  });

  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const info = document.querySelector(".info");

  burger.addEventListener("click", () => {
    menu.classList.toggle("open");
    burger.classList.toggle("open");
    info.style.marginTop = menu.classList.contains("open") ? "115px" : "0";
  });

  function playVideo() {
    document.querySelector(".preview").style.display = "none";
    const iframe = document.querySelector("iframe:not([class])");
    if (iframe) {
      const src = iframe.getAttribute("src");
      const hasParams = src.includes("?");
      const newSrc = hasParams ? `${src}&autoplay=1` : `${src}?autoplay=1`;

      iframe.setAttribute("src", newSrc);
      iframe.style.display = "block";
    }
  }

  const playIcon = document.getElementById("playBtn");
  playIcon.addEventListener("click", playVideo);

  const swiper = new Swiper(".swiper-1", {
    slidesPerView: 3,
    spaceBetween: 20,
    freeMode: true,
    navigation: {
      nextEl: ".custom-next-1",
      prevEl: ".custom-prev-1",
    },
    pagination: {
      el: ".custom-pagination-1",
      clickable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      764: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1056: {
        slidesPerView: 3,
      },
    },
  });

  const swiper2 = new Swiper(".swiper-2", {
    slidesPerView: 1,
    spaceBetween: 20,
    freeMode: false,
    navigation: {
      nextEl: ".custom-next-2",
      prevEl: ".custom-prev-2",
    },
    pagination: {
      el: ".custom-pagination-2",
      clickable: true,
    },
  });
  const swiper3 = new Swiper(".swiper-3", {
    slidesPerView: 1,
    spaceBetween: 20,
    freeMode: true,
    navigation: {
      nextEl: ".custom-next-3",
      prevEl: ".custom-prev-3",
    },
    pagination: {
      el: ".custom-pagination-3",
      clickable: true,
    },
  });
  const swiper4 = new Swiper(".swiper-4", {
    slidesPerView: 2,
    spaceBetween: 20,
    freeMode: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".custom-next-4",
      prevEl: ".custom-prev-4",
    },
    pagination: {
      el: ".custom-pagination-4",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
        freeMode: false,
      },
      1024: {
        slidesPerView: 2,
      },
    },
  });

  const maxLength = 250;
  const reviews = document.querySelectorAll(".card__text");

  reviews.forEach((review) => {
    const fullText = review.textContent.trim();

    if (fullText.length > maxLength) {
      const shortText = fullText.substring(0, maxLength) + "...";
      review.setAttribute("data-full", fullText);
      review.textContent = shortText;
    }
  });

  const buttons = document.querySelectorAll(".read-more");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const review = event.target.closest(".review__card").querySelector(".card__text");
      const fullText = review.getAttribute("data-full");

      if (!fullText) return;

      if (review.textContent.endsWith("...")) {
        review.textContent = fullText;
        button.textContent = "Скрыть отзыв";
      } else {
        review.textContent = fullText.substring(0, maxLength) + "...";
        button.textContent = "Читать далее..";
      }
    });
  });

  const cardButtons = document.querySelectorAll(".read-more-btn");

  cardButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const textContent = button.previousElementSibling;

      if (textContent.style.maxHeight === "60px") {
        textContent.style.maxHeight = "1000px";
        button.textContent = "Свернуть";
      } else {
        textContent.style.maxHeight = "60px";
        button.textContent = "Читать далее...";
      }
    });
  });

  let popup = $(".pop-up");
  let phoneBtn = $(".callback-phone");

  function phoneCall() {
    phoneBtn.on("click", function () {
      popup.css("display", "flex").hide().fadeIn();
    });

    $(".close-popup").on("click", function () {
      popup.fadeOut();
    });

    popup.on("click", function (e) {
      if ($(e.target).is(".pop-up")) {
        popup.fadeOut();
      }
    });
  }

  phoneCall();

  // ВАЛИДАЦИЯ ДЛЯ ОСНОВНОГО БЛОКА ФОРМ!

  $("#number").on("input", function () {
    let val = $(this).val();
    let digitsOnly = val.replace(/\D/g, "");
    $(this).val(digitsOnly);
  });

  $("#form-submit").on("click", function (e) {
    e.preventDefault();

    let name = $("#name").val().trim();
    let number = $("#number").val().trim();
    let isValid = true;

    $("#name, #number").removeClass("input-error");
    $(".error-msg").hide();

    if (name === "") {
      $("#name").addClass("input-error");
      $("#name").siblings(".error-msg").show();
      isValid = false;
    }

    if (number === "") {
      $("#number").addClass("input-error");
      $("#number").siblings(".error-msg").show();
      isValid = false;
    }

    if (isValid) {
      $(".forms__items").fadeOut(300, function () {
        $(".forms__items__valid").css("display", "flex").hide().fadeIn(300);

        setTimeout(function () {
          $(".forms__items__valid").fadeOut(300, function () {
            $("#name").val("");
            $("#number").val("");

            $(".forms__items").fadeIn(300);
          });
        }, 3000);
      });
    }
  });

  const mailBtn = $("#mail__btn");

  mailBtn.on("click", function (e) {
    e.preventDefault();

    const mail = $(".mailing__input").val().trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

    if (!isValid) {
      $(".mailing__input").addClass("input-error");
      return;
    } else {
      $(".mailing__input").removeClass("input-error");
    }

    $.ajax({
      method: "POST",
      url: "https://testologia.ru/checkout",
      data: {
        email: mail,
      },
    })
      .done(function (response) {
        if (response.success) {
          alert("Письмо отправлено!");
        } else {
          alert("Ошибка при отправке письма. Попробуйте позже.");
        }
      })
      .fail(function () {
        alert("Ошибка соединения с сервером. Повторите позже.");
      });
  });

  // ВАЛИДАЦИЯ ПОПАПА!!

  $("#popup-phone").on("input", function () {
    let val = $(this).val();

    let digitsOnly = val.replace(/\D/g, "");
    $(this).val(digitsOnly);
  });

  $("#popup-submit").on("click", function (e) {
    e.preventDefault();

    let popupName = $("#popup-name").val().trim();
    let popupNumber = $("#popup-phone").val().trim();
    let isValid = true;

    $("#popup-name, #popup-phone").removeClass("input-error");
    $(".error-msg").hide();

    if (popupName === "") {
      $("#popup-name").addClass("input-error");
      $("#popup-name").siblings(".error-msg").show();
      isValid = false;
    }

    if (popupNumber === "") {
      $("#popup-phone").addClass("input-error");
      $("#popup-phone").siblings(".error-msg").show();
      isValid = false;
    }

    if (isValid) {
      $(".pop-up").fadeOut(300, function () {
        $(".pop-up-valid").css("display", "flex").hide().fadeIn(300);
      });
      $(".pop-up").css("display", "none");

      setTimeout(function () {
        $(".pop-up-valid").fadeOut(300);
      }, 3000);
    }
    $(".close-popup").on("click", function () {
      $(".pop-up, .pop-up-valid").fadeOut(300);
    });

    $(".pop-up-valid").on("click", function (e) {
      if ($(e.target).is(".pop-up-valid")) {
        $(".pop-up, .pop-up-valid").fadeOut(300);
      }
    });
  });

  let firstBtn = $("#watchBtn");
  let programBtn = $("a[href='#program']");
  let datesBtn = $("a[href='#dates']");
  let galleryBtn = $("a[href='#gallery']");
  let reviewsBtn = $("a[href='#reviews']");

  firstBtn.on("click", function (e) {
    e.preventDefault();
    document.querySelector(".program").scrollIntoView({ behavior: "smooth" });
  });

  programBtn.on("click", function (e) {
    e.preventDefault();
    document.querySelector(".program").scrollIntoView({ behavior: "smooth" });
    document.querySelector(".program-mobile").scrollIntoView({ behavior: "smooth" });
  });
  datesBtn.on("click", function (e) {
    e.preventDefault();
    document.querySelector(".dates").scrollIntoView({ behavior: "smooth" });
  });
  galleryBtn.on("click", function (e) {
    e.preventDefault();
    document.querySelector(".gallery").scrollIntoView({ behavior: "smooth" });
  });
  reviewsBtn.on("click", function (e) {
    e.preventDefault();
    document.querySelector(".reviews").scrollIntoView({ behavior: "smooth" });
  });

  let bookBtn = $(".dates__card__button");
  bookBtn.on("click", function (e) {
    e.preventDefault();

    document.querySelector(".forms__items").scrollIntoView({ behavior: "smooth" });
  });

  $("#form-submit").on("click", function (e) {
    e.preventDefault();

    const name = $("#name").val().trim();
    const phone = $("#number").val().trim();

    if (!name) {
      $("#name").siblings(".error-msg").fadeIn();
    } else {
      $("#name").siblings(".error-msg").fadeOut();
    }

    if (!phone) {
      $("#number").siblings(".error-msg").fadeIn();
    } else {
      $("#number").siblings(".error-msg").fadeOut();
    }

    if (!name || !phone) {
      return;
    }

    $.ajax({
      method: "POST",
      url: "https://testologia.ru/checkout",
      data: {
        name: name,
        phone: phone,
      },
    })
      .done(function (response) {
        if (response.success || name == "itlogia") {
          console.log("1");
          $(".forms__inputs").hide();
          $(".forms__items__valid").fadeIn();
        } else {
          alert("Имя не Айтилогия, по этому получайте Алерт хихи");
        }
      })
      .fail(function () {
        alert("Ошибка соединения с сервером. Повторите позже.");
      });
  });

  $("#popup-submit").on("click", function (e) {
    e.preventDefault();

    const name = $("#popup-name").val().trim();
    const phone = $("#popup-phone").val().trim();

    if (!name) {
      $("#popup-name").siblings(".error-msg").fadeIn();
    } else {
      $("#popup-name").siblings(".error-msg").fadeOut();
    }

    if (!phone) {
      $("#popup-phone").siblings(".error-msg").fadeIn();
    } else {
      $("#popup-phone").siblings(".error-msg").fadeOut();
    }

    if (!name || !phone) {
      return;
    }

    $.ajax({
      method: "POST",
      url: "https://testologia.ru/checkout",
      data: {
        name: name,
        phone: phone,
      },
    })
      .done(function (response) {
        if (response.success || name == "itlogia") {
          console.log("1");
          $(".pop-up").fadeOut(300, function () {
            $(".pop-up-valid").css("display", "flex").hide().fadeIn(300);
          });
          $(".pop-up").css("display", "none");

          setTimeout(function () {
            $(".pop-up-valid").fadeOut(300);
          }, 3000);
        } else {
          alert("Имя не Айтилогия, по этому получайте Алерт хихи");
        }
      })
      .fail(function () {
        alert("Ошибка соединения с сервером. Повторите позже.");
      });
  });
});
