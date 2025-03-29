#!/bin/bash
sudo apt-get update

sudo apt-get install -y haproxy 

echo "
frontend kub-frontend
    bind *:6443
    mode tcp
    option tcplog
    default_backend kub-backend

backend kub-backend
    mode tcp
    option tcp-check
    balance roundrobin
    default-server inter 10s downinter 5s
    server master1 10.0.3.2:6443 check
    server master2 10.0.3.3:6443 check
    server master3 10.0.3.4:6443 check
    " |sudo tee -a /etc/haproxy/haproxy.cfg

sudo systemctl restart haproxy
