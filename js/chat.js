document.getElementById('send-button').addEventListener('click', function() {
    sendMessage();
});

document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

let selectedContact = null;
let messages = {};

function sendMessage() {
    if (!selectedContact) {
        alert('Please select a contact first.');
        return;
    }

    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (message !== '' || file) {
        if (!messages[selectedContact]) {
            messages[selectedContact] = [];
        }

        if (message !== '') {
            addMessage('sent', message);
            messages[selectedContact].push({ type: 'sent', text: message });
        }
        if (file) {
            addFile('sent', file);
            messages[selectedContact].push({ type: 'sent', file: file });
            fileInput.value = '';
        }
        input.value = '';

        // Simulasi penerimaan pesan
        setTimeout(function() {
            const reply = 'This is a reply.';
            addMessage('received', reply);
            messages[selectedContact].push({ type: 'received', text: reply });
        }, 1000);
    }
}

function addMessage(type, text) {
    const messagesContainer = document.getElementById('chat-sents');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', type);
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addFile(type, file) {
    const messagesContainer = document.getElementById('chat-sents');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', type);

    const fileElement = document.createElement('div');
    fileElement.classList.add('attachment');
    fileElement.innerHTML = `
        <span>${file.name}</span>
        <a href="#" onclick="downloadFile('${URL.createObjectURL(file)}', '${file.name}')">Download</a>
    `;

    messageElement.appendChild(fileElement);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function downloadFile(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Simulasi daftar kontak
const contacts = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi'];
const contactsList = document.getElementById('contacts-list');
const searchInput = document.getElementById('contacts-search');

function displayContacts(filteredContacts) {
    contactsList.innerHTML = '';
    filteredContacts.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.classList.add('contact');
        contactElement.textContent = contact;
        contactsList.appendChild(contactElement);

        contactElement.addEventListener('click', () => {
            selectContact(contact);
        });
    });
}

function selectContact(contact) {
    selectedContact = contact;
    document.getElementById('chat-header').textContent = contact;
    document.getElementById('chat-sents').innerHTML = '';
    if (messages[contact]) {
        messages[contact].forEach(msg => {
            if (msg.text) {
                addMessage(msg.type, msg.text);
            } else if (msg.file) {
                addFile(msg.type, msg.file);
            }
        });
    }
}

searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredContacts = contacts.filter(contact => 
        contact.toLowerCase().includes(searchTerm)
    );
    displayContacts(filteredContacts);
});

// Tampilkan semua kontak saat pertama kali dimuat
displayContacts(contacts);
