#!/bin/bash

sudo git pull;
sudo killall -9 @angular/cli;
sudo ng build --prod;
echo "Removing previos version..." && sudo rm -rf /var/www/html/* && echo "Copying new files..." && sudo mv -f dist/* /var/www/html && echo "Done!"
