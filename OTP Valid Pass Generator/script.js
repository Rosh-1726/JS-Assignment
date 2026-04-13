function generatePassword() {
    let length = document.getElementById("length").value;
    let includeNumbers = document.getElementById("numbers").checked;
    let includeUppercase = document.getElementById("uppercase").checked;
    let includeSymbols = document.getElementById("symbols").checked;

    let lower = "abcdefghijklmnopqrstuvwxyz";
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+";

    let allChars = lower;

    if (includeUppercase) allChars += upper;
    if (includeNumbers) allChars += numbers;
    if (includeSymbols) allChars += symbols;

    let password = "";

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    document.getElementById("result").value = password;
}
document.getElementById('generate').addEventListener('click', () => {
    const length = document.getElementById('length').value;
    const hasNumbers = document.getElementById('numbers').checked;
    const hasUpper = document.getElementById('uppercase').checked;
    const hasSymbols = document.getElementById('symbols').checked;

    const password = generatePassword(length, hasNumbers, hasUpper, hasSymbols);
    
    // Update UI
    document.getElementById('passwordResult').value = password;
    updateStrengthUI(password);
});

function updateStrengthUI(password) {
    const bar = document.getElementById('strengthBar');
    const text = document.getElementById('strengthText');
    let score = 0;

    if (!password) {
        bar.style.width = "0%";
        text.innerText = "Strength: None";
        return;
    }

    // Scoring Logic
    if (password.length > 8) score++;
    if (password.length > 12) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // Map score to UI updates
    switch (score) {
        case 0:
        case 1:
            bar.className = "progress-bar bg-danger";
            bar.style.width = "25%";
            text.innerText = "Weak";
            text.className = "fw-bold mt-1 d-block text-danger";
            break;
        case 2:
        case 3:
            bar.className = "progress-bar bg-warning";
            bar.style.width = "50%";
            text.innerText = "Medium";
            text.className = "fw-bold mt-1 d-block text-warning";
            break;
        case 4:
            bar.className = "progress-bar bg-info";
            bar.style.width = "75%";
            text.innerText = "Strong";
            text.className = "fw-bold mt-1 d-block text-info";
            break;
        case 5:
            bar.className = "progress-bar bg-success";
            bar.style.width = "100%";
            text.innerText = "Very Strong";
            text.className = "fw-bold mt-1 d-block text-success";
            break;
    }
}

