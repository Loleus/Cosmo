const templateParagraph = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas accusantium, qui consectetur facilis soluta necessitatibus commodi ratione aperiam sunt illum reiciendis voluptate quos officiis. Aspernatur pariatur architecto ratione maximequi?";

'use strict'
const init = () => {
  let leftText = `left ${templateParagraph}`;
  let rightText = `right ${templateParagraph}`;  
  const modals = document.querySelector(".modals")
  const modal = document.querySelector(".modal")
  const nav = document.querySelectorAll("nav h1")
  const close = document.getElementById("close");
  const content = document.querySelectorAll('.modal div')

  const changeModal = function (textContent) {
    let title = document.getElementById("title")
    modals.classList.remove("disabled");
    modal.classList.remove("hidden");
    title.textContent = textContent;
    setTimeout(() => {

      for (let i = 0; i < content.length; i++) {
        content[i].classList.remove('hidden');
      }

    }, 670)
  }

  const disableMobileMenu = function () {
    for (let i = 0; i < nav.length; i++) {
      nav[i].classList.add("disabled")
    }
  }

  const closeBtnHandler = function () {
    close.onmouseenter = () => {
      modals.classList.add("active");
    }
    close.onmouseleave = () => {
      modals.classList.remove("active");
    }
    close.onclick = () => {
      modals.classList.remove("active");
      for (let i = 0; i < nav.length; i++) {
        nav[i].classList.remove("disabled")
      }

      modals.classList.add("disabled");

      for (let i = 0; i < content.length; i++) {
        content[i].classList.add('hidden');
      }

      setTimeout(() => {
        modal.classList.add("hidden")
      }, 670)
    }
  }

  for (let i = 0; i < nav.length; i++) {
    nav[i].onclick = () => {
      changeModal(nav[i].textContent);
      disableMobileMenu();
      closeBtnHandler();
      document.getElementById("left").innerHTML = nav[i].textContent + leftText;
      document.getElementById("right").innerHTML = nav[i].textContent + rightText;
    }
  }

}
init();
