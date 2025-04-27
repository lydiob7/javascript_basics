document.addEventListener("DOMContentLoaded", () => {
  async function getRMCharacter(id = "1") {
    const request = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`,
    );
    const characters = await request.json();
    return characters || null;
  }

  getRMCharacter(15).then((character) => {
    console.log(character);
  });
});
