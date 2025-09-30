import { createPop} from './common/candy.js';

const things = [];

const fetchSvg = async (image) => {
  try {
    const res = await fetch(image.src);
    const svgText = await res.text();

    const span = document.createElement('span');
    span.innerHTML = svgText;

    const inlineSvg = span.querySelector('svg');
    if (inlineSvg) {
      if (image.id) inlineSvg.id = image.id;
      if (image.title) inlineSvg.setAttribute('title', image.title);
      if (image.alt) inlineSvg.setAttribute('aria-label', image.alt);

      Array.from(image.classList).forEach(cls => inlineSvg.classList.add(cls));
      inlineSvg.classList.add('icon-svg');

      Array.from(image.attributes).forEach(attr => {
        if (attr.name.startsWith('data-')) inlineSvg.setAttribute(attr.name, attr.value);
      });

      inlineSvg.setAttribute('data-loaded', 'true');
      image.parentNode.replaceChild(inlineSvg, image);
    }
  } catch (err) {
    console.error('erro ao carregar svg:', err);
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

    el.addEventListener(item.event || 'click', () => {
      if (item.href) {
        window.location = item.href;
        console.log(`você foi direcionado para ${item.href}!`);
      } else if (item.id === 'LOJA') {
        createPop();
      }
    });
  });
};

const getThings = async () => {
  try {
    const res = await fetch('src/scripts/config.json');
    const data = await res.json();
    things.push(...data);
  } catch (err) {
    console.error('erro ao carregar config.json:', err);
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  const imgs = document.querySelectorAll('img[data-svg]');
  await Promise.all(Array.from(imgs).map(img => fetchSvg(img).catch(err => {
    console.error('falha ao processar svg', img, err);
  })));
  await getActions();
});
