#!/bin/bash

sudo apt-get update -y
sudo apt-get install -y curl python3 python3-pip python3-venv postgresql
sudo curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev libpq-dev
sudo apt-get install -y apache2 libapache2-mod-wsgi-py3
sudo npm install -g serve
sudo python3 -m pip install --upgrade pip
sudo pip3 install virtualenv
sudo pg_ctlcluster 12 main start