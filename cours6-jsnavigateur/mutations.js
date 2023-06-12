/*
Permet de modifier la couleur du texte (via la propriété style (CSS)) en la remplaçant/définissant à color, pour tous les noeuds de type tag, qui sont des descendants du noeud dont l'id est contents.
• Exemple: invoquer colorElements(“a”, “red”) remplacerait la couleur du texte en rouge pour tous les liens hypertextes (a) situés à l'intérieur du noeud (div) id=contents.
*/
function colorElements(tag, color) {
    const elements = document.getElementById("contents").getElementsByTagName(tag);
    for (let i=0; i<elements.length; i++) {
        const elt = elements[i];
        elt.style.color = color;
    }
}

/*
Permet d'observer les noeuds pour lesquels la couleur est modifiée pour prendre la valeur oldColor (mutations à la propriété style), qui sont descendants du noeud dont l'id=contents. Vous devez remplacer la couleur par newColor. Cette fonction doit être implémentée au moyen d'un observateur de mutations.
*/
function trapColorChanges(oldColor, newColor) {
    
}

window.onload = function() {

    
}
