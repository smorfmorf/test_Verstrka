import Swiper from "swiper";
import { Grid, Navigation } from "swiper/modules";

const isMobile = window.innerWidth < 768;
const isTablet = window.innerWidth >= 766 && window.innerWidth <= 992;
const desktop = window.innerWidth > 992;


const thumbGallery = document.querySelector(".slider-thumbGallery");
const trackGallery = document.querySelector(".slider-trackGallery");
const thumbGallery2 = document.querySelector(".slider-thumbGallery2");
const trackGallery2 = document.querySelector(".slider-trackGallery2");



let maxLeftGallery = trackGallery.clientWidth - thumbGallery.clientWidth;
let maxLeftGallery2 = trackGallery2.clientWidth - thumbGallery2.clientWidth;

window.addEventListener("resize", function () {
  maxLeftGallery = trackGallery.clientWidth - thumbGallery.clientWidth;
  maxLeftGallery2 = trackGallery2.clientWidth - thumbGallery2.clientWidth;

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


dragThumb(thumbGallery, trackGallery, swiperGallery, maxLeftGallery);
dragThumb(thumbGallery2, trackGallery2, swiperGallery2, maxLeftGallery2);
