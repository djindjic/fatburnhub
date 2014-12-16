export class Person {
  constructor({yearOfBirth: yearOfBirth, gender: gender, height: height, weight: weight}) {
  	this._yearOfBirth = yearOfBirth;
  	this._gender = gender;
  	this._height = height;
  	this._weight = weight;
  }

  set yearOfBirth(value) { this._yearOfBirth = value; }
  get yearOfBirth() { return this._yearOfBirth; }

  set gender(value) { this._gender = value; }
  get gender() { return this._gender; }

  set height(value) { this._height = value; }
  get height() { return this._height; }

  set weight(value) { this._weight = value; }
  get weight() { return this._weight; }
}