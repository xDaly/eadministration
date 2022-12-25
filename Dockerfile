# from imagetag from docker hub
from node:12.12.0-alpine AS build
#specify work dir in the container 
workdir /usr/local/project
#install angular cli
run npm install -g @angular/cli@6.2.3
#copy package json 
copy package.json .
# install nodemodules 
run npm i --legacy-peer-deps
run npm i --f

copy . .
#build angular project 
run npm run build

FROM nginx:1.17.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/local/project/dist/ /usr/share/nginx/html