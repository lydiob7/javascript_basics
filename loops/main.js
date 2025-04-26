document.addEventListener("DOMContentLoaded", () => {
  /* ================ Funcion para mostrar los resultados en el DOM ======== */
  function renderListItem(character) {
    if (!character) return;

    let listElement = document.querySelector(".main-list");

    if (!listElement) {
      listElement = document.createElement("ul");
      listElement.classList.add("main-list");
      document.body.appendChild(listElement);
    }

    const listItemElement = document.createElement("li");

    const characterImageElement = document.createElement("img");
    characterImageElement.setAttribute("src", character.image);
    characterImageElement.setAttribute("alt", character.name);
    listItemElement.appendChild(characterImageElement);

    const characterNameElement = document.createElement("h2");
    characterNameElement.innerText = character.name || "";
    listItemElement.appendChild(characterNameElement);

    listElement.appendChild(listItemElement);
  }

  /* =============== Funcion para obtener la lista desde la API de Rick & Morty ========== */
  async function getRMCharacters() {
    const request = await fetch("https://rickandmortyapi.com/api/character");
    const characters = (await request.json())?.results;
    return characters || [];
  }

  /* =============== Ejemplos de loops ===================== */
  // Ir comentando los ejemplos que no se usan para ir viendo los resultados de cada uno
  getRMCharacters().then((characters) => {
    // For loop
    for (let i = 0; i < characters.length; i++) {
      renderListItem(characters[i]);
    }

    // For loop con palabras clave "continue" y "break"
    for (let i = 0; i < characters.length; i++) {
      if (characters[i].name.toLowerCase().includes("jerry")) continue;
      if (characters[i].name.toLowerCase().includes("alan")) break;
      renderListItem(characters[i]);
    }

    // while loop
    let i = 0;
    while (i < characters.length) {
      renderListItem(characters[i]);
      i++;
    }

    // do ... while loop
    let j = 0;
    do {
      renderListItem(characters[j]);
      j++;
    } while (j < characters.length);

    // for ... of loop
    for (const character of characters) {
      renderListItem(character);

      // for ... in loop (para objetos)
      for (const key in character) {
        console.log(`${key} >>> ${character[key]}`);
      }
    }

    // Método forEach() para arrays
    characters.forEach((character) => {
      renderListItem(character);
    });

    // Método filter() para arrays
    const rickCharacters = characters.filter((character) => {
      if (character.name.toLowerCase().includes("rick")) return true;
      return false;
    });
    rickCharacters.forEach((character) => renderListItem(character));

    // método map() para arrays
    const updatedCharacters = characters.map((character) => {
      console.log(character);
      return {
        ...character,
        name: `Name: ${character.name} - Species: ${character.species}`,
      };
    });
    updatedCharacters.forEach((character) => renderListItem(character));
  });
});
