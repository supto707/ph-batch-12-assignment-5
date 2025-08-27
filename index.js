
let coins = 100;
let hearts = 0;
let copyCount = 2;
let callHistory = [];


const heartCountElement = document.getElementById('heart-count');
const coinCountElement = document.getElementById('coin-count');
const copyCountElement = document.getElementById('copy-count');
const callHistoryList = document.getElementById('call-history-list');
const clearButton = document.getElementById('clear');

function updateCounters() {
    heartCountElement.textContent = hearts;
    coinCountElement.textContent = coins;
    copyCountElement.textContent = copyCount;
}

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


document.querySelectorAll('.copy-btn').forEach(copyBtn => {
    copyBtn.addEventListener('click', function() {
        const card = this.closest('.card');
        const number = card.querySelector('.hotline-number').textContent;
        const title = card.querySelector('h3').textContent;
        
        
        navigator.clipboard.writeText(number).then(() => {
           
            alert(`${title} (${number}) copied to clipboard!`);
            
           
            copyCount++;
            updateCounters();
            
            
            const originalContent = this.innerHTML;
            this.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            setTimeout(() => {
                this.innerHTML = originalContent;
            }, 2000);
        });
    });
});


document.querySelectorAll('.call-btn').forEach(callBtn => {
    callBtn.addEventListener('click', function() {
        const card = this.closest('.card');
        const number = card.querySelector('.hotline-number').textContent;
        const title = card.querySelector('h3').textContent;
        
       
        if (coins < 20) {
            alert('Not enough coins! You need 20 coins to make a call.');
            return;
        }
        
        coins -= 20;
        
        
        alert(`Calling ${title} at ${number}`);
        
      
        const time = new Date().toLocaleTimeString();
        callHistory.unshift({ title, number, time });
        
        
        updateCallHistory();
        updateCounters();
    });
});


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


clearButton.addEventListener('click', function() {
    callHistory = [];
    updateCallHistory();
});


document.addEventListener('DOMContentLoaded', function() {
    updateCounters();
    updateCallHistory();
});
