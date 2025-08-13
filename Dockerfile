FROM php:8.2-apache

# Active mod_rewrite si besoin de liens propres
RUN a2enmod rewrite

# Copie ton code dans le dossier web d’Apache
COPY . /var/www/html/

# Définit le répertoire de travail
WORKDIR /var/www/html
