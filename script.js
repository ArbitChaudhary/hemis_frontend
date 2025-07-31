const listItems = document.querySelectorAll("li");

function toggleDone(e) {
  if (!e.target.className) {
    e.target.className = "done";
  } else {
    e.target.className = "";
  }
}

listItems.forEach((item) => {
  item.addEventListener("click", toggleDone);
});

const myHeading = document.querySelector("h1");

const myImage = document.querySelector("img");

myImage.addEventListener("click", () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "./images/himalaya.jpg") {
    myImage.setAttribute("src", "./images/yak.jpg");
  } else {
    myImage.setAttribute("src", "./images/himalaya.jpg");
  }
});

const myButton = document.querySelector("button");

function setUserName() {
  const myName = prompt("Please enter you name");
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `Mozilla is cool, ${myName}`;
  }
}

if (!localStorage.getItem("name")) {
  setUserName();
} else {
  const storedName = localStorage.getItem("name");
  myHeading.textContent = storedName;
}

myButton.addEventListener("click", () => {
  setUserName();
});
