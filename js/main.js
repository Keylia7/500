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

document.addEventListener('DOMContentLoaded', generateCascade);


/**
 * Déclenchement de la séquence de transition : coffret -> vignettes
 */

document.querySelector('.book-wrap').addEventListener('click', function() {    
    const book = document.querySelector('.scene');
    const wrapper = document.querySelector('.pentagon-wrapper');
    const cards = document.querySelectorAll('.city-card');

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