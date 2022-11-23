FROM mcr.microsoft.com/dotnet/aspnet:7.0

RUN apt-get update \
    && apt-get install -y --no-install-recommends libayatana-appindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 libgbm1 libgcc1 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 libxshmfence-dev libgdiplus libc6-dev libfontconfig1 \
    && apt-get install -y --no-install-recommends openssh-server rsync wget unzip \
    && rm -rf /var/lib/apt/lists/*

RUN wget "https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/970485/chrome-linux.zip" && \
    mkdir -p /chromium/linux && \
    unzip chrome-linux.zip -d /chromium/linux && \
    rm chrome-linux.zip

ENV APP_OUTPUT_DIRECTORY=/defaulthome/hostingstart/wwwroot
ENV WWWROOT_DIRECTORY=/home/site/wwwroot

RUN mkdir -p /var/run/sshd \
    && mkdir -p /home/LogFiles/ \
    && mkdir -p $WWWROOT_DIRECTORY \
    && echo "root:Docker!" | chpasswd

COPY sshd_config /etc/ssh/
COPY init_container.sh /bin
RUN tr -d '\r' < /bin/init_container.sh > /bin/init_container_unix.sh && chmod 755 /bin/init_container_unix.sh

EXPOSE 80 2222

WORKDIR $WWWROOT_DIRECTORY

ENTRYPOINT "/bin/init_container_unix.sh"
