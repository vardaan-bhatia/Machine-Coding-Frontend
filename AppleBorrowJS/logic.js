let basket1 = document.querySelector(".b1 span");
let basket2 = document.querySelector(".b2 span");
let leftarrow = document.querySelector(".left-arrow");
let rightarrow = document.querySelector(".right-arrow");
let heading = document.querySelector(".heading");

let totalapples = 10;
let secondBasket = 0;
basket1.innerText = totalapples;
basket2.innerText = secondBasket;

let updateHtml = () => {
  basket1.innerText = totalapples;
  basket2.innerText = secondBasket;
  if (totalapples === 0) {
    heading.innerText = "There are 0 apples in Basket 1.";
  } else if (secondBasket === 0) {
    heading.innerText = "There are 0 apples in Basket 2.";
  } else {
    heading.innerText = "Apple count";
  }
};

rightarrow.addEventListener("click", () => {
  if (totalapples > 0) {
    totalapples--;
    secondBasket++;
    updateHtml();
  }
});

leftarrow.addEventListener("click", () => {
  if (secondBasket > 0) {
    totalapples++;
    secondBasket--;
    updateHtml();
  }
});
