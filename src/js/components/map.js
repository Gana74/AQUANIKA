// /js/map.js
// Конфигурация карты
const mapConfig = {
  salonCoordinates: [55.164157, 61.313381],
  mapOptions: {
    zoom: 16,
    controls: ["zoomControl", "fullscreenControl", "typeSelector"],
  },
};

let myMap = null;

// Безопасное создание контента балуна
function createBalloonContent() {
  const container = document.createElement("div");
  container.className = "balloon-content";

  const address = document.createElement("p");
  const addressStrong = document.createElement("strong");
  addressStrong.textContent = "Адрес:";
  address.appendChild(addressStrong);
  address.appendChild(document.createTextNode(" Братьев Кашириных, 131"));

  const phone = document.createElement("p");
  const phoneStrong = document.createElement("strong");
  phoneStrong.textContent = "Телефон:";
  phone.appendChild(phoneStrong);

  const phoneLink = document.createElement("a");
  phoneLink.href = "tel:79227445287";
  phoneLink.textContent = " +7 (922) 744-52-87";
  phone.appendChild(phoneLink);

  const hours = document.createElement("p");
  const hoursStrong = document.createElement("strong");
  hoursStrong.textContent = "Время работы:";
  hours.appendChild(hoursStrong);
  hours.appendChild(document.createTextNode(" с 10:00 до 21:00"));

  container.appendChild(address);
  container.appendChild(phone);
  container.appendChild(hours);

  return container;
}

// Безопасное создание сообщения об ошибке
function createMapErrorContent() {
  const placeholder = document.createElement("div");
  placeholder.className = "map-placeholder";

  const icon = document.createElement("i");
  icon.className = "fas fa-map-marked-alt";

  const loadingText = document.createElement("div");
  loadingText.className = "loading-text";

  const message = document.createElement("p");
  message.textContent = "Карта временно недоступна";

  const link = document.createElement("a");
  link.href =
    "https://yandex.ru/maps/?um=constructor%3A6c71b99ccf1f2b1ece9efab9e7a6672d6bb373294df3d4738952dd7d58ef905a&source=constructorStatic";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Посмотреть статическую карту";

  loadingText.appendChild(message);
  loadingText.appendChild(link);
  placeholder.appendChild(icon);
  placeholder.appendChild(loadingText);

  return placeholder;
}

export function initMap() {
  if (!document.getElementById("map")) {
    return;
  }

  if (typeof ymaps === "undefined") {
    loadYandexMapsAPI();
    return;
  }

  ymaps.ready(() => {
    try {
      createMap();
    } catch (error) {
      console.error("Ошибка при создании карты:", error);
      showMapError();
    }
  });
}

function loadYandexMapsAPI() {
  const script = document.createElement("script");
  script.src = `https://api-maps.yandex.ru/2.1/?apikey=480aa768-745b-4ac9-8ec8-e40c2e8d6c82&lang=ru_RU`;
  script.type = "text/javascript";

  script.onload = () => {
    ymaps.ready(() => {
      try {
        createMap();
      } catch (error) {
        console.error("Ошибка при создании карты:", error);
        showMapError();
      }
    });
  };

  script.onerror = () => {
    console.error("Ошибка загрузки API Яндекс.Карт");
    showMapError();
  };

  document.head.appendChild(script);
}

function createMap() {
  if (myMap) {
    myMap.destroy();
    myMap = null;
  }

  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  myMap = new ymaps.Map(
    "map",
    {
      center: mapConfig.salonCoordinates,
      zoom: mapConfig.mapOptions.zoom,
      controls: mapConfig.mapOptions.controls,
    },
    {
      searchControlProvider: "yandex#search",
    }
  );

  // Создаем метку с безопасным контентом
  const balloonContent = createBalloonContent();

  const myPlacemark = new ymaps.Placemark(
    mapConfig.salonCoordinates,
    {
      balloonContentHeader: "Салон красоты Aquanika",
      balloonContentBody: balloonContent.innerHTML, // Только здесь используем innerHTML для API
      hintContent: "Салон красоты Aquanika",
    },
    {
      preset: "islands#blueBeautyIcon",
      iconColor: "#ff6b9d",
      balloonCloseButton: true,
      hideIconOnBalloonOpen: false,
    }
  );

  myMap.geoObjects.add(myPlacemark);
  setupMapControls(myMap);
  setupResponsive(myMap);

  setTimeout(() => {
    myPlacemark.balloon.open();
  }, 1000);
}

function setupMapControls(map) {
  const searchControl = new ymaps.control.SearchControl({
    options: {
      noPlacemark: true,
      position: { top: 10, right: 10 },
    },
  });

  map.controls.add(searchControl);

  const routeButton = new ymaps.control.Button({
    data: {
      content: "Проложить маршрут",
      title: "Проложить маршрут до салона",
    },
    options: {
      maxWidth: 200,
      position: { top: 50, right: 10 },
    },
  });

  routeButton.events.add("press", function () {
    const url = `https://yandex.ru/maps/?rtext=~${mapConfig.salonCoordinates.join(
      ","
    )}`;
    window.open(url, "_blank");
  });

  map.controls.add(routeButton);
}

function setupResponsive(map) {
  function checkMobile() {
    if (window.innerWidth <= 768) {
      map.behaviors.disable("scrollZoom");
    } else {
      map.behaviors.enable("scrollZoom");
    }
  }

  checkMobile();
  window.addEventListener("resize", checkMobile);
}

function showMapError() {
  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    const errorContent = createMapErrorContent();
    mapContainer.replaceChildren();
    mapContainer.appendChild(errorContent);
  }
}

export function destroyMap() {
  if (myMap) {
    myMap.destroy();
    myMap = null;
  }
}

export function isContactsPage() {
  return (
    window.location.pathname.includes("/contacts") ||
    document.getElementById("map") !== null
  );
}

export default {
  initMap,
  destroyMap,
  isContactsPage,
  mapConfig,
};
