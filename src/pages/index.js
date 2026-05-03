const LYRO_IMAGES = [
  {
    src: "/lyro-1.webp",
    alt: "Lyro image 1",
  },
  {
    src: "/lyro-2.webp",
    alt: "Lyro image 2",
  },
  {
    src: "/lyro-3.webp",
    alt: "Lyro image 3",
  },
];

const carouselImages = document.querySelectorAll(".lyroImage");

let currentLyroIndex = 0;
let isAnimating = false;

function changeLyroImage() {
  if (isAnimating || carouselImages.length < 2) return;

  isAnimating = true;

  const currentImage = carouselImages[0];
  const nextImage = carouselImages[1];

  const nextLyroIndex = (currentLyroIndex + 1) % LYRO_IMAGES.length;

  nextImage.src = LYRO_IMAGES[nextLyroIndex].src;
  nextImage.alt = LYRO_IMAGES[nextLyroIndex].alt;

  currentImage.classList.remove("active", "next", "slide-in", "slide-out");
  nextImage.classList.remove("active", "next", "slide-in", "slide-out");

  void currentImage.offsetWidth;

  currentImage.classList.add("slide-out");
  nextImage.classList.add("slide-in");

  setTimeout(() => {
    currentImage.src = LYRO_IMAGES[nextLyroIndex].src;
    currentImage.alt = LYRO_IMAGES[nextLyroIndex].alt;

    currentImage.classList.remove("slide-out");
    currentImage.classList.add("active");

    nextImage.classList.remove("slide-in");
    nextImage.classList.add("next");

    currentLyroIndex = nextLyroIndex;
    isAnimating = false;
  }, 500);
}

setInterval(changeLyroImage, 5000);

/* -------------------------- Magic stars -------------------------- */

let magicIndex = 0;
const magicInterval = 1000;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function animateMagicStar(star) {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-45, 75)}%`);

  star.style.animation = "none";
  void star.offsetHeight;
  star.style.animation = "";
}

for (const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animateMagicStar(star);

    setInterval(() => {
      animateMagicStar(star);
    }, magicInterval);
  }, magicIndex++ * (magicInterval / 3));
}