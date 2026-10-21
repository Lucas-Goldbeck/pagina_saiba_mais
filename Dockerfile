FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html /usr/share/nginx/html/index.html
COPY solucoes.html /usr/share/nginx/html/solucoes.html
COPY notasync.html /usr/share/nginx/html/notasync.html
COPY gcont-ia.html /usr/share/nginx/html/gcont-ia.html
COPY sobre.html /usr/share/nginx/html/sobre.html
COPY contato.html /usr/share/nginx/html/contato.html
COPY privacidade.html /usr/share/nginx/html/privacidade.html
COPY termos.html /usr/share/nginx/html/termos.html
COPY 404.html /usr/share/nginx/html/404.html
COPY sistemas.html /usr/share/nginx/html/sistemas.html
COPY robots.txt sitemap.xml /usr/share/nginx/html/

COPY assets /usr/share/nginx/html/assets
COPY logos /usr/share/nginx/html/logos

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
