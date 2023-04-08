//---------------burger-----------------------
let buttonOpen = document.querySelector(".menu-button");
let buttonClosed = document.querySelector(".burger-cross");
let overlay = document.querySelector(".overlay");
let menu = document.querySelector(".burger-menu");
let buttonMenu = document.querySelectorAll(".burger-nav-link");

function openMenu() {
  menu.classList.add("active");
  overlay.classList.add("active");
}

function closeMenu() {
  menu.classList.remove("active");
  overlay.classList.remove("active");
}

buttonOpen.addEventListener("click", openMenu);
buttonClosed.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);
buttonMenu.forEach((el) => el.addEventListener("click", closeMenu));

//---------------------blured-tags------------------
let tagBlock = document.querySelector(".service__tags");
let tags = document.querySelectorAll(".tag");
let cards = document.querySelectorAll(".service-cards .card");

let selectedButtons = [];

tags.forEach((tag) =>
  tag.addEventListener("click", function (e) {
    let clickedTag = e.target.closest(".tag");

    if (clickedTag === tag) {
      if (!clickedTag.classList.contains("tag_active")) {
        selectClikedTag(tag);
        selectCardByClickedTag();
      } else if (clickedTag.classList.contains("tag_active")) {
        deselectTag(tag, clickedTag);
        selectCardByClickedTag();
      }
      if (selectedButtons.length < 1) {
        cards.forEach((card) => {
          card.classList.remove("card_blured");
        });
      }
      if (selectedButtons.length > 2 && clickedTag.classList !== "tag_active") {
        selectOnlyTwoTags(clickedTag);
        selectCardByClickedTag();
      }
    }
  })
);

function selectClikedTag(tag) {
  selectedButtons.push(tag);
  tag.classList.add("tag_active");
}

function deselectTag(tag, clickedTag) {
  let indexOfClickedTag = selectedButtons.indexOf(clickedTag);
  selectedButtons.splice(indexOfClickedTag, 1);
  tag.classList.remove("tag_active");
}

function selectCardByClickedTag() {
  cards.forEach((card) => {
    card.classList.add("card_blured");
    selectedButtons.forEach((button) => {
      if (card.classList[1] === button.classList[2])
        card.classList.remove("card_blured");
    });
  });
}

function denySelectingThirdTag(tag) {
  selectedButtons.splice(selectedButtons.indexOf[tag], 1);
  tag.classList.remove("tag_active");
}

function selectOnlyTwoTags(clickedTag) {
  selectedButtons[0].classList.remove("tag_active");
  selectedButtons.splice(0, 1);
  clickedTag.classList.add("tag_active");
}

//----------------contacts-list--------------

let selectForm = document.querySelector(".select-form");
let selectBlock = document.querySelector(".select__list");
let selectButton = document.querySelector(".select-form__button");
let selectCities = document.querySelectorAll(".select__city-item");
let adressBlock = document.querySelector(".adress-block");
let adressCity = document.querySelector(".adress-city");
let adressPhone = document.querySelector(".adress-phone");
let adressOffice = document.querySelector(".adress-office");
let popupImg = document.querySelector(".popup-service");
let selectFormText = document.querySelector(".select-form__text");
let adressFormCity = document.querySelector(".adress-city");
let adressFormPhone = document.querySelector(".adress-phone");
let adressFormOffice = document.querySelector(".adress-office");
let adressButton = document.querySelector(".adress-block__button");

let cityData = [
  {
    city: "Yonkers, NY",
    phone: "+1 914 678 0003",
    adressOffice: "511 Warburton Ave",
  },
  {
    city: "Canandaigua, NY",
    phone: "+1 585 393 0001",
    adressOffice: "151 Charlotte Street",
  },
  {
    city: "Sherrill, NY",
    phone: "+1 315 908 0004",
    adressOffice: "14 WEST Noyes BLVD",
  },
  {
    city: "New York City",
    phone: "+1 212 456 0002",
    adressOffice: "9 East 91st Street",
  },
];

selectForm.addEventListener("click", function (e) {
  toggleSelectForm();
});

selectCities.forEach((city) => {
  city.addEventListener("click", () => {
    addAdressBlock(city);
    cityData.forEach((data) => {
      if (data.city === city.textContent) {
        showAdress(data);
        adressButton.addEventListener("click", () => {
          adressButton.setAttribute("href", `tel: ${data.phone}`);
        });
      }
    });
  });
});

function toggleSelectForm() {
  console.log(popupImg.classList);
  popupImg.classList.toggle("popup-service_active");
  selectBlock.classList.toggle("select__list_active");
  selectForm.classList.add("select-form_active");
  adressBlock.classList.remove("adress-block_active");
}

function addAdressBlock(city) {
  adressBlock.classList.add("adress-block_active");
  selectBlock.classList.remove("select__list_active");
  selectFormText.innerText = city.innerText;
}

function showAdress(data) {
  adressFormCity.textContent = data.city;
  adressFormPhone.textContent = data.phone;
  adressFormOffice.textContent = data.adressOffice;
}

//-------------prices----------------
let prices = document.querySelectorAll(".price");
let pricesInfo = document.querySelectorAll(".price__info");
let buttonPrice = document.querySelectorAll(".price-info-button");
let pricesBlock = document.querySelector(".prices__formats");
let dropup = document.querySelectorAll(".popup-img");

pricesBlock.addEventListener("click", function (e) {
  let target = e.target;
  dropup.forEach((el) => {
    if (target === el) {
      pricesInfo.forEach((elem) => {
        if (
          elem.classList[0] === el.classList[0] &&
          !elem.classList.contains("price__info_active")
        ) {
          addActivePriceInfo(elem, el);

          prices.forEach((card) => {
            if (elem.classList[0] === card.classList[0]) {
              card.classList.add("price_active");
            }
          });
        } else if (
          elem.classList[0] === el.classList[0] &&
          elem.classList.contains("price__info_active")
        ) {
          removeActivePrice(elem);
          removeActivePriceInfo(elem, el);
        } else {
          removeActivePrice(elem);
          elem.classList.remove("price__info_active");
        }
      });
    } else {
      el.classList.remove("popup-img_active");
    }
  });
});
function removeActivePrice(elem) {
  prices.forEach((card) => {
    if (elem.classList[0] === card.classList[0]) {
      card.classList.remove("price_active");
    }
  });
}

function removeActivePriceInfo(elem, el) {
  elem.classList.remove("price__info_active");
  el.classList.remove("popup-img_active");
}

function addActivePriceInfo(elem, el) {
  elem.classList.add("price__info_active");
  el.classList.add("popup-img_active");
}
