toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "timeOut": "5000", 
  "extendedTimeOut": "1000", 
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};

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

  document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
                content.style.maxHeight = null;
            } else {
                document.querySelectorAll('.accordion-content').forEach(otherContent => {
                    otherContent.style.display = 'none';
                    otherContent.style.maxHeight = null;
                });
                content.style.display = 'block';
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});

$(document).ready(function() {
  $.ajax({
      url: '../json/mainsite.json',  
      type: 'GET',
      dataType: 'json',
      success: function(data) {
          console.log('Data loaded successfully:', data); 
          data.forEach(function(item) {
              var contentHTML = `
                  <div class="content-item">
                      <h3 class="content-title">${item.title}</h3>
                      <p class="content-text">${item.content}</p>
                  </div>
              `;
              $('#dynamic-content').append(contentHTML);
          });
      },
      error: function(xhr, status, error) {
          console.error("Error loading content:", error);
      }
  });
});

$(document).ready(function() {
  $.ajax({
      url: '../json/mainsite.json',  
      type: 'GET',
      dataType: 'json',
      success: function(data) {
          console.log('Data loaded successfully:', data);
          renderContent(data);
      },
      error: function(xhr, status, error) {
          console.error("Error loading content:", error);
      }
  });

  function renderContent(data) {
      $('#dynamic-content').empty();
      data.forEach(function(item, index) {
          var contentHTML = `
              <div class="content-item" id="item-${index}">
                  <h3 class="content-title">${item.title}</h3>
                  <p class="content-text">${item.content}</p>
                  <button class="btn btn-warning edit-btn" data-index="${index}">Edit</button>
                  <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
              </div>
          `;
          $('#dynamic-content').append(contentHTML);
      });

      $('.edit-btn').on('click', function() {
          var index = $(this).data('index');
          var item = data[index];
          var newTitle = prompt("Edit Title:", item.title);
          var newContent = prompt("Edit Content:", item.content);

          if (newTitle && newContent) {
              item.title = newTitle;
              item.content = newContent;
              renderContent(data); 
              toastr.success('Content updated successfully!', 'Success');
          }
      });

      $('.delete-btn').on('click', function() {
          var index = $(this).data('index');
          var confirmDelete = confirm("Are you sure you want to delete this item?");
          if (confirmDelete) {
              data.splice(index, 1); 
              renderContent(data); 
              toastr.success('Content deleted successfully!', 'Success');
          }
      });
  }
});

const newsApiKey = '39693c3f098a41619e47b9b89bce6b93';
function fetchEsportsNews() {
  const url = `https://newsapi.org/v2/everything?q=esports&apiKey=${newsApiKey}&language=en&pageSize=5`;

  $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
          if (data.status === 'ok' && data.articles.length > 0) {
              console.log('Esports news fetched successfully:', data);
              data.articles.forEach(function(article) {
                  const newsContent = `
                      <div class="news-item">
                          <h3 class="news-title">${article.title}</h3>
                          <p class="news-description">${article.description}</p>
                          <a href="${article.url}" target="_blank" class="btn btn-info">Read more</a>
                      </div>
                  `;
                  $('#dynamic-contents').append(newsContent);
              });
          } else {
              toastr.warning('No esports news found.', 'Warning');
          }
      },
      error: function(xhr, status, error) {
          console.error("Error fetching esports news:", error);
          toastr.error('Failed to fetch esports news.', 'Error');
      }
  });
}
$(document).ready(function() {
  fetchEsportsNews();
});

if (data.status === 'ok' && data.articles.length > 0) {
} else {
  toastr.warning('No esports news found at the moment.', 'Warning');
}



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

document.getElementById('view-more-btn').addEventListener('click', function() {
  var extraHistory = document.getElementById('extra-history');
  if (extraHistory.style.display === 'none') {
      extraHistory.style.display = 'block';
      this.textContent = 'View less history!';
  } else {
      extraHistory.style.display = 'none';
      this.textContent = 'View more history!';
  }
});

  //League Site
  document.addEventListener('DOMContentLoaded', () => {
    const themeLinks = document.querySelectorAll('.dropdown-item');

    themeLinks.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();

        const selectedTheme = event.target.getAttribute('data-theme');

        document.body.classList.remove('dark-theme', 'large-font');
        const navbar = document.querySelector('.navbar');
        const cards = document.querySelectorAll('.card');

        navbar.classList.remove('dark-theme');
        cards.forEach(card => card.classList.remove('dark-theme', 'large-font'));

        if (selectedTheme === 'dark') {
          document.body.classList.add('dark-theme');
          navbar.classList.add('dark-theme');
          cards.forEach(card => card.classList.add('dark-theme'));
        } else if (selectedTheme === 'large-font') {
          document.body.classList.add('large-font');
          cards.forEach(card => card.classList.add('large-font'));
        }
      });
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const themeLinks = document.querySelectorAll('.dropdown-item');
    console.log(themeLinks);
  
    themeLinks.forEach(link => {
      console.log(link);
      link.addEventListener('click', event => {
        event.preventDefault();
        console.log('Theme link clicked:', event.target);
      });
    });
  });

  //Dota Site
      function checkPasswordStrength(password) {
        const strengthBar = document.getElementById("passwordStrength");
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/\d/)) strength++;
        if (password.match(/[@$!%*?&]/)) strength++;
        
        if (strength == 0) strengthBar.style.width = '0%';
        if (strength == 1) strengthBar.style.width = '20%';
        if (strength == 2) strengthBar.style.width = '40%';
        if (strength == 3) strengthBar.style.width = '60%';
        if (strength == 4) strengthBar.style.width = '80%';
        if (strength == 5) strengthBar.style.width = '100%';
      }
      
      document.getElementById('tournamentForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
    
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
            toastr.success('Form submitted successfully! Response ID: ' + response.data.id, 'Success');
            
        } catch (error) {
            toastr.error('Error submitting the form!', 'Error');
        }
    });
    
    function showSuccessMessage(message) {
        const successMessageDiv = document.createElement('div');
        successMessageDiv.classList.add('alert', 'alert-success', 'mt-4');
        successMessageDiv.innerText = message;
        const formContainer = document.querySelector('.col-lg-8');
        formContainer.appendChild(successMessageDiv);
    }