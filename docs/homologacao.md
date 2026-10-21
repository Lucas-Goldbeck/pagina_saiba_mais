# Auditoria e pendências de homologação

## Estado do repositório

- Projeto original: duas páginas HTML independentes, arquivos estáticos de marca e produto, `Dockerfile` com Nginx.
- Não há framework, dependências declaradas, build, lint, endpoint comercial, analytics, GTM, GA4, gestão de consentimento ou backend.
- A loja está em `sistemas.html`; seus produtos, preços, chamadas JavaScript e quatro destinos Hotmart foram mantidos. O endereço `/sistemas` continua disponível e `/loja` é o endereço preferencial novo.
- O número de WhatsApp e o e-mail foram reutilizados a partir do conteúdo existente: `+55 49 3674-0176` e `gcont@contabilsg.com.br`. A equipe deve reconfirmar esses dados antes da publicação.
- O logo enviado nesta conversa substituiu o ativo usado pelas páginas novas e pela loja. O recorte mantém transparência e remove as margens vazias.
- O Dockerfile copia apenas os dois arquivos gráficos usados pelas páginas servidas. Gravações de demonstração e demais arquivos antigos da pasta `logos` ficam fora da imagem de homologação.

## Conteúdo e limites comerciais

- A página Soluções apresenta a solução fiscal como **CONFIS**, conforme solicitação da equipe. `assets/site-config.js` ainda define **NotaSync** para as páginas que usam o nome centralizado.
- A adoção de **CONFIS** no restante do site exige alinhar os metadados e as páginas de detalhe. Os documentos comerciais citados para confirmar o escopo do produto não estão presentes no repositório.
- A página fiscal deixa explícito que o sistema não captura XMLs: o escritório obtém os documentos pelos sistemas atuais e disponibiliza os arquivos. Formatos, módulos, integrações, retenção e condições devem ser confirmados em demonstração.
- GCONT IA é apresentada como integração sujeita a diagnóstico, autorização e escopo. Não promete acesso irrestrito nem alteração autônoma de bases de produção.
- Ponte Contábil é divulgada como solução GCONT TECH com jornada comercial independente. A landing oficial é `https://pontecontabil.com/landing/`; o site institucional direciona para ela e não oferece preço, plano ou checkout próprio.
- A landing oficial apresenta boletim de caixa, rotinas financeiras e fiscais, estoque, histórico, resumos e exportações para escritório e clientes. A página Soluções usa uma foto ilustrativa de rotina digital, sem apresentá-la como captura da interface do Ponte Contábil.
- A demonstração interativa da landing oficial é identificada como visual inspirado no app e usa dados fictícios; não reutilizar essa demonstração como captura real. O rascunho interno `ponte-contabil-preview.html` continua fora do diretório público da imagem Docker.
- A área de conteúdo não foi criada: não há calendário, publicações ou estrutura editorial no repositório.
- Os documentos `GERALDO.docx` e `GERALDO CONFIS.docx` citados no prompt não estão presentes no repositório nem entre os arquivos desta tarefa. A documentação comercial e técnica precisa ser conferida antes de ampliar afirmações de produto.
- A imagem `mockup-produtos.png` é uma ilustração conceitual, não uma captura da interface. A loja identifica telas e valores como ilustrativos, sem apresentá-los como resultados reais. As gravações antigas não são servidas nem têm controles ativos; uma delas exibe um nome de usuário e outra mostra dados de operação. Confirmar autorização e higienização antes de reutilizá-las.
- A página de privacidade e os termos descrevem o fluxo criado, mas permanecem pendentes de revisão jurídica e validação das práticas internas de tratamento de dados.

## Conversão, privacidade e mensuração

- O formulário é validado no navegador e monta uma mensagem para `wa.me`. Ao abrir o WhatsApp, os campos seguem à plataforma externa na URL de preparação; a GCONT recebe a mensagem somente após o envio manual. O site não registra envio bem-sucedido nem guarda os campos em servidor.
- Um campo honeypot básico reduz envios automatizados no navegador. Não existe proteção de servidor porque não há endpoint de formulário.
- Os parâmetros UTM são mantidos em `sessionStorage` durante a sessão e podem ser acrescentados à mensagem de contato. Não há analytics ou scripts de terceiros configurados.
- Os componentes emitem `gcont:conversion` em `window`: `product_view`, `demo_request`, `diagnostic_request`, `form_start`, `whatsapp_click`, `whatsapp_message_prepared` e `checkout_start`. Não há evento de compra, pois não existe confirmação de pagamento conectada.
- A integração de analytics e qualquer consentimento necessário dependem de configuração e aprovação da empresa.

## SEO, hospedagem e URLs

- Títulos, descrições, canonicals, Open Graph, JSON-LD de organização, sitemap e robots estão incluídos.
- Os canonicals usam `https://www.gcontvendas.com`, o domínio informado no prompt. A equipe deve confirmar o host final e manter os canonicals e sitemap coerentes.
- Nginx entrega rotas curtas para as páginas novas, mantém `/sistemas` e adiciona `/loja`, cabeçalhos básicos de segurança, gzip e uma página 404.
- O site ao vivo não pôde ser consultado pela ferramenta de navegação; esta auditoria cobre o repositório local.

## Antes de publicar

1. Revisar esta versão com os sócios e a equipe comercial.
2. Conferir `GERALDO.docx`, `GERALDO CONFIS.docx`, escopo dos módulos, layouts, integrações, retenção, implantação e disponibilidade dos produtos.
3. Aprovar o nome fiscal final e atualizar `assets/site-config.js` e os metadados/cópias antes de publicar a nova marca.
4. Validar telefone, e-mail, Instagram, dados de endereço existentes na loja e condições atuais dos produtos e checkout Hotmart.
5. Revisar privacidade, termos, proteção antispam e o fluxo WhatsApp com as áreas responsáveis.
6. Avaliar e autorizar imagens e gravações de demonstração antes de disponibilizá-las.
7. Confirmar domínio, redirects de URLs antigas e eventuais configurações de analytics/consentimento.
8. Executar a validação visual e funcional no ambiente de homologação e comparar o checkout com a oferta publicada.
