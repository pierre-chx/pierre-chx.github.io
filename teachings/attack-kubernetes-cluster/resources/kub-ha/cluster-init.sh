#!/bin/bash

sudo kubeadm init --pod-network-cidr=192.168.0.0/16 --control-plane-endpoint "10.0.3.254:6443" --upload-certs
