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

Há seis pontos responsivos em 1200, 1199, 1024, 768, 480 e 320 px. Os controles têm estados hover, focus, active e disabled; formulários sinalizam estados válidos e inválidos; o toast e os alertas seguem as cores do sistema visual. A navegação inclui link para saltar ao conteúdo, labels, foco visível, suporte a teclado, landmarks semânticos e respeito a prefers-reduced-motion.

As combinações principais de texto e fundo foram conferidas: texto/fundo 12,22:1; botão primário 5,13:1; botão secundário 6,44:1; estado hover do botão de destaque 7,08:1; etiqueta 4,79:1; erro 6,58:1; sucesso 8,92:1. Todas superam o mínimo 4,5:1 para texto comum previsto no critério WCAG 2.1 AA 1.4.3. A avaliação completa ainda requer revisão de todas as telas com teclado, leitor de tela e zoom.

## Otimização, build e publicação

A pasta imagens contém o arquivo original e uma versão JPG otimizada, reduzida de aproximadamente 2,13 MB para 409 KB. O workflow executa o build de produção: monta a pasta _site, minifica CSS e os módulos JavaScript com esbuild e publica o resultado no GitHub Pages. A raiz index.html encaminha os visitantes para html/index.html.

Para ativar a publicação, envie o projeto para um repositório GitHub, habilite Settings > Pages > Build and deployment > GitHub Actions e faça push para main. A publicação real ainda depende desse repositório e da execução do workflow.

## Verificações e problemas corrigidos

A página foi aberta por servidor HTTP local. Foram conferidos a navegação SPA, a validação com campos vazios, o envio com dados de demonstração e as mensagens de retorno. Os logs do navegador não registraram erros nesses fluxos.

Um problema de inicialização acontecia porque a imagem era importada como módulo JavaScript, recurso que exige transformação de build. A referência foi trocada por uma URL relativa baseada em import.meta.url, que funciona no Live Server e preserva a imagem otimizada.

## Git e colaboração

Use main para a versão publicada, develop para integração e branches feature/nome-da-tarefa para mudanças. Abra pull requests, revise o código e use commits semânticos como feat: adicionar roteamento SPA. O projeto ainda precisa ser inicializado em um repositório Git, receber o endereço remoto do GitHub e obter um histórico real de commits.
