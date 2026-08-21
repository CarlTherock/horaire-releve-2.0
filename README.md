# PWA Horaire Relève Windsor

Ce pack conserve votre `index.html` actuel et sa matrice d’attribution/règles. Remplacez seulement `manifest.json` et `sw.js` avec ceux-ci, puis ajoutez les fichiers d’intégration future.

## Installation GitHub

1. Garder votre `index.html` actuel à la racine.
2. Copier `manifest.json`, `sw.js`, les deux icônes et `ukg-adapter.js` à la racine.
3. Dans `index.html`, ajouter avant `</body>` :

```html
<script src="./api-config.js"></script>
<script src="./ukg-adapter.js"></script>
```

4. Copier `api-config.example.js` vers `api-config.js`.
5. Publier avec GitHub Pages.

## Intégration UKG future

Ne jamais placer un identifiant, un mot de passe, un jeton OAuth ou une clé UKG dans `index.html` ou dans une PWA statique. La PWA devra appeler un proxy sécurisé, par exemple une Azure Function, un service Microsoft ou un backend interne. Ce proxy s’authentifie à UKG, normalise les données et renvoie uniquement les quarts nécessaires.

Format conseillé du proxy :

```json
{
  "fetchedAt": "2026-08-20T23:00:00Z",
  "rows": [
    {"employeeId":"123","letter":"A","date":"2026-08-24","shift":"J","status":"present"}
  ]
}
```

La matrice locale demeure la source de décision. UKG devient une source de données réelles à comparer ou préremplir; il ne doit pas remplacer automatiquement les règles de comblement sans validation humaine.

## Prochaine étape technique

Créer un adaptateur de normalisation entre les codes UKG et vos codes actuels : `J`, `N`, `JO`, `EQ`, `VAC`, `CONGÉ`, `MALADIE`, `OFF`, `OT`. Ajouter ensuite un mode « Horaire réel UKG » et un mode « Simulation » séparés.
