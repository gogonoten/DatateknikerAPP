// 🟢 Gemmer den valgte vej og tid i variabler
let totalTid = 0;
let vej = "Her er din vej gennem uddannelsen:";
let hasChosenInfrastruktur = false; // Flag for om infrastruktur er valgt
let hasTakenGF1 = false; // Flag for om GF1 er taget
let maxTid = 5.5; // Default maxTid, hvis brugeren tager alt
let progressBar = document.getElementById('progress-bar');

// Progressbar
function updateProgressBar() {
    if (progressBar) {
        // Dynamisk justering af maxTid afhængig af valget
        let percentage = (totalTid / maxTid) * 100;
        // let array = [0, 25, 50, 75, 100, 111];

        // for (var i = 0; i < 5; i++) {
        //     array[i]++;
        // }

        // array.forEach(function (element) { console.log(element); });

        // forEach(array, function (element) { console.log(element); });

        progressBar.style.width = percentage + '%';
    }
}

function navigate(option) {
    let content = document.getElementById("content");

    if (option === 1) {
        totalTid += 0.5;
        vej += " ➝ GF1 (0.5 år)";
        hasTakenGF1 = true; // GF1 er taget
        let template = document.getElementById("gf1-template");
        content.innerHTML = template.innerHTML;
        maxTid = 5.5; // Hvis GF1 tages, er maxTid 5.5 år
    } else if (option === 2) {
        gf2();
    } else if (option === 3) {
        totalTid += 0.5;
        vej += " ➝ GF2 (0.5 år)";
        let template = document.getElementById("gf2-template");
        content.innerHTML = template.innerHTML;
        maxTid = 5; // Hvis vi starter direkte på GF2, er maxTid 5 år
    }
    updateProgressBar();
}

function gf2() {
    let content = document.getElementById("content");
    totalTid += 0.5;
    vej += " ➝ GF2 (0.5 år)";
    let template = document.getElementById("gf2-template");
    content.innerHTML = template.innerHTML;
    maxTid = hasTakenGF1 ? 5.5 : 5; // Hvis vi har taget GF1, maxTid = 5.5, ellers 5
    updateProgressBar();
}

function chooseSpecialization() {
    let content = document.getElementById("content");
    let template = document.getElementById("specialization-template");
    content.innerHTML = template.innerHTML;
    chooseProgramming(2);
}


function chooseProgramming(hej) {
    totalTid += 4.5;
    vej += " ➝ Programmering (4.5 år)";
    let content = document.getElementById("content");
    let template = document.getElementById("programming-template");
    content.innerHTML = template.innerHTML;
    maxTid = hasTakenGF1 ? 5.5 : 5;

    content.innerHTML += `
        <h2>Opsummering</h2>
        <p><strong>${vej}</strong></p>
        <h3>Det vil tage dig <strong>${maxTid} år</strong> at blive <strong>Datatekniker med speciale i programmering</strong>.</h3>
    `;

    updateProgressBar();
}


function chooseITSupport() {
    totalTid += 2;
    vej += " ➝ IT-Supporter (2 år)";
    let content = document.getElementById("content");
    let template = document.getElementById("it-supporter-template");
    content.innerHTML = template.innerHTML;

    // Max tid skal passe til om GF1 blev taget eller ej
    maxTid = hasTakenGF1 ? 3 : 2.5;

    updateProgressBar();
}


function chooseInfrastructure() {
    totalTid += 2.5; // Lægger de sidste 2.5 år til
    vej += " ➝ Datatekniker med speciale i infrastruktur (2.5 år)";
    let content = document.getElementById("content");
    let template = document.getElementById("infrastructure-template");
    content.innerHTML = template.innerHTML;
    maxTid = 5.5; // Infrastruktur har 5.5 år som maxTid
    updateProgressBar();
}

function showSummary(specialization) {
    let content = document.getElementById("content");

    // Beregn totalTid baseret på valgene
    if (hasTakenGF1) {
        if (specialization === "IT-Supporter") {
            totalTid = 3; // Hvis brugeren vælger GF1 + GF2 + IT-Supporter
        } else if (specialization === "Datatekniker med speciale i infrastruktur") {
            totalTid = 5.5; // Hvis brugeren vælger GF1 + GF2 + IT-Supporter + Infrastruktur
        } else if (specialization === "Programmering") {
            totalTid = 5.5; // Hvis brugeren vælger GF1 + GF2 + Programmering
        }
    } else {
        // Hvis brugeren ikke har valgt GF1 (starter direkte på GF2)
        if (specialization === "IT-Supporter") {
            totalTid = 2.5; // Hvis brugeren vælger GF2 + IT-Supporter
        } else if (specialization === "Datatekniker med speciale i infrastruktur") {
            totalTid = 5; // Hvis brugeren vælger GF2 + IT-Supporter + Infrastruktur
        } else if (specialization === "Programmering") {
            totalTid = 5; // Hvis brugeren vælger GF2 + Programmering
        }
    }

    // Dynamisk maxTid opdateres her, så den passer til det valgte scenarie
    if (specialization === "Programmering" || specialization === "Datatekniker med speciale i infrastruktur") {
        maxTid = 5.5; // Programmering og Infrastruktur kræver 5.5 år
    } else {
        maxTid = 5; // IT-Supporter kræver kun 5 år
    }

    content.innerHTML = `
        <h2>Opsummering</h2>
        <p><strong>${vej}</strong></p>
        <h3>Det vil tage dig <strong>${totalTid} år</strong> at blive <strong>${specialization}</strong>.</h3>
    `;

    updateProgressBar();
}

// Nedtælling og skjul forsiden
let countdown = 10; // Starttidspunkt
let timerElement = document.getElementById("timer");

function updateCountdown() {
    countdown--;
    timerElement.textContent = countdown; // Opdater tallet på skærmen

    if (countdown <= 0) {
        showMainContent(); // Når vi rammer 0 -> Vis main content
    }
}

// Skjuler forsiden og viser hovedindholdet
function showMainContent() {
    let forside = document.getElementById("forside");
    let mainContent = document.getElementById("main-content");

    // Fadeout animation til forsiden
    forside.classList.add("fade-out");

    // Vent på animationen og vis hovedindholdet med en fade-in
    setTimeout(() => {
        forside.style.display = "none";
        mainContent.classList.remove("hidden");
        mainContent.classList.add("fade-in");
    }, 1000);
}

// Start nedtællingen 
let countdownInterval = setInterval(updateCountdown, 1000);

// Skjuler forside efter 10 sekunder
setTimeout(() => {
    clearInterval(countdownInterval); // Stop nedtællingen
    showMainContent();
}, 10000);

// Spring over-knappen stopper nedtællingen og skipper til main
document.getElementById("skipButton").addEventListener("click", () => {
    clearInterval(countdownInterval); // Stop nedtællingen
    showMainContent(); // Vis hovedindholdet med det samme
});
