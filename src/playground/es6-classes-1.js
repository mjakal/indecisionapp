class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }
  getGretting() {
    //return 'Hi ' + this.name;
    return `Hi my name is ${this.name}!`;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old.`;
  }
};

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  hasMajor() {
    return !!this.major;
  }
  getDescription() {
    let description = super.getDescription();

    if (this.hasMajor()) {
      description += ` Their major is ${this.major}.`;
    }

    return description;
  }
};

const ukrainka = new Person("Ukrainka", 21);
console.log(ukrainka.getGretting());
console.log(ukrainka.getDescription());

const teachersPet = new Student("Ukrainka", 21, "Domestic labour");
console.log(teachersPet.hasMajor());
console.log(teachersPet.getDescription());
