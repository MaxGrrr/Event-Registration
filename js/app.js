const registerButtons = document.querySelectorAll("#register__btn");
const viewButtons = document.querySelectorAll("#view__btn");
const titleForRegistrationForm = document.getElementById("event_title").innerText;



// Отримання учасників з localStorage або ініціалізація порожнім масивом
let participants = JSON.parse(localStorage.getItem('participants')) || [
  { name: "Іван Петренко", email: "ivan.petrenko@mail.com" },
  { name: "Олена Сидоренко", email: "olena.sydorov@mail.com" },
  { name: "Тарас Шевченко", email: "taras.shevchenko@mail.com" },
  { name: "Артем Завинський", email: "art.zavynsiy@mail.com" },
  { name: "Сергій Приходько", email: "serg.prychodko@mail.com" },
  { name: "Галина Щербина", email: "galyna529@mail.com" },
];

// Функція для збереження учасників у localStorage
function saveParticipants() {
  localStorage.setItem('participants', JSON.stringify(participants));
}

// кнопка register
registerButtons.forEach(button => {
  button.addEventListener('click', () => {
    const eventTitle = button.parentNode.querySelector('#register__btn').textContent;
    openModal(eventTitle);
  });
});

// register форма реєстрації
function openModal(_eventTitle) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <h2 class="modal-title">Event registration ${titleForRegistrationForm}</h2>
      <form id="registrationForm">
        <div class="form-group">
          <label for="name">Full name:</label>
          <input type="text" id="name" name="name" required autocomplete="name">
        </div>
        <div class="form-group">
          <label for="email">E-mail:</label>
          <input type="email" id="email" name="email" required autocomplete="email">
        </div>
        <div class="form-group">
          <label for="dateOfBirth">Date of birth:</label>
          <input type="date" id="dateOfBirth" name="dateOfBirth" required autocomplete="dateOfBirth">
        </div>
        <div class="form-group">
          <label for="whereDidYouHear">Where did you hear about this event?</label>
          <div class="form-check">
            <input type="radio" id="answer1" name="whereDidYouHear" value="answer1" required>
            <label for="answer1">Social media</label>
          </div>
          <div class="form-check">
            <input type="radio" id="answer2" name="whereDidYouHear" value="answer2">
            <label for="answer2">Friends</label>
          </div>
          <div class="form-check">
            <input type="radio" id="answer3" name="whereDidYouHear" value="answer3">
            <label for="answer3">Found myself</label>
          </div>
        </div>
        <button type="submit">Register</button>
        <button type="button" class="modal-close">Close</button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  document.querySelector(".modal-close").addEventListener("click", closeModal);

  const form = document.getElementById('registrationForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const whereDidYouHear = document.querySelector('input[name="whereDidYouHear"]:checked').value;

    const newParticipant = { name, email, dateOfBirth, whereDidYouHear };
    participants.push(newParticipant); // Додаємо нового учасника до масиву
    saveParticipants(); // Зберігаємо оновлений масив у localStorage

    console.log(`Full name: ${name}`);
    console.log(`E-mail: ${email}`);
    console.log(`Date of birth: ${dateOfBirth}`);
    console.log(`Where did you hear about this event?: ${whereDidYouHear}`);

    closeModal();
  });
}

// перегляд по кнопці view
function openViewModal(eventTitle, eventDescription) {
  const modalView = document.createElement('div');
  modalView.classList.add('modal__view');

  const participantList = participants.length === 0 ? "<p>There are no registered participants yet.</p>" : `
    <div class="participants-container">
      <h3>Registered Participants</h3>
      <form action="" id="participant_form">
        <input class="search_form" name="nameOrEmail" placeholder="Ім'я або Email">
        <input class="search" type="submit">
      </form>
      <pre id="out"></pre>

      <div class="participants-grid">
        ${participants.map(participant => `
          <div class="participant-tile">
            <p class="participant-name">${participant.name}</p>
            <p class="participant-email">${participant.email}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  modalView.innerHTML = `
    <div class="modal-content view__width">
      <h2 class="modal-title">${eventTitle}</h2>
      <p class="event-description">${eventDescription}</p>
      ${participantList}
      <button class="modal-close">Close</button>
    </div>
  `;

  document.body.appendChild(modalView);

  const searchInput = document.querySelector('.search_form');
  const searchButton = document.querySelector('.search');
  const output = document.getElementById('out');

  searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    const foundParticipants = participants.filter(participant =>
      participant.name.toLowerCase().includes(searchTerm) ||
      participant.email.toLowerCase().includes(searchTerm)
    );

    if (!searchTerm) {
      output.textContent = '';
      return;
    }

    if (foundParticipants.length === 0) {
      output.textContent = 'No participants found.';
    } else {
      const participantNamesAndEmails = foundParticipants.map(participant => `${participant.name} (${participant.email}) вже зареєстрований (-а).`);
      output.textContent = participantNamesAndEmails.join(',');
    }
  });

  document.querySelector(".modal-close").addEventListener("click", closeModal);
}

// Обробник подій для кнопок перегляду
viewButtons.forEach(button => {
  button.addEventListener('click', function() {
    const event = this.closest('.event');
    if (!event) return;
    const eventTitle = event.querySelector('.event__title').textContent;
    const eventDescription = event.querySelector('.event__description').textContent;

    openViewModal(eventTitle, eventDescription);
  });
});

// Функція для закриття модального вікна
function closeModal() {
  const modal = document.querySelector('.modal');
  const modalView = document.querySelector('.modal__view');
  if (modal) {
    modal.parentNode.removeChild(modal);
  }
  if (modalView) {
    modalView.parentNode.removeChild(modalView);
  }
}





document.addEventListener('DOMContentLoaded', function() {
  const eventElements = Array.from(document.querySelectorAll('.event'));
  const eventsSection = document.querySelector('.events');
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');
  
  const eventsPerPage = 8;
  let currentPage = 1;

  // Функція для відображення подій на поточній сторінці
  function displayEvents() {
      eventsSection.innerHTML = '';

      const startIndex = (currentPage - 1) * eventsPerPage;
      const endIndex = startIndex + eventsPerPage;
      const displayedEvents = eventElements.slice(startIndex, endIndex);

      displayedEvents.forEach(event => {
          eventsSection.appendChild(event);
      });

      updatePaginationButtons();
  }

  // Функція для оновлення стану кнопок пагінації
  function updatePaginationButtons() {
      const totalPages = Math.ceil(eventElements.length / eventsPerPage);

      if (currentPage === 1) {
          prevPageBtn.disabled = true;
      } else {
          prevPageBtn.disabled = false;
      }

      if (currentPage === totalPages) {
          nextPageBtn.disabled = true;
      } else {
          nextPageBtn.disabled = false;
      }
  }

  // Обробник кліку на кнопці Next Page
  nextPageBtn.addEventListener('click', function() {
      currentPage++;
      displayEvents();
  });

  // Обробник кліку на кнопці Previous Page
  prevPageBtn.addEventListener('click', function() {
      currentPage--;
      displayEvents();
  });

  // Початкове відображення подій при завантаженні сторінки
  displayEvents();
});
