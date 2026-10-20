# GCONT TECH — versão de homologação

Site estático servido por Nginx. Não há framework, etapa de build, banco de dados ou endpoint de formulários neste projeto.

## Páginas

- `/` — homepage institucional e comercial.
- `/solucoes` — visão geral do portfólio.
- `/notasync` — página da solução fiscal com o nome público atual centralizado em `assets/site-config.js`.
- `/gcont-ia` — apresentação da proposta de integração com IA.
- `/sobre` e `/contato` — páginas institucionais e de contato.
- `/loja` — loja existente em `sistemas.html`; `/sistemas` continua como endereço compatível.
- `/privacidade` e `/termos` — textos para revisão antes de publicar.
- `ponte-contabil-preview.html` — rascunho interno; não é copiado para a imagem Docker.

## Prévia

Use a configuração Nginx do projeto para testar as rotas amigáveis. O `Dockerfile` prepara a imagem local de homologação; a publicação em produção não faz parte desta alteração.

A imagem inclui somente o logo e a ilustração usados pela loja. Gravações de demonstração e outros ativos antigos ficam fora do pacote até a equipe confirmar autorização e remover informações internas, se necessário.

## Contato e métricas

O formulário valida os dados no navegador e abre uma mensagem no WhatsApp oficial já usado no projeto. Ao abrir o WhatsApp, os dados são passados à plataforma para preencher a mensagem; a GCONT recebe o conteúdo somente se a pessoa tocar em Enviar. O site não registra envio bem-sucedido nem guarda os campos em servidor.

Os scripts emitem eventos locais `gcont:conversion` em `window` para futura integração autorizada. Nenhum evento é transmitido a GA, GTM ou outro serviço de analytics. O início de checkout é registrado antes de abrir os links Hotmart existentes; uma compra só poderá ser registrada por uma integração que confirme a transação.

Veja auditoria, pendências e decisões em [`docs/homologacao.md`](docs/homologacao.md).
