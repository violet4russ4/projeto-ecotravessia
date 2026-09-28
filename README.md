# EcoTravessia

Aplicação educativa de página única para uma ONG fictícia dedicada à proteção da fauna silvestre nas rodovias.

## Ferramentas e execução

A interface usa HTML semântico, CSS responsivo e JavaScript nativo em módulos ES. Abra a pasta do projeto no VS Code, clique com o botão direito em html/index.html e escolha Open with Live Server. A raiz index.html encaminha para essa página. O JavaScript em módulos precisa ser servido por HTTP; não abra o arquivo com o protocolo file://.

O projeto não usa Vite nem framework. GitHub Actions usa Node.js e esbuild somente no fluxo de produção para minificar os recursos. A execução local não requer Node.js, npm ou pnpm.

## Estrutura

projeto ecotravessia/
├── .github/workflows/deploy.yml
├── css/style.css
├── evidencias/
│   ├── ecotravessia-inicio-desktop.png
│   ├── ecotravessia-menu-mobile.png
│   ├── ecotravessia-formulario-erro.png
│   ├── ecotravessia-formulario-sucesso.png
│   └── ecotravessia-live-server-corrigido.png
├── html/index.html
├── imagens/
│   ├── Ecotravessia.png
│   └── Ecotravessia-otimizada.jpg
├── js/
│   ├── app.js
│   ├── data.js
│   ├── modules/
│   │   ├── feedback.js
│   │   ├── form.js
│   │   ├── navigation.js
│   │   ├── router.js
│   │   └── storage.js
│   └── templates/pages.js
├── index.html
└── README.md

app.js coordena a inicialização dos módulos. Os arquivos de script.js que você abriu anteriormente foram reorganizados nessa estrutura; por isso a aba antiga do VS Code precisa ser fechada. Abra js/app.js para ver o ponto de entrada atual.

## SPA, DOM e templates

As rotas usam o fragmento da URL: início, páginas da ONG, projetos, impacto, voluntariado, doação e contato. O roteador intercepta cliques nos links internos, evita o recarregamento padrão, renderiza a página correspondente em #app e reage ao evento hashchange. Após cada renderização, move o foco ao título ou à seção solicitada.

templates/pages.js constrói a marcação com Template Literals; js/data.js fornece projetos e indicadores. Os dados interpolados vêm do próprio código. Valores digitados nunca são inseridos usando innerHTML.

## Eventos, validação e armazenamento

O menu responde a clique, fecha com Escape e informa o estado em aria-expanded. O roteador acompanha links internos e hashchange. O formulário acompanha input, blur e submit e usa preventDefault para controlar o envio.

A validação exige nome com pelo menos dois caracteres e e-mail válido; o telefone é opcional e, quando preenchido, verifica um padrão numérico. Mensagens junto aos campos, bordas de estado, aria-invalid e feedback de status explicam erros ou sucesso.

storage.js grava o último cadastro no localStorage com JSON.stringify e o recupera com JSON.parse ao abrir o formulário. O protótipo informa que os dados ficam somente no navegador e não são enviados à ONG. Use dados fictícios.

Não foram adicionadas bibliotecas de interface; o JavaScript da aplicação é nativo.

## Design System, layout e acessibilidade

css/style.css define cores primárias, secundárias, neutras, estados e foco por variáveis CSS; a tipografia tem cinco níveis e os espaçamentos seguem uma escala modular baseada em 8 px. O Grid de doze colunas compõe as áreas principais. Flexbox alinha .cabecalho-conteudo, .identidade, .menu, .hero-acoes, #formulario-voluntario, .campo, notificações e .footer-conteudo.

