# Grille d'évaluation

À équilibrer avec ce qui a été vu en séance, mais qui n'a pas forcément fonctionné pendant la démonstration: 


## Cluster

| Critère | Excellent | Bien | Passable | Insuffisant |
| ------- | --------- | ---- | ---------| ----------- |
| Deployed a multi-VM cluster using Kubeadm | Highly available cluster with at least 3 master nodes, an admin LoadBalancer, and 2 workers (5) | Cluster with 1 master node and 2 worker nodes (4) | 1 node cluster or Minikube (2) | No cluster (0)|

## App

| Critère | Excellent | Bien | Passable | Insuffisant |
| ------- | --------- | ---- | ---------| ----------- |
| Frontend app | Load balanced app with HTML, executes commands (3) | NodePort app with HTML, executes commands (2) | HTML app, available but does not execute commands (1) | Not available (0) |
| Middle-end App | N/A | ClusterIP App, executes commands and returns data as JSON (1) | Cluster IP app, returns data as JSON, does not execute command  (0.5) | No app (0) |
| Backend App | N/A | Cluster IP app with key returns flag and IP address of requester in JSON (1) | Cluster IP app returns flag (0.5) | No app (0) |
| Network rules | N/A | Network rules fully deployed (1) | Network rules partially deployed (0.5) | No network rules (0) |

## Attack

| Critère | Excellent | Bien | Passable | Insuffisant |
| ------- | --------- | ---- | ---------| ----------- |
| Attacking the cluster | Attack the cluster using netcat commands with more complicated setup (3) | Attack the cluster while chaining reverse shells to reach backend (2) | Attack frontend and reach middleend (1) | Attack frontend only or no attack (0) |

## Slides

| Critère | Excellent | Bien | Passable | Insuffisant |
| ------- | --------- | ---- | ---------| ----------- |
| Slides on Kubernetes Cluster | N/A | Understood cluster architecture (HA and normal) and types of objects and how our configuration work (1)| Understood that there are worker and masters, and pods (0.5) | Did not understand (0) |
| Slides on Applications | N/A | Understood the app architecture we are simulating and compare to something that could exist (1) | Understood the chaining of the apps (0.5) | Did not understand (0) |
| Slides on Attack | N/A | Understood the reverse shells and the chaining of reverse shells to do lateral movement (1) | Understood the lateral movement (0.5) | Did not understand (0) |
| Q&A | N/A | All questions answered, show clear comprehension (3) | Some doubts on some subjects, cannot answer all question but some can be (1-2) | Shows a lack of understanding of the subject (0) |

## Bonus

| Critère | Excellent | Bien | Passable | Insuffisant |
| ------- | --------- | ---- | ---------| ----------- |
| Bonus: Dockerfile | Built with Dockerfile (1) | N/A | N/A | N/A |
| Bonus: Attack automation | Started attack automation (1) | N/A | N/A | N/A |
<!-- |  |  |  |  |  | -->