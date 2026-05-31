
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        const target =
            document.querySelector(
                this.getAttribute('href')
            );

        if (target) {

            target.scrollIntoView({
                behavior:'smooth'
            });
        }
    });
});


// SPLIT IMAGE CINEMATIC EFFECT

const aboutSection =
    document.querySelector('.about-section');

const splitWrapper =
    document.querySelector('.split-wrapper');


let expanded = false;


window.addEventListener('scroll', () => {

    const sectionTop =
        aboutSection.getBoundingClientRect().top;

    const triggerPoint =
        window.innerHeight * 0.65;


    // EXPAND
    if(sectionTop < triggerPoint && !expanded){

        expanded = true;

        aboutSection.classList.add('active');

        splitWrapper.classList.add('active');
    }


    // RESET ONLY AT TOP
    if(window.scrollY < 150 && expanded){

        expanded = false;

        aboutSection.classList.remove('active');

        splitWrapper.classList.remove('active');
    }
});

