const closeBtn = document.querySelector("#close-btn");
const date = document.querySelector("#date");

// Set the current year
date.innerHTML = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function () {
  const emojis = ['😎', '😂', '😍', '🤔', '🥳', '🐧'];
  let currentIndex = 0;
  let emojiInterval;

  // Function to change the title every 3 seconds
  function changeTitle() {
    let newTitle = 'Ashish Jha | ' + emojis[currentIndex];
    document.title = newTitle;
    currentIndex = (currentIndex + 1) % emojis.length;
  }

  // Initial title setup
  changeTitle();

  // Change the title every 3 seconds
  setInterval(changeTitle, 3000);

  // Function to generate small emojis
  function generateSmallEmojis() {
    const reactionEmoji = document.getElementById('reactionEmoji');
    const rect = reactionEmoji.getBoundingClientRect();
    const currentEmoji = emojis[currentIndex]; // Get current emoji

    for (let i = 0; i < 10; i++) {
      const smallEmoji = document.createElement('div');
      smallEmoji.classList.add('small-emoji');
      smallEmoji.textContent = currentEmoji; // Use the current emoji
      document.body.appendChild(smallEmoji);

      // Set random direction for the emoji explosion
      const randomX = Math.random();
      const randomY = Math.random();
      smallEmoji.style.setProperty('--randomX', randomX);
      smallEmoji.style.setProperty('--randomY', randomY);

      // Position small emojis near the reaction emoji
      smallEmoji.style.left = `${rect.left + window.scrollX + 30}px`;
      smallEmoji.style.top = `${rect.top + window.scrollY}px`;

      // Remove small emoji after 3 seconds
      setTimeout(() => {
        smallEmoji.remove();
      }, 3000);
    }
  }

  // Add hover event listeners to the main emoji
  const reactionEmoji = document.getElementById('reactionEmoji');
  reactionEmoji.addEventListener('mouseover', () => {
    emojiInterval = setInterval(generateSmallEmojis, 300); // Generate emojis every 300ms
  });

  reactionEmoji.addEventListener('mouseout', () => {
    clearInterval(emojiInterval); // Stop generating emojis
  });

  function changeEmoji() {
    currentIndex = (currentIndex + 1) % emojis.length;
    document.getElementById('reactionEmoji').textContent = emojis[currentIndex];
  }

  // Change emoji every 3 seconds
  setInterval(changeEmoji, 3000);
});

function getResume() {
  window.open('./assets/resume.pdf', '_blank'); // Replace with your desired URL
}
document.addEventListener("DOMContentLoaded", function() {
  const items = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("show");
          }
      });
  }, {
      threshold: 0.1
  });

  items.forEach(item => {
      observer.observe(item);
  });
});

// slider

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

function goTo(link) {
    window.open(link, '_blank');
}
function redirectToPage(id) {
  window.location.href = `projectsDetails.html`;
}