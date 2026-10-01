const TEMAS = ["claro", "escuro", "contraste"];

export function iniciarTema(btn) {
  const aplicar = (t) => {
    document.documentElement.dataset.theme = t;
    btn.textContent = `Tema: ${t}`;
    btn.setAttribute("aria-pressed", String(t !== "claro"));
    try { localStorage.setItem("tema", t); } catch {}
  };
  const atual = document.documentElement.dataset.theme;
  const inicial = TEMAS.includes(atual) ? atual
    : matchMedia("(prefers-contrast: more)").matches ? "contraste"
    : matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
  aplicar(inicial);
  btn.addEventListener("click", () => {
    const prox = TEMAS[(TEMAS.indexOf(document.documentElement.dataset.theme) + 1) % TEMAS.length];
    aplicar(prox);
  });
}
