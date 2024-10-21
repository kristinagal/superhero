const url = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

// pasiimam duomenis iš API ir atvaizduojam html
// naudojam promise
function fetchSuperheroes() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // jei prisijungėm prie API sėkmingai, nuskaitomas JSON į data
        })
        .then(data => {
            displaySquadInfo(data);
            displayHeroes(data);
        })
        .catch(error => {
            console.error('Error fetching superhero data:', error);
        });
}

// HTML for squad info
function displaySquadInfo(data) {
    // pasiimam iš json squad info
    const squadName = data.squadName;
    const homeTown = data.homeTown;
    const formed = data.formed;

    // atvaizduojama squad info
    const header = document.createElement('h1');
    header.textContent = squadName;
    document.body.prepend(header); // "super hero squad"

    const squadInfo = document.createElement('h2');
    squadInfo.textContent = `Hometown: ${homeTown} // Formed: ${formed}`;
    document.body.insertBefore(squadInfo, document.getElementById('hero-list')); // nurodom vietą, kur atvaizduot
}

// HTML for each hero
function displayHeroes(data) {
    const heroList = document.getElementById('hero-list');
    heroList.innerHTML = ''; // clear list

    data.members.forEach(hero => {
        const heroCard = document.createElement('div');
        heroCard.classList.add('hero-card');

        // dataset'ai 
        heroCard.dataset.secretIdentity = hero.secretIdentity;
        heroCard.dataset.age = hero.age;
        heroCard.dataset.powers = hero.powers.join(', ');

        // Name
        const heroName = document.createElement('h2');
        heroName.textContent = hero.name;
        heroCard.appendChild(heroName);

        // Display secret identity using dataset
        const identity = document.createElement('p');
        identity.textContent = `Secret identity: ${heroCard.dataset.secretIdentity}`;
        heroCard.appendChild(identity);

        // Display age using dataset
        const age = document.createElement('p');
        age.textContent = `Age: ${heroCard.dataset.age}`;
        heroCard.appendChild(age);

        // Superpowers title
        const superpowersTitle = document.createElement('p');
        superpowersTitle.textContent = 'Superpowers:';
        heroCard.appendChild(superpowersTitle);

        // Superpowers list
        const superpowersList = document.createElement('ul');
        superpowersList.classList.add('superpowers');
        hero.powers.forEach(power => {
            const powerItem = document.createElement('li');
            powerItem.textContent = power;
            superpowersList.appendChild(powerItem);
        });

        heroCard.appendChild(superpowersList);

        heroList.appendChild(heroCard);
    });
}

fetchSuperheroes();
