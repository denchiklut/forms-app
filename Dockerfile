FROM nginx/unit:1.7.1-php7.0

LABEL maintainer="21h@blindage.org"
LABEL description="More information here https://blindage.org/?p=9575"

# install base dependencies

RUN apt-get ${APT_FLAGS_COMMON} update && \
    apt-get ${APT_FLAGS_PERSISTENT} -y install apt-utils

RUN apt-get ${APT_FLAGS_PERSISTENT} -y install php7.0-gd php7.0-mysql php7.0-curl php7.0-mcrypt php7.0-xml php7.0-json php7.0-mbstring curl

RUN apt-get ${APT_FLAGS_COMMON} purge -y apt-utils && \
    apt-get ${APT_FLAGS_COMMON} autoremove -y && \
    apt-get ${APT_FLAGS_COMMON} clean && \
    rm -rf /var/lib/apt/lists/*

# do not autostart
RUN rm -f /etc/init.d/unit

COPY config.json /state/new_config.json

WORKDIR /www

COPY . .

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
