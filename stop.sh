#!/bin/bash

#docker network disconnect mynet0 ah
docker stop -t 600 accounthistory
docker rm accounthistory

