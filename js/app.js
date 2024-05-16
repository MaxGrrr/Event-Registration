const registerButtons = document.querySelectorAll("#register__btn");
const viewButtons = document.querySelectorAll("#view__btn");
const titleForRegistrationForm = document.getElementById("event_title").innerText;



registerButtons.forEach(button => {
    button.addEventListener('click', () => {
        const eventTitle = button.parentNode.querySelector('#register__btn').textContent;
        openModal(eventTitle);
    });
});

viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const event = this.closest('.event');  
      if (!event) return;  
  
      const eventTitle = event.querySelector('.event__title').textContent;
      const eventDescription = event.querySelector('.event__description').textContent;
      const participants = [
        { name: "Іван Петренко", email: "ivan.petrenko@mail.com" },
        { name: "Олена Сидоренко", email: "olena.sydorov@mail.com" },
        { name: "Тарас Шевченко", email: "taras.shevchenko@mail.com" },
        { name: "Артем Завинський", email: "art.zavynsiy@mail.com" },
        { name: "Сергій Приходько", email: "serg.prychodko@mail.com" },
        { name: "Галина Щербина", email: "galyna529@mail.com" }
      ];
      openViewModal(eventTitle, eventDescription, participants);
      
    });
  });


function openViewModal(eventTitle, eventDescription, participants) {
  const modalView = document.createElement('div');
  modalView.classList.add('modal__view');

  const participantList = participants.length === 0 ? "<p>There are no registered participants yet.</p>" : `
  <div class="participants-container">
    <h3>Registered Participants</h3>
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
  document.querySelector(".modal-close").addEventListener("click", () => {closeModal()
    
  });
};

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
            </form>
        </div>
    `;

    document.body.appendChild(modal);


    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('modal-close');
    modal.querySelector('.modal-content').appendChild(closeButton);

    // Подію click для кнопки закриття
    closeButton.addEventListener('click', () => {
        closeModal();
    });

    // Логіка обробки форми реєстрації

    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const dateOfBirth = document.getElementById('dateOfBirth').value;
        const whereDidYouHear = document.querySelector('input[name="whereDidYouHear"]:checked').value;

     // Підготувати дані для надсилання
    const data = {
     name,
     email,
     dateOfBirth,
     whereDidYouHear,
   };
   

        // Обробка даних форми реєстрації

        console.log(`Full name: ${name}`);
        console.log(`E-mail: ${email}`);
        console.log(`Date of birth: ${dateOfBirth}`);
        console.log(`Where did you hear about this event?: ${whereDidYouHear}`);

        // Закрити модальнe вікно
        closeModal();
    });
};

function closeModal() {
    const modal = document.querySelector('.modal');
    const modalView = document.querySelector('.modal__view');
    if (modal) {
        modal.parentNode.removeChild(modal);
    }
    if (modalView) {
        modalView.parentNode.removeChild(modalView);
    };
};