# CABAS

CABAS est une application web de catalogue et de panier. Elle permet de rechercher et filtrer des produits, consulter leur fiche, gérer un panier local et se connecter pour accéder au formulaire de proposition de produit.

L’interface est construite avec React et TypeScript, et utilise React Router pour la navigation. Les données du catalogue et les opérations de connexion et de proposition de produit passent par une API configurable.

## Prérequis

- Node.js **20.19 ou supérieur**, ou **22.12 ou supérieur**.
- npm (fourni avec Node.js).

Le projet utilise npm et contient un `package-lock.json` pour installer les dépendances de façon reproductible.

## Installation

Depuis la racine du projet :

```bash
npm ci
```

Configurez ensuite l’URL de l’API dans un fichier `.env.local` à la racine du projet :

```dotenv
VITE_API_BASE_URL=https://dummyjson.com
```

`VITE_API_BASE_URL` est obligatoire. La valeur indiquée utilise l’API DummyJSON, dont les routes sont compatibles avec celles attendues par l’application. Remplacez-la par l’URL de votre API si nécessaire, sans slash final.

Lancez le serveur de développement :

```bash
npm run dev
```

Vite affiche dans le terminal l’adresse locale à ouvrir dans le navigateur.

## Scripts disponibles

| Commande          | Description                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| `npm run dev`     | Démarre le serveur Vite en mode développement.                                                 |
| `npm run build`   | Vérifie les projets TypeScript puis construit l’application pour la production dans `dist/`.   |
| `npm run lint`    | Analyse le projet avec ESLint.                                                                 |
| `npm run preview` | Sert localement le dernier build de production. Exécuter `npm run build` avant cette commande. |

## Variables d’environnement

| Variable            | Obligatoire | Description                                                                                                    |
| ------------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL` | Oui         | URL de base de l’API utilisée pour le catalogue, les fiches produits, la connexion et la création de produits. |

Les variables préfixées par `VITE_` sont intégrées au code côté navigateur. N’y placez aucun secret ni clé privée. Après toute modification du fichier d’environnement, redémarrez le serveur Vite.

## Fonctionnalités

- Catalogue avec recherche, filtre par catégorie et tri.
- Fiche détaillée d’un produit et ajout au panier.
- Panier avec modification des quantités et persistance locale via `localStorage`.
- Connexion et déconnexion.
- Accès protégé au formulaire de proposition de produit.
- Validation des champs du formulaire et retours de succès ou d’erreur.

Pour tester la connexion avec DummyJSON, le formulaire affiche les identifiants d’un compte de démonstration.

## Arborescence

```text
.
├── public/                 # Ressources statiques publiques
├── src/
│   ├── assets/             # Images et ressources importées
│   ├── components/         # Composants partagés de l’interface
│   ├── context/            # Contextes et providers d’authentification et de panier
│   ├── hooks/              # Hooks React réutilisables
│   ├── pages/              # Pages associées aux routes
│   ├── services/           # Appels à l’API
│   ├── styles/             # Styles globaux
│   ├── types/              # Types TypeScript partagés
│   ├── utils/              # Fonctions de catalogue, panier, prix et validation
│   ├── App.tsx             # Déclaration des routes
│   └── main.tsx            # Point d’entrée React
├── .env.local              # Configuration locale de l’API (à créer)
├── eslint.config.js        # Configuration ESLint
├── package.json            # Dépendances et scripts npm
├── package-lock.json       # Verrouillage des dépendances npm
├── tsconfig*.json          # Configuration TypeScript
└── vite.config.ts          # Configuration Vite
```

## Limites connues

- DummyJSON est une API de démonstration : la création d’un produit y est simulée et les modifications ne sont pas conservées durablement côté serveur.
- Le panier et la session de connexion sont conservés dans le `localStorage` du navigateur. Ils ne sont pas synchronisés entre appareils et peuvent être perdus si le stockage local est effacé ou indisponible.
- L’application dépend de la disponibilité de l’API configurée et d’un accès réseau pour charger les produits et effectuer les opérations d’authentification ou de proposition.
- Aucun script de test automatisé n’est défini pour le moment dans `package.json`.

## Utilisation de l'IA générative

L'IA générative a été utilisée pour aider à concevoir, écrire et corriger certaines parties complexes de l'application. Les propositions ont été intégrées et adaptées au projet. Les prompts ci-dessous sont des formulations représentatives du travail demandé.

- Read me faire avec l'IA "Fait moi le read me qui repond au critere (5.2)"
- CSS fait avec l'IA "Fait moi le css qui correcpond a la maquette (numero)"

| Partie concernée | Utilisation de l'IA | Prompt représentatif |
| --- | --- | --- |
| Chargement asynchrone dans `src/hooks/useFetch.ts` | Gestion des états de chargement, de succès et d'erreur, annulation des requêtes précédentes et possibilité de relancer le chargement. | « Crée un hook React `useFetch` générique qui reçoit une fonction de chargement avec `AbortSignal`, expose les données, l'état de chargement et les erreurs, annule la requête au démontage et permet de relancer l'appel. » |
| Validation dans `src/utils/validateProduct.ts` et formulaire dans `src/pages/NewProductPage.tsx` | Validation des champs, conversion des saisies en données API, affichage accessible des erreurs et gestion de l'envoi. | « Implémente un formulaire contrôlé de proposition de produit en TypeScript. Valide le titre, la catégorie, le prix, le stock, la description et les tags; affiche les erreurs après la sortie du champ ou une tentative d'envoi; associe les erreurs aux champs avec `aria-describedby` et envoie un objet conforme au type `NewProduct`. » |
| Panier dans `src/context/cartReducer.ts` et `src/context/CartProvider.tsx` | Mise à jour centralisée du panier, limitation des quantités au stock et persistance dans `localStorage`. | « Écris un reducer typé pour ajouter et supprimer des produits, modifier leur quantité sans dépasser le stock, et vider le panier. Persiste les changements dans `localStorage` et gère explicitement les erreurs de stockage. » |
| Accès protégé dans `src/components/ProtectedRoute.tsx` | Redirection vers la connexion lorsque l'utilisateur n'est pas authentifié, avec conservation de la page demandée. | « Avec React Router et un contexte d'authentification, protège une route : redirige les utilisateurs non connectés vers `/connexion` et conserve le chemin d'origine pour les y ramener après la connexion. » |

L'IA a également aidé à diagnostiquer et corriger des problèmes rencontrés pendant le développement, notamment la structure des routes, le branchement du bouton d'ajout au panier et des erreurs TypeScript/ESLint. Les prompts exacts utilisés lors de ces échanges ne sont pas nécessairement ceux reproduits ci-dessus.
