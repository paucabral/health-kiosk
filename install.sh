#!/bin/bash

sudo apt update -y
sudo apt install -y python3 python3-pip python3-venv nodejs npm postgresql
sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev libpq-dev
sudo python3 -m pip install --upgrade pip
sudo pip3 install virtualenv