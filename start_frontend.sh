#!/bin/bash

git pull;
killall -9 @angular/cli;
ng build --prod;
rm -rf /var/www/html/*
mv -f dist/* /var/www/html
