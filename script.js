// Textarea placeholder based on reason selected
const reasonSelect = document.getElementById('reason');
const messageTextarea = document.getElementById('message');

reasonSelect.addEventListener('change', function() {
    const selected = this.value;

    switch (selected) {
        case 'technology':
            messageTextarea.placeholder = 'Which technology would you like to discuss?';
            break;
        case 'book':
            messageTextarea.placeholder = 'Which book would you recommend and why?';
            break;
        case 'puzzle':
            messageTextarea.placeholder = 'Tell me about the puzzle you recommend.';
            break;
        default:
            messageTextarea.placeholder = 'Write your message here...';
    }

    updateTopics(selected); // Update topics based on the selected reason
});

// character count for textarea
const charCount = document.getElementById('char-count');
const maxLength = messageTextarea.getAttribute('maxlength');

messageTextarea.addEventListener('input', function() {
    const currentLength = this.value.length;
    charCount.textContent = `${currentLength}/${maxLength}`;

    if (currentLength >= parseInt(maxLength)) {
        charCount.style.color = '#F38BA8'; // Change color to red if limit exceeded
    } else {
        charCount.style.color = '';
    }
});

// Topics set per reason selected
const topicSets = {
    technology: ['Web Development', 'AI', 'Cloud Computing', 'Cyber Security', 'Open Source'],
    book: ['Fiction', 'Non-Fiction', 'Self-Help', 'Biography', 'Science Fiction'],
    puzzle: ['Sudoku', 'Crossword', 'Jigsaw', 'Logic Puzzle', 'Brain Teaser'],
    other: ['General Inquiry', 'Feedback', 'Collaboration', 'Say Hello']
}

function updateTopics(reason) {
    const topicsGroup = document.getElementById('topics-group');
    const checkboxGroup = document.getElementById('topics');

    checkboxGroup.innerHTML = ''; // Clear existing checkboxes

    if (!reason) {
        topicsGroup.style.display = 'none'; // Hide the topics group if no reason is selected
        return;
    }

    topicsGroup.style.display = 'block'; // Show the topics group when a reason is selected
    const topics = topicSets[reason] || topicSets['other'];

    topics.forEach(function(topic) {
        const label = document.createElement('label');
        label.className = 'input-label';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'topics';
        checkbox.value = topic.toLowerCase().replace(/\s+/g, '-'); // Convert to lowercase and replace spaces with hyphens

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + topic));
        checkboxGroup.appendChild(label);
    })
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const visitorName = document.getElementById('name').value.trim();

    formMessage.textContent = `Thank you, ${visitorName}. for Demo purposes only - in a real application your message would be sent here..`;

    setTimeout(function() {
        formMessage.textContent = ''; // Clear the message after 5 seconds
    }, 5000);

    this.reset(); // Reset the form fields
    charCount.textContent = `0/${maxLength}`; // Reset character count
    charCount.style.color = ''; // Reset color
    updateTopics(''); // Reset topics

});

// Fetch a random quote from Quotable API
function fetchQUote() {
    fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random')
    .then(function(response) {
        return response.json();
    })
    .then(function(content) {
        document.getElementById('quote-text').textContent = '"' + content.data.content + '"';
        document.getElementById('quote-author').textContent = '"' + content.data.author + '"';
    })
}

fetchQUote(); // Load a quote when the page loads

document.getElementById('new-quote-btn').addEventListener('click', fetchQUote);
