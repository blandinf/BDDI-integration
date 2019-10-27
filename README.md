## Instructions :

* npm install
* npm start

### Les + :

* Tous les sliders peuvent comprendre autant de modèles que désiré
* Nouveautés slider en auto -> au clique -> arrêt de l'auto
* Best-seller slider : Flèches pas affichés si pas de modèles restants

### Les - :

* Animations


### Décisions :

* margin-right équivalent pour chaque li sur le footer (La maquette ne comprend pas les mêmes écarts entre chaque)
* moins de 1024 : plus de fleches, uniquement swipe

* ex d'un model : (ajout de color dans hero)

    `{
        "title": "Nom du modèle",
        "specs": {
            "size": "L",
            "engine": "Mécanique",
            "color" : "Rouge Feu"
        },
        "stock": 3,
        "slug": "/model/0",
        "images": {
            "big": "bike1.png",
            "small": "bike1.png" 
        },
        "hero": {
            "active": true,
            "color": "#009f55"
        },
        "best": true,
        "news": true,
    },`


