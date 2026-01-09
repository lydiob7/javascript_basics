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
    console.log(character);
  });
});
