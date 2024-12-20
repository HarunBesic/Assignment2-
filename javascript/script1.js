//Main Site
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.getElementById('close');
    const thumbnails = document.querySelectorAll('.thumbnail');
  
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        const fullImageSrc = thumbnail.getAttribute('data-full');
        modalImage.src = fullImageSrc;
        modal.style.display = 'flex';
      });
    });
  
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });


//Csgo Site
  document.addEventListener('DOMContentLoaded', () => {

    const toggleRecentMajors = document.getElementById('toggle-recent-majors');
    const recentMajorsContent = document.querySelector('#recent-majors .content');

    toggleRecentMajors.addEventListener('click', () => {
      if (recentMajorsContent.style.display === 'none') {
        recentMajorsContent.style.display = 'block';
      } else {
        recentMajorsContent.style.display = 'none';
      }
    });

    const toggleMajorHistory = document.getElementById('toggle-major-history');
    const majorHistoryContent = document.querySelector('#major-history .content');

    toggleMajorHistory.addEventListener('click', () => {
      if (majorHistoryContent.style.display === 'none') {
        majorHistoryContent.style.display = 'block';
      } else {
        majorHistoryContent.style.display = 'none';
      }
    });

    recentMajorsContent.style.display = 'block';
    majorHistoryContent.style.display = 'block';
  });


