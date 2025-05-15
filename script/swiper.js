import Swiper from "swiper";
import { Grid, Navigation } from "swiper/modules";

const isMobile = window.innerWidth < 768;
const isTablet = window.innerWidth >= 766 && window.innerWidth <= 992;
const desktop = window.innerWidth > 992;

const thumb_Afisha = document.querySelector(".slider-thumb");
const track_Afisha = document.querySelector(".slider-track");

const thumb_News = document.querySelector(".slider-thumbNews");
const track_News = document.querySelector(".slider-trackNews");

const thumbGallery = document.querySelector(".slider-thumbGallery");
const trackGallery = document.querySelector(".slider-trackGallery");



let maxLeftAfisha = track_Afisha.clientWidth - thumb_Afisha.clientWidth;
let maxLeftNews = track_News.clientWidth - thumb_News.clientWidth;
let maxLeftGallery = trackGallery.clientWidth - thumbGallery.clientWidth;

window.addEventListener("resize", function () {
  maxLeftAfisha = track_Afisha.clientWidth - thumb_Afisha.clientWidth;
  maxLeftNews = track_News.clientWidth - thumb_News.clientWidth;
  maxLeftGallery = trackGallery.clientWidth - thumbGallery.clientWidth;

});

// при перемещении ползунка, для обновления swiper
function handleThumbMove(percent, swiper) {
  swiper.setProgress(percent);
}
function dragThumb(thumb, track, swiperContainer, maxLeft) {
  // Обработка перетаскивания ползунка
  thumb.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const shiftX = e.clientX - thumb.getBoundingClientRect().left;
    const scrollbarLeft = track.getBoundingClientRect().left;

    function onMouseMove(e) {
      let newLeft = e.clientX - scrollbarLeft - shiftX;
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      thumb.style.left = `${newLeft}px`;
      const percent = newLeft / maxLeft;
      handleThumbMove(percent, swiperContainer);
    }
    document.addEventListener("mousemove", onMouseMove);

    //Отпускаем ползунок отчищаем обработчик (оптимизация)
    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", onMouseMove);
      },
      { once: true }
    );
  });
}

const swiperAfisha = new Swiper(".afisha-swiper", {
  slidesPerView: isTablet ? 3 : isMobile ? 1 : 4,
  spaceBetween: 20,
  loop: false,
  freeMode: false,

  on: {
    // когда меняется прогресс (0…1) — обновляем позицию ползунка
    progress(swiper, progress) {
      thumb_Afisha.style.left = `${progress * maxLeftAfisha}px`;
    },
  },
});




const swiperNews = new Swiper(".news-swiper", {
  slidesPerView: isTablet ? 3 : isMobile ? 1 : 4,
  spaceBetween: 20,
  loop: false,
  freeMode: false,
  on: {
    // когда меняется прогресс (0…1) — обновляем позицию ползунка
    progress(swiper, progress) {
      thumb_News.style.left = `${progress * maxLeftNews}px`;
    },
  },
});

const swiperGallery = new Swiper(".gallery-swiper", {

  slidesPerView: isTablet ? 2 : isMobile ? 2 : 4,
  spaceBetween: 20,
  loop: false,
  freeMode: false,
  on: {
    // когда меняется прогресс (0…1) — обновляем позицию ползунка
    progress(swiper, progress) {
      thumbGallery.style.left = `${progress * maxLeftGallery}px`;
    },
  },

});

const swiperProjects = new Swiper(".projects-swiper", {
  modules: [Navigation, Grid],
  slidesPerView: isTablet ? 2 : 4,
  // spaceBetween: 0,

  grid: {
    rows: 1,
    fill: "row",
  },
  loop: false,
  navigation: {
    nextEl: ".project--next",
    prevEl: ".project--prev",
  },



});


dragThumb(thumb_Afisha, track_Afisha, swiperAfisha, maxLeftAfisha);
dragThumb(thumb_News, track_News, swiperNews, maxLeftNews);
dragThumb(thumbGallery, trackGallery, swiperGallery, maxLeftGallery);
