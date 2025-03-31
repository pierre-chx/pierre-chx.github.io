# Session 3

The goal of this session is to attack your Kubernetes cluster, and reach the backend service.

## Understanding the netcat tool:

First, you will work with the netcat tool in local. In your terminal, try the command:
```bash
nc -lvp 4444
```

If `nc` is not recognized, try installing `netcat-openbsd` using command:
```bash
sudo apt install netcat-openbsd
```
The netcat tool will be used to attack the cluster.