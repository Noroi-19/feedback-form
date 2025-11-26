// // Stars
// const stars = document.querySelectorAll('.star');
// const starsLabel = document.getElementById('starsLabel');
// let rating = 0;
// stars.forEach(s => {
//     s.addEventListener('mouseenter', () => highlight(+s.dataset.value));
//     s.addEventListener('mouseleave', () => highlight(rating));
//     s.addEventListener('click', () => { rating = +s.dataset.value; highlight(rating); });
// });
// function highlight(n) {
//     stars.forEach(s => s.style.opacity = (+s.dataset.value <= n ? '1' : '0.35'));
//     starsLabel.textContent = n ? (n + ' / 5') : 'Choose 1-5';
// }

// Stars
const stars = document.querySelectorAll('.star');
const starsLabel = document.getElementById('starsLabel');
let rating = 0;

stars.forEach(s => {
    s.addEventListener('mouseenter', () => highlight(+s.dataset.value));
    s.addEventListener('mouseleave', () => highlight(rating));
    s.addEventListener('click', () => { 
        rating = +s.dataset.value; 
        highlight(rating); 
    });
});

function highlight(n) {
    stars.forEach(s => {
        if (+s.dataset.value <= n) {
            s.style.opacity = '1';
            s.style.color = 'gold'; // selected stars color
        } else {
            s.style.opacity = '0.35';
            s.style.color = 'white'; // unselected stars color
        }
    });
    starsLabel.textContent = n ? (n + ' / 5') : 'Choose 1-5';
}


// Chips (reaction)
const chips = document.querySelectorAll('.chip');
let reaction = '';
chips.forEach(c => c.addEventListener('click', () => {
    chips.forEach(x => x.classList.remove('selected'));
    c.classList.add('selected');
    reaction = c.dataset.val;
}));


// Form submit
const form = document.getElementById('feedbackForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        rating: rating || null,
        expectation: document.getElementById('expectation').value,
        bestPart: document.getElementById('bestPart').value.trim(),
        reaction: reaction || null,
        emotional: document.querySelector('input[name="emotional"]:checked').value,
        serviceRating: document.getElementById('serviceRating').value,
        timing: document.querySelector('input[name="timing"]:checked').value,
        recommend: document.querySelector('input[name="recommend"]:checked').value,
        improve: document.getElementById('improve').value.trim(),
        message: document.getElementById('message').value.trim(),
        submittedAt: new Date().toISOString()
    };


    // For demo: download JSON file and show thank you box
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = (data.name ? data.name.replace(/\s+/g, '_') : 'feedback') + '_feedback.json';
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);


    document.getElementById('thankBox').style.display = 'block';
    setTimeout(() => document.getElementById('thankBox').style.opacity = 1, 50);


    // Reset form (optional)
    form.reset(); rating = 0; highlight(0); chips.forEach(x => x.classList.remove('selected')); reaction = '';
});
document.getElementById('resetBtn').addEventListener('click', () => { form.reset(); rating = 0; highlight(0); chips.forEach(x => x.classList.remove('selected')); reaction = ''; document.getElementById('thankBox').style.display = 'none'; });

