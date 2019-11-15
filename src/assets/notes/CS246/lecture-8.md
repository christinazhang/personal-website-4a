# Lecture 8

## Destructor Revisited

```c++
class X {
	int *x;
public:
	X (int n): x{new int[n]} {}
	~x() {delete [] x;}
};
```

```c++
class Y: public X {
	int *y;
public:
	Y(int m, int n):x{n}, y{new int [m];}
	~Y() {delete [] y;}
};
```

What's the mistake?

Object destruction:

1) dtor body runs
2) fields are destructed
3) base class dtor
4) space is deallocated

Recall that inheritance is-a:

```c++
X *p = new Y{10, 20};
delete p;
```
This calls `~X`, but not `~Y`. So only `x`, but not `y` is freed.
The dtor was chosen based on the type of pointer, not on the type of object.

How can we ensure that deletion through a superclass ptr calls the subclass dtor?
Make the dtor *virtual!*

```c++
class X {
	int *x;
public:
	...
	virtual ~X()
};
```

**ALWAYS MAKE THE DTOR VIRTUAL IN CLASSES THAT ARE MEANT TO HAVE SUBCLASSES**
Even if the dtor doesn't do anything! You don't know what the subclass dtor is going to do.

If a class is *not* meant to have subclasses, declare it **`final`**.

```c++
class Y final: public X { // can't subclass this
	...
};
```

FYI: we can use `final` even if it's a variable name because it's a *contextual keyword*, so almost all occurrences of `final` will be considered a variable, except in this specific case.

## Pure Virtual Methods & Abstract Classes

```c++
class Student {
	...
public:
	virtual int fees();
};
```

2 Kinds of `Student`: Regular and Co-Op

```c++
class Regular:public Student {
	...
public:
	int fees() override; // regular students' fees
};

class CoOp:public Student {
	...
public:
	int fees() override; // coop students' fees
};
```

What should we put for `Student::fees`? Not sure - every student should be regular or co-op.
We can explicitly give `Student::fees` NO implementation

```c++
class Student {
	...
public:
	virtual int fees() = 0; // Method has no (*) implementation
							// called a pure virtual method
};
```

A class with a pure virtual method cannot be instantiated
* called an **abstract** class.
* purpose is to organize subclasses

`Student s;` Does not compile.
`Student *s = new Regular;` is okay!

Subclasses of an abstract class are also abstract, unless they implement all pure virtual methods.

Non-abstract classes - called **concrete**.

**UML:**
Virtual & pure virtual methods: *italics*
Abstract classes - italicize *class name.*
Static - underline.

## Templates

```c++
class List{
	struct Node;
	...
};

struct List::Node{
	int data;
	Node *next;
};
```

What if you want to store something else? Whole new class? OR **template** - class *parameterized by a type*

**Example:** Stack Template
```c++
template <typename T> class Stack {
	int size; cap;
	T *contents;
public:
	void push(T x) {...}
	T top() {...}
	void pop() {...}
};
```

**Example:** List Template
```c++
template <typename T> class List {
	struct Node {
		T data;
		Node *next;
	}
public:
	class Iterator {
		...
	public:
		T operator*{..}
		Iterator & operator++() {...}
		...
	};
	T ith (int i) {...}
	void addToFront (T n) {...}
};
```

**Client:**
```c++
List <int> l1;
List <List <int>> l2;

l1.addToFront(3);
l2.addToFront(l1);

for (List<int>::Iterator it = l1.begin(); it != l1.end(); ++it) {
	cout << *it << endl;
}

for (auto n: l1) {
	cout << n << endl;
}
```

Do not split templates up in the .h and .cc. There is no .cc at all for templates.

## The Standard Template Library (STL)
Large number of useful templates

**e.g.** dynamic length arrays: `vector`
```c++
#include <vector>
std::vector <int> v{4, 5}; // 4, 5
std::vector <int> w(4, 5); // 5, 5, 5, 5
```

`{4,5}` has a type - `std::initializer_list<int>`

```c++
v.emplace_back(6);
v.emplace_back(7); // 4, 5, 6, 7 - v will grow on its own
				   // it will clean itself up too! no delete/new
```

**e.g.** Looping over vectors:
```c++
for (int i = 0; i < v.size(); ++i) {
	cout << v[i] << endl;
}
```

**e.g** Iterator abstraction:
```c++
for(vector<int>::iterator it = v.begin(); it!=v.end(); ++i) {
	cout<< *it << endl;
}
```

or

``` c++
for(auto n:v) {
cout << n << endl;
}
```

**e.g.** Iterate in reverse:
```c++
for(vector<int>::reverseiterator it = v.rbegin() ; v != v.rend(); ++it) {
	cout << *it <<endl;
}
```
(or replace type with auto)

`v.pop_back()` removes last element

**e.g.** Use iterators to remove items from inside a vector
```c++
auto it = v.erase(v.begin()); // erases item 0
it = v.erase(v.begin() + 3); // erases item 3
							 // returns iterator to first item after erase
```

