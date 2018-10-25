#!/bin/bash

git pull;
killall -9 @angular/cli;
ng build --prod;
mv dist/* /var/www/html
