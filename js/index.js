const templateParagraph = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas accusantium, qui consectetur facilis soluta necessitatibus commodi ratione aperiam sunt illum reiciendis voluptate quos officiis. Aspernatur pariatur architecto ratione maximequi?";

class Repos extends HTMLElement {

  static get observedAttributes() { return ["loading"]; }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get loading() {
    return JSON.parse(this.getAttribute("loading"));
  }

  set loading(v) {
    this.setAttribute("loading", JSON.stringify(v));
  }

  async getRepos(url) {
    this.loading = true;
    const response = await fetch(url, { mode: 'cors' });
    const json = await response.json();
    this.reps = json;
    this.loading = false;
  }

  async connectedCallback() {
    this.shadowRoot.addEventListener("click", (e) => {
      console.log(e.target)
    });
    await this.getRepos("https://api.github.com/users/Loleus/repos");
  }

  disconnectedCallback() { }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }

  render() {
    let i = 1;
    if (this.loading) {
      this.shadowRoot.innerHTML = `Loading...`;
    } else {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/repos/style.css">
        <span class="span">
          <h1>Feel free to
            <a href="mailto:07zglossie@wp.pl?subject=aboutCode">
              mail me.
            </a>
          </h1>
          <table>
            <tr style="background:#1118">
              <th>No</th>
              <th>Name</th>
              <th>Type</th>
              <th>Language</th>
            </tr>
            ${this.reps.map(repo => {
        if (repo.name != "loleus.github.io") {
          return `
            <tr>
              <td style="background:#1118" >${i++}</td>
              <td><a target="_blank" href="https://loleus.github.io/${repo.name}">${repo.name.toUpperCase()}</a></td>
              <td>${repo.description}</td>
              <td style="color:var(--mainTxtCol)">${repo.language}</td>
            </tr>
              `
        }
      }).join("")}
          </table>
        </span>
      `;
    }
  }
};
// customElements.define("my-repos",Repos);

'use strict'
const init = () => {

    const modals = document.querySelector(".modals")
    const modal = document.querySelectorAll("div .modal")
    const nav = document.querySelectorAll("nav h1")
    const close = document.getElementById("close");
    const content = document.querySelectorAll('.modals .modal div')

    const changeModal = function (i) {
        modals.classList.remove("disabled");
        modal[i].classList.remove("hidden");
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
                modal[i].classList.add("hidden")
            }, 670)
        }
    }

    for (let i = 0; i < nav.length; i++) {
        nav[i].onclick = () => {
            changeModal(i);
            disableMobileMenu();
            closeBtnHandler(i);
        }
    }

}
init();