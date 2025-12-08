
// part 1
//1
let str ="123";
console.log(+str+7);
//2
function checkFalseValue(value){
    if(!value){
        return "InValid";
    }   
    return "Valid!";
}
console.log(checkFalseValue(0));
//3
for(let i=0;i<=10;i++){
    if(i%2==0){
        continue;
    }
    console.log(i);
}
//4
let arr=[1,2,3,4,5];
function getEvenNumbers(arr) {
    return arr.filter(num => num % 2 === 0);
}
console.log(getEvenNumbers(arr));  
//5
let arr1=[1,2,3];
let arr2=[4,5,6];
let mergedArray=[...arr1,...arr2];
console.log(mergedArray);

//6
let day = 2;
switch(day){
    case 1:
        console.log(1," = Sunday");
        break;
    case 2:
        console.log(2,"= Monday");
        break;  
    case 3:
        console.log(3, "= Tuesday");
        break;
    case 4:
        console.log(4," = Wednesday");
        break;
    case 5:
        console.log(5," = Thursday");
        break;
    case 6:
        console.log(6," = Friday");
        break;
    case 7:
        console.log(7," = Saturday");
        break;
    default:
        console.log("Invalid day");
}
//7
let str2=["a","ab","abc"];
let lengths=str2.map(s=>s.length);
console.log(lengths);
//8
function checkValue(num){
   if(num%3===0 && num%5===0){
     return "Divisible by both";
   }
   return "Not Divisible by both";
}
console.log(checkValue(15));
//9
 const square = base => base * base;
console.log(square(5));
//10
function formatObject({name,age}){
    return ` ${name} is ${age} years old.`;
}

let obj={
    name:"John",
    age:25,
}
console.log(formatObject(obj));
//11
let total=0;
function sum (...numbers){
    for(let num of numbers){
        total+=num;
    }   
    return  total
}
console.log(sum(1,2,3,4,5));
//12
function myPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Success");
            reject("Failed");
        }, 3000);
    });
}
myPromise()
    .then(message => {
        console.log(message);
    })
    .catch(error => {
        console.log(error);
    });
//13
let max=0;
function findMax(...numbers){
    for(let num of numbers){
        if(num>max){
            max=num;
        }
        num++;
    }
    return max; 
}
console.log(findMax(1,3,7,2,4));
//14
let person={name:"John",age:25};
function getKeys(obj){
    const keys=[];
    for(let key in obj){
      keys.push(key)
    }
    return keys;
}
console.log( getKeys(person));
//15
let str3="The quick brown fox";
function splitString(str){
    return str.split(" ");
}
console.log(splitString(str3));

// part 2
/*
1-What is the difference between forEach and for...of? When would you use each?
forEach----> just array methode  no break/continue
for...of---->works on any iterable
[1,2,3].forEach(n => console.log(n));
for (const n of [1,2,3]) console.log(n);

2-What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples.
hoisting:var and functions are moved to Top
console.log(x); // undefined
var x = 5;
=
var x;
console.log(x); // undefined
 x = 5;

TDZ (Temporal Dead Zone) --> let/const cannot be accessed before declaration
console.log(y); // ReferenceError
let y = 10;

3-What are the main differences between == and ===?
 == ---> compare value
 === ---> compare value&type
 5 == "5";  // true
5 === "5"; // false

4. Explain how try-catch works and why it is important in async operations.
try-catch ---->catches errors to prevent program crash
Important in async operations to handle errors in promises or await
 //try/catch
 function divide(a, b) {
  try {
    if (b === 0) throw "Cannot divide by zero!";
    console.log(a / b);
  } catch (e) {
    console.log("Error:", e);
  }
}
divide(10, 0);

async function test() {
  try {
    await Promise.reject("Something went wrong!");
  } catch (e) {
    console.log("Async Error:", e);
  }
}

test();

5-What’s the difference between type conversion and coercion? Provide examples of each
conversion --->Explicit
converts types by functions
Number("5"); // 5
String(123); // "123"

coercion ---->Implicit
 converts types by JS does it automatically during evaluation 
 "5" + 1; // "51"  (string)
"5" - 1; // 4     (number)

*/
//Part 3
/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
// closure
var createCounter = function(init) {
    let count=init
    return {
        increment : function(){
            count ++;
            return count;
        },
        decrement : function(){
            count --;
            return count;
        },
        reset : function(){
            count = init;
            return count;
        }
    }
    
};


/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */