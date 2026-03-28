// ================== Clase base =========================================

const ADMIN_PASSWORD = "password";

class Personaje {
  #secreto = "Shhhh! Esto es un secreto";

  constructor(id, nombre, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
  }

  saludar() {
    alert(`Hola! Me llamo ${this.nombre}`);
  }

  #guardarSecreto(nuevoSecreto) {
    this.#secreto = nuevoSecreto;
  }

  get secreto() {
    return `El secreto empieza con la letra ${this.#secreto[0]} y tiene ${this.#secreto.length} caracteres de largo`;
  }

  #asegurarQueUsuarioSeaAdmin() {
    return prompt("Escriba la contraseña de administrador") === ADMIN_PASSWORD;
  }

  set secreto(nuevoSecreto) {
    const esAdmin = this.#asegurarQueUsuarioSeaAdmin();
    if (esAdmin) {
      this.#guardarSecreto(nuevoSecreto);
      alert("Secreto guardado");
    } else {
      alert("No es admin, no se puede guardar el secreto");
    }
  }

  getTipo() {
    return this.constructor.name;
  }
}

// ================== Subclasses =========================================

class PersonajeSimpson extends Personaje {
  static #apiBaseUrl = "https://thesimpsonsapi.com/api";
  static #apiImgBaseUrl = "https://cdn.thesimpsonsapi.com/200";

  constructor(id, nombre, imagen, frases) {
    super(id, nombre, imagen);

    this.frases = frases || [];
  }

  saludar() {
    const fraseRandom =
      this.frases[Math.floor(Math.random() * this.frases.length)] ||
      `Hola! Mi nombre es ${this.nombre}`;
    alert(fraseRandom);
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
  // const miPrimerPersonaje = new Personaje(
  //   1,
  //   "Homero Simpson",
  //   "https://cdn.thesimpsonsapi.com/200/character/1.webp",
  // );
  // renderPersonaje(miPrimerPersonaje);
  const [simpsons, dragonball] = await Promise.all([
    fetchPersonajesSimpson(),
    fetchPersonajesDragonBall(),
  ]);

  shuffle([...simpsons, ...dragonball]).forEach(renderPersonaje);
}

main();
