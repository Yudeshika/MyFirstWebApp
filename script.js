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
    other: ['General Inquiry', 'Feedback', 'Collaboration', 'Other']
}

function updateTopics(reason) {
    const topics = topicSets[reason] || topicSets['other'];
    const checkboxGroup = document.getElementById('topics');

    checkboxGroup.innerHTML = ''; // Clear existing checkboxes

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
    this.reset(); // Reset the form fields
    charCount.textContent = `0/${maxLength}`; // Reset character count
    charCount.style.color = ''; // Reset color
    updateTopics('other'); // Reset topics to default

});