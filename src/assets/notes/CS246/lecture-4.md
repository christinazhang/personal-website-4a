# Lecture 4
## Overloading << and >>
e.g.
```c++
struct Grade {
	int theGrade;
};

ostream &operator << (ostream &out, const Grade &g) {
	out << g.theGrade << '%';
	return out;
}

istream &operator >> (istream &in, Grade &g) {
	in >> g.theGrade;
	if (g.theGrade < 0) g.theGrade = 0;
	if (g.theGrade > 100) g.theGrade = 100;
	return in;
}
```
## The Preprocessor
* Transforms the code before the compiler sees it
* `#______` - preprocessor directives, e.g. `#include`
* Including old C headers: new naming convention
    * e.g. Instead of `#include <stdio.h>` use `#include <cstdio>`

`#define VAR VALUE`
* sets a preprocessor variable
* then all occurrences of VAR in the rest of the source file are replaced by VALUE
    e.g.
	```
    #define MAX 10
    int x[MAX];        // transformed to int x[10]
    ```     
    THIS IS LAME. use `const` definition instead (brad why did you show us this)

* `#define FLAG` - sets the variable `FLAG`
	* value is the empty string

Defined `const`s are useful for conditional compilation

**e.g.**
```c++
#define IOS 1
#define BBOS 2
#define OS IOS (or BBOS)

#if OS == IOS
	short int publickey // Removed if OS != IOS
#elif OS == BBOS
	long long int publickey // Removed if OS != BBOS
#endif

    // The if, elif, endif is preprocessing! This happens before the compiler even
	// runs. The compiler will see one, but not both conditions.
```    
Special case:
```c++
#if 0 // never true - all of the inner text is supressed before it gets to the
	  // compiler... its basically a heavy duty "comment out"
...
#endif
...
```
2 kinds of comments in C/C++:
```c++
//....
/*
...
*/
```
The problem? you can't nest those comments.

Can also define symbols via compiler arguments:

**e.g.** define.cc
```c++
int main () {
	cout << X << endl;
}
```
Just running this gives an error - `X` was not declared in this scope

How to fix:
```bash
g++14 -DX=15 define.cc -o define
```
Then, on the command line:
```bash
./define
15
```
`-DX=15` means "define `X` = 15 before you run this"
```c++
#ifdef NAME
#ifndef NAME
```
(true if `NAME` (has/has not) been defined)

**e.g.**
```c++
    int main () {
        #ifdef DEBUG
            cout << "setting x=1" << endl;
        #endif
        int x = 1;
        while (x < 10) {
            ++x;
            #ifdef DEBUG
                cout << "x is now " << x << endl;
            #endif
        }
        cout << x << endl;
    }
```   
```bash
g++14 -DDEBUG debug.cc -o debug
```
Then, this enables debug output

## Separate Compilation

Split program into composable modules, with
* Interface - type def'n, function prototypes - .h file
* Implementation - full def'n for all provided functions - .cc file

**Recall: **
* declaration - asserts existence
* definition - full details - allocates space (vars/functions)

**e.g.** Interface: vec.h
```c++
struct vec {
	int x, y;
};
Vec operator+(const vec &v1, const vec &v2);
```

Client: main.cc
```c++
#include "vec.h"

int main () {
    Vec v {1, 2};
    v = v+v;
}
```
Implementation: vec.cc
```c++
#include "vec.h"

vec operator+ (const Vec &v1, const Vec &v2) {
    (full definition)
}
```

**Recall:** an entity can be *declared* many times, but *defined* at most once.

