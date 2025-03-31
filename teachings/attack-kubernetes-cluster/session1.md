# Session 1

The goal of this session is to create the Kubernetes cluster.

## Installing Vagrant: 

First, we begin by installing the packages needed for virtualization:

```bash
sudo apt-get purge vagrant-libvirt

sudo apt-mark hold vagrant-libvirt

sudo apt-get update && sudo apt-get install -y qemu-system libvirt-daemon-system ebtables libguestfs-tools ruby-fog-libvirt

sudo apt install libvirt-dev

sudo apt install libvirt-daemon

sudo apt install virt-manager
```

Then, we add the user to the groups which are required to use the virtualization software (change **&lt;your_user&gt;** by your username):
```bash
sudo usermod -a -G libvirt-qemu <your_user>
sudo usermod -a -G libvirt <your_user>
```
You need to **log out of your session and log in again** in order for these changes to be taken into account. After this is done, you can install vagrant.
First add the repository:
```bash
wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
```
Install vagrant:
```bash
sudo apt update && sudo apt install vagrant
```
Install the needed vagrant plugin:
```bash
vagrant plugin install vagrant-libvirt
```

## Creating a cluster:

First, create a folder which will be your workspace for the project:
```bash
cd ~
mkdir lm-project
cd lm-project
```

Then, download the [zip file](resources/kub.zip) and unzip it in the lm-project (if it is in a folder, don't forget to move into this folder with your terminal).  

Then, you can launch the virtual machines that will belong to the cluster by running:

```bash
vagrant up
```

The `vagrant up` command should have created three virtual machines: 
- master1: this will be the master node of your Kubernetes cluster, which you will use to configure the cluster,
- worker1: this is one of the two worker machines which will run the applications and microservices of your cluster,
- worker2: this is the second worker machine, which will run the applications and microservices of your cluster.


After the installation succeeded, the cluster needs to be initialized. Vagrant allows an easy way to connect to the virtual machines, using the command `vagrant ssh <vm_name>`, where **&lt;vm_name>** is either master1, worker1, or worker2. To initialize the cluster, first connect to the master node using:
```bash
vagrant ssh master1
```
Then, run the kubeadm command to initialize the cluster:
```bash
sudo kubeadm init --pod-network-cidr=192.168.0.0/16
```
Once the cluster successfully initialised, **copy the commands** that are given in the terminal to have the worker nodes join the cluster, and then connect to each worker node and paste the command.  

Your cluster should now be partly initialized !

Now, you need to install a pod network add-on to be able to make microservices available. On the master node, first activate `kubectl` by pasting the following commands:
```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

Then, still in master node, install calico pod network add-on:

```bash
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.29.2/manifests/tigera-operator.yaml

kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.29.2/manifests/custom-resources.yaml
```

You should now have a working Kubernetes cluster! In order to test it, try deploying a sample app and accessing it from your web browser. You can follow this [tutorial](https://kubernetes.io/docs/tutorials/kubernetes-basics/deploy-app/deploy-intro/) to deploy a sample app, and this [tutorial](https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-intro/) to be able to access it from your browser.

## To go further:

<details> 
  <summary>Creating a highly available cluster</summary> 

In order to create a highly available cluster, you need to have at least three master nodes in your cluster. You cloud directly add nodes to your previous cluster, but in order to prevent any accident (and for ease of use), you will instead create a new cluster. Download the following [zip](resources/kub-ha.zip).

Unzip the new zip file, place your terminal in the corresponding folder, and follow the same steps as previously with a twist: the command to initialize cluster is now:

```bash
sudo kubeadm init --pod-network-cidr=192.168.0.0/16 --control-plane-endpoint "10.0.3.254:6443" --upload-certs
```

You should now be given two commands to join the cluster, one for the master nodes, and the other for the worker nodes.

Once all nodes have properly joined the cluster, you can continue in the same way as before.

</details>