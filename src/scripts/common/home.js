const removeCort = (cort) =>{
  cort = document.querySelector('.space-cort');
  cort.style.display = 'none';
};

window.setTimeout(removeCort, 2450)


export function createPop() {
  const escope = document.body;

  const container = document.createElement("div");
  container.classList.add("pop-container");

  const btn = document.createElement("button");
  btn.innerText = 'X';
  btn.classList.add("close-btn");

  const textBox = document.createElement("span");
  textBox.classList.add("cotton-text");

  const cottonImg = document.createElement("img");
  cottonImg.classList.add('cotton-img');
  cottonImg.src = '../../src/assets/img/cotton.webp'

  const textContent = document.createTextNode("Quer desbloquear essa delícia? Garanta seu algodão doce ao visitar nossos calouros nos lab's 1 & 2 e conheça a doçura da programação!");

  textBox.appendChild(textContent);
  container.appendChild(textBox);
  container.appendChild(btn);
  container.appendChild(cottonImg);
  escope.appendChild(container);

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "Escape":
        container.style.display = "none";
        break;
    }
  });
  btn.addEventListener("click", () => {
    container.style.display = "none";
  });
}
