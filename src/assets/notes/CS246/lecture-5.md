# Lecture 5

```c++
struct Node {
    ...
    Node (const node &other):
    data {other.data},
    next{other.next? new Node{*other.next}:nullptr}
                            // recursively copies *other.next
    {}
    ...
};
```
The copy ctor is called:
1. when an object initializes another object
2. when an object is passed by value
3. when an object is returned by value

## Uniform Initialization

There are many ways to initialize things...
```c++
int x = 5;
string s = "Hello";
string s("Hello");
Student billy(70, 80, 90);
```
Brace brackets are (almost) always okay to use!
```c++
int x{5};
string s{"Hello"};
Student billy{70, 80, 90};
```    

Beware constructors that can take ONE argument:
```c++
struct Node {
    ...
    Node (int data):data{data},next{nullptr}{}
    ...
}
```    

Single argument ctors create implicit conversions

**e.g.**
```c++
Node n{4}; // but also...
Node n = 4; // implicit conversion from int to Node

int f(Node n) {...}
f(4); // works - 4 is implicitly converted to Node
```

Danger:
* accidentally pass an int to a fn expecting a Node
* compiler will not signal an error

Good idea: disable the implicit conversion - make the ctor* explicit*:
```c++
struct Node {
    ...
    explicit Node(int data):data{data},next{nullptr}{}
    ...
}

Node n{4}; // OK
Node n = 4; // Error!
f(4); // Error!

//What if we actually did want to pass 4 as a Node?
f(Node{4}); // OK
```    

## Destructors

When an object is destroyed (stack allocated: goes out of scope, heap allocated: deleted) a method called the **destructor (dtor)** runs.

1. dtor body runs
2. fields' dtor are invoked, if they are objects
3. space deallocated

Classes come w/ a dtor (empty body - just does step 2)

When do we need to write one? ... basically, when you have pointers
```c++
Node *np = new Node {1, new Node {2, new Node {3, nullptr}}};
```

If np goes out of scope: the pointer, (np) is reclaimed (stack-allocated) while entire list is leaked.

