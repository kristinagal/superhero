
const url = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

// pasiimam duomenis iš API ir atvaizduojam html
// naudojam promise
function fetchSuperheroes() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => { // jei prisijungėm prie API sėkmingai, nuskaitomas JSON į data

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
    heroList.innerHTML = ''; 

    data.members.forEach(hero => {
        const heroCard = document.createElement('div');
        heroCard.classList.add('hero-card');

        // Name
        const heroName = document.createElement('h2');
        heroName.textContent = hero.name;
        heroCard.appendChild(heroName);

        // Secret identity
        const identity = document.createElement('p');
        identity.textContent = `Secret identity: ${hero.secretIdentity}`;
        heroCard.appendChild(identity);

        // Age
        const age = document.createElement('p');
        age.textContent = `Age: ${hero.age}`;
        heroCard.appendChild(age);

        // Superpowers
        const superpowersTitle = document.createElement('p');
        superpowersTitle.textContent = 'Superpowers:';
        heroCard.appendChild(superpowersTitle);

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
