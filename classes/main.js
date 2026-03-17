// ─── Clase base ───────────────────────────────────────────────────────────────

class Personaje {
  constructor(id, nombre, imagen, url) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.url = url;
  }

  getTipo() {
    return this.constructor.name;
  }
}

// ─── Subclases ────────────────────────────────────────────────────────────────

class PersonajeSimpson extends Personaje {
  static apiBaseUrl = "https://thesimpsonsapi.com/api";

  constructor(id, nombre, imagen) {
    super(id, nombre, imagen, PersonajeSimpson.apiBaseUrl + "/characters/" + id);
  }

  getPersonajeUrl() {
    return PersonajeSimpson.apiBaseUrl + "/characters/" + this.id;
  }
}

class PersonajeDragonBall extends Personaje {
  static apiBaseUrl = "https://dragonball-api.com/api";

  constructor(id, nombre, imagen) {
    super(id, nombre, imagen, PersonajeDragonBall.apiBaseUrl + "/characters/" + id);
  }

  getPersonajeUrl() {
    return PersonajeDragonBall.apiBaseUrl + "/characters/" + this.id;
  }
}

// ─── Utilidades: fetch ────────────────────────────────────────────────────────

async function fetchPersonajesSimpson() {
  const res = await fetch(PersonajeSimpson.apiBaseUrl + "/characters");
  const data = await res.json();
  return data.data.map((p) => new PersonajeSimpson(p.id, p.name, PersonajeSimpson.apiBaseUrl + p.portrait_path));
}

async function fetchPersonajesDragonBall() {
  const res = await fetch(PersonajeDragonBall.apiBaseUrl + "/characters?limit=10");
  const data = await res.json();
  return data.items.map((p) => new PersonajeDragonBall(p.id, p.name, p.image));
}

// ─── Utilidades: render ───────────────────────────────────────────────────────

function renderPersonaje(personaje) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${personaje.imagen}" alt="${personaje.nombre}" />
    <h3>${personaje.nombre}</h3>
    <span class="tipo">${personaje.getTipo()}</span>
  `;
  document.getElementById("personajes").appendChild(card);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const [simpsons, dragonball] = await Promise.all([
    fetchPersonajesSimpson(),
    fetchPersonajesDragonBall(),
  ]);

  [...simpsons, ...dragonball].forEach(renderPersonaje);
}

main();
