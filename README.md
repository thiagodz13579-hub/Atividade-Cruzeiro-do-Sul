# Tarefas — SPA de lista de tarefas

SPA em HTML5, CSS3 e JavaScript (ES modules) com Vite. Permite adicionar, concluir e remover tarefas, carregar sugestões de uma API pública e alternar entre tema claro, escuro e alto contraste.

## Pré-requisitos
- Node.js LTS (18+) e npm
- Git
- Navegador moderno (Chrome ou Firefox)

## Instalação e execução local
```bash
git clone <url-do-repositorio>
cd tarefas-spa
npm install
npm run dev      # abre em http://localhost:5173
```

## Build
```bash
npm run build    # gera a pasta dist/ minificada
npm run preview  # testa a build localmente
```

## Estrutura
```
index.html        # marcação semântica (header, nav, main, footer)
src/main.js       # eventos, renderização e chamada à API
src/tasks.js      # regras e persistência das tarefas
src/theme.js      # temas claro, escuro e alto contraste
src/styles.css    # estilos com variáveis CSS
vercel.json       # rewrite para SPA
```

## Acessibilidade
Landmarks semânticos, link "Pular para o conteúdo", foco visível, `aria-live` para mensagens, `aria-invalid` e `aria-describedby` no formulário, navegação completa por teclado, temas com contraste mínimo de 4.5:1.

## Versionamento
- GitFlow: `main` (releases), `develop` (integração), `feature/*`, `hotfix/*`
- Conventional Commits: `feat`, `fix`, `refactor`, `docs`
- SemVer com tags (ex.: `v1.0.0`)
- Mudanças entram por Pull Request vinculado à issue (`Closes #n`)
