import Swiper from "swiper";
import { Grid, Navigation } from "swiper/modules";

const isMobile = window.innerWidth < 768;
const isTablet = window.innerWidth >= 766 && window.innerWidth <= 992;
const desktop = window.innerWidth > 992;


const thumbGallery = document.querySelector(".slider-thumbGallery");
const trackGallery = document.querySelector(".slider-trackGallery");
const thumbGallery2 = document.querySelector(".slider-thumbGallery2");
const trackGallery2 = document.querySelector(".slider-trackGallery2");
const trackAbout = document.querySelector('.slider-track--about')
const thumbAbout = document.querySelector('.slider-thumb--about')



let maxLeftGallery = trackGallery.clientWidth - thumbGallery.clientWidth;
let maxLeftGallery2 = trackGallery2.clientWidth - thumbGallery2.clientWidth;
let maxTopAbout = trackAbout.clientHeight - thumbAbout.clientHeight;

window.addEventListener("resize", function () {
  maxLeftGallery = trackGallery.clientWidth - thumbGallery.clientWidth;
  maxLeftGallery2 = trackGallery2.clientWidth - thumbGallery2.clientWidth;
  maxTopAbout = trackAbout.clientHeight - thumbAbout.clientHeight;
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


const swiperGallery2 = new Swiper(".gallery-swiper2", {

  slidesPerView: isTablet ? 2 : isMobile ? 2 : 4,
  spaceBetween: 20,
  loop: false,
  freeMode: false,
  on: {
    // когда меняется прогресс (0…1) — обновляем позицию ползунка
    progress(swiper, progress) {
      thumbGallery2.style.left = `${progress * maxLeftGallery}px`;
    },
  },

});

const swiperProjects = new Swiper(".projects-swiper2", {
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

const swiperAfishaList = new Swiper(".card-swiper", {
  loop: false,
  slidesPerView: 2,
  spaceBetween: 0,
  direction: "vertical",
  on: {
    progress(swiper, progress) {
      thumbAbout.style.top = `${progress * maxTopAbout}px`;
    },
  },
});

dragThumb(thumbGallery, trackGallery, swiperGallery, maxLeftGallery);
dragThumb(thumbGallery2, trackGallery2, swiperGallery2, maxLeftGallery2);



function dragThumbVertical(thumb, track, swiperContainer, maxTop) {
  thumb.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const shiftY = e.clientY - thumb.getBoundingClientRect().top;
    const scrollbarTop = track.getBoundingClientRect().top;

    function onMouseMove(e) {
      let newTop = e.clientY - scrollbarTop - shiftY;
      newTop = Math.max(0, Math.min(newTop, maxTop));
      thumb.style.top = `${newTop}px`;
      const percent = newTop / maxTop;
      handleThumbMove(percent, swiperContainer);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", onMouseMove);
      },
      { once: true }
    );
  });
}



dragThumbVertical(thumbAbout, trackAbout, swiperAfishaList, maxTopAbout);
