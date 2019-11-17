# Lecture 6

## Arrays of Objects

```c++
struct vec {
    int x, y;
    Vec(int x, int y);
};

Vec *vp = new Vec[10]
Vec moreVecs[10];
```

This is not allowed... Why?

- Can't initialize array items - no default ctor
- They want to call the default ctor on each item

Options:

1. Provide a default ctor
2. For stack arrays: `Vec moreVecs[3] = {{0,0}, {1,3}, {2,4}};`
3. For heap arrays: -array of ptrs:

```c++
Vec **vp = new Vec*[5];
vp[0] = new Vec {0,0};
vp[1] = new Vec {1,3};
...
for (int i = 0; i < 5; ++i) {
	delete vp[i];
}

delete []vp;
```

## Const Objects

`int f(const Vec &v){...}`

`const` objects arise often, especially as fn parameters

What is a const object? - can't change fields

Can we call methods on a const object?

**Issue:** the method may modify fields, violate const

**Answer:** Yes, we can call methods that promise not to modify any fields

e.g.

```c++
struct Student{
	...
	float grade() const; <- can't modify fields
};
```

Compiler checks that const methods don't modify fields
Only const methods can be called on const objects

Now consider: want to collect usage statistics on student objects

```c++
struct Student {
	...
	int numMethodCalls = 0;
	float grade () const {
		++numMethodCalls;
		return...;
	}
};
```

- Now we can't call grade on const objects
- But mutating numMethodCalls affects only the PHYSICAL constness of Student objs, not the LOGICAL constness.

We want to be able to update numMethodCalls, even if the object is const - so we declare the field mutable

```c++
struct Student {
	...
    mutable int numMethodCalls;
    float grade () const {
		++numMethodCalls;
        return ...;
    }
};
```

Mutable fields can be changed, even if the object is `const`

## Static Fields & Methods

`numMethodCalls` tracked the # of times a method was called on a PARTICULAR object. What if we want to track # of times a method is called...

- over all Student objects?
- track how many Students are created?

Static members - associated with the class itself, not with any specific instance (object)

**STEP 1:** .h file

```c++
struct Student {
    ...
    static int numInstances;
    Student (int assns, int mt, int final):assns{assns}, ... {
        ++numInstances;
    }
};
```

**STEP 2**: .cc file:

```c++
int Student::numInstances = 0;
```

static fields must be defined external to the class.

static member fns:

- don't depend on the specific instance
- can only access static fields

```c++
struct Student {
    ...
    static int numInstances;
    ...
    static void printNumInstances() {
        cout << numInstances << endl;
    }
};

Student billy{60, 70, 80};
Student jane{70, 80, 90};
Student::printNumInstances(); //2
```

## Invariants + Encapsulation

Consider:

```c++
struct Node {
	int data;
	Node *next;
	Node (int data, Node *next): data{data},next{next} {}
	...
 	~Node(){delete next;}
};

Node n1{1, new Node{2, nullptr}};
Node n2{3, nullptr};
Node n3{4, &n2}
```

What happens when these go out of scope?

`n1`- dtor runs, entire list is deleted,
`n2`, `n3` - `n3`'s dtor attempts to delete `n2`, but `n2` is on the stack, not on the heap! Undefined behaviour.

`Class Node` relies on an assumption for its proper operation: next is either `nullptr`, or was allocated by `new`.

This is an **invariant** - statement that holds true - that `next` is either `nullptr` or was allocated by `new` - upon which `Node` relies

But we can't guarantee this invariant - can't trust the user to use `Node` properly

Right now we can't enforce any invariants, because the user can interfere with our data

e.g. a stack Invariant

- last item pushed is the first item popped
- but not if the client can rearrange the underlying data

It's hard to reason about programs if we can't rely on invariants.

To enforce invariants: introduce **encapsulation**!

- want clients to treat objects as black boxes - capsules
- implementation details are sealed away
- can only interact via provided methods
- creates an abstraction, regains control over objs

e.g.

```c++
struct Vec {
	Vec(int x, int y); // also public
  private: // private - can't be accessed outside the struct
	int x, y;
  public: // anyone can access
	Vec operator+(const Vec &other);
    ...
};
```

Default visibility in `structs`: public

In general: want fields to be private; only methods should be public.

So it's better to have default visibility = private.

Solution: switch from `struct` to `class`.

```c++
class Vec {
        int x, y;
    public:
        Vec (int x, int y);
        Vec operator+(const Vec &other);
};
```

Difference between class and struct is default visibility:

- `struct`: public
- `class` private

Fix the linked list class:

`list.h:`

```c++
class List {
	struct Node; // private Nested class, only accessible within class List
 	Node *theList = nullptr;
  public:
	void addToFront(int n);
	int ith(int i) const;
	~List();
	...
};
```

`list.cc`

```c++
#include "list.h"

struct List::Node { // Nested class

int data;
	Node *next;
	Node (int data, Node *next): ... {}
	~Node(){delete next;}
	...
};

void List::addToFront(int n){
	theList = new Node{n, theList};
}

int List::ith(int i) const{
	Node *cur = theList;
	for (int n = 0, n <i && cur; ++n, cur = cur->next);
	return cur->data;
}
```

Only `List` can create/manipulate `Node` objects.

We can now guarantee the invariant that next is always either `nullptr` or allocated by `new`

But:

- Now we can't traverse the list from Node to Node as we would a linked list.
- Repeatedly calling ith to access the whole list: $O(n^2)$ time. \* But we can't expose the nodes or we lose encapsulation