If we say `delete np`:
![](http://i.markdownnotes.com/2_XcWp3mq.PNG)
* runs *np's dtor - does nothing.
* first node is deleted, the rest are leaked.

Write a dtor to ensure that the whole list is freed.
```c++
struct Node {
    ...
    ~Node(){delete next;}
            // recursively calls dtor - frees the whole list
    ...
};
```
Now, `delete np;` frees the whole list.

## Copy Assignment Operator
### (AKA THINGS THAT PEOPLE GET WRONG ON MIDTERMS)

```c++
Student billy {60, 70, 80}
Student jane = billy; //copy ctor
Student anne; // default ctor
anne = billy; // copy, but not a construction... it's the COPY ASSIGNMENT OPERATOR
              // uses the compiler-supplied default
```              

May need to write your own:
```c++
struct Node {
    ...
    Node & operator= (const Node &other){
// [^^^^^]--so that cascading works (e.g. a=b=c=4)
        data = other.data;
        delete next; // our node already exists and may already have data
        next = other.next?new Node{*other.next}:nullptr;
        return *this;
    }
    ...
}; // THIS IS DANGEROUS.
```

Why is it dangerous? Consider:
```c++
Node n{1, new Node{2 new Node{3, nullptr}}};

n = n; // you deleted yourself!
       // ie, it deletes n and then tries to copy n to n
       // undefined behaviour
```

Similar cases:
```c++
*p = *q;
a[i] = a[j];
```

When writing operator `=`, ALWAYS be wary of self assignment.
```c++
struct Node {
    ...    
    Node & operator= (const Node &other) {
        if (this == &other) return *this;
        data = other.data;
        delete next;
        next = other.next?new Node{*other.next}:nullptr;
        return *this;
    }
};
```
if `new` fails, `next` points at deallocated data. the list is corrupted.

```c++
Node & operator= (const node &other) {
    if (this == &other) return *this;
    Node *tmp = next;
    next = other.next?new Node{*other.next}:nullptr;
    data = other.data;
    delete tmp;
    return *this;
} //if new fails, Node is in a valid state. original list is intact
```
Alternative: copy & swap idiom
```c++
#include <utility>

struct Node {
    ...
    void swap(Node &other) {
        using std::swap;
        swap(data, other.data);
        swap(next, other.next);
    }
    Node & operator= (const Node &other) {
        Node tmp = other; // tmp = copy of other
        swap(tmp); // me = copy of other, tmp = my old data
        return *this;
    } // tmp's dtor runs + destroys my old data.
};
```

## Rvalues + Rvalue references

**Recall:**
* an lvalue is anything with an address
* an lvalue reverence is like a `const` ptr with auto deref - always initialized to an lvalue

Consider:
```c++
Node n{1, new Node {2, nullptr}};
Node m = n; //copy ctor
Node m2;
m2 = n; // copy assignment operator

Node plusOne(Node n) {
  for (Node *p={&n}; p; p=p->next) {
      ++p->data;
  }
  return n;
}

Node m3 = plusOne(n); // copy ctor
```

`plusOne(n)`: What is "other"? - reference to what?
* compiler creates a temporary object to hold the result of plusOne
* other is a reference to this temporary
* copy ctor deep copies data from this temporary.

But the temporary is just going to be discarded anyway, as soon as the statement
`Node n3 = plusOne(n);` is done.

* wasteful to have to deep copy from the temp
* why copy when you can steal?? #lifelessonsfromCS
	* save the cost of a copy
* need to be able to tell whether other is a reference to a temporary object, or a standalone object

C++ - rvalue reference
* `Node &&` is a reference to a temporary object (an rvalue) of type Node

Version of the ctor that takes a `Node &&`:

```c++
struct Node {
    ...
    Node (Node && other) { // called a move ctor
        ...
    } //What should the move ctor do? steal others' data obvs.
};
```
```c++
struct Node {
    ...
    Node (Node && other):data{other.data},next{other.next} {
        other.next = nullptr;
    }
};
```    
Similarly:
```c++
Node m;
m = plusOne(n); // assignment from temporary
```

Move assignment operator.
```c++
struct Node {
    ...
    Node & operator= (Node && other) { // Steal other's data
        swap(other); // destroy my old data
        return *this;
    } //the temp will be destroyed + take our old data with it
};
```    

* If you don't define move ctor/move assignment, copy versions will be used.
* If the move operations are defined, they replace all calls to the copy ctor/copy assignment ctor when the argument is a temporary (rvalue).

## Copy/Move Elision
```c++
Vec makeAVec() {
    return {0,0}; //invokes basic ctor
}
Vec v = makeAVec(); // What runs? which ctor?
```
It's the basic ctor!

In some circumstances, the compiler is allowed to skip calling copy/move ctors (but doesn't have to).

In the example above: `makeAVec` writes its result({0,0}) directly into the space occupied by v in the caller, rather than copy it later.

**e.g.**
```c++
void doSomething(Vec v) { //pass-by-value copy ctor
	...
}

doSomething(makeAVec());
```
- result of `makeAVec` written direclty into the param.
- no copy

This is allowed, *even if* dropping ctor calls would change the behaviour of the program (e.g. if the ctors print something)

You are not expected to know exactly when copy/move elision is allowed - just that they're possible.

If you need all of the ctors to run, you can enter `g++14 -fno-elide-constructors .......` - but this can slow down your program considerably

In summary: **Rule of 5 (Big 5)**
If you need a custom version of any one of
* copy ctor
* copy assignment operator
* dtor
* move ctor
* move assignment operator

then you usually need a custom version of all 5.

**Note:** `operator=` is a member f'n, not a standalone f'n. when an operator is declared as a member f'n, `this` plays the role of the first argument.

**e.g.**
```c++
struct Vec {
	int x, y;
	...
	Vec operator+(const Vec &other) {
		return {x + other.x, y + other.y};
	}
	Vec operator*(const int k){
	return{x*k, y*k}; // Note: implements v*k
	}
};
```           

How do we implement k*v? You don't. It can't be a member function, first argument is not a Vec, so it must be external:
```
Vec operator*(const int k, const Vec &v){
	return v*k;
}
```

I/O Operators:
```
    struct Vec {
        ...
        ostream &operator << (ostream &out) {
            return out << x << ' ' << y;
            }
        }
    };
```

What's wrong with this? Makes `Vec` the LHS operand:
used as `v << cout;` which is bad

So define `<<`, `>>` as standalone.

Certain operators MUST be members. "Because they said so"
* operator=
* operator[]
* operator->
* operator()
* operator T (where T is a type)

## Separate Compilation for Classes

Node.h:
```c++
#includes and stuff

struct Node {
	int data;
	Node *next;
	explicit Node(int data, Node *next=nullptr);
	bool hasNext();
};

#endif
```

Node.cc
```c++
#include "Node.h"

Node::Node(int data, Node *next):data{data},next{next}}}
bool Node::hasNext() {return next!=nullptr;}
```

`::` - called the scope resolution operator
`Node::____` means `____` in the context of Node
`::` is like `.`, but LHS is a class or namespace, not an object.
