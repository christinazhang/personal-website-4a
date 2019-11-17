# Lecture 3

```c++
int main () {
	int i;
	while (true) {
		if (!(cin >> i)) {
			if (cin.eof()) break;
			cin.clear();
			cin.ignore();
		}
		else cout << i << endl;
	}
}
```

## Reading Strings

```c++
#include <iostream>
#include <string>
using namespace std;

int main () {
	string s;
	cin >> s;
	cout << s << endl;
}
```

- Skips leading whitespace
- Stops at whitespace - ie, it reads one word

What if we want the whitespace? `getline (cin, s)` reads from current position to next newline into s

`cout << 95 << endl; // prints 95`

What if we want it in hexadecimal?

`cout << hex << 95 << endl; // prints 5f`
Ints printed in hex

`cout << dec;`
Goes back to decimal

Other manipulators: see notes

`#include <iomanip>`

## Stream abstraction - applies to other sources of data

Files - read from a file instead of cin
`std::ifstream` - read from a file
`std::ofstream` - write to a file

**File access in C:**

```c
int main () {
	char s[256]; //Need to worry about string size
	FILE *file=fopen("myfile.txt", "r");
	while (true) {
		fscanf(file, "$255s", s);
		if (feof(file)) break;
		printf("$s\n", s);
	}
	fclose(file);
}
```

**File access in C++**

```c++
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main () {
	ifstream file {"myfile.txt"}; // Declaring and initializing the var opens the file
	string s;
	while (file >> s){
		cout << s << endl;
	}
}
```

**NOTICE:** strings grow as needed! No need for `s[256]`

File is closed when the `ifstream` var goes out of scope
Anything you can do with `cin`/`cout` you can do with an `ifstream`/`ofstream`

Example: strings - attach a stream to a string & read from/write to it

```c++
#include <sstream> // this is not a typo
std::istringstream
std::ostringstream
```

e.g.

```c++
int lo=______; hi=______;
ostringstream ss;
ss << "Enter a # between" << lo << "and" << hi;
string s = ss.str();

int n;
while (true) {
	cout << "Enter a #" << endl;
	string s;
	cin >> s;
	istringstream ss{s}; //init
	if (ss >> n) break;
	cout << "I said";
}
cout << "You entered" << n << endl;
```

**NOTICE:** no need for clear() or ignore()

Example revisited: read the numbers, skip non-numbers

```c++
int main () {
	string s;
	while (cin >> s) {
		istringstream ss{s};
		int n;
		if (ss >> n) cout << n << endl;
	}
}
```

## Strings

**In C:**

