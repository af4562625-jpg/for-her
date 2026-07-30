const starsContainer = document.getElementById("stars");
const heartsContainer = document.getElementById("hearts");
const fireworksContainer = document.getElementById("fireworks");

const startBtn = document.getElementById("startBtn");
const surpriseBtn = document.getElementById("surprise");

const messageSection = document.getElementById("message");
const typingText = document.getElementById("typing");

const letterText = `Даша,

этот небольшой сайт я сделал специально для тебя.

Просто хотел напомнить, что ты очень хороший,
добрый и светлый человек.

Пусть у тебя будет как можно больше счастливых дней,
приятных моментов и искренних улыбок.

Спасибо, что ты есть.

С теплом,
Антон ❤️`;

let typingStarted = false;

function createStars() {
    const starCount = window.innerWidth < 600 ? 70 : 130;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("span");

        star.classList.add("star");

        const size = Math.random() * 3 + 1;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 4}s`;

        starsContainer.appendChild(star);
    }
}

function createHeart() {
    const heart = document.createElement("div");

    const hearts = ["❤️", "💖", "💕", "💗", "🌸", "✨"];

    heart.classList.add("floating-heart");

    heart.textContent =
        hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = `${Math.random() * 100}%`;

    heart.style.fontSize = `${Math.random() * 18 + 16}px`;

    heart.style.animationDuration = `${Math.random() * 5 + 7}s`;

    heart.style.setProperty(
        "--drift",
        `${Math.random() * 180 - 90}px`
    );

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 13000);
}

function startHeartAnimation() {
    createHeart();

    setInterval(() => {
        createHeart();
    }, 850);
}

function typeLetter() {
    if (typingStarted) {
        return;
    }

    typingStarted = true;

    let index = 0;

    typingText.textContent = "";

    function typeNextCharacter() {
        if (index < letterText.length) {
            typingText.textContent += letterText[index];

            index++;

            let delay = 35;

            if (
                letterText[index - 1] === "." ||
                letterText[index - 1] === "," ||
                letterText[index - 1] === "\n"
            ) {
                delay = 120;
            }

            setTimeout(typeNextCharacter, delay);
        }
    }

    typeNextCharacter();
}

startBtn.addEventListener("click", () => {
    messageSection.classList.add("show");

    typeLetter();

    messageSection.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    createBurst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        36
    );

    startBtn.textContent = "Для Даши ❤️";
});

function createBurst(x, y, amount = 28) {
    const symbols = ["✨", "💖", "🌸", "💕"];

    for (let i = 0; i < amount; i++) {
        const spark = document.createElement("span");

        spark.classList.add("spark");

        spark.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;

        spark.style.width = "auto";
        spark.style.height = "auto";

        spark.style.fontSize = `${Math.random() * 12 + 12}px`;

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 220 + 60;

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        spark.style.setProperty("--x", `${moveX}px`);
        spark.style.setProperty("--y", `${moveY}px`);

        fireworksContainer.appendChild(spark);

        setTimeout(() => {
            spark.remove();
        }, 1400);
    }
}

function createFireworkShow() {
    let explosions = 0;

    const interval = setInterval(() => {
        const x =
            Math.random() * window.innerWidth * 0.8 +
            window.innerWidth * 0.1;

        const y =
            Math.random() * window.innerHeight * 0.6 +
            window.innerHeight * 0.1;

        createBurst(x, y, 30);

        explosions++;

        if (explosions >= 8) {
            clearInterval(interval);
        }
    }, 320);
}

surpriseBtn.addEventListener("click", () => {
    createFireworkShow();

    surpriseBtn.textContent = "Ты замечательная 💖";

    document.body.animate(
        [
            {
                filter: "brightness(1)"
            },
            {
                filter: "brightness(1.18)"
            },
            {
                filter: "brightness(1)"
            }
        ],
        {
            duration: 900,
            easing: "ease"
        }
    );

    for (let i = 0; i < 18; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 90);
    }
});

function setupScrollReveal() {
    const sections = document.querySelectorAll(
        ".quote, .wish .glass, .finalCard"
    );

    sections.forEach((section) => {
        section.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
}

function createMouseSpark(event) {
    if (Math.random() > 0.4) {
        return;
    }

    const spark = document.createElement("span");

    spark.textContent = "✨";
    spark.style.position = "fixed";
    spark.style.left = `${event.clientX}px`;
    spark.style.top = `${event.clientY}px`;
    spark.style.pointerEvents = "none";
    spark.style.zIndex = "100";
    spark.style.fontSize = `${Math.random() * 8 + 10}px`;
    spark.style.transform = "translate(-50%, -50%)";
    spark.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    document.body.appendChild(spark);

    requestAnimationFrame(() => {
        spark.style.opacity = "0";
        spark.style.transform =
            "translate(-50%, -90%) scale(0.3)";
    });

    setTimeout(() => {
        spark.remove();
    }, 850);
}

document.addEventListener("mousemove", createMouseSpark);

document.addEventListener("click", (event) => {
    if (
        event.target === startBtn ||
        event.target === surpriseBtn
    ) {
        return;
    }

    createBurst(event.clientX, event.clientY, 8);
});

createStars();
startHeartAnimation();
setupScrollReveal();
