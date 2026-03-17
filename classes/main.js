// ================== Clase base =========================================

class Personaje {}

// ================== Subclasses =========================================

// ================== Petición de personajes =========================================

async function fetchPersonajesSimpson() {
  const res = await fetch("");
  const data = await res.json();
  return data.results;
}

async function fetchPersonajesDragonBall() {
  const res = await fetch();
  const data = await res.json();
  return data.items;
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
  btn.addEventListener("click", () => {});

  const card = document.createElement("div");
  card.className = "card";
  card.id = `${personaje.getTipo()}-${personaje.id}`;
  card.setAttribute("data-personaje-tipo", personaje.getTipo());
  card.setAttribute("data-personaje-id", personaje.id);
  card.append(img, nombre, tipo, btn);

  document.getElementById("personajes").appendChild(card);
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
