// Initialize state
let coins = 100;
let hearts = 0;
let copyCount = 2; // Starting with 2 as shown in the UI
let callHistory = [];

// DOM Elements
const heartCountElement = document.getElementById('heart-count');
const coinCountElement = document.getElementById('coin-count');
const copyCountElement = document.getElementById('copy-count');
const callHistoryList = document.getElementById('call-history-list');
const clearButton = document.getElementById('clear');

// Update UI counters
function updateCounters() {
    heartCountElement.textContent = hearts;
    coinCountElement.textContent = coins;
    copyCountElement.textContent = copyCount;
}

// Handle favorite button click
document.querySelectorAll('.heart-icon').forEach(heartIcon => {
    heartIcon.addEventListener('click', function() {
        const isFavorited = this.classList.contains('text-red-500');
        
        if (!isFavorited) {
            hearts++;
            this.classList.remove('text-gray-400');
            this.classList.add('text-red-500');
            this.setAttribute('fill', 'currentColor');
        } else {
            hearts--;
            this.classList.remove('text-red-500');
            this.classList.add('text-gray-400');
            this.setAttribute('fill', 'none');
        }
        
        updateCounters();
    });
});

// Handle copy button click
document.querySelectorAll('.copy-btn').forEach(copyBtn => {
    copyBtn.addEventListener('click', function() {
        const card = this.closest('.card');
        const number = card.querySelector('.hotline-number').textContent;
        const title = card.querySelector('h3').textContent;
        
        // Copy to clipboard
        navigator.clipboard.writeText(number).then(() => {
            // Show alert
            alert(`${title} (${number}) copied to clipboard!`);
            
            // Increase copy count
            copyCount++;
            updateCounters();
            
            // Visual feedback
            const originalContent = this.innerHTML;
            this.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            setTimeout(() => {
                this.innerHTML = originalContent;
            }, 2000);
        });
    });
});

// Handle call button click
document.querySelectorAll('.call-btn').forEach(callBtn => {
    callBtn.addEventListener('click', function() {
        const card = this.closest('.card');
        const number = card.querySelector('.hotline-number').textContent;
        const title = card.querySelector('h3').textContent;
        
        // Check if enough coins
        if (coins < 20) {
            alert('Not enough coins! You need 20 coins to make a call.');
            return;
        }
        
        // Deduct coins
        coins -= 20;
        
        // Show alert
        alert(`Calling ${title} at ${number}`);
        
        // Add to call history
        const time = new Date().toLocaleTimeString();
        callHistory.unshift({ title, number, time });
        
        // Update UI
        updateCallHistory();
        updateCounters();
    });
});

// Update Call History
function updateCallHistory() {
    if (callHistory.length === 0) {
        callHistoryList.innerHTML = '<p class="text-gray-500 text-center py-4">No call history</p>';
        return;
    }

    callHistoryList.innerHTML = callHistory.map(call => `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-3">
            <div>
                <h4 class="font-semibold text-gray-800">${call.title}</h4>
                <p class="text-sm text-gray-500">${call.number}</p>
            </div>
            <span class="text-sm text-gray-400">${call.time}</span>
        </div>
    `).join('');
}

// Clear call history
clearButton.addEventListener('click', function() {
    callHistory = [];
    updateCallHistory();
});

// Initialize the UI
document.addEventListener('DOMContentLoaded', function() {
    updateCounters();
    updateCallHistory();
});
