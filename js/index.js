const templateParagraph = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas accusantium, qui consectetur facilis soluta necessitatibus commodi ratione aperiam sunt illum reiciendis voluptate quos officiis. Aspernatur pariatur architecto ratione maximequi?";

'use strict'
const init = () => {

    const modals = document.querySelector(".modals")
    const modal = document.querySelector("div .modal")
    const nav = document.querySelectorAll("nav h1")
    const close = document.getElementById("close");
    const content = document.querySelectorAll('.modals .modal div')
    let title = document.getElementById("title");
    let left = document.getElementById("left")
    let right = document.getElementById("right")
    const changeModal = function (text) {
        modals.classList.remove("disabled");
        modal.classList.remove("hidden");
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

    const closeBtnHandler = function (i) {
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
            changeModal();
            disableMobileMenu();
            closeBtnHandler(i);
            title.textContent = nav[i].textContent
            left.textContent = nav[i].textContent + " " + templateParagraph
            right.textContent = nav[i].textContent + " " + templateParagraph
        }
    }

}
init();
