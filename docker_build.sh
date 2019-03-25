#!/bin/bash
docker stop app-forms
docker rm app-forms
docker rmi app-forms
docker build -t app-forms .
docker run -d --name app-forms -p 127.0.0.1:8001:80 --restart=always --network app-forms app-forms
sleep 5
docker ps -a
