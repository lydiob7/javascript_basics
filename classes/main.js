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

class Personaje {
  constructor(id, nombre, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
  }

  saludar() {
    alert(`Hola! Me llamo ${this.nombre}`);
  }

  getTipo() {
    return this.constructor.name;
  }
}

// ================== Entry point =========================================

async function main() {
  const miPrimerPersonaje = new Personaje(
    1,
    "Homero Simpson",
    "https://cdn.thesimpsonsapi.com/200/character/1.webp",
  );

  const miSegundoPersonaje = new Personaje(
    2,
    "Marge Simpson",
    "https://cdn.thesimpsonsapi.com/200/character/2.webp",
  );

  renderPersonaje(miPrimerPersonaje);
  renderPersonaje(miSegundoPersonaje);
}

main();
