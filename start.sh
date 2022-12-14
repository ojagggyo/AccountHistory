#!/bin/bash

sudo docker run -d \
--name accounthistory \
--net=mynet0 \
--ip=172.100.0.102 \
-p 3000:3000 \
ojagggyo/accounthistory

