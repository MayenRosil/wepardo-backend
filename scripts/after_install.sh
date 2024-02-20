#!/bin/bash
echo 'run after_install.sh: ' >> /home/ubuntu/wepardo-backend/deploy.log

echo 'cd /home/ubuntu/nodejs-server-cicd' >> /home/ubuntu/wepardo-backend/deploy.log
cd /home/ubuntu/wepardo-backend >> /home/ubuntu/wepardo-backend/deploy.log

echo 'npm install' >> /home/ubuntu/wepardo-backend/deploy.log 
npm install >> /home/ubuntu/wepardo-backend/deploy.log
