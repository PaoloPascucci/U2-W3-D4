const apiKey = "SNKd3F7LhzM8Pm03HjpIBf1dfIHc7aWuMStQGx7bx6jvTStuEhF9Q4Ce";

const submitBtn = document.querySelector(".queryB");

const loadB = document.querySelector(".loadImg");
const loadBM = document.querySelector(".loadImg2");

function fetchDataAndDisplayImages(query, loadButtonSelector) {
  const loadButton = loadButtonSelector;

  loadButton.addEventListener("click", function () {
    const url = `https://api.pexels.com/v1/search?query=${query}`;

    fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const imgToChange = document.querySelectorAll(".card-img-top");
        const idToChange = document.querySelectorAll(".idN");
        const titleToChange = document.querySelectorAll(".card-title");
        console.log(data);
        for (let i = 0; i < data.photos.length; i++) {
          const cardImage = document.createElement("img");
          cardImage.src = data.photos[i].src.original;
          cardImage.classList.add("card-img-top", "imgLink");
          cardImage.alt = data.photos[i].alt;
          cardImage.setAttribute("style", "width:100%; height:225px; cursor:pointer");

          const viewButtons = document.querySelectorAll(".view, .imgLink");

          viewButtons.forEach((btn, i) => {
            btn.addEventListener("click", function () {
              window.location.href =
                "./img-template.html?urlImg=" +
                encodeURIComponent(data.photos[i].src.original) +
                "&urlName=" +
                encodeURIComponent(data.photos[i].alt) +
                "&urlArt=" +
                encodeURIComponent(data.photos[i].photographer) +
                "&urlPL=" +
                encodeURIComponent(data.photos[i].photographer_url);
            });
          });

          if (titleToChange[i]) {
            titleToChange[i].textContent = data.photos[i].alt;
            titleToChange[i].setAttribute("style", "height:60px");
          }
          if (idToChange[i]) {
            idToChange[i].textContent = data.photos[i].id;
          }
          if (imgToChange[i]) {
            imgToChange[i].replaceWith(cardImage);
          }
        }
      })
      .catch((error) => console.log("Error: " + error));
  });
}

submitBtn.addEventListener("click", function () {
  const newQuery = document.querySelector("#queryI").value;
  fetchDataAndDisplayImages(newQuery, loadB);
});

fetchDataAndDisplayImages("Tigers", loadB);
fetchDataAndDisplayImages("Dogs", loadBM);

const hideButtons = document.querySelectorAll(".hide");

hideButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = btn.closest(".col-md-4");
    card.classList.add("d-none");
  });
});
