# QA – Application TodoList

Ce dépôt contient une application **Next.js TodoList** ainsi qu’une suite complète de tests **QA**.  
Le périmètre QA inclut un plan de tests en BDD (Gherkin), des résultats d’exécution manuelle, des rapports de bugs et des tests automatisés avec **Cypress** et le reporter **Mochawesome**.

## Installation
Cloner le dépôt et installer les dépendances :

```bash
git clone https://github.com/HANANBEN/CypressTodoListApp.git
cd todolist-app
npm install

```
Lancer l’application
Démarrer l’application en local :
```bash
npm run dev
```
L’application sera disponible sur : http://localhost:3000

Lancer les tests Cypress
Pour ouvrir l’interface graphique de Cypress :

```bash

npm run test:qa:headed
```
Pour exécuter Cypress en mode headless :

```bash
npm run test:qa:headless
```


Structure du projet
Pour garder le code organisé et maintenable, j'ai utilisé le **Page Object Model (POM)**. 


```bash
qa/                                # Documentation et suivi QA
├── docs/                         
│   ├── test-plan.feature          # Plan de test en BDD (scénarios Gherkin)
│   ├── manual-execution.xlsx      # Résultats d’exécution manuelle (PASS/FAIL)
│   └── bug-reports/               # Rapports de bugs avec captures et détails
│       
│     

cypress/                           # Racine des tests E2E automatisés
├── e2e/                           # Dossier principal des tests
│   ├── features/                  # Fichiers .feature ( NO Cucumber est utilisé)
│   │   └── todoList.feature
│   ├── page_objects/              # Pages du POM
│   │   ├── BasePage.js            # Classe de base : méthodes communes (openPage, waitForElement)
│   │   └── TodoListPage.js        # Page spécifique TodoList (addTask, deleteTask, etc.)
│   └── spec_definitions/          # Spécifications de tests Cypress (1 fichier = 1 fonctionnalité)
│    
│
├── fixtures/                      # Données de test (JSON, mock data)
│   └── tasks.json
│
├── reports/                       # Rapports générés automatiquement
│   ├── mocha_reports/             # Rapports Mochawesome (HTML + JSON)
│   ├── screenshots/               # Screenshots auto-générés en cas d’échec
│   └── videos/                    # Vidéos d’exécution des tests
│
└── support/                       # Fichiers de support et utilitaires
    ├── locators/                  # Sélecteurs centralisés (todoListlocator.js)
    │   └── todoListlocator.js
    ├── variables/                 # Variables globales (URLs, credentials, etc.)
    ├── commands.js                # Commandes personnalisées (Cypress.Commands.add)
    ├── e2e.js                     # Setup global (beforeEach, imports)
    └── utils.js                   # Fonctions utilitaires réutilisables

cypress.config.js                  # Configuration Cypress (baseUrl, reporter, etc.)

 ```

## Structure des fichiers de tests

Dans ce projet, j'ai choisi de regrouper tous les scénarios BDD dans **un seul fichier `.feature`**.  

La raison principale est que l'application **Todo List est relativement simple et peu volumineuse**, ce qui ne nécessite pas de séparation en plusieurs fichiers pour gérer différents modules ou fonctionnalités.  

Cette approche permet :
- Une meilleure lisibilité pour un projet de petite taille.
- Une maintenance facile sans multiplication de fichiers.
- Une exécution rapide des tests.

Rapports
Évidences manuelles (captures & vidéos) :
qa/docs/bug_reports/pictures/  de chaque bug .

Rapports de Bugs (avec références vers les captures/vidéos) :
qa/docs/bug-reports/

Rapports Mochawesome (HTML) : qa/cypress/reports/

Captures d’écran : qa/cypress/reports/screenshots

Vidéos : qa/cypress/report/videos

Les rapports sont générés automatiquement après l’exécution des tests Cypress en mode headless ou headed.