Há seis pontos responsivos em 1200, 1199, 1024, 768, 480 e 320 px. Em telas estreitas, cabeçalho, conteúdo e rodapé são contidos na largura do viewport, o menu passa para navegação vertical e textos/itens longos podem quebrar sem gerar rolagem horizontal. Os controles têm estados hover, focus, active e disabled; formulários sinalizam estados válidos e inválidos; o toast e os alertas seguem as cores do sistema visual. A navegação inclui link para saltar ao conteúdo, labels, foco visível, suporte a teclado, landmarks semânticos e respeito a prefers-reduced-motion.

As combinações principais de texto e fundo foram verificadas com o [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/), usando os códigos hexadecimais da paleta. Resultados: texto principal `#263238` sobre `#f5f7f5`, 12,22:1; texto branco `#ffffff` no botão primário verde `#2e7d32`, 5,12:1; texto verde-escuro `#1b5e20` no botão secundário branco `#ffffff`, 7,86:1; texto `#263238` no botão de destaque âmbar `#ffa000`, 6,44:1; texto branco no hover âmbar-escuro `#864900`, 7,07:1; etiqueta verde-escura `#1b5e20` sobre verde-claro `#a5d6a7`, 4,78:1; erro `#a61b1b` sobre fundo `#fdecec`, 6,58:1; sucesso `#164b25` sobre fundo `#e5f4e8`, 8,91:1. As combinações de texto comum listadas superam 4,5:1, mínimo do critério WCAG 2.1 AA 1.4.3. A revisão com leitor de ecrã e zoom ainda precisa ser concluída.

## Otimização, build e publicação

A pasta `imagens` contém o PNG original e uma versão JPG otimizada, reduzida de aproximadamente 2,13 MB para 409 KB. O workflow `.github/workflows/deploy.yml` monta a pasta `_site`, minifica CSS e módulos JavaScript com esbuild e publica o resultado no GitHub Pages. O Pages está configurado para usar GitHub Actions; o site publicado está disponível em https://violet4russ4.github.io/projeto-ecotravessia/.

## Verificações e problemas corrigidos

A página foi aberta por servidor HTTP local e a versão publicada foi conferida no navegador. Foram verificados os links da navegação, a abertura do submenu com Enter, o fechamento com Escape, a navegação até o formulário pelo teclado, os rótulos dos campos e a validação: ao enviar vazio, o foco vai para o nome e `aria-invalid` é atualizado. A árvore de acessibilidade do navegador expõe landmarks, links, botões e campos com nomes acessíveis. A avaliação com leitor de ecrã real e zoom ainda precisa ser feita.

Um problema de inicialização acontecia porque a imagem era importada como módulo JavaScript, recurso que exige transformação de build. A referência foi trocada por uma URL relativa baseada em import.meta.url, que funciona no Live Server e preserva a imagem otimizada.

## Git e colaboração

O projeto segue um fluxo GitFlow simplificado: `main` contém a versão publicada, `develop` integra alterações e `feature/nome-da-tarefa` isola funcionalidades. A alteração de acessibilidade foi integrada por pull requests: PR #2 de `feature/acessibilidade` para `develop` e PR #3 de `develop` para `main`. As mensagens de commit usam prefixos semânticos, como `chore:` e `a11y:`. O repositório remoto está em https://github.com/violet4russ4/projeto-ecotravessia.

## Versionamento de releases

As versões usam Semantic Versioning (`MAJOR.MINOR.PATCH`), e cada release é identificada por uma tag no formato `vMAJOR.MINOR.PATCH`.


## Revisão responsiva final

Após a publicação inicial, a versão mobile apresentou desalinhamento visual nas extremidades superior e inferior da página causado por conteúdo que podia ultrapassar a largura disponível. A revisão final adiciona contenção horizontal no documento, permite quebra segura de textos e itens de navegação e garante que o cabeçalho e o rodapé ocupem somente a largura do viewport.

A correção foi aplicada em `css/style.css` e registrada no commit `fix: corrige overflow horizontal no responsivo mobile`. A validação final deve ser feita novamente no navegador móvel após a publicação, incluindo a abertura do menu, a navegação pelas rotas, o formulário e a rolagem vertical completa.
