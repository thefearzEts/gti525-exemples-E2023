/*
Cet exemple montre comment construire une hiérarchie d'objets définis par une fonction constructeur, par l'enchaînement des prototypes. Se référer aux les notions théoriques décrites dans les acétates du cours.
*/

const Point = function (x, y) {
    this.x = x;
    this.y = y;
    /*
	Pourquoi vaudrait-il éviter cela, et plutôt définir la fonction 'area' via le prototype?
	this.area = function() {
		return 0;
    }
	*/
};

Point.prototype.area = function() {
	return 0;
}

Point.prototype.toString = function() {
    return this.x + "," + this.y;
};

console.log(Point);

const Circle = function(x, y, r) {
    Point.call(this, x, y);
    
    this.r = r;
	/*
	Pourquoi vaudrait-il éviter cela, et plutôt définir la fonction 'area' via le prototype?
    this.area = function() {
		return Math.PI * this.r * this.r;
    }
	*/
};

Circle.prototype = Object.create(Point.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.area = function() {
	return Math.PI * this.r * this.r;
}

Circle.prototype.toString = function() {
	//return this.x + "," + this.y + "," + this.r;
	// Invocation de la méthode parente
	return Point.prototype.toString.call(this) + "," + this.r
	// Ou:
	//return this.__proto__.__proto__.toString.call(this) + "," + this.r
}

const Ellipse = function(x, y, r1, r2) { 
	Circle.call(this, x, y, r1);
	this.r2 = r2;
	/*
	Pourquoi vaudrait-il éviter cela, et plutôt définir la fonction 'area' via le prototype?
	this.area = function() {
		return 3.1412 * this.r * this.r2;
	} 
	*/
};

Ellipse.prototype = Object.create(Circle.prototype);
Ellipse.prototype.constructor = Ellipse;

Ellipse.prototype.area = function() {
	return Math.PI * this.r * this.r2;
}

Ellipse.prototype.toString = function() {
	//return this.x + "," + this.y + ", " + this.r + "," + this.r2;
	// Invocation de la méthode parente
	return Circle.prototype.toString.call(this) + "," + this.r2
	// Ou:
	//return this.__proto__.__proto__.toString.call(this) + "," + this.r
} 

/*function iterateOverProperties(obj) {
	var e; var str = "{ ";
	var proto = Object.getPrototypeOf(obj);
	for (e in obj) {
		if ( ( obj.hasOwnProperty(e) ) 
		  && ( typeof(obj[e]) != "function") 
		  && (e in proto ) ) {
				str = str + e + " = " + obj[e] + " , ";
		} 
	}
	str = str + " } ";
	return str;
}*/

function iterateOverProperties(obj){

	var str ;
	for ( var e in obj){
		//console.log( obj[e] + " Nadir");
	  if( typeof(e) != "function" && obj.hasOwnProperty(e) && !obj.__proto__.hasOwnProperty(e)){
		console.log("Attribut " +  e);
		str +=  (" " + obj[e] + " ");
	  }

	}
	return str;
  }

  function iterateOverPropertiesv2(obj) {
    // Parcourir toutes les propriétés de l'objet, y compris celles héritées
    for (let key in obj) {
        // Vérifier si la propriété existe dans le prototype
        if (!obj.hasOwnProperty(key)) {
            continue; // Passer à la prochaine si elle n'a pas été surchargée
        }

        // Récupérer la valeur de la propriété héritée
        let inheritedValue = Object.getPrototypeOf(obj)[key];

        // Vérifier si la propriété est surchargée dans l'objet
        if (inheritedValue !== undefined && inheritedValue !== obj[key] && typeof obj[key] !== 'function') {
            console.log(`Propriété '${key}' est héritée et surchargée avec une nouvelle valeur.`);
        }
    }
}


let p = new Point(10, 20);
let c = new Circle(20, 30, 5);
let e = new Ellipse(5, 10, 5, 2);


//document.writeln( "Point p = " + p );
//document.writeln( "Aire de p = " + p.area() );

/*console.log( Object.getPrototypeOf(p) );
console.log( "p instanceof Point = " + (p instanceof Point) );
console.log( "p instanceof Object = " + (p instanceof Object) );

document.writeln( "Circle c = " + c );
document.writeln( "Aire de c = " + c.area() );
console.log( Object.getPrototypeOf(c) );
console.log( "p instanceof Circle = " + (p instanceof Circle) );
console.log( "c instanceof Point = " + (c instanceof Point) );


document.writeln( "Ellipse e = " + e );
document.writeln( "Aire de e = " + e.area() );
console.log( Object.getPrototypeOf(e) );
console.log( "e instanceof Ellipse = " + (e instanceof Ellipse) );
console.log( "e instanceof Circle = " + (e instanceof Circle) );
console.log( "e instanceof Point = " + (e instanceof Point) );

delete e.area;  // En supprimant cette propriété, la fonction 'area' du cercle est invoquée.
document.writeln( "Aire de e (incorrecte!) = " + e.area() );*/

//console.log( "Propriétés de p provenant du prototype et surchargées dans l'objet lui-même " + iterateOverProperties(p) );
console.log( "Propriétés de c provenant du prototype et surchargées dans l'objet lui-même " + iterateOverProperties(c) );
//console.log( "Propriétés de e provenant du prototype et surchargées dans l'objet lui-même " + iterateOverProperties(e) );
