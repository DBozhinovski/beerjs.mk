#!/bin/sh
USER=root
HOST=beerjs.mk
DIR=var/www/beerjs.mk   # might sometimes be empty!

hugo && rsync -avz --delete public/ ${USER}@${HOST}:~/${DIR}

exit 0