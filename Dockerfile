FROM nginx/unit:1.7.1-php7.0

LABEL maintainer="21h@blindage.org"
LABEL description="More information here https://blindage.org/?p=9575"

# install base dependencies

RUN apt-get ${APT_FLAGS_COMMON} update && \
    apt-get ${APT_FLAGS_PERSISTENT} -y install apt-utils

RUN apt-get ${APT_FLAGS_PERSISTENT} -y install php7.0-gd php7.0-mysql php7.0-curl php7.0-mcrypt php7.0-xml php7.0-json php7.0-mbstring php-mongodb curl

RUN apt-get ${APT_FLAGS_COMMON} purge -y apt-utils && \
    apt-get ${APT_FLAGS_COMMON} autoremove -y && \
    apt-get ${APT_FLAGS_COMMON} clean && \
    rm -rf /var/lib/apt/lists/*

RUN set -xe \
    && mkdir -p "$COMPOSER_HOME" \
    # install composer
    && php -r "copy('https://getcomposer.org/installer', '/tmp/composer-setup.php');" \
    && php -r "if(hash_file('SHA384','/tmp/composer-setup.php')==='93b54496392c062774670ac18b134c3b3a95e5a5e5c8f1a9f'.\
    '115f203b75bf9a129d5daa8ba6a13e2cc8a1da0806388a8'){echo 'Verified';}else{unlink('/tmp/composer-setup.php');}" \
    && php /tmp/composer-setup.php --no-ansi --install-dir=/usr/bin --filename=composer --version=$COMPOSER_VERSION \
    && composer --ansi --version --no-interaction \
    && composer --no-interaction global require 'hirak/prestissimo' \
    && composer clear-cache \
    && rm -rf /tmp/composer-setup.php /tmp/.htaccess \
    # show php info
    && php -v \
    && php-fpm -v \
    && php -m


# do not autostart
RUN rm -f /etc/init.d/unit

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY config.json /state/new_config.json

WORKDIR /www

COPY . .

VOLUME .:/www:rw

RUN mkdir preview
RUN chown -R www-data:www-data /www

# upload config to unitd and die
RUN unitd --state /state --pid /tmp/unitd.pid && \
    curl -s -X PUT -d @/state/new_config.json \
         --unix-socket /run/control.unit.sock \
         http://localhost/config/ && \
    kill -9 $(cat /tmp/unitd.pid)

EXPOSE 80

# now container ready to start with predefined config
CMD ["unitd", "--no-daemon", "--state", "/state"]
