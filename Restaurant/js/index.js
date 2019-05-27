
let restaurant=new Restaurant({
  cash:10000,
  seats:1
});

let cook=Cook.GetIntance('Joe');
let waiter=Waiter.GetIntance("Zoe");

restaurant.hire(cook);
restaurant.hire(waiter);

let customer1=new Customer("zoe");
let customer2=new Customer("Joe");
let customer3=new Customer("mike");
restaurant.comeOn(customer1);
restaurant.comeOn(customer2);
restaurant.comeOn(customer3);

restaurant.Start();