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
  tipo.textContent = personaje.getTipo?.();

  const btn = document.createElement("button");
  btn.textContent = "Ver detalles";
  btn.classList.add("cta-btn");
  btn.addEventListener("click", handleShowDetails);

  const card = document.createElement("div");
  card.className = "card";
  card.id = `${personaje.getTipo?.()}-${personaje.id}`;
  card.setAttribute("data-personaje-tipo", personaje.getTipo?.());
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
      : personajeTipo === "PersonajeSimpson"
        ? `${PersonajeSimpson.getApiBaseUrl()}/characters/${personajeId}`
        : null;

  const renderPersonajeDetailsInPopup = (data) => {
    const personaje =
      personajeTipo === "PersonajeDragonBall"
        ? new PersonajeDragonBall(data.id, data.name, data.image)
        : personajeTipo === "PersonajeSimpson"
          ? new PersonajeSimpson(
              data.id,
              data.name,
              PersonajeSimpson.getApiImgBaseUrl() + data.portrait_path,
              data.phrases,
            )
          : new Personaje(data.id, data.name, data.image);

    personajeDetailsContainer.innerHTML = "";
    const img = document.createElement("img");
    img.src = personaje.imagen;
    img.alt = personaje.nombre;

    const nombre = document.createElement("h3");
    nombre.textContent = personaje.nombre;

    const tipo = document.createElement("span");
    tipo.className = "tipo";
    tipo.textContent = personaje.getTipo?.();

    const hiButton = document.createElement("button");
    hiButton.className = "hi-btn";
    hiButton.textContent = "Saludar";
    hiButton.addEventListener("click", () => personaje.saludar());

    const showSecretButton = document.createElement("button");
    showSecretButton.textContent = "Mostrar secreto";
    showSecretButton.addEventListener("click", () => alert(personaje.secreto));

    const setSecretButton = document.createElement("button");
    setSecretButton.textContent = "Cambiar secreto";
    setSecretButton.addEventListener("click", () => {
      const newSecret = prompt("Elegir un nuevo secreto");
      personaje.secreto = newSecret;
    });

    personajeDetailsContainer.append(
      img,
      nombre,
      tipo,
      hiButton,
      showSecretButton,
      setSecretButton,
    );
    console.log(data);
  };
  if (!personajeUrl) {
    return renderPersonajeDetailsInPopup({
      id: 1,
      name: "Homero Simpson",
      image: "https://cdn.thesimpsonsapi.com/200/character/1.webp",
    });
  }
  fetch(personajeUrl)
    .then((response) => {
      if (response.ok) {
        response
          .json()
          .then((data) => {
            renderPersonajeDetailsInPopup(data);
          })
          .catch((error) => console.error(error));
      }
    })
    .catch((error) => console.error(error));
}

// ================== Clase base =========================================

const ADMIN_PASSWORD = "password";

class Personaje {
  #secreto = "Shhh! Esto es un secreto!";

  static #apiBaseUrl = "https://thesimsponsapi.com/api";

  constructor(id, nombre, imagen, anoNacimiento) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.anoNacimiento = anoNacimiento;
  }

  saludar() {
    alert(`Hola! Me llamo ${this.nombre}`);
  }

  #guardarSecreto(nuevoSecreto) {
    this.#secreto = nuevoSecreto;
  }

  get edad() {
    return new Date().getFullYear() - this.anoNacimiento;
  }

  static getApiBaseUrl() {
    return this.#apiBaseUrl;
  }

  get secreto() {
    return `El secreto empieza con la letra ${this.#secreto[0]} y tiene ${this.#secreto.length} caracteres de largo.`;
  }

  #asegurarQueUsuarioSeaAdmin() {
    return prompt("Escriba la contraseña de administrador") === ADMIN_PASSWORD;
  }

  set secreto(nuevoSecreto) {
    const isAdmin = this.#asegurarQueUsuarioSeaAdmin();
    if (isAdmin) {
      this.#guardarSecreto(nuevoSecreto);
      alert("Secreto guardado");
    } else {
      alert("No es admin, no se puede guardar el secreto");
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
            p.phrases,
          ),
      );
    }

    async function fetchPersonajesDragonBall() {
      const res = await fetch(
        PersonajeDragonBall.getApiBaseUrl() + "/characters?limit=10",
      );
      const data = await res.json();
      return data.items.map(
        (p) => new PersonajeDragonBall(p.id, p.name, p.image),
      );
    }
  }

  getTipo() {
    return this.constructor.name;
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
        p.phrases,
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

// ================== Entry point =========================================

async function main() {
  const miPrimerPersonaje = new Personaje(
    1,
    "Homero Simpson",
    "https://cdn.thesimpsonsapi.com/200/character/1.webp",
    1960,
  );

  const miSegundoPersonaje = new Personaje(
    2,
    "Marge Simpson",
    "https://cdn.thesimpsonsapi.com/200/character/2.webp",
    1960,
  );

  renderPersonaje(miPrimerPersonaje);
  renderPersonaje(miSegundoPersonaje);
}

main();