## SE Topic: Design Patterns

- Certain programming problems arise frequently
- Keep track of good solutions to these problems, use them in similar situations

**Design Pattern:** If you have _this_ situation, _this_ technique might solve it.

Sol'n: Iterator Pattern

Create a class that manages access to nodes

- abstraction of a pointer
- walk the list without exposing the actual ptrs

```c++
class List {
	struct Node;
	Node *theList = nullptr;
  public:
	class Iterator {
	Node *p;
	  public:
		explicit Iterator (node *p):p{p}{}
		int &operator*() {return p->data;} // why a reference? this does not return
										   // a copy of the field, but the field
										   // itself! if you do *it = ______, it
										   // actually changes!
		Iterator &operator++() {p = p->next; return *this;}
		bool operator==(const Iterator &other) {return p==other.p;}
		bool operator!=(const Iterator &other) {return !(p==other.p);}
	};
	Iterator begin() {return Iterator{theList};}
	Iterator end() {return Iterator{nullptr};}
	...
};
```

Client:

```c++
int main() {
	List l;
	l.addToFront(1);
	l.addToFront(2);
	l.addToFront(3);
	for(List::Iterator it=l.begin(); it != l.end(); ++it){
		cout << *it << endl;
	}
}
```

**Shortcut:** automatic type deduction:

```c++
auto x = y;` // automatically gives x the same type as y

for (auto it=l.begin(); it!=l.end(); ++it) {
	cout << *it << endl;
}
```

**Shortercut:** range based forloop:

```c++
for (auto n : l){
	cout << n << endl;
}
```

Available for any class with:

- methods `begin()` and `end()` that produce iterators
- iterator must support `!=`, unary `*`, prefix `++`
- `n` is a copy of the list item

If you want to modify the list elements (or save copying)

```c++
for (auto &n : l) {
    ++n;
}
```

We will see iterators again later.

## Encapsulation Continued

List client can create iterators directly:

`auto it = List::Iterator{nullptr};`

This violates encapsulation: - client should be using `begin()`/`end()`

We could:

- make `Iterator`'s ctor private
  - then the client can't call `List::Iterator{...};`
  - but then neither can `List`

Sol'n:

- give `List` privileged access to `Iterator`
- make it a `friend`:

```c++
class List {
	...
  public:
	class Iterator {
		Node *p;
		explicit Iterator(Node *p);
	  public:
		...
		friend class List; // List has access to all members of Iterator (you
						   // only allow friends access to your private parts ;) )
	};
 	...
};
```

Now list can still create iterators, but client can only create Iterators by calling the begin/end.

### Programming/Life advice with Brad

- You want as little friends as possible.
- Friends are not a good thing.
- If you want to make a friend, be sure that you want to do that.
- You only want to make friends with people who can do things for you.
- Give your classes as few friends as possible - weakens encapsulation.
- Once again - keep your fields private.

What if you want to give access to fields? Use accessor methods and mutator methods:

```c++
class Vec {
	int x, y;
  public:
	...
	int getX() const{return x;} <- accessor method
	void setY(int newY) {y = newY} <- mutator method
};
```

What about `operator<<`? -needs x and y, but can't be a member

- if `getX`, `getY` are defined, OK
- if not, make `operator<<` a `friend`function!

```c++
class Vec{
    ...
  public:
    ...
    friend std::ostream &operator<< (std::ostream &out, const Vec &v);
};
```

.cc:

```c++
ostream &operator<<(ostream &out, const Vec &v) {
    return out << v.x << ' ' << v.y;
}
```

## Tools Topic: make

Seprate compilation:

```bash
g++14 -c list.cc
g++14 -c node.cc
g++14 -c iter.cc
g++14 -c main.cc
g++14 main.o iter.o node.o list.o -o myProgram
```

Why do we do this? so we don't have to recompile files that haven't changed

How do we keep track of what's changed and what hasn't?

Let Linux help you: with `make`.

Create a **Makefile**: says which files depend on other files

```bash
myProgram: main.o list.o node.o iter.o # myProgram depends on these
	g++-5 -std=c++14 main.o list.o node.o iter.o -o myProgram # how to build
															  # myProgram from these
	list.o: list.cc list.h node.h
		g++-5 -std=c++14 -c list.cc
	node.o: node.cc node.h list.h
		g++-5 -std=c++14 -c node.cc
	iter.o: iter.cc list.h node.h
		g++-5 -std=c++14 -c iter.cc
	main.cc list.h
		g++-5 -std=c++14 -c main.cc
```

Then, from the command line: `make`

- builds the whole project

Now change just `iter.cc`. What happens?

- compiles `iter.cc`
- relinks myProgram
- compiles part of the program

Command `make`: builds the first target (`myProgram`) in the Makefile

- What does `myProgram` depend on? `list.o`, `iter.o`, ...
  - recursively build these, if necessary
  - rebuild myProgram, if necessary.

Dependency graph:

![](/images/lectures/CS246/6-1.png)

If `iter.cc` changes:

- now newer than iter.o
- rebuild iter.o
- now iter.o newer than myProgram
- rebuild myProgram

Can rebuild specific targets: `make node.o`

Common practice: put a target `clean:` at the bottom of the Makefile to remove all binaries

```bash
... # Rest of the Makefile
.PHONY: clean
clean:
	rm *.o myprogram
```

To do a full rebuild:

```bash
make clean
make
```
