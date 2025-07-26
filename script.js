const galleryImages = document.querySelectorAll(".puzzle-img");
const puzzleContainer = document.getElementById("puzzle-container");
const puzzleGrid = document.getElementById("puzzle-grid");
const message = document.getElementById("message");

let currentImage = "";

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    currentImage = img.src;
    startPuzzle(currentImage);
  });
});

function startPuzzle(imgSrc) {
  puzzleGrid.innerHTML = "";
  message.textContent = "";
  puzzleContainer.classList.remove("hidden");

  let indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let shuffled = indices.slice().sort(() => Math.random() - 0.5);

  shuffled.forEach(index => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.draggable = true;
    tile.dataset.index = index;
    tile.style.backgroundImage = `url(${imgSrc})`;
    tile.style.backgroundPosition = `${-(index % 3) * 100}px ${-Math.floor(index / 3) * 100}px`;
    puzzleGrid.appendChild(tile);
  });

  addDragAndDrop();
}

function addDragAndDrop() {
  let dragged;

  document.querySelectorAll(".tile").forEach(tile => {
    tile.addEventListener("dragstart", (e) => {
      dragged = tile;
    });

    tile.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    tile.addEventListener("drop", (e) => {
      e.preventDefault();
      if (dragged !== tile) {
        let temp = tile.style.backgroundPosition;
        let tempIndex = tile.dataset.index;

        tile.style.backgroundPosition = dragged.style.backgroundPosition;
        tile.dataset.index = dragged.dataset.index;

        dragged.style.backgroundPosition = temp;
        dragged.dataset.index = tempIndex;

        checkWin();
      }
    });
  });
}

function checkWin() {
  const tiles = document.querySelectorAll(".tile");
  const isSolved = Array.from(tiles).every((tile, i) => tile.dataset.index == i);
  if (isSolved) {
    message.textContent = "🎉 Puzzle Solved!";
  }
}

function closePuzzle() {
  puzzleContainer.classList.add("hidden");
}
