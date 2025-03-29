# Créneaux projet :


## Session 1 : Création du cluster (3 heures)
- Installation de Vagrant et des outils de virtualisation
- Configuration des machines à l'aide de la Vagrantfile (pré-remplie)
- A l'aide de Vagrant, création et provisioning des machines du cluster (1
  master et 2 workers)
- Initialisation du control-plane
- Installation de calico
- Ajout des worker nodes
- Vérification du fonctionnement du cluster, et que les machines ont accès à
  internet

Pour aller plus loin : 
- Création d'un cluster Highly Available

## Session 2 : Déployement de l'applicatif vulnérable (3 heures)
- Création d'un script python pour un serveur python vulnérable avec page HTML
- Création d'un script pour un serveur python vulnérable
- Création d'un script pour le serveur cible 
- Création d'un fichier yaml pour créer des "deployment" kubernetes faisant tourner ces serveurs python (un déployement par type de serveurs devra être créé)
- Création des fichiers yaml pour créer les services correspondant aux deployments
- Création du fichiers yaml pour les règles réseau Calico qui forcent le lateral movement
-  Déployement et test des serveurs sans les règles réseau
- Ajout des règles réseau et test

Pour aller plus loin : 
- Déployer metallb pour faire du load-balancing sur le serveur frontend

Pour aller beaucoup plus loin : 
- Déployer une base de donnée non protégée à la place du serveur cible
- Déployer de vrais systèmes applicatifs

## Session 3 : Attaque sur le système (3 heures)
- Regarder comment utiliser la commande netcat : utilisation entre deux terminaux (Ressource : https://gabb4r.gitbook.io/oscp-notes/shell/bind-and-reverse-shell)
- Essayer de chaîner entre 3 terminaux
- Attaquer le frontend applicatifs déployé dans la session précédente pour obtenir un reverse shell avec la commande netcat et le serveur html vulnérable
- Configurer l'accès à Internet depuis ce reverse shell pour installer des librairies (curl et ou nmap)
- Identifier __côté attaquant__ les adresses IP accessibles pour la suite de l'attaque
- Attaquer une des adresses trouvées et obtenir un reverse shell dans le serveur vulnérable sans page HTML
- Ecrire un script python permettant de contacter le serveur sensible et récuperer la donnée, et l'installer sur le serveur sensible sans HTML
- Récupérer la preuve de succès de l'attaque en contactant le serveur sensible et en récupérant la donnée cachée

Pour aller plus loin : 
- Dans un autre namespace, refaire la même configuration mais en ajoutant des serveurs vulnérables sans page HTML entre le début et la fin du chemin (par exemple serveur sensisble HTML &rarr; serveur sensible &rarr; serveur sensible &rarr; serveur cible) et configurer les règles réseaux
- Essayer d'attaquer à nouveau (il faudra faire des scripts pythons et les envoyer sur les serveurs pour pouvoir attquer les serveurs au milieu) car Internet n'est pas accesible sur ces serveurs

## Session 4 : Consolider et préparer l'évaluation (3 heures)
- S'assurer que le cluster fonctionne
- Vérifier le déployment des serveurs sensibles
- Vérifier l'utilisation de Netcat
- Vérifier la capacité à attaquer
- Préparer l'évaluation :
    - Préparer une démonstration de ce qui a été réalisé dans le cadre du projet
    - Préparer une présentation en quelques slides pour expliquer ce que vous avez fait et compris du projet, ainsi que des perspectives et/ou améliorations possibles

Pour aller plus loin : 
- Faire le "Pour aller plus loin" de la session 3
- Essayer d'automatiser une partie de l'attaque

## Session 5 : Evaluation (3 heures)
- Passage de groupe en groupe pour voir la démonstration et les slides (durée de présentation à déterminer)
- Les éléments "Pour aller plus loin" rapporte des points bonus
