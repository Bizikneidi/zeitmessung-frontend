#!/bin/bash

sudo git pull;
sudo killall -9 @angular/cli;
sudo ng build --prod;
sudo rm -rf /var/www/html/*
sudo mv -f dist/* /var/www/html
