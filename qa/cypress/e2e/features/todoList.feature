Feature: Gestion des tâches
  Afin de gérer efficacement mes tâches quotidiennes
  En tant qu'utilisateur de la Todo List
  Je veux pouvoir ajouter, supprimer, compléter et réorganiser mes tâches

  Background:
    Given que l'application Todo List est ouverte

  # --- Ajout de tâches ---
  Scenario Outline: Ajouter une tâche valide
    When je saisis "<tâche>" dans le champ de saisie
    And j'utilise "<méthode>" pour valider
    Then la tâche "<tâche>" est affichée dans la liste
    And la barre de progression est mise à jour

  Examples:
    | tâche              | méthode   |
    | Acheter du café    | Enter    |
    | Payer les factures | bouton + |

Scenario: Focus sur le champ de saisie via Ctrl+N (Web)
  Description: Ce scénario est spécifique à l'environnement Web.
  When j'appuie sur la combinaison de touches "Ctrl+N"
  Then le focus est placé sur le champ de saisie
  And le texte indicatif reste visible jusqu'à saisie d'une tâche

Scenario: Vérifier l'absence d'indication Ctrl+N sur Mobile
  Description: Sur mobile, la combinaison Ctrl+N n'existe pas et ne doit pas être affichée à l'utilisateur
  Then le champ de saisie est accessible normalement
  And aucune indication Ctrl+N n'est affichée


  
Scenario Outline: Empêcher l’ajout d’une tâche invalide
  When je saisis "<entrée>" dans le champ de saisie
  And j'appuie sur "Enter"
  Then aucune tâche n'est ajoutée
  And la liste ne doit pas être affecté
  
Examples:
  | entrée                   |
  | (vide)                  |
  | (espaces uniquement)    |
  | une longue tâche |


  # --- Gestion des tâches ---
  Scenario: Marquer une tâche comme terminée
    Given qu'une tâche "Faire les courses" existe dans la liste
    When je coche la case de cette tâche
    Then le texte de la tâche "Faire les courses" est barré
    And un badge "Terminée" en vert s’affiche à côté
    And la barre de progression est mise à jour

  Scenario: Supprimer une tâche existante
    Given qu'une tâche "Nettoyer la voiture" existe dans la liste
    When je clique sur l'icône de suppression de cette tâche
    Then la tâche "Nettoyer la voiture" est supprimée de la liste
    And la barre de progression est mise à jour

  Scenario: Réorganiser les tâches par glisser-déposer
    Given que plusieurs tâches existent dans la liste
    When je déplace une tâche vers une nouvelle position
    Then les tâches se réorganisent correctement
    And l'ordre affiché correspond au nouvel ordre choisi

  #Cas négatif
 Scenario: Déplacement d'une tâche dans une zone interdite
  Given plusieurs tâches existent dans la liste
  When je fais glisser une tâche vers une zone interdite
  Then la tâche revient automatiquement à sa position initiale
  And elle ne reste pas en état "sélectionnée"


  # --- Suivi de progression ---
  Scenario: Mise à jour de la barre de progression
    Given que 3 tâches existent dans la liste
    When je marque 2 tâches comme terminées
    Then la barre de progression indique "2/3 terminées"
    And le pourcentage affiché correspond à environ 66%

  # --- Cas limites & sécurité ---
  Scenario: Empêcher l’injection XSS
    When je saisis "<script>alert(1)</script>" dans le champ de saisie
    And j’appuie sur "Enter"
    Then le texte est affiché tel quel dans la liste
    And aucun script n’est exécuté
