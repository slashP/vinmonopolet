#!/bin/bash

rsync -avuq --delete "$APP_OUTPUT_DIRECTORY/" "$WWWROOT_DIRECTORY"
/usr/sbin/sshd
dotnet "$STARTUP_DOTNET_LIBRARY"
