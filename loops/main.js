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
  getRMCharacters().then((characters) => {
    console.log(characters);
  });
});
