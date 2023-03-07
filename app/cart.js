//cart
const add = document.querySelectorAll(".add-btn");
let cartData = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0; //total price
add.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.closest(".product");
    const productName = product.querySelector(".product-name").innerText;
    const price = product.querySelector(".price").innerText;
    const productPic = product.querySelector("img").getAttribute("src");
    const newItem = {
      name: productName,
      price: price,
      img: productPic,
      count: 1,
    };
    //點擊後會出現商品資訊
    if (cartData.some((item) => item.name === newItem.name)) {
      alert("購物車內已有相同商品!");
    } else {
      cartData.push(newItem);
      localStorage.setItem("cart", JSON.stringify(cartData));
      alert("商品已添加！");
      renderCart();
    }
  });
});

function renderCart() {
  const cartContainer = document.querySelector(".cart-container");
  cartData.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    const cartItemImage = document.createElement("img");
    cartItemImage.src = item.img;
    const cartItemName = document.createElement("h4");
    cartItemName.textContent = item.name;
    const cartItemPrice = document.createElement("p");
    cartItemPrice.textContent = item.price;
    const cartItemPriceNum = document.createElement("div");
    cartItemPriceNum.classList.add("priceNum");
    const plus = document.createElement("button");
    plus.innerText = "+";
    plus.classList.add("plus");
    const count = document.createElement("span");
    count.innerText = "1";
    count.classList.add("num");
    const minus = document.createElement("button");
    minus.innerText = "-";
    minus.classList.add("minus");
    const edit = document.createElement("p");
    edit.innerText = "Delete";
    edit.style.color = "red";
    edit.classList.add("edit");
    cartItem.appendChild(cartItemImage);
    cartItem.appendChild(cartItemName);
    cartItem.appendChild(cartItemPrice);
    cartItem.appendChild(cartItemPriceNum);
    cartItem.appendChild(edit);
    cartItemPriceNum.appendChild(plus);
    cartItemPriceNum.appendChild(count);
    cartItemPriceNum.appendChild(minus);
    cartContainer.appendChild(cartItem);

    // 設定 num 的初始值
    count.innerText = item.count;

    // click plus to plus one
    plus.addEventListener("click", () => {
      count.innerText = (parseInt(count.innerText) + 1).toString();
      cartData[index].count += 1;
      localStorage.setItem("cart", JSON.stringify(cartData));
      //final price
      finalPrice();
    });

    // click minus to minus one
    minus.addEventListener("click", () => {
      count.innerText = (parseInt(count.innerText) - 1).toString();
      // at least more than one
      if (parseInt(count.innerText) < 1) {
        count.innerText = "1";
      } else {
        cartData[index].count -= 1;
        localStorage.setItem("cart", JSON.stringify(cartData));
        //final price
        finalPrice();
      }
    });

    // Delete item
    edit.addEventListener("click", () => {
      cartContainer.removeChild(cartItem);
      cartData.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartData));
      //final price
      finalPrice();
    });
    //count final price method
    function finalPrice() {
      let total = cartData
        .map((item) => item.price * item.count)
        .reduce((acc, curr) => acc + curr, 0);
      priceNum.innerText = `$${total}`;
    }
    finalPrice();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
