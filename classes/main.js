// ================== Clase base =========================================

class Personaje {
  constructor(id, nombre, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
  }

  getTipo() {
    return this.constructor.name;
  }
}

// ================== Subclasses =========================================

class PersonajeSimpson extends Personaje {
  static #apiBaseUrl = "https://thesimpsonsapi.com/api";
  static #apiImgBaseUrl = "https://cdn.thesimpsonsapi.com/200";

  constructor(id, nombre, imagen) {
    super(id, nombre, imagen);
  }

  getPersonajeUrl() {
    return this.url;
  }

  static getApiBaseUrl() {
    return this.#apiBaseUrl;
  }

  static getApiImgBaseUrl() {
    return this.#apiImgBaseUrl;
  }
}

class PersonajeDragonBall extends Personaje {
  static #apiBaseUrl = "https://dragonball-api.com/api";

  constructor(id, nombre, imagen) {
    super(id, nombre, imagen);
  }

  getPersonajeUrl() {
    return this.url;
  }

  static getApiBaseUrl() {
    return this.#apiBaseUrl;
  }
}

// ================== Petición de personajes =========================================

async function fetchPersonajesSimpson() {
  const res = await fetch(PersonajeSimpson.getApiBaseUrl() + "/characters");
  const data = await res.json();
  return data.results?.map(
    (p) =>
      new PersonajeSimpson(
        p.id,
        p.name,
        PersonajeSimpson.getApiImgBaseUrl() + p.portrait_path,
      ),
  );
}

async function fetchPersonajesDragonBall() {
  const res = await fetch(
    PersonajeDragonBall.getApiBaseUrl() + "/characters?limit=10",
  );
  const data = await res.json();
  return data.items.map((p) => new PersonajeDragonBall(p.id, p.name, p.image));
}

// ================== Utilidades =========================================

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// ================== Render en pantalla =========================================

function renderPersonaje(personaje) {
  const img = document.createElement("img");
  img.src = personaje.imagen;
  img.alt = personaje.nombre;

  const nombre = document.createElement("h3");
  nombre.textContent = personaje.nombre;

  const tipo = document.createElement("span");
  tipo.className = "tipo";
  tipo.textContent = personaje.getTipo();

  const btn = document.createElement("button");
  btn.textContent = "Ver detalles";
  btn.classList.add("cta-btn");
  btn.addEventListener("click", handleShowDetails);

  const card = document.createElement("div");
  card.className = "card";
  card.id = `${personaje.getTipo()}-${personaje.id}`;
  card.setAttribute("data-personaje-tipo", personaje.getTipo());
  card.setAttribute("data-personaje-id", personaje.id);
  card.append(img, nombre, tipo, btn);

  document.getElementById("personajes").appendChild(card);
}

function handleShowDetails(ev) {
  const dialogElement = document.querySelector("#personaje-dialog");
  const personajeDetailsContainer = dialogElement.querySelector(
    ".personaje-container",
  );
  dialogElement.showModal();

  const personajeTipo = ev.target.parentNode?.getAttribute(
    "data-personaje-tipo",
  );
  const personajeId = ev.target.parentNode?.getAttribute("data-personaje-id");
  const personajeUrl =
    personajeTipo === "PersonajeDragonBall"
      ? `${PersonajeDragonBall.getApiBaseUrl()}/characters/${personajeId}`
      : `${PersonajeSimpson.getApiBaseUrl()}/characters/${personajeId}`;

  fetch(personajeUrl)
    .then((response) => {
      if (response.ok) {
        response
          .json()
          .then((data) => {
            const personaje =
              personajeTipo === "PersonajeDragonBall"
                ? new PersonajeDragonBall(data.id, data.name, data.image)
                : new PersonajeSimpson(
                    data.id,
                    data.name,
                    PersonajeSimpson.getApiImgBaseUrl() + data.portrait_path,
                  );

            personajeDetailsContainer.innerHTML = "";
            const img = document.createElement("img");
            img.src = personaje.imagen;
            img.alt = personaje.nombre;

            const nombre = document.createElement("h3");
            nombre.textContent = personaje.nombre;

            const tipo = document.createElement("span");
            tipo.className = "tipo";
            tipo.textContent = personaje.getTipo();

            personajeDetailsContainer.append(img, nombre, tipo);
            console.log(personaje);
          })
          .catch((error) => console.error(error));
      }
    })
    .catch((error) => console.error(error));
}

// ================== Entry point =========================================

async function main() {
  const [simpsons, dragonball] = await Promise.all([
    fetchPersonajesSimpson(),
    fetchPersonajesDragonBall(),
  ]);

  shuffle([...simpsons, ...dragonball]).forEach(renderPersonaje);
}

main();
