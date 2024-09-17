const closeBtn = document.querySelector("#close-btn");
const date = document.querySelector("#date");

// Set the current year
date.innerHTML = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function() {
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

  // Function to set up Intersection Observer
  function setupIntersectionObserver(targets, options) {
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    targets.forEach(target => {
      observer.observe(target);
    });
  }

  const skillsCards = document.querySelectorAll('.skills-card');
  const observerOptions = {
    threshold: 0.3 
  };

  // Set up the observer for the selected elements
  setupIntersectionObserver(skillsCards, observerOptions);

  // Function to change emoji every 3 seconds
  function changeEmoji() {
    currentIndex = (currentIndex + 1) % emojis.length;
    document.getElementById('reactionEmoji').textContent = emojis[currentIndex];
  }

  // Change emoji every 3 seconds
  setInterval(changeEmoji, 3000);
});
