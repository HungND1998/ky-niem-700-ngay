const progress = document.querySelector(".progress");
const percent = document.querySelector(".percent");
const textBox = document.querySelector(".textBox");
const button = document.querySelector(".button");
const textBtn = document.querySelector(".textBtn");
const heartBox = document.querySelector(".heartBox");
const cursor = document.querySelector(".buttonCLick img");
const heartItem1 = document.querySelector(".heartItem.item1");
const heartItem2 = document.querySelector(".heartItem.item2");
const heartItem3 = document.querySelector(".heartItem.item3");

let count = 0;
let percentWidth = 0;
let heartLeft = -3.2;
let isNavigating = false;

function spawnFloatingHeart() {
    const symbols = ["💗", "💖", "✨", "💕", "🌸"];
    const el = document.createElement("div");
    el.className = "bg-floating-heart";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = `${Math.random() * 100}vw`;
    el.style.fontSize = `${14 + Math.random() * 18}px`;
    const duration = 4 + Math.random() * 4;
    el.style.animationDuration = `${duration}s`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
}

setInterval(spawnFloatingHeart, 350);

function triggerHeartBurst(x, y, particleCount = 24) {
    const symbols = ["💖", "💗", "💘", "✨", "💝"];
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement("div");
        p.className = "burst-particle";
        p.textContent = symbols[i % symbols.length];
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        document.body.appendChild(p);

        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
        const distance = 60 + Math.random() * 110;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        requestAnimationFrame(() => {
            p.style.transform = `translate(${tx}px, ${ty}px) scale(0.4) rotate(${Math.random() * 180}deg)`;
            p.style.opacity = "0";
        });
        setTimeout(() => p.remove(), 950);
    }
}

const progressLoad = setInterval(progressInterval, 100);

button.addEventListener("click", (e) => {
    if (isNavigating) return;
    isNavigating = true;
    const rect = button.getBoundingClientRect();
    triggerHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 28);
    button.style.transform = "scale(0.8)";
    setTimeout(() => {
        button.style.transform = "scale(1)";
        window.location.href = "./love/love.html";
    }, 350);
});

function showCompleteSequence() {
    percent.textContent = "700 Ngày Yêu 💗";
    percent.style.letterSpacing = "1px";
    textBox.style.transform = "scale(1.3)";
    heartItem3.style.animation = "1s heartScale forwards";

    const barRect = progress.parentElement.getBoundingClientRect();
    triggerHeartBurst(barRect.left + barRect.width / 2, barRect.top + barRect.height / 2, 26);

    const steps = [
        [400, () => { textBox.style.transform = "scale(0)"; }],
        [600, () => { textBox.style.opacity = "0"; }],
        [800, () => { button.style.transform = "scale(1)"; }],
        [1500, () => {
            button.style.background = "rgb(244,118,121)";
            button.style.width = "150px";
            button.style.borderRadius = "20px";
        }],
        [2000, () => { button.style.height = "40px"; }],
        [2500, () => {
            textBtn.textContent = "Mở Kỷ Niệm!";
            textBtn.style.color = "#fff";
        }],
        [3000, () => { cursor.style.opacity = "1"; }]
    ];

    steps.forEach(([delay, action]) => setTimeout(action, delay));
}

function progressInterval() {
    if (count === 100 && percentWidth === 100) {
        clearInterval(progressLoad);
        showCompleteSequence();
        return;
    }

    if (count === 10) {
        heartItem1.style.animation = "1s heartScale forwards";
    } else if (count === 46) {
        percent.style.color = "#fff";
    } else if (count === 60) {
        heartItem2.style.animation = "1s heartScale forwards";
    }

    count += 1;
    percentWidth += 1;
    heartLeft += 0.968;

    progress.style.width = `${percentWidth}%`;
    percent.innerText = `${count * 7} ngày`;
    heartBox.style.left = `${heartLeft}%`;
}
