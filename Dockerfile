FROM ubuntu:18.04

# install base dependencies

COPY ./docker/sources.list /etc/apt/sources.list

RUN apt-get ${APT_FLAGS_COMMON} update && \
    apt-get ${APT_FLAGS_PERSISTENT} -y install apt-utils

# Install PHP dependencies

RUN DEBIAN_FRONTEND=noninteractive apt-get ${APT_FLAGS_PERSISTENT} -y install \
    curl ca-certificates unzip cron supervisor rsyslog php7.2-fpm nginx npm \
    php7.2-cli php7.2-curl php-apcu php-apcu-bc php7.2-json php7.2-mbstring php-ssh2 php7.2-opcache \
    php7.2-readline php7.2-xml php7.2-zip php7.2-pdo php7.2-mysqli php7.2-pgsql php-mongodb

RUN ln -fs /usr/share/zoneinfo/Europe/Moscow /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata

RUN apt-get ${APT_FLAGS_COMMON} purge -y apt-utils && \
    apt-get ${APT_FLAGS_COMMON} autoremove -y && \
    apt-get ${APT_FLAGS_COMMON} clean && \
    rm -rf /var/lib/apt/lists/*

# Composer and dependencies

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer global require hirak/prestissimo

# Cleanup

RUN composer clear-cache && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/* ~/.composer

# Settings

EXPOSE 80
COPY ./docker/php.ini /etc/php/7.2/fpm/php.ini
#COPY ./docker/php-fpm.conf /etc/php/7.2/fpm/php-fpm.conf
COPY ./docker/site.conf /etc/nginx/sites-enabled/site.conf
RUN rm -f /etc/nginx/sites-enabled/default*
RUN touch /tmp/cron.log

# Sources

WORKDIR /www
COPY . .
RUN chown www-data:www-data . -R
RUN npm install
RUN composer install

# Entrypoint

CMD /etc/init.d/php7.2-fpm start && \
    /etc/init.d/nginx start && \
    cron && tail -f /tmp/cron.log
