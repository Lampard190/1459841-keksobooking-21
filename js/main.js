'use strict';

const titleContent = [`Уютное гнездышко для молодоженов`, `Маленькая квартирка рядом с парком`, `Небольшая лавочка в парке`, `Императорский дворец в центре Токио`, `Милейший чердачок`, `Наркоманский притон`, `Чёткая хата`, `Стандартная квартира в центре`, `Милое гнездышко для фанатов Анимэ`, `Тихая квартирка недалеко от метро`];
const typeContent = [`bungalow`, `flat`, `house`, `palace`];
const featuresContent = [`wifi`, `dishwasher`, `parking`, `washer`];
const descriptionContent = [`Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`, `Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.`, `Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.`, `Маленькая квартирка на чердаке. Для самых не требовательных.`, `У нас есть всё! Шприцы, интернет, кофе. Для всех кто знает толк в отдыхе. Полицию просим не беспокоить.`, `У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!`, `Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.`, `Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.`, `Хейтеров просьба не беспокоить.`];
const photosContent = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel1.jpg`];

const minTitleRange = 0;
const maxTitleRange = 7;
const minPriceRange = 1000;
const maxPriceRange = 35000;
const minTypeRange = 0;
const maxTypeRange = 3;
const minRoomsRange = 1;
const maxRoomsRange = 4;
const minGuestsRange = 1;
const maxGuestsRange = 6;
const minInOutRange = 2;
const maxInOutRange = 4;
const minFeaturesRange = 0;
const maxFeaturesRange = 3;
const minDescriptionRange = 0;
const maxDescriptionRange = 3;

const minLocationX = -60;
const maxLocationX = 680;
const minLocationY = 130;
const maxLocationY = 560;
const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
};

const createAd = () => {
  let author = {};
  author.avatar = `img/avatars/user0` + NodeIterator + `.png`;
  let offer = {
    title: titleContent[randomInteger(minTitleRange, maxTitleRange)],
    address: ` ` + locationY + `,` + locationX + ` `,
    price: randomInteger(minPriceRange, maxPriceRange),
    type: typeContent[randomInteger(minTypeRange, maxTypeRange)],
    rooms: randomInteger(minRoomsRange, maxRoomsRange),
    guests: randomInteger(minGuestsRange, maxGuestsRange),
    checkin: `1` + randomInteger(minInOutRange, maxInOutRange) + `:00`,
    checkout: `1` + randomInteger(minInOutRange, maxInOutRange) + `:00`,
    features: featuresContent[randomInteger(minFeaturesRange, maxFeaturesRange)] + `, ` + featuresContent[randomInteger(minFeaturesRange, maxFeaturesRange)],
    description: descriptionContent[randomInteger(minDescriptionRange, maxDescriptionRange)],
    photos: [photosContent[1], photosContent[2]],
  };
  let location = {
    x: randomInteger(minLocationX, maxLocationX),
    y: randomInteger(minLocationY, maxLocationY)
  };
};

const createListAd = (count) => {
  const list = [];
  for (let i = 0; i < count; i++) {
    const ad = createAd();
    list.push(ad);
  }
  return list;
};

const listOfAds = createListAd(8);

// Работа с данными
// ------------------------------------
// Рендеринг данных

const pinTmpl = document.querySelector(`#pin`).content;

const mapPinsElement = document.querySelector(`.map__pins`);

const DX = 200;
const DY = 50;

const createPin = (ad) => {
  const layout = pinTmpl.cloneNode(true);
  const mapPinElement = layout.querySelector(`.map__pin`);
  const mapPinImg = layout.querySelector(`img`);

  mapPinElement.style.left = `${ad.location.x + DX}px`;
  mapPinElement.style.top = `${ad.location.y + DY}px`;

  mapPinImg.alt = ad.offer.title;
  mapPinImg.src = ad.author.avatar;

  return layout;
};

const fragment = document.createDocumentFragment();

listOfAds.forEach((ad) => {
  const layout = createPin(ad);
  fragment.appendChild(layout);
});

mapPinsElement.append(fragment);
