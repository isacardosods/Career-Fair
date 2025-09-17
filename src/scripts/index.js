const things = [];

const fetchSvg = async (image) => {
  try {
    const res = await fetch(image.src);
    const svgText = await res.text();

    const span = document.createElement("span");
    span.innerHTML = svgText;

    const inlineSvg = span.querySelector("svg");
    if (inlineSvg) {
      image.parentNode.replaceChild(inlineSvg, image);
    }

    await getActions();
  } catch (err) {
    console.error("erro ao carregar svg:", err);
  }
};

const getActions = async () => {
  await getThings();

  things.forEach((item) => {
    const el = document.querySelector(`#${item.id}`);
    if (!el) {
      console.warn(`elemento com id "${item.id}" não encontrado`);
      return;
    }

    el.addEventListener(item.event || "click", () => {
      if (item.url) {
        window.open(item.url, "_blank");
        console.log(`você foi direcionado para ${item.url}!`)
      }
    }); 
  });
};

const getThings = async () => {
  try {
    const res = await fetch("src/scripts/config.json");
    const data = await res.json();
    things.push(...data);
  } catch (err) {
    console.error("erro ao carregar config.json:", err);
  }
};

