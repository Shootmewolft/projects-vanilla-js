const CITYS = [
  {
    name: "Barranquilla",
    coord: [10.97947702532239, -74.80640387980903],
  },
  {
    name: "Soledad",
    coord: [10.912897588276424, -74.78762984566961],
  },
  {
    name: "Santo Tomas",
    coord: [10.76225371162029, -74.75554937782876],
  },
  {
    name: "Palmar",
    coord: [10.741799856938014, -74.75437058152926],
  },
  {
    name: "Baranoa",
    coord: [10.793124304503216, -74.91589617157095],
  },
  {
    name: "Puerto Colombia",
    coord: [10.988923163618477, -74.95402546248228],
  },
  {
    name: "Sabanagrande",
    coord: [10.78960233087306, -74.75432125456742],
  },
  {
    name: "Galapa",
    coord: [10.898669964859748, -74.88588314024032],
  },
];

const graph = {
  Barranquilla: ["Soledad", "Puerto Colombia", "Galapa", "Sabanagrande"],
  Soledad: [
    "Barranquilla",
    "Galapa",
    "Sabanagrande",
    "Santo Tomas",
    "Puerto Colombia",
  ],
  "Santo Tomas": ["Palmar", "Baranoa", "Soledad", "Sabanagrande"],
  Baranoa: ["Santo Tomas", "Sabanagrande", "Puerto Colombia", "Palmar"],
  "Puerto Colombia": ["Barranquilla", "Soledad", "Galapa", "Baranoa"],
  Sabanagrande: ["Baranoa", "Soledad", "Santo Tomas", "Barranquilla"],
  Galapa: ["Soledad", "Puerto Colombia", "Barranquilla", "Baranoa"],
  Palmar: ["Santo Tomas", "Baranoa", "Sabanagrande"],
};

// INIT MAP
let routeControl;
document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView([10.987519695229325, -74.8096751996253], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  const form = document.querySelector("form");

  form.addEventListener("submit", handleSubmit);

  function handleSubmit(event) {
    event.preventDefault();
    routeValidate(map);
  }
});

// FORM

function routeValidate(map) {
  const routeText = document.querySelector("#route");
  const inputs = document.querySelectorAll("#city-input");
  const routeTitle = document.querySelector("#route-title");
  const resultBoard = document.querySelector(".bfs__data-general");

  const [cityOrigin, cityDestiny] = Array.from(inputs).map((input) =>
    input.value.toLowerCase().trim()
  );

  const updateUI = (message, displayTitle = false, fontSize = "1.1em") => {
    routeTitle.style.display = displayTitle ? "block" : "none";
    resultBoard.style.display = "flex";
    routeText.style.display = "block";
    routeText.style.fontSize = fontSize;
    routeText.textContent = message;
  };

  const [isCityOriginValid, isCityDestinyValid] = [cityOrigin, cityDestiny].map(
    (city) => CITYS.some((c) => c.name.toLowerCase() === city.trim())
  );

  if (!isCityOriginValid && !isCityDestinyValid) {
    updateUI("Ambos municipios no existen en el grafo.");
  } else if (!isCityOriginValid) {
    updateUI(`El municipio ${inputs[0].value} no es válido.`);
  } else if (!isCityDestinyValid) {
    updateUI(`El municipio ${inputs[1].value} no es válido.`);
  } else {
    const formatCityName = (city) =>
      city
        .split(" ")
        .map((letter) => letter.charAt(0).toUpperCase() + letter.slice(1))
        .join(" ");
    const [cityOriginTitle, cityDestinyTitle] = [cityOrigin, cityDestiny].map(
      formatCityName
    );
    const route = bfs(graph, cityOriginTitle, cityDestinyTitle);
    const isRoute =
      typeof route === "string"
        ? route
        : route.toString().replaceAll(",", " -> ");

    updateUI(isRoute, true, "1.4em");
    drawRouteMap(route, map);
  }
}

function drawRouteMap(route, map) {
  if (typeof route === "string") {
    map.setView([10.987519695229325, -74.8096751996253], map.getZoom());
    return;
  }
  const waypointsCitys = CITYS.filter((city) => route.includes(city.name));
  const waypointsSort = waypointsCitys.sort((a, b) => {
    return route.indexOf(a.name) - route.indexOf(b.name);
  });
  const waypoints = waypointsSort.map((city) => L.latLng(city.coord));
  const firstCityroute = CITYS.filter((city) => city.name === route[0]);
  const isRoute =
    typeof route === "string"
      ? [10.987519695229325, -74.8096751996253]
      : firstCityroute[0].coord;

  if (routeControl) {
    map.removeControl(routeControl);
  }

  map.eachLayer((layer) => {
    if (
      layer instanceof L.Marker &&
      layer.options.icon &&
      layer.options.icon.options.className === "waypoint-label"
    ) {
      map.removeLayer(layer);
    }
  });

  map.setView(isRoute, map.getZoom());

  routeControl = L.Routing.control({
    waypoints: waypoints,
    routeWhileDragging: false,
    draggableWaypoints: false,
  }).addTo(map);

  waypoints.forEach((point, index) => {
    const label = L.divIcon({
      className: "waypoint-label",
      html: (index + 1).toString(),
      iconSize: [50, 50],
    });

    L.marker(point, { icon: label }).addTo(map);
  });
}

function bfs(graph, cityOrigin, cityDestiny) {
  const queue = [[cityOrigin]];
  const visited = new Set();

  while (queue.length > 0) {
    const route = queue.shift();
    const node = route[route.length - 1];

    if (node === cityDestiny) {
      return route;
    } else if (!visited.has(node)) {
      visited.add(node);
      const neighbors = graph[node] || [];

      for (const neighbor of neighbors) {
        const newRoute = [...route, neighbor];
        queue.push(newRoute);
      }
    }
  }

  return "No hay una ruta para estos municipios";
}