const router = (hook = console.log) => {
  window.onpopstate = ({ state }) => hook(new URL(window.location.href), state);
  hook(new URL(window.location.href));
  return {
    anchorHandler: e => {
      e.preventDefault();
      window.history.pushState(null, "", e.target.href);
      hook(new URL(e.target.href));
      return false;
    },
    saveState: (state, href = window.location.href) => {
      window.history.pushState(state, "", href);
    }
  };
};

const locations = {
  "/": (state) => `<h1>Home</h1>
    <p>Type something in this input. If you blur it, it will be saved as state.
      Now you can navigate back and forth to remove/restore it. <br />
      For example, type something and navigate to the about page. Then press the back button.
      </p>
      <br />
    <input
      value="${state?.text || ''}"
      onblur="saveState({text: this.value})"
    />
  `,
  "/about": (state) => `<h1>About</h1>`,
  "/contact": (state) => `<h1>Contact</h1>`,
}

pageContent = document.getElementById("page-content");

const { saveState, anchorHandler } = router((location, state) =>
  pageContent.innerHTML = locations[location.pathname]
    ? locations[location.pathname](state)
    : locations["/"](state)
);

document
  .querySelectorAll("a")
  .forEach(a => a.addEventListener("click", anchorHandler));