- array of char (char\* or char[]), terminated by \0
- you need to manage memory
- get more memory as strings get larger
- null terminator is easy to overwrite (results in endless corrupted file) :( :( :( :(

**C++:**

- grow as needed (no memory management)
- safer to manipulate

e.g.

`string s[] ="Hello"; // a string literal! this is C-style, so it's a character array.`

![](/images/lectures/CS246/3-1.png)

`string s = "Hello";// C++ style string`

### String Operations!

(_aka how C++ is better than C_)

**Equality:**
`s1 == s2`
`s1 != s2` (no more strcmp!)

**Comparison: **
`s1 <= s2` (NO MORE STRCMP!!)

**Length: **
`s.length()` (no more strlen!)

**Get individual chars:**
`s[0], s[1], s[2]` (same as C... a tie between C++ and C)

**Concatenation: **
`s3 = s1+s2;` (no more strcat!!)
`s3 += s4;`

## Default Function Params

```c++
void printWordsInFile(
	string name="suite.txt" // imagine that 99% of the time, they will input suite.txt

	ifstream file{name};
	string s;
	while (file >> s) cout << s << endl;
}

printWordsInFile("suite2.txt");
printWordsInFile(); // suite.txt (it gives the default value)
```

**NOTE:** default/optional parameters MUST BE LAST

## Overloading

**C:**

```c++
int negInt(int n) {return -n;}
bool negBool(bool b) {return !b;}
```

**C++:** Functions with different parameter lists can share the same name!

```c++
int neg(int n) {return -n;}
bool neg(bool b) {return !b;}
```

This is called overloading.

Compiler uses the # and type of the arguments to decide which neg is being called.

Then, the overloads must also differ in # or types of args.
i.e. they may not differ on just return type

We've seen this already:

- `+` for numbers, strings
- `>>`, `<<`

## Structs

**in C:**

```c
struct Node{
	int data;
	struct Node *next;
}; // LINKED LISTS :(
```

**in C++:**

```c++
struct Node{
	int data;
	Node *next; // don't need struct!
}; // DONT FORGET THE SEMICOLON :( :( :( :(
```

## Constants

```c++
const int maxGrade = 100; //must be initialized
```

Declare as many const as you can!

```c++
Node n1 = {5, nullptr}; // syntax for NULL ptr in C++
						// NEVER SAY NULL OR 0 EVER AGAIN
					    // NULL DOESN'T ACTUALLY EXIST AND NEITHER DOES SANTA
const Node n2 = n1; //immutable copy of n1, can't change fields
```

Why is this wrong?

```c++
struct Node {
	int data;
	Node next; // doesn't know the size
};
```

## Parameter Passing

Recall:

```c++
void inc(int n) {++n;}
...
int x = 5;
inc(x);
cout << x << endl; // prints 5
```

**Call-by-value:** inc gets a COPY of `x`, increments the copy. The original is unchanged.

```c++
void inc(int *n) {(*n)++;}
...
int x = 5;
inc(&x); // copy's x's address, inc changes data at that address
cout << x << endl; // 6
```

**Q:** Why do we say `cin x >>` and not `cin >> &x`?
**A:** C++ has another ptr-like type: references

## References

### **APPARENTLY THE MOST IMPORTANT THING IN THIS COURSE IF YOU WANT TO PASS YOU HAVE TO UNDERSTAND THIS**

```c++
int y = 10;
int &z = y; // z is an lvalue reference to int
			// like a constant ptr
			// similar to int *const z = &y;
```

References are like constant ptrs with automatic dereferencing

`z = 12;` (NOT `*z = 12`)

Now `y == 12`.

`int *p = &z;`
If you take the address of `z`, you get `y`'s address.

In all cases, `z` behaves exactly like `y`. In many ways, `z` is `y`.
`z` is an alias ("another name") for `y`.

### Things you can't do with lvalue references:

1. leave them uninitialized
   e.g. `int &x; // NO`
   must be initialized to something that has an address (an lvalue), since references are pointers.
   e.g. `int &x = 3; // NO`
   e.g. `int &x = y + z // NO THIS IS AN EXPRESSION`
   e.g. `int &x = y // OK`

2. create a ptr to a reference
   e.g. `int &*x; // NO`
   reference to pointers: ok
   e.g. `int *&x = ______ //OK`
   Remember to read them backwards! "x is a reference to a pointer to an int"

3. create a reference to a reference
   e.g. `int &&r; // this means something different (more on this later)`

4. create an array of references
   e.g. `int &r[3] = {n,n,n}; // NO`

### What CAN you do?

Pass them as function parameters:

```c++
void inc(int &n) {++n;} // &n is a const ptr to the arg, changes to n affect -x

int x = 5;
inc(x);
cout << x << endl; // 6
```

Why does `cin >> x` work? -takes x by reference.

```c++
istream &operator >> (istream &in, int &data);

int f(int n) {...} // ~*~*pass-by-value*~*~ copies the the argument.
```

If the argument is big, copying is expensive.

e.g.

```c++
struct reallyBig {...};
	int f(ReallyBig rb) {...} // copy - slow
	int g(ReallyBig &rb) {...} // alias - fast
		but this could change rb in the caller.

int h(const ReallyBig &rb) {...} // fast - no copy. parameter cannot be changed
```

**Advice:** we prefer pass-by-const-ref over pass-by-value for anything larger than a pointer.
Unless the function needs to make a copy anyway, then maybe use pass by value.

Also:

```c++
int f(int &n) {...}

int g(const int &n){...}
```

```c++
f(5);
```

- doesn't compile because `5` doesn't have an address. can't initialize an lvalue ref `(n)` to a literal value.
- if `n` changes, can't change literal `5`.

```c++
g(5);
```

- Is okay!
- Compiler makes an exception because `n` cannot be changed.
- How? it makes a temporary location to hold the `5`, so the ref n has something to point at.

## Dynamic Memory Allocation

**C:**

```c
int *p = malloc(___*sizeof(int));
...
free(p);
```

THIS IS NOW FORBIDDEN IN C++ because Brad said so

**C++:** `new`/`delete`

- type aware, less error-prone
- e.g.

```c++
struct Node {
	int data;
	node *next;
}
Node *np = new Node;
```

| HEAP |     |
| ---- | --- |
| data | <-  |
| next |     |

| STACK |     |
| ----- | --- |
| np    | <-  |

- All local vars reside on the stack
- Vars deallocated when they go out of scope (stack is popped)
- Allocated memory resides on the heap
- Remains allocated until delete is called
- If you don't delete all allocated memory - memory leak! \* Program will eventually fail - incorrect program

```c++
Node *nArr = new Node[10];
delete [] nArr; // array form of delete

Node getMeANode() { //returns copy of local node, could be expensive
	Node n;
	return n;
}
```

return ptr(ref) instead?

```c++
Node *getMeANode() { // BAD - returns a ptr to stack-allocated data, which is dead on
					 // return. corrupts data :(
	Node n;
	return &n;
}
```

```c++
Node *getMeANode() { // OK - returns ptr to heap data. Still alive. But don't
					 // forget to delete it!
	return newNode;
}
```

## Operator Overloading

Give meanings to C++ operators for our own types.

**e.g.**

```c++
struct vec {
	int x,y;
};

vec operator+(const vec &v1, const vec &v2){
	vec v{v1.x + v2.x, v1.y + v2.y};
	return v;
}

vec operator*(const int k, const vec &v){
	return {k*v.x, k*v.y};
} // OK because compiler knows that you're returning a vec, based on the return type
  // this handles 2*v, not v*2

vec operator*(const vec &v, const int k){
	return k*v;
}
```
