export function createPop () {
  const escope = document.body;

  const container = document.createElement("div");
  container.classList.add("pop-container");

  const textBox = document.createElement("span");
  textBox.classList.add("cotton-text");

  const textContent = document.createTextNode("lorem ipsum");

  textBox.appendChild(textContent);
  container.appendChild(textBox);
  escope.appendChild(container);

  document.addEventListener('keydown', (e) =>{
    switch(e.key){
      case 'Escape':
        container.style.display = 'none';
        break;
    }
  })
};