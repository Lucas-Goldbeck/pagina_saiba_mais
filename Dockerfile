FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY loja-gcont-saiba-mais_1.html /usr/share/nginx/html/index.html
COPY sistemas.html /usr/share/nginx/html/sistemas.html
COPY logos /usr/share/nginx/html/logos

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
