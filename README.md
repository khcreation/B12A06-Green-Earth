1. What is the difference between var, let, and const?

Ans:var, let, and const are all used to declare variables in JavaScript, but they differ in how they work.

.var is the old way. It's function-scoped, meaning it's available everywhere inside a function. It can also be reassigned and redeclared, which can sometimes cause unexpected behavior.

.let is the new and better way for variables that can change. It's block-scoped, meaning it's only available inside the specific block of code (like a for loop or if statement) where it's declared. You can reassign a let variable, but you can't redeclare it in the same scope.

. const is for variables that should never change. Like let, it is block-scoped. Once you assign a value to a const variable, you can't reassign it to something else. This makes your code safer and easier to understand.

---

2. What is the difference between map(), forEach(), and filter()?

Ans: map() Creates a new array by transforming each element of the original array,Returns a new array of the same length and forEach() Executes a function on each element of the array and does not return a new array.filter() is Creates a new array containing only the elements that pass a test (predicate function).

---

3. What are arrow functions in ES6?

Ans:Arrow functions are a shorter syntax for writing JavaScript functions, introduced in ES6.Arrow functions are great for short, concise functions, especially when using callbacks or array methods like map, filter, and forEach.

---

4. How does destructuring assignment work in ES6?

Ans:Destructuring allows you to extract values from arrays or objects and assign them to variables in a concise way and It reduces the need for multiple lines of code to access elements or properties.

---

5. Explain template literals in ES6. How are they different from string concatenation?

Ans:Template literals, introduced in ES6, are a modern way to create strings in JavaScript using backticks (``). They're better than traditional string concatenation because they allow you to embed expressions and variables directly inside the string with ${...}, and they make it easy to create multi-line strings without special characters like \n.

Unlike string concatenation, which uses the plus sign + to join different pieces of a string, template literals offer a cleaner and more readable syntax that combines the string and the variables in a single, simple format.
