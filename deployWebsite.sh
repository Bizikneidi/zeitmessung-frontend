git pull
git checkout -b "develop"
ng build --prod
rm -rf /usr/share/nginx/html/.
mv dist/* /usr/share/nginx/html/
