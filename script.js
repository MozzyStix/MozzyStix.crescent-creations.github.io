document.addEventListener('DOMContentLoaded', function () {
    let moonPhases = document.querySelectorAll('.moon-phase');
    let modal = new bootstrap.Modal(document.getElementById('gameOverModal'));
    let playAgainBtn = document.getElementById('playAgainBtn');
    let counter = document.getElementById('counter');
    let correctAnswers = 0;

    // Function to change background color based on the answer
    function changeBodyColor(colorClass) {
        document.body.classList.remove('body-correct', 'body-wrong');
        document.body.classList.add(colorClass);
    }

    // Update counter
    function updateCounter() {
        counter.textContent = `${correctAnswers}/2`;
    }

    // Handle click events for each moon phase
    moonPhases.forEach(moonPhase => {
        moonPhase.addEventListener('click', function () {
            let phase = moonPhase.getAttribute('data-phase');

            // Fade out the clicked phase and disable further clicks
            moonPhase.classList.add('fade-out');

            // Increase the correctAnswers count if the selected moon phase is correct
            if (phase === 'correct') {
                correctAnswers++;
                updateCounter();
            }

            // Check if both correct answers are selected
            if (correctAnswers === 2) {
                modal.show();
            }

            // Change background color based on the answer
            if (phase === 'correct') {
                changeBodyColor('body-correct');
            } else {
                changeBodyColor('body-wrong');
            }
        });
    });

    // Reset the game if user clicks "Play Again"
    playAgainBtn.addEventListener('click', function() {
        correctAnswers = 0;
        updateCounter();

        // Reset the moon phases to their initial state
        moonPhases.forEach(moonPhase => {
            moonPhase.classList.remove('fade-out');
            moonPhase.style.opacity = '1';
        });

        // Hide the modal and reset body color
        modal.hide();
        changeBodyColor('');
    });
});

// Random facts for each category
let moonFacts = [
    "The moon is Earth's only natural satellite.",
    "The moon is slowly drifting away from Earth at a rate of about 1.5 inches per year.",
    "A day on the moon lasts about 29.5 Earth days.",
    "The moon's gravity is only 1/6th of Earth's.",
    "The moon has no atmosphere, which means there is no weather or wind.",
    "The moon’s surface is covered with dust and rocks called regolith.",
    "The first humans to walk on the moon were Neil Armstrong and Buzz Aldrin in 1969.",
    "The moon has craters, mountains, and plains similar to Earth’s surface.",
    "The far side of the moon, often mistakenly called the “dark side,” is not always dark. It just doesn’t face Earth."
];

let spaceFacts = [
    "Space is completely silent because there is no air to carry sound.",
    "The largest known star is UY Scuti, which is 1,700 times the size of the Sun.",
    "A year on Venus is shorter than a day on Venus.",
    "The nearest galaxy to the Milky Way is the Andromeda Galaxy.",
    "Neutron stars are so dense that one teaspoon of neutron star material would weigh about 6 billion tons.",
    "A black hole’s gravity is so strong that not even light can escape it.",
    "The Hubble Space Telescope has been sending back images of distant galaxies since 1990.",
    "Saturn’s rings are made of ice and rock particles.",
    "There are more stars in the universe than grains of sand on all the Earth's beaches."
];

let sunFacts = [
    "The sun makes up about 99.86% of the mass of our solar system.",
    "It takes 8 minutes and 20 seconds for sunlight to reach Earth.",
    "The sun’s core is about 27 million degrees Fahrenheit.",
    "The sun is about 4.6 billion years old.",
    "The sun’s energy is produced through nuclear fusion in its core.",
    "Every second, the sun releases more energy than humanity has used in all of Earth’s history.",
    "The sun’s magnetic field is responsible for solar flares and sunspots.",
    "Without the sun, life on Earth would not exist.",
    "The sun is expected to burn for another 5 billion years before exhausting its fuel."
];

let astronautFacts = [
    "Yuri Gagarin was the first human to journey into outer space in 1961.",
    "The longest spaceflight by a single astronaut was 437 days, held by Valeri Polyakov.",
    "Astronauts' bones lose density in space due to the lack of gravity, which can lead to osteoporosis.",
    "The first woman to go into space was Valentina Tereshkova, in 1963.",
    "Astronauts in space can experience a condition known as space motion sickness, caused by the lack of gravity.",
    "Neil Armstrong's famous words when he landed on the Moon were, 'That's one small step for [a] man, one giant leap for mankind.'",
    "Astronauts in space can grow up to 2 inches taller due to the lack of gravity compressing their spine.",
    "The first American to orbit the Earth was John Glenn in 1962 aboard Friendship 7.",
    "Astronauts undergo intense training for years, which includes simulations, physical conditioning, and learning how to survive in extreme environments.",
    "Chris Hadfield became famous for his musical performances aboard the International Space Station, including covering David Bowie's 'Space Oddity.'"
];

// Function to get a random fact from an array that hasn't been shown yet
function getRandomFact(factsArray) {
    let unusedFacts = factsArray.filter(fact => !fact.used);
    if (unusedFacts.length === 0) {
        factsArray.forEach(fact => fact.used = false);
        return getRandomFact(factsArray);
    }

    let randomFact = unusedFacts[Math.floor(Math.random() * unusedFacts.length)];
    randomFact.used = true;
    return randomFact.text;
}

// Add 'used' property to each fact object
let moonFactsWithUsage = moonFacts.map(fact => ({ text: fact, used: false }));
let spaceFactsWithUsage = spaceFacts.map(fact => ({ text: fact, used: false }));
let sunFactsWithUsage = sunFacts.map(fact => ({ text: fact, used: false }));
let astronautFactsWithUsage = astronautFacts.map(fact => ({ text: fact, used: false }));

// Function to trigger shake effect on images
function shakeImage(imageId) {
    let allImages = document.querySelectorAll('.flying-image img');
    allImages.forEach(image => image.classList.remove('shake'));

    let image = document.getElementById(imageId);
    image.classList.add('shake');
}

// Event listeners for each button
document.getElementById('moonBtn').addEventListener('click', function() {
    let fact = getRandomFact(moonFactsWithUsage);
    document.getElementById('moonFact').textContent = fact;
    shakeImage('moonImage');
});

document.getElementById('spaceBtn').addEventListener('click', function() {
    let fact = getRandomFact(spaceFactsWithUsage);
    document.getElementById('spaceFact').textContent = fact;
    shakeImage('spaceImage');
});

document.getElementById('sunBtn').addEventListener('click', function() {
    let fact = getRandomFact(sunFactsWithUsage);
    document.getElementById('sunFact').textContent = fact;
    shakeImage('sunImage');
});

document.getElementById('astronautBtn').addEventListener('click', function() {
    let fact = getRandomFact(astronautFactsWithUsage);
    document.getElementById('astronautFact').textContent = fact;
    shakeImage('astronautImage');
});
