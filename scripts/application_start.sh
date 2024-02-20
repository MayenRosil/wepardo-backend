#!/bin/bash

echo 'run application_start.sh: ' >> /home/ubuntu/wepardo-backend/deploy.log

echo 'pm2 restart nodejs-express-app' >> /home/ubuntu/wepardo-backend/deploy.log
pm2 restart nodejs-express-app >> /home/ubuntu/wepardo-backend/deploy.log