If you have an error that has 'ld', (it's most likely) you had a link error, not a compiler error.

```bash
g++14 -c vec.cc
g++14 -c main.cc
g++14 vec.o main.o -o main
```

`-c` = compile only
* do not link
* do not generate an executable
* produces an object file (.o)
	* a piece of a program, but not a whole program

What if we want to provide a global variable as part of a module?
```c++
int globalNum;

IN AN INTERFACE .H FILE:
extern int globalNum;
```

Let's write a Linear Algebra module:

linalg.h
```c++
#include "vec.h"
```   
linalg.cc
```	c++
#include "linalg.h"
#include "vec.h"
```      
main.cc
```c++
#include "linalg.h"
#include "vec.h"
```        

Won't compile:
* main.cc, linalg.cc include vec.h, linalg.h
* linalg.h includes vec.h
	* ...linalg.cc, main.cc get 2 copies of vec.h!
		* ...struct Vec is defined twice.

We need to prevent files from being included more than once.

Solution: `#include guard`:

vec.h
```c++
#ifndef VEC_H
	#define VEC_H
	(file contents)
#endif
```

First time vec.h is included, VEC_H is not defined, so the file is included.

After that, VEC_H is defined, so contents of vec.h are supressed.

ALWAYS PUT `#INCLUDE` GUARDS IN HEADER FILES
\#alwaysincludeguard #neverforget #includeguard2016

NEVER **EVER** ***EVER*** compile .h files! EVER
\#lifehacks #dontdoit #lifeprotips

NEVER include .cc files
\#alwayswrong

NEVER put `using namespace std` in header files - the using directive will be forced upon any client that includes the file
\#stdnamespacethrowaway #dontdoit #badcitizenship   

ALWAYS say `std::cin`, `std::string`, `std::istream`, etc. in headers


## Object Oriented Programming


### Classes
Big idea in OOP - can put functions inside of structs

**e.g.**
```c++
struct Student {
    int assns, mt, final;
    float grade() {
        return assns*0.4 + mt*0.2 + final*0.4;
    }
};

Student s {60, 70, 80};

cout << s.grade() << endl;
```

`class` - essentially a structure type that can contain functions
* C++ has a class keyword
* `object` - an instance of a `class`
**e.g. **
`Student s{60, 70, 80};` `Student` is the class, `s, is the object

The function `grade()` - called a **member function** (or **method**)

What do `assns`, `mt`, `final` mean inside of `grade`?
* they are fields of the current object - the object upon which grade was invoked
**e.g.**
```c++
Student billy{...};
billy.grade(); <- uses billy's assns, mt, final
```

Formally: methods take a hidden extra parameter called 'this' - ptr to the object on which the method was invoked.

**e.g.** `billy.grade();` -> `this == &billy`

Can write:
```c++
struct Student {
	...
	float.grade() {
		return this->assns*0.4 + this->mt*0.2 + this->final*0.4;
	}
};
```    

## Initializing Objects

`Student billy{60, 70, 80};` - from C. OK but limited.

Better: Write a method that does initialization! A constructor (ctor)
```c++
struct Student {
    int assns, mt, final;
    float grade() {...}
    Student (int assns, int mt, int final) {
        this->assns = assns;
        this->mt = mt;
        this->final = final;
    }
};
```
`Student billy{60, 70, 80};` Better(?) it looks the same, but it isn't!
If a ctor has been defined, these are passed as arguments to the ctor.
If no ctor has been defined, these initialize the individual fields of student (C-style)

OR `Student billy = Student{60, 70, 80}`

Heap allocation: `student *pBilly = new Student{60, 70, 80};`

Advantages of ctors:
* Default params!
* Overloading!
* Sanity checks!

e.g.
```c++
struct Student{
	...
	Student (int assns=0, int mt=0; int final=0){
		this->assns=assns;
		...
	}
};

Student barry{70, 80}; // 70, 80, 0
Student newKid; // 0, 0, 0
```     
**Note:** every class comes with a default (i.e. no-arg) ctor. (which just default-constructs any fields that are objects)

**e.g.** `vec v; //default ctor` (does nothing in this case)
HOW DO YOU KNOW IT EXISTS? The built-in default ctor goes away if you provide any ctor!

**e.g. **
```c++
struct vec {
	int x, y;
	vec (int x int y) {
		this->x = x;
		this->y = y;
	}
};
...
vec v{1, 2} // OK
vec v; // Error! Because you wrote it away and you're calling it now
```     
What if a struct contains consts or refs?
```c++
struct myStruct {
    const int myConst;
    int &myRef;
    // These must be initialized! ! ! ! ! !
};
```
So initialize:
```c++
int z;
struct myStruct {
    const int myConst = 6;
    int &myRef = z;
};
```
BUT does every instance of myStruct need to have the *SAME* value of myConst + myRef?

e.g.
```c++
struct Student {
    const int id; //constant (doesn't change) but not the same for all students
    ...
};
```
Where do we initialize? -ctor body? too late - fields must be fully constructed by then.

What happens when an object is created?
1. space is allocated
2. fields are constructed <- need to do our initializations here
3. ctor body runs

How? - **Member Initialization List (MIL)**
```c++
struct Student{
    const int id;
    int assns, mt, final;
    student (int id, int assns, int mt, int final):
        id{id}, assns{assns}, mt{mt}, final{final} {}
        // no need for "this->x" because they have to be fields when we do it like
		// x{x} and inside, they have to be arbitrary expressions
};
```

**Note:** can initialize ANY field this way, not just consts and refs

**Note:** fields are initialized in the *order in which they are declared in the class* even if the MIL orders them differently.

MIL is sometimes more efficient than setting fields in the body (otherwise run default ctor, then reassign in the body)

EMBRACE THE MIL!

What if a field is initialized inline AND in the MIL?
```c++
struct Vec {
	int x=0, y=0;
	vec (int x): x{x} {}
};
```    

The MIL takes precedence.

Now consider:

```c++
Student billy{60, 70, 80};
Student bobby = billy;
```

* How does this initialization happen?
	* The copy constructor!
	* for constructing one object as a copy of another

**Note:** every class comes with:
* default ctor (default - constructs all fields that are objects)
	* lost if you defined any ctor
* copy ctor (just copies all fields)
* copy assignment operator
* destructor
* move ctor
* move assignment operator

Writing your own copy ctor:
```c++
struct Student {
	...
	...
	student (const Student &other):
	assns{other.assns}, mt{other.mt}, final{other.final} {}
	// equivalent to the built-in copy ctor
};
```    

When is the built-in copy ctor not correct?

```c++
struct Node {
    int data;
    Node *next;
    Node (int data, Node *next): data{data}, next{next} {}
    ...
};
Node *n = new Node{1, new Node {2, new Node {3, nullptr}}};
Node m = *n; // copy ctor
Node *p = new Node(*n); // copy ctor
```

![](http://i.markdownnotes.com/2_2vGu8Oa.PNG)

Simple copy of fields -> only the first node was actually copied (**shallow **copy)

If you want a **deep** copy (copies the whole list) you must write your own copy ctor:
```c++
struct Node {
    ...
    Node (const Node &other):
    data{other.data}, next{new Node(other.next?*other.next:nullptr)} {}
};
```
