const KEY = "tarefas";
let tarefas = [];

try { tarefas = JSON.parse(localStorage.getItem(KEY)) || []; } catch { tarefas = []; }

const salvar = () => { try { localStorage.setItem(KEY, JSON.stringify(tarefas)); } catch {} };

export const listar = () => tarefas;

export function adicionar(texto) {
  const t = String(texto).trim();
  if (!t) return { ok: false, erro: "Digite o nome da tarefa." };
  if (t.length > 80) return { ok: false, erro: "Use no máximo 80 caracteres." };
  tarefas.push({ id: crypto.randomUUID(), texto: t, feita: false });
  salvar();
  return { ok: true };
}

export function alternar(id) {
  const t = tarefas.find((x) => x.id === id);
  if (t) t.feita = !t.feita;
  salvar();
}

export function remover(id) {
  tarefas = tarefas.filter((x) => x.id !== id);
  salvar();
}
