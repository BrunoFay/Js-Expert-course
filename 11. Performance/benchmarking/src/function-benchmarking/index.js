import Benchmark from "benchmark";
import CartIdOld from "./cart-id-old.js";
import CartIdNew from "./cart-id-new.js";
import CartRmPropOld from "./cart-rm-prop-old.js";
import CartRmPropNew from "./cart-rm-prop-new.js";
import CartPriceOld from "./cart-price-old.js";
import CartPriceNew from "./cart-price-new.js";
import database from '../../database.js'

/*
  UUid vs Crypto -> UUID is faster
  suite

  .add('Cart#cartId-UUID', function () {
    new CartIdOld()
  })
  .add('Cart#cartId-Crypto', function () {
    new CartIdNew()
  })
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run({ async: true });
  */
  const suite = new Benchmark.Suite();

/*
  map + reduce vs for -> for is faster
const data ={
    products: [
      {
        id: 1,
        name: undefined,
        price: undefined,
        quantity: null,
        total: 10,
      },
      {
        id: 2,
        name: undefined,
        price: undefined,
        quantity: null,
        total: 130,
      },
    ]
  }
  suite
  .add('Cart#rmEmptyPropsMapReduce', function () {
    new CartRmPropOld(data)
  })
  .add('Cart#rmEmptyPropsFor', function () {
    new CartRmPropNew(data)
  })
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  }).run({ async: true }); */


  // map + reduce vs for -> for is faster 3x faster
  suite
  .add('Cart#calcPriceMapReduce', function () {
    new CartPriceOld(database)
  })
  .add('Cart#calcPricePropsFor', function () {
    new CartPriceNew(database)
  })
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  }).run({ async: true });
