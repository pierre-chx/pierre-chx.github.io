# Session 2

The goal of this session is to deploy a chain of vulnerable microservices.

## Vulnerable HTML server:

### Create the python script and HTML page:

First, think about the HTML page. There should be a form, with method POST, an input for the command, and an input for the submit button.  
This HTML form will be directly written in our python script, for ease of use.  
Then, develop a python script which will use this HTML as a string to host a
server. To do so, you can use the `http.server.SimpleHTTPRequestHandler` python class (documentation: [here](https://docs.python.org/3/library/http.server.html#http.server.SimpleHTTPRequestHandler)). You will have to define a new object which inherits from this class, but with a new **GET** method for simple page loading, and a new **POST** method for running the command and then showing the result.  

When the class for your server is created, you should then have it run forever when the script is launched (through `httpd.serve_forever()`, you can find more information in the documentation). You can test it by running the script and connect to `localhost:<port_number>`, where <port_number> is the port you choose in your script.

### Create the YAML file for Kubernetes deployment:

There are several ways to deploy new services to a Kubernetes cluster. The one we will use is called **declarative** objects management. We will use YAML configuration files to describe what we want to achieve, and using the command `kubectl apply -f <your_yaml_file>`, the cluster will try to create exactly what we declared.  
We will create three kind of objects using YAML files: 

- Deployments: they are used to create the containers, and choose the number of replicas that are used,
- ConfigMaps: we will use the ConfigMaps to store the python script,
- Services: they are used to make your microservices available with a fixed network identity (fixed IP address, URL, ...).

To help you progress, we give a skeleton YAML file, where you will need to replace all elements written between **<  >** in order to have a working service:

- **<deployment_name>**: Name of the deployment for one of your apps. Every deployment should have a different name.
- **<app_name>**: Name of your app (be it html_vulnerable_server or anything). Every different app must have a different name. This name is needed so that the deployment can manage the containers, and so that the service can make the python servers available.
- **<file_name>**: This will be the name of your python script, that will be stored in the container. It is needed both for container creation so that the container knows what to run, but also for the ConfigMap so that it knows under what filename to store your script.
- **<config_name>**: This is the name of the ConfigMap. The ConfigMap will store the python script, and giving this ConfigMap name to a volume will store the data of the ConfigMap on the volume. Every ConfigMap must have a different name, linked with the app (to be easy to recognize).
- **<your_python_code>**: This is where you put your whole python script.
- **<service_name>**: The name of your service, every service needs a different one.
- **<service_type>**: There are three types of services: **ClusterIP**, **NodePort** and **LoadBalancer**. ClusterIP services are only available inside the cluster, whereas NodePort services are available outside the cluster by using the IP of one of the cluster machines and the specific port given to this service. LoadBalancer services require specific softwares to work. In this lab, you will use only ClusterIP services and NodePort services (for LoadBalancer services, see the [To go further](#to-go-further) section).
- **<python_server_port>**: This is the port you assigned to your python server in your script.

The YAML skeleton is:
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <deployment_name>
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      app: <app_name>
  template:
    metadata:
      labels:
        app: <app_name>
    spec:
      containers:
      - name: <app_name>
        image: docker.io/library/python:3.9-alpine
        command: ["python3", "/app/<file_name>"]
        volumeMounts:
        - name: script-volume
          mountPath: /app
      volumes:
      - name: script-volume
        configMap:
          name: <config_name>
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: <config_name>
  namespace: default
data:
  <file_name>: |
    <your_python_code>
---
apiVersion: v1
kind: Service
metadata:
  name: <service_name>
  namespace: default
spec:
  type: <service_type>
  selector:
    app: <app_name>
  ports:
  - protocol: TCP
    port: 80
    targetPort: <python_server_port>
```
**Remark:** We deploy the servers easily using a quick method. However, for more complex apps,we could instead have the HTML files outside the python script, and instead of using a ConfigMap, we could create a clean Docker Image on our machines and then use it in our YAML files (see (To go further)[#to-go-further] section to read more about it).

### YAML file parameters for the vulnerable HTML server:

For the HTML server, the service should be of type NodePort, so as to be available from outside the cluster. Write the YAML file, and deploy your HTML server to your cluster.


## Vulnerable server:

### Create the python script:

Now, we want to create a server which executes commands, but doesn't have an HTML page. This server only implements the **GET** method. It looks for the query component "command=" in the URL. It then executes the command, and returns the command and the result in a JSON format. Using your previous experience of python servers scripts, write a script which will do so, and test it in local.

### YAML file parameters:

This server will be used only inside the cluster. It does not need a HTML page, as it will only be interacted with in command line. Its service type should be ClusterIP. Write the YAML file, and deploy your server to your cluster.



## Backend server:

### Create the python script:

The backend server accepts **GET** requests, with in query parameters a "password" value. When this password is equal to the string that the script waits for, it will send back a specific string which will be the flag for the attack success, and also the IP address of the requester. Write the python script and test it in local.

### YAML file parameters:

This server should only be availbale from inside the cluster, its service type should be ClusterIP. Write the YAML file, and deploy your backend server to your cluster.

## Network rules:

As of now, you should have deployed a frontend service, a middle-end service, and a backend service. However, right now the frontend service can access your backend service. Technically, if you added a NodePort service for your backend, it would even be reachable from outside. This is not a wanted behavior, and to force the attacker to do lateral movement, we will use Calico network rules so that backend service can only be reached from middle-end service.

## To go further:

<details> 
  <summary>Installing Metallb</summary> 

In order to 

</details>  

<details> 
  <summary>Using a Dockerfile</summary> 

In order to 

</details>  