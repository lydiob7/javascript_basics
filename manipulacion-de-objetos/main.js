document.addEventListener("DOMContentLoaded", () => {
  // Renderizar cadena de texto en el HTML
  function renderText(text) {
    const containerEl = document.querySelector("#container");

    const newElement = document.createElement("div");
    newElement.innerText = text;
    containerEl.appendChild(newElement);
  }

  // Hacer la peticion a la API de un personaje
  async function getRMCharacter(id = "1") {
    const request = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`,
    );
    const characters = await request.json();
    return characters || null;
  }

  // Funcion principal
  getRMCharacter(15).then((character) => {
    // renderText(JSON.stringify(character, undefined, 2));
    // renderText(character.name);
    // renderText(character["species"]);
    // renderText(character.location.name);
    // character.type = "Dibujito";
    // renderText(character.type);
    // delete character.gender;
    // renderText(character.gender);
    // for (const key in character) {
    //   renderText(key);
    // }
    // Object.keys(character).forEach((key) => {
    //   renderText(JSON.stringify(character[key], undefined, 2));
    // });
    // Object.values(character).forEach((value) => {
    //   renderText(value);
    // });
    // Object.entries(character).forEach((entry) => {
    //   renderText(`${entry[0]}: ${entry[1]}`);
    // });
    // Object.getOwnPropertyNames(character).forEach((key) => {
    //   renderText(key);
    // });
  });
});
