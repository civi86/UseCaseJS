const users = [
    { username: "user", password: "user", role: "user" },
    { username: "admin", password: "admin", role: "admin" }
];

const polls = [
    {
        id: 1,
        question: "Onko tässä sovelluksessa?",
        options: [
            { text: "Haluamasi määrä vastausvaihtoehtoja", votes: 0 },
            { text: "Loputtomasti vastausvaihtoehtoja", votes: 0 },
            { text: "Vain kolmen vastauksen kysymyksiä", votes: 1 }
        ]
    },
    {
        id: 2,
        question: "Voiko tässä sovelluksessa?",
        options: [
            { text: "Äänestää äänestyksiä vain kerran per käyttäjä", votes: 0 },
            { text: "Äänestää äänestyksiä niin monesti kuin haluaa", votes: 1 },
            { text: "Äänestää vain adminina niin monesti kuin haluaa", votes: 0 }
        ]
    },
    {
        id: 3,
        question: "Tallentuvatko tiedot mihinkään?",
        options: [
            { text: "Ei", votes: 1 },
            { text: "Kyllä", votes: 0 },
            { text: "En tiedä", votes: 0 }
        ]
    },
];

const loginPage = document.getElementById('login-page');
const appPage = document.getElementById('app-page');
const pollListElement = document.getElementById('polls');
const voteDetailsElement = document.getElementById('vote-details');
const voteQuestionElement = document.getElementById('vote-question');
const voteOptionsElement = document.getElementById('vote-options');
const backBtn = document.getElementById('back-btn');
const adminPanel = document.getElementById('admin-panel');
const addPollBtn = document.getElementById('add-poll-btn');
const removePollBtn = document.getElementById('remove-poll-btn');
const loginBtn = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message');

const adminPanelAddPoll = document.getElementById('admin-panel-add-poll');
const adminPanelPollName = document.getElementById('poll-name');
const adminPanelPollAnswer1 = document.getElementById('poll-answer1');
const adminPanelPollAnswer2 = document.getElementById('poll-answer2');
const adminPanelPollAnswer3 = document.getElementById('poll-answer3');

let loginPageCheck = false;
let pollPageCheck = false;

let loginButtonClickAmount = 0;

loginBtn.onclick = function () {
    loginPageCheck = true;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        loginPage.classList.add('hidden');
        appPage.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        errorMessage.style.display = 'none';

        if (user.role === 'admin') {
            adminPanel.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            errorMessage.style.display = 'none';
        }

        renderPolls();
    } else {
        errorMessage.style.display = 'block';
        errorMessage.classList.remove('hidden');
    }
};

function renderPolls() {
    pollListElement.innerHTML = '';
    polls.forEach(poll => {
        const li = document.createElement('li');
        li.textContent = poll.question;
        li.onclick = () => showPollDetails(poll);
        pollListElement.appendChild(li);
    });
}

let currentPollID = null;

function showPollDetails(poll) {
    pollListElement.classList.add('hidden');
    voteDetailsElement.classList.remove('hidden');
    voteQuestionElement.textContent = poll.question;
    pollPageCheck = true;
    loginPageCheck = false;
    removePollBtn.style.display = 'block';
    
    currentPollID = poll.id;

    voteOptionsElement.innerHTML = '';
    poll.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = `${option.text} - ${option.votes} ääntä`;
        li.onclick = () => vote(poll, index);
        voteOptionsElement.appendChild(li);
    });
}

function vote(poll, optionIndex) {
    poll.options[optionIndex].votes += 1;
    showPollDetails(poll);
}

backBtn.onclick = () => {
    if (pollPageCheck) {
        voteDetailsElement.classList.add('hidden');
        pollListElement.classList.remove('hidden');
        removePollBtn.style.display = 'none';
        pollPageCheck = false;
    } else {loginPageCheck = true;};
    if (loginPageCheck) {
        loginPage.classList.remove('hidden');
        appPage.classList.add('hidden');
        adminPanel.classList.add('hidden');
        loginPageCheck = false;
    };
    errorMessage.classList.add('hidden');
    errorMessage.style.display = 'none';
};
removePollBtn.style.display = 'none';

removePollBtn.onclick = () => {
    if (currentPollID !== null) {
        const pollIndex = polls.findIndex(poll => poll.id === currentPollID);
        
        if (pollIndex !== -1) {
            polls.splice(pollIndex, 1);  
            voteDetailsElement.classList.add('hidden');
            pollListElement.classList.remove('hidden');
            removePollBtn.style.display = 'none';
            renderPolls();
        }
    }
    pollPageCheck = false;
    loginPageCheck = true;
};
addPollBtn.onclick = () => {
    adminPanelAddPoll.style.display = 'block';
    removePollBtn.style.display = 'none';
    backBtn.style.display = 'block';
    if (loginButtonClickAmount > 0) {
        if (adminPanelPollName.value === '' ||
            adminPanelPollAnswer1.value === '' ||
            adminPanelPollAnswer2.value === '' ||
            adminPanelPollAnswer3.value === '') {
                errorMessage.classList.remove('hidden');
                errorMessage.style.display = 'block';
                return;
                };
            };
    errorMessage.style.display = 'none';
    if (loginButtonClickAmount > 0) {
        let newPoll = {
            id: polls.length + 1,
            question: adminPanelPollName.value,
            options: [
                { text: adminPanelPollAnswer1.value, votes: 0 },
                { text: adminPanelPollAnswer2.value, votes: 0 },
                { text: adminPanelPollAnswer3.value, votes: 0 }
                ]
        };
        loginButtonClickAmount = -1;
        polls.push(newPoll);
        adminPanelAddPoll.style.display = 'none';
    };
    loginButtonClickAmount++;
    errorMessage.classList.add('hidden');
    errorMessage.style.display = 'none';
    adminPanelPollName.value = '';
    adminPanelPollAnswer1.value = '';
    adminPanelPollAnswer2.value = '';
    adminPanelPollAnswer3.value = '';
    renderPolls();
};

renderPolls();