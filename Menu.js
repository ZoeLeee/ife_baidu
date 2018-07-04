const Dishes=["Fish","Fish1","Fish2","Fish3","Fish4"]

class Menu{
  constructor(name){
    this.name=name;
    this.owner=null;
  }
  static Factory(type){
    if(Menu[type]){
      return new Menu[type](type);
    }else 
    return new Menu(type);
  }
}
Menu.Fish=class Fish extends Menu{
  constructor(name){
    super(name);
    this.time=2;
    this.price=30;
  }
}
Menu.Fish1=class Fish1 extends Menu{
  constructor(name){
    super(name);
    this.time=1;
    this.price=40;
  }
}
Menu.Fish2=class Fish2 extends Menu{
  constructor(name){
    super(name);
    this.time=5;
    this.price=100;
  }
}
Menu.Fish3=class Fish3 extends Menu{
  constructor(name){
    super(name);
    this.time=6;
    this.price=70;
  }
}
Menu.Fish4=class Fish4 extends Menu{
  constructor(name){
    super(name);
    this.time=8;
    this.price=80;
  }
}
