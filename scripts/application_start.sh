#!/bin/bash

echo 'run application_start.sh: ' >> /home/ubuntu/wepardo-backend/deploy.log

echo 'pm2 restart wepardo-backend' >> /home/ubuntu/wepardo-backend/deploy.log
pm2 restart wepardo-backend >> /home/ubuntu/wepardo-backend/deploy.log