![](http://i.markdownnotes.com/2_F8CNz6C.PNG)

```c++
it = erase(it); // erases entire array
it = v.erase(v.end() - 1); // last item
```

```c++
v[i] // ith element
	 // unchecked - if you go out of bounds - undefined behaviour
v.at(i) // checked version of v[i]
		// what happens if you go out of bounds?
```

### Exceptions and Handlers
What should happen if you go out of bounds?

**Problem:**
* `vector`'s codes can detect the error, but doesn't know what to do about it.
* Client can respond, but can't detect the error.

**C Solution:**
* functions return a status code (like `scanf`), or set the global variable errno
* leads to awkward programming
* encourages programmers to ignore error checks

**C++ Solution**
* When an error condition arises, the function raises an **exception**
* What happens? By default, execution stops.
	* Strange baseball examples with Brad:
		* Usually you pass the baseball back and forth with your function
		* Sometimes the function will chuck the ball, aimed at your face
		* You duck and break a window
		* Sometimes people don't duck
			* Your other option is to catch it
			* And then you can say, "WHAT?" (`r.what()`)
* But we can write handlers to catch exns and deal with them

```c++
vector::at throws std::out_of_range
```

```c++
#include <stdexcept>
...
try {
	v.at(1000000);
}
catch (out_of_range) {
	cerr << "Range error";
}
```

```c++
void f() {throw out_of_range{"f"}}; // ctor call - construct an out_of_range object
void g() {f();}
void h() {g();)
int main() {
	try {
		h();
	}
	catch(out_of_range) {...}
}
```

`main` calls `h`
`h` calls `g`
`g` calls `f`
`f` throws `out_of_range`

* `g` has no handler for `out_of_range`
* Control goes back through the call chain (**unwinds** the stack) until a handler is found
	* in this case, all the way back to `main`, `main` handles the exn.
* If no handler found, program terminates.

A handler might execute part of the recovery - execute some corrective code and throw another exn.

```c++
try {...}
catch (SomeErrorType s) {
	...
	throw SomeOtherError {...};
}
```

or throw the same exn:

```c++
try {...}
catch (SomeErrorType s) {
	...
	throw;
}
```

`throw` vs .`throw s`
`throw` - actual type of s is retained
`throw s` - rethrows a exn of type `SomeErrorType`
`s` - may  have been a subtype of `SomeErrorType`

![](http://i.markdownnotes.com/2_9pDbzZ0.PNG)

A handler can act as a catch-all:
```c++
try {...}
catch (...) { // THIS TIME THE ... ACTUALLY MEANS "..." it means catch all exns :)
	...
}
```

You can throw anything you want
* You don't have to throw objects
* You can throw ints! (see exfib.cc, exfact.cc in the repository)

**e.g.** Define your own excn classes
```c++
class BadInput{};

try {
	int n;
	if (!(cin>>n)) throw BadInput{};
}
catch (badInput &b) { // catch by reference - avoids slicing the exception
	cerr << _____;
}
```

`exn std:: bad_alloc` - raised when `new` fails

## Design Patterns Continued

Guiding principle:
* program to the interface, not the implementation
* abstract base classes define the interface
	* work with ptrs to the abstract class & call their methods
	* concrete subclasses can be swapped in and out
		* abstraction over a variety of behaviours

**e.g.** Iterator Pattern
```c++
class List {
	...
public:
	class Iterator: public AbstractIterator {
		...
	};
...
};

class AbstractIterator {
	public:
		virtual int & operator*() = 0;
		virtual AbstractIterator & operator++() = 0;
		virtual bool operator !=(const AbstractIterator &other) = 0;
		virtual ~AbstractIterator();
};

class Set {
	...
public:
	class Iterator: public AbstractIterator {
		...
	};
	...
};
```

Then you can write code that operates over iterators:

```c++
void foreach(AbstractIterator &start, AbstractIterator &end, void (*f)(int)) {
	while (start != end) {
		f(*start);
		++start;
	}
} // Works over lists and sets! And anything else that provides an Iterator
  // that inherits from AbstractIterator
```

### Observer Pattern
Publish-subscribe model:
One class: publisher/subject - generates data
One or more subscriber/observer classes - react to the data

**e.g.**
publisher = spreadsheet cells
observers = graphs
When cells change, graphs update.

Can be many different kinds of observers
- Subject should not need to know all the details

**e.g.** Observer pattern

![](http://i.markdownnotes.com/2_VIfIuS4.PNG)

Sequence of method calls:
1) `Subject`'s state changes
2) `Subject::notifyObservers()` - calls each `Observer`'s notify
3) Each `Observer` calls `ConcreteSubject::getState` to query the state and react accordingly.

**e.g.** Horse races
Subject: publishes winners
Observers: bettors - declare victory when their horse wins

```c++
class Subject {
	vector <observer *> observers;
public:
	void attach(Observer *o) {observers.emplace_back(o);}
	void detach(Observer *o); // proof is left as an exercise to the reader
	void notifyObservers() {
		for (auto &ob: Observers) ob->notify();
	}
	virtual ~Subject() = 0; // must be implemented, even if pure virtual
};
```
