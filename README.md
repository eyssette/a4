<!-- ---
header-includes: |
  <title>Mise en forme automatique au format A4</title>
  <link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura.css" media="screen" />
  <link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura-dark.css" media="screen and (prefers-color-scheme: dark)" />
  <style>pre > code {white-space: pre-line;}a{color:darkorchid!important}</style>
--- -->

# A4 : mise en forme automatique au format A4

**A4** est un outil libre et gratuit, qui permet de mettre en forme automatiquement un texte en un format A4, prêt pour l'impression, avec :

1. Un calcul automatique de la taille de police optimale pour que le contenu du document tienne sur le nombre de pages choisi, sans dépassement.
2. La possibilité de choisir le nombre de pages, le nombre de colonnes, une impression en format paysage ou portrait
3. La possibilité de répéter plusieurs fois le même contenu sur les différentes pages ou colonnes
4. Un respect automatique des règles typographiques françaises sur les espaces insécables

## Configuration de l'impression

Pour configurer l’impression, il faut ajouter un en-tête au début de votre document markdown. Plusieurs paramètres sont disponibles.

Voici un exemple avec tous ces paramètres (on n'est pas obligé de tous les utiliser) :

```yaml
---
pages: 1
colonnes: 2
espacementColonnes: 20px
margesX: 20px
margesY: 20px
paysage: true
copies: 2
maths: true
---
```

- `pages` et `colonnes` indiquent respectivement le nombre de pages et de colonnes
- on peut définir l'espacement en pixels entre les colonnes : `espacementColonnes: 30px`
- `margesX` et `margesY` définissent les marges à gauche et à droite (pour `margesX`), en haut et en bas (pour `margesY`)
- pour une impression en format paysage, on met `paysage: true`
- pour recopier plusieurs fois le contenu du document (par exemple pour mettre deux fois le même contenu sur une page A4 pour ensuite découper sa page et distribuer du A5), il faut indiquer le nombre de copies ainsi : `copies: 2` pour deux copies.
- `maths: true` permet d'écrire des formules mathématiques avec la syntaxe `$FORMULE$` ou `$$FORMULE$$`. Si la formule est trop longue, la mise en page risque cependant d'être perturbée et il faudra la retoucher manuellement.


## Syntaxe markdown autorisée

Hormis la syntaxe ordinaire, on peut aussi utiliser des codes emojis (p.ex. `:smile:`), le surlignement (`==texte surligné==`) et les blocs admonitions (_info_, _warning_ et _success_) :

```
:::info
Attention, bloc spécial de texte
:::
```

On peut aussi utiliser des balises HTML et notamment la balise `<style></style>` à l'intérieur de son document afin de modifier la feuille de style CSS.

On peut insérer des images avec la syntaxe Markdown habituelle : `![](URL)` mais le redimensionnement des images ne se fera pas automatiquement. On peut cependant préciser les dimensions de l'image ainsi : `![](URL =largeur*hauteur)`, ou utiliser la balise `<style>` afin de faire des modifications en CSS pour imposer une taille maximum de l'image (par exemple : `<style>img {max-height:100px}</style>`).

On peut enfin attribuer à un bloc de texte une classe CSS qu'on définira dans une balise style ainsi : 

```
<style>.maClasse{color:red}</style>

Ça fonctionne ! {.maClasse}
```


## Autres usages possibles

On peut aussi utiliser A4 en local ou sur une forge grâce à [A4-Forge](https://eyssette.forge.apps.education.fr/a4-forge)

## Crédits

**A4** est distribué gratuitement et sous licence libre.

Il dépend des outils libres suivants : [Markdown-it](https://github.com/markdown-it/markdown-it), [Markdown-it-Emoji](https://github.com/markdown-it/markdown-it-emoji), [Markdown-it-Admonition](https://github.com/docarys/markdown-it-admonition)  et [js-yaml](https://github.com/nodeca/js-yaml).
