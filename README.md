# Movie App

Bienvenue dans l'application Movie App, créée par Mathieu Vidot. Cette application utilise l'API de The Movie Database (TMDB) pour afficher une liste de films, permettre des recherches et gérer une liste de favoris.

## Prérequis

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/mathieu-vdt/movies-react.git

2. Accédez ai répertoire du projet:
   ```bash
   cd movies-react

3. Installez les dépendances:
   ```bash
   npm install
   # ou avec Yarn
   yarn install

## Configuration de l'API TMDB (à prévoir)

1. Obtenez votre clé d'API TMDB en vous inscrivant sur TMDB Developer (gratuit).
2. Créez un fichier .env à la racine du projet et ajoutez votre clé d'API :
   ```env
      REACT_APP_TMDB_API_KEY=VOTRE_CLÉ_API

## Utilisation
1. Lancez l'application en mode développement
   ```bash
   npm run dev
   
2. Explorez la liste des films, effectuez des recherches et ajoutez des films à vos favoris.

## Fonctionnalités
   - Affichage de la liste des films populaires.
   - Recherche de films par titre.
   - Affichage des détails d'un film.
   - Ajout/Suppression de films aux favoris.
   - Authentification utilisateur via TMDB.

## Technologies utilisées
   - React
   - TypeScript
   -  TMDB API
   -  Redux pour la gestion de l'état
   -  React Router pour la navigation
