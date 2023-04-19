<!-- Pour Pandoc
---
header-includes: |
  <title>Mise en forme automatique au format A4</title>
  <link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura.css" media="screen" />
  <link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura-dark.css" media="screen and (prefers-color-scheme: dark)" />
  <style>pre > code {white-space: pre-line;}</style>
--- -->

# Mise en forme automatique au format A4

Ce site (sur [Gitlab](https://forge.aeif.fr/eyssette/a4) ou sur [Github](https://github.com/eyssette/a4)) vous propose un outil pour créer automatiquement à partir d'un fichier en markdown une page HTML à imprimer en A4, avec :

1. Un calcul automatique de la taille de police optimale pour que le contenu du document tienne sur le nombre de pages choisi, sans dépassement.
2. La possibilité de choisir le nombre de pages, le nombre de colonnes, une impression en format paysage ou portrait
3. La possibilité de répéter plusieurs fois le même contenu sur les différentes pages ou colonnes
4. Un respect automatique des règles typographiques françaises sur les espaces insécables

## Quelques exemples

- [Impression sur une page](https://eyssette.forge.aeif.fr/a4/test-1page)
- [Impression sur 3 colonnes, avec répétition du même contenu](https://eyssette.forge.aeif.fr/a4/test-3colonnes-copies)
- [Impression sur 2 pages et 3 colonnes](https://eyssette.forge.aeif.fr/a4/test-2pages)


## Configuration du format de l'impression

Pour configurer l'impression, il faut ajouter un en-tête au début de votre document markdown.

Voici un exemple :

```yaml
---
pages: 1
colonnes: 3
paysage: true
copies: [1,2,3]
---
```

- `pages` et `colonnes` indiquent respectivement le nombre de pages et de colonnes
- pour une impression en format paysage, on met `paysage: true`
- pour recopier plusieurs fois le contenu du document (par exemple pour mettre deux fois le même contenu sur une page A4 pour ensuite découper sa page et distribuer du A5), il faut lister le nombre de copies ainsi : `copies: [1,2,3]` pour trois copies.

## Deux usages possibles

### Fonctionnement le plus simple : en ligne

Clonez ce dossier (sur [Gitlab](https://forge.aeif.fr/eyssette/a4) ou sur [Github](https://github.com/eyssette/a4)) et créez des fichiers markdown dans votre dossier cloné.
Ils seront automatiquement convertis et accessibles en ligne.

### Fonctionnement plus complexe : en local

Récupérez ce dossier (sur [Gitlab](https://forge.aeif.fr/eyssette/a4) ou sur [Github](https://github.com/eyssette/a4)) en local et ouvrez-le avec VSCode. Une tâche pour VSCode est définie dans le dossier .vscode afin d'automatiser la conversion du fichier markdown sur lequel vous travaillez.

Vous pouvez aussi utiliser le template pandoc, le filtre fr-nbsp.lua et le fichier CSS utilisé par défaut.

## Crédits

Cet outil est distribué gratuitement et sous licence libre.

Il dépend des outils libres suivants : [pandoc](https://pandoc.org/) et [fr-nbsp](https://github.com/InseeFrLab/pandoc-filter-fr-nbsp)
