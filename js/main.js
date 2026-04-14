/**
 * Génère une cascade de fragments fluide et aérée
 */
function generateCascade() {
    const container = document.getElementById('cascade-container');
    // On augmente drastiquement le nombre de pas pour boucher les trous
    const steps = 120; 

    for (let i = 0; i < steps; i++) {
        // --- TRAJECTOIRE MAÎTRESSE ---
        // On réduit le multiplicateur de i (de 32 à 10) pour resserrer le flux
        let baseX = (i * 10) - 250; 
        let baseY = 40; 
        
        let isFalling = i > 15; // La chute commence un peu plus tard
        let dropIndex = isFalling ? i - 15 : 0;

        let invisible = false;
        if(i <= 20 && i%3 != 0){
            invisible = true;
        }

        if (isFalling) {
            // Courbe de chute plus lisse
            baseY += Math.pow(dropIndex, 1.9);
            baseX += (dropIndex * 3); 
        }

        // --- GESTION DE LA DENSITÉ ---
        // On réduit la densité par pas, mais comme il y a plus de pas, 
        // le résultat sera plus homogène et moins "en paquets".
        const density = isFalling ? 2 : 1;
        
        for (let d = 0; d < density; d++) {
            const fragment = document.createElement('div');
            fragment.classList.add('square');

            // --- DISPERSION (Anti-clumping) ---
            // On ajoute une dispersion même avant la chute pour aérer la ligne
            const spreadFactor = isFalling ? (10 + dropIndex * 2.5) : 8;
            const offsetX = (Math.random() - 0.5) * spreadFactor * 2;
            const offsetY = (Math.random() - 0.5) * spreadFactor * 1.5;

            // --- GÉOMÉTRIE ---
            const baseSize = 24;
            const sizeReduction = isFalling ? (Math.random() * (dropIndex / 4)) : 0;
            const finalSize = Math.max(3, baseSize - sizeReduction);
            
            const rotation = Math.random() * 360;
            const scale = 0.5 + Math.random() * 0.5;

            let shape = "none";
            if (isFalling && Math.random() > 0.4) {
                const shapes = [
                    'polygon(50% 0%, 0% 100%, 100% 100%)',
                    'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                    'polygon(0% 15%, 100% 25%, 85% 100%, 15% 85%)'
                ];
                shape = shapes[Math.floor(Math.random() * shapes.length)];
            }

            let opacity = 1 - (i / steps);
            if(invisible){
                opacity = 0;
            }
            Object.assign(fragment.style, {
                left: `calc(50% + ${baseX + offsetX}px)`,
                top: `${baseY + offsetY}px`,
                width: `${finalSize}px`,
                height: `${finalSize}px`,
                transform: `rotate(${rotation}deg) scale(${scale})`,
                opacity: opacity,
                clipPath: shape,
                zIndex: Math.floor(finalSize)
            });

            container.appendChild(fragment);
        }

        if (isFalling) {
            // La densité de poussière augmente en bas de la cascade
            // Math.floor(dropIndex / 10) permet d'augmenter le nombre par lot
            const dustDensity = Math.floor(dropIndex / 4);
            
            for (let dp = 0; dp < dustDensity; dp++) {
                const dust = document.createElement('div');
                dust.classList.add('dust-particle'); // Utilisation de la nouvelle classe CSS

                // --- DISPERSION TRÈS FORTE (Le "nuage" de poussière) ---
                // Le spread augmente exponentiellement avec la chute
                const dustSpread = 50 + dropIndex * 4;
                const offsetX = (Math.random() - 0.5) * dustSpread;
                const offsetY = (Math.random() - 0.5) * dustSpread;

                // --- GÉOMÉTRIE (Taille minuscule) ---
                // Taille comprise entre 1px et 4px maximum
                const dustSize = Math.random() * 3 + 1; 

                Object.assign(dust.style, {
                    left: `calc(50% + ${baseX + offsetX}px)`,
                    top: `${baseY + offsetY}px`,
                    width: `${dustSize}px`,
                    height: `${dustSize}px`,
                    // Très faible opacité et fondu rapide vers le bas
                    opacity: (Math.random() * 0.4) * (1 - (i / steps)),
                    // Placement aléatoire en profondeur pour l'effet de volume
                    zIndex: Math.floor(Math.random() * 5)
                });

                container.appendChild(dust);
            }
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    generateCascade();
    initBinaryBackground(); 
});



/**
 * Déclenchement de la séquence de transition : coffret -> vignettes
 */
const cards = document.querySelectorAll('.city-card');
document.querySelector('.book-wrap').addEventListener('click', function() {    
    const book = document.querySelector('.scene');
    const wrapper = document.querySelector('.pentagon-wrapper');

    book.classList.add('shift-left');

    wrapper.classList.add('is-visible');

    setTimeout(() => {
        cards.forEach((card, index) => {
            const staggerDelay = index * 500; 
            const cityName = card.querySelector('.city-name').innerText;
            void card.offsetWidth;

            // Début de la phase Émergence
            setTimeout(() => {
                card.classList.add('emerging');

                setTimeout(() => {
                    card.classList.remove('emerging');
                    card.classList.add('deployed');
                }, 1200); 

            }, staggerDelay);
        });
    }, 600);

    // Suivi de la disparition du livre
    setTimeout(() => {
        book.classList.add('fade-out');
        console.log(">>> Le coffret est désormais invisible.");
    }, cards.length * 500 + 2500);

    const orbit = document.querySelector('.orbit-ring');
    const centerData = document.querySelector('.center-data');
    setTimeout(() => {
        orbit.classList.add('active');
        centerData.classList.add('active');
    }, 6000);

});

const keywordsData = {
    'loc-1': { 
        color: '#95a5a6', 
        altitude: '1850m', 
        meteo: 'Hivers rigoureux, UV intenses', 
        ressources: ['Eau de source', 'Pâturages', 'Solaire'],
        list: ['Cirque Glaciaire', '1850m', 'Rayonnement UV', 'Pâturages', 'Eau de source',
            '-20°C', 'Gravité Hydraulique', 'Biomasse Limitée', 'Chauffage Critique', 
            'Logistique de Pente', 'Gestion du Bois-Énergie'
        ] 
    },
    'loc-2': { 
        color: '#00a8ff',
        altitude: '12m', 
        meteo: 'Climat tempéré, Humidité (85%)', 
        ressources: ['Energie marémotrice', 'Stock Halieutique'],
        list: ['Cinq Îlots', 'Énergie Marémotrice', 'Vents Salins', '85% Humidité', 'Halieutique',
            'Énergie Marémotrice', 'Corrosion Marine', 'Oxydation Accélérée', 'Culture Aquaponique'
        ] 
    },
    'loc-3': { 
        color: '#27ae60', 
        altitude: '321 mètres', 
        meteo: 'Climat tempéré', 
        ressources: ["Captage Pluvial", 'Jardins en terrasses'],
        list: ['Inertie Thermique', 'Semi-enterré', 'Toits Végétalisés', 'Tempéré',
            'Architecture Vernaculaire', 'Récupération Pluviale', 'Puits de Lumière',
            'Humus Fertile'
        ] 
    },
    'loc-4': { 
        color: '#f1c40f', 
        altitude: '280 mètres', 
        meteo: 'Climat tempéré, Précipitations modérées', 
        ressources: ["Terre agricoles riches", 'Vergers', 'Puits artésiens'],
        list: ['Pierre Sèche', 'Plateau Calcaire', 'Vergers', 'Puits Artésiens', 'Médiéval',
            'Gelées Hivernales', 'Terres Alluviales', 'Aridité Estivale', 'Agroforesterie',
            'Artisanat de la Pierre'
        ] 
    },
    'loc-5': { 
        color: '#e67e22', 
        altitude: '450 mètres', 
        meteo: 'Chaleur extrême le jour, Nuits glaciales, Hygrométrie (5%)', 
        ressources: ['Énergie solaire', 'Terres Minérales'],
        list: ['Plateau Aride', 'Solaire Illimité', '45°C', 'Minéraux', 'Technologique',
            'Amplitude Thermique', 'Nuits Glaciales', 'Sels Fondus', 'Stress Thermique',
            'Zéro Humidité'
        ] 
    }
};

const kwContainer = document.createElement('div');
kwContainer.id = 'background-keywords';
document.body.appendChild(kwContainer);

let isLocationLocked = false;

cards.forEach(card => {
    const locClass = [...card.classList].find(c => c.startsWith('loc-'));
    const data = keywordsData[locClass];
    const backFace = card.querySelector('.card-back');
    const cityNameElement = card.querySelector('.city-name');
    const cityNameText = cityNameElement.innerText;

    if (data && backFace) {
        backFace.style.backgroundColor = `${data.color}15`; 
        backFace.style.border = `1px solid ${data.color}`;
    }

    card.addEventListener('mouseenter', () => {
        if (isLocationLocked) return;
        updateCenterUI('analyzing', data, cityNameText);

        card.style.borderColor = data.color;
        card.style.boxShadow = `0 15px 40px ${data.color}44`;
        cityNameElement.style.color = data.color;
        cityNameElement.style.textShadow = `0 0 10px ${data.color}66`;
    });

    card.addEventListener('mouseleave', () => {
        if (isLocationLocked) return;

        clearKeywords();
        updateCenterUI('default');

        card.style.borderColor = 'rgba(184, 115, 51, 0.3)';
        card.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.6)`;
        cityNameElement.style.color = "var(--copper)";
        cityNameElement.style.textShadow = 'none';
    });

    card.addEventListener('click', (e) => {
        e.stopPropagation();
        const isAlreadyFlipped = card.classList.contains('is-flipped');

        cards.forEach(c => c.classList.remove('is-flipped'));

        if (isAlreadyFlipped) {
            card.classList.remove('is-flipped');
            updateCenterUI('analyzing', data, cityNameText);
        } else {
            fillCardBack(card, data);
            card.classList.add('is-flipped');
            updateCenterUI('locked', data, cityNameText);
            card.style.borderColor = data.color;
            card.style.boxShadow = `0 0 50px ${data.color}66`;
        }
    });
});

function displayKeywords(data) {

    if (isLocationLocked) return;

    const color = data.color;
    const list = data.list;
    kwContainer.innerHTML = '';

    list.forEach((text, i) => {
        if (isLocationLocked) return;

        const span = document.createElement('span');
        span.className = 'keyword';
        span.innerText = text;
        span.style.color = color;
        span.style.textShadow = `0 0 8px ${color}66`;
        
        const x = Math.random() * 80 + 10; 
        const y = Math.random() * 80 + 10;
        
        Object.assign(span.style, {
            left: `${x}%`,
            top: `${y}%`,
            transform: `translateY(20px)`
        });

        kwContainer.appendChild(span);
        
        setTimeout(() => {
            if (!isLocationLocked) {
                span.classList.add('visible');
                span.style.transform = `translateY(0)`;
            } else {
                span.remove();
            }
        }, i * 150);
    });
}

function clearKeywords(all = false) {
    if (all) {
        kwContainer.innerHTML = '';
    } else {
        const keywords = kwContainer.querySelectorAll('.keyword');
        keywords.forEach(kw => kw.remove());
    }
}

document.addEventListener('click', () => {
    if (!isLocationLocked) return;
    cards.forEach(c => c.classList.remove('is-flipped'));
    updateCenterUI('default');
});

/**
 * Gère les états visuels du centre de données
 * @param {string} state - 'default', 'analyzing', ou 'locked'
 * @param {object} data - Les données du lieu (optionnel)
 * @param {string} cityName - Le nom du lieu (optionnel)
 */
function updateCenterUI(state, data = null, cityName = '') {
    const center = document.querySelector('.center-data');
    const stream = document.querySelector('.data-stream');
    const logo = document.querySelector('.project-logo');
    const copper = "var(--copper)";

    // Reset par défaut
    center.classList.remove('active-sphere');
    center.style.backgroundColor = 'transparent';
    stream.classList.remove('analyzing');
    logo.classList.remove('hidden');

    switch (state) {
        case 'locked':
            isLocationLocked = true;
            currentBinaryColor = data.color;
            clearKeywords(true);
            generateBinaryStatic(data.color);
            binaryCanvas.classList.add('active');

            logo.classList.add('hidden');
            center.classList.add('active-sphere');
            center.style.borderColor = data.color;
            center.style.setProperty('--sphere-color-glow-low', data.color + '66');
            
            stream.innerHTML = `
                <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                    <span style="font-size: 0.55em; letter-spacing: 5px; opacity: 0.7; margin-bottom: 8px; color: white;">LOCATION</span>
                    <span style="color: ${data.color}; font-size: 1.2rem; font-weight: bold; letter-spacing: 2px;">${cityName.toUpperCase()}</span>
                    <span style="font-size: 0.55em; letter-spacing: 5px; opacity: 0.7; margin-top: 8px; color: white;">DATABASE</span>
                </div>`;
            break;

        case 'analyzing':
            isLocationLocked = false;
            displayKeywords(data);
            if(binaryCanvas) binaryCanvas.classList.remove('active');
            logo.classList.add('hidden');
            stream.innerText = `ANALYZING...\n '${cityName}'`;
            stream.style.color = data.color;
            stream.classList.add('analyzing');
            center.style.borderColor = data.color;
            center.style.boxShadow = `0 0 30px ${data.color}44`;
            break;

        case 'default':
            isLocationLocked = false;
            clearKeywords(true)
            if(binaryCanvas) binaryCanvas.classList.remove('active');
            stream.innerText = "SCANNING...";
            stream.style.color = copper;
            center.style.borderColor = copper;
            center.style.boxShadow = `0 0 30px rgba(184, 115, 51, 0.2)`;
            break;
    }
}

function fillCardBack(card, data) {
    card.style.setProperty('--location-color', data.color);
    card.querySelector('.val-alt').innerText = data.altitude;
    card.querySelector('.val-meteo').innerText = data.meteo;
    
    const resContainer = card.querySelector('.val-ressources');
    resContainer.innerHTML = ''; 
    data.ressources.forEach(res => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.style.borderColor = data.color + '44';
        span.innerText = res;
        resContainer.appendChild(span);
    });
}

/** Background binary animation **/

let binaryCanvas, ctx;
const binaryGrid = [];

function initBinaryBackground() {
    binaryCanvas = document.createElement('canvas');
    binaryCanvas.id = 'binary-bg';
    document.body.appendChild(binaryCanvas);
    ctx = binaryCanvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawBinary();
}

function resizeCanvas() {
    binaryCanvas.width = window.innerWidth;
    binaryCanvas.height = window.innerHeight;
}

let binaryData = [];
let binaryOpacity = 0;
let currentBinaryColor = '#ffffff'

function drawBinary(color) {
    const targetOpacity = isLocationLocked ? 1 : 0;
    binaryOpacity += (targetOpacity - binaryOpacity) * 0.05;

    ctx.clearRect(0, 0, binaryCanvas.width, binaryCanvas.height);

    if (binaryOpacity > 0.001) {
        ctx.font = '10px Orbitron';
        ctx.fillStyle = currentBinaryColor;

        binaryData.forEach(point => {
            ctx.globalAlpha = point.alpha * binaryOpacity;
            ctx.fillText(point.char, point.x, point.y);
        });
    }

    requestAnimationFrame(() => drawBinary(color));
}

function generateBinaryStatic(color) {
    binaryData = []; 
    const fontSize = 15;
    const columns = Math.floor(binaryCanvas.width / fontSize);
    const rows = Math.floor(binaryCanvas.height / fontSize);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            if (Math.random() > 0.92) {
                binaryData.push({
                    x: x * fontSize,
                    y: y * fontSize,
                    char: Math.random() > 0.5 ? "1" : "0",
                    alpha: Math.random() * 0.15 + 0.3 
                });
            }
        }
    }
}