import { listar, adicionar, alternar, remover } from "./tasks.js";
import { iniciarTema } from "./theme.js";

const $ = (s) => document.querySelector(s);
const form = $("#form"), input = $("#nova"), erro = $("#erro");
const ul = $("#itens"), vazio = $("#vazio"), status = $("#status");

function aviso(msg) { status.textContent = msg; }

function mostrarErro(msg) {
  erro.textContent = msg;
  erro.hidden = false;
  input.setAttribute("aria-invalid", "true");
  input.focus();
}

function limparErro() {
  erro.hidden = true;
  input.removeAttribute("aria-invalid");
}

function render() {
  ul.replaceChildren();
  for (const t of listar()) {
    const li = document.createElement("li");
    li.className = t.feita ? "feita" : "";
    li.innerHTML = `
      <label><input type="checkbox" data-id="${t.id}" ${t.feita ? "checked" : ""} />
      <span></span></label>
      <button type="button" class="remover" data-id="${t.id}">Remover</button>`;
    li.querySelector("span").textContent = t.texto;
    li.querySelector(".remover").setAttribute("aria-label", `Remover tarefa: ${t.texto}`);
    ul.append(li);
  }
  vazio.hidden = listar().length > 0;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const r = adicionar(input.value);
  if (!r.ok) return mostrarErro(r.erro);
  limparErro();
  input.value = "";
  render();
  aviso("Tarefa adicionada.");
  input.focus();
});

// Delegação de eventos: um único listener serve itens criados dinamicamente
ul.addEventListener("click", (e) => {
  const btn = e.target.closest(".remover");
  if (btn) { remover(btn.dataset.id); render(); aviso("Tarefa removida."); $("#nova").focus(); }
});
ul.addEventListener("change", (e) => {
  if (e.target.matches("input[type=checkbox]")) { alternar(e.target.dataset.id); render(); }
});

$("#carregar").addEventListener("click", async () => {
  const sug = $("#sug");
  aviso("Carregando sugestões...");
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
    if (!resp.ok) throw new Error(`Erro HTTP ${resp.status}`);
    const dados = await resp.json();
    sug.replaceChildren(...dados.map((d) => {
      const li = document.createElement("li");
      const b = document.createElement("button");
      b.type = "button"; b.textContent = `Adicionar: ${d.title}`;
      b.addEventListener("click", () => { adicionar(d.title.slice(0, 80)); render(); aviso("Tarefa adicionada."); });
      li.append(b);
      return li;
    }));
    aviso("Sugestões carregadas.");
  } catch (err) {
    console.error(err);
    aviso("Não foi possível carregar as sugestões. Verifique a conexão e tente de novo.");
  }
});

document.querySelectorAll("nav a").forEach((a) =>
  a.addEventListener("click", () => {
    document.querySelectorAll("nav a").forEach((x) => x.removeAttribute("aria-current"));
    a.setAttribute("aria-current", "page");
  }));

iniciarTema($("#tema"));
render();
