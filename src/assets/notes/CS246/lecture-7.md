# Lecture 7

## Generalize with variables

```bash
 CXX = g++-5 (compiler's name)
 CXXFLAGS = -std=c++14 -Wall (turns on all warnings)
```

**e.g.**

```bash
iter.o: iter.cc iter.h
${CXX} ${CXXFLAGS} -c iter.cc
etc.
```

**Shortcut:** for any rule of the form

```bash
x.o: x.cc x.h b.h ...
```

You can leave out the build command - make guesses that it is

```bash
${CXX} ${CXXFLAGS} -c x.cc -o x.o
```

Biggest problem with writing Makefiles

- tracking dependencies
- and maintaining them if they change

We can get help from g++!

```bash
g++14 -MMD -c iter.cc
```

It creates a file named iter.d! (and iter.o)

iter.d:

```bash
iter.o: iter.cc list.h node.h
```

Now just include this in the Makefile!

Makefile:

```bash
CXX = g++-5
CXXFLAGS = -std=c++14 -Wall -MMD
EXEC = myprogram
OBJECTS = main.o list.o iter.o node.o
DEPENDS = ${OBJECTS:.o=.d}

${EXEC}: ${OBJECTS}
	${CXX} ${CXXFLAGS} ${OBJECTS} -o ${EXEC}

-include ${DEPENDS} #cats iter.d, list.d, etc

.PHONY: clean

clean:
	rm ${OBJECTS} ${EXEC} ${DEPENDS}

```

This file is in the repository, and you can just replace the object files with your object files, and change the name of EXEC to your program.

As the program expands, you only have to add .o files to the Makefile.

## System Modelling

Building an OO System involves identifying abstractions and foramalizing the relationships among them.
Helpful to map these out to aid design +implementation

Popular standard: UML (Unified Modelling Language)

Modelling a class:

![](/images/lectures/CS246/7-1.png)

Visibility: `-` = private, `+` = public

Relationship: Composition of Classes

```c++
class Vec {
    int x,y;
  public:
    Vec (int x, int y);
};
```

Two Vecs define a Basis:

```c++
class Basis {
    Vec v1, v2;
    ...
};

Basis b; // X can't default-construct v1, v2.
```

```c++
class Basis {
    Vec v1, v2;
  public:
    Basis(): v1{1,0}, v2{0,1}{}
};
```

Embedding one object (e.g. Vec) inside another (Basis) called composition. Relationship between Basis & Vec called "owns-aa". A Basis "owns" a Vec object (2 of them, in fact)

If A "owns a" B, then typically

- B has no identity outside A (no independent existence)
- If A is destroyed, B is destroyed
- If A is copied, B is copied (deep copies)

**e.g. **A car owns 4 wheels - a wheel is part of a car

- Destroy the car -> destroy the wheels
- Copy the car -> copy the wheels

Implementation: Usually as a composition of classes

**Modelling:**
![](/images/lectures/CS246/7-2.png)
![](/images/lectures/CS246/7-3.png)
Means A owns some # of B's

Can annotate with multiplicities, field names (links on course website)

## Aggregation

Compare car parts in a car ("Owns a") to car parts in a catalogue.

The catalogue contains the parts, but the parts have an independent existence.

This is a "has-a" relationship ("aggregation")

If A "has a" B, then _typically:_

- B has an existence, apart from its association with A.
- If A is destroyed, B lives on
- If A is copied, B is not (shallow copies) \* copies of A share the same B.

**e.g.**

- parts in a catalogue
- ducks in a pond

**Aggregation in UML:**
![](/images/lectures/CS246/7-4.png)

Typical implementation: pointer fields

```c++
class Pond {
	Duck *ducks[maxDucks];
	...
};
```

## Specialization/Generalization (Inheritance)

Suppose you want to track your collection of books:

```c++
class Book{
	string title, author;
	int numPages;
  public:
	Book(____);
	....
};
// For Textbooks, we also want to know the topic:
class Text{
	string title, author;
	int numPages;
	string topic;
  public:
	Text(____);
	...
};
// For comic books, we want the name of the hero!
class Comic{
	string title, author;
	int numPages;
	string hero;
  public:
	Comic(____);
	...
};
```

This is okay - but it doesn't capture the relationship among `Book`, `Text`, and `Comic`. And how do we create an array (or linked list) that contains a mixture of these?

**Possible things we could do:**

1. Use a union

```c++
union BookTypes {Book *b, Text *t, Comic *c};
BookTypes myBooks[20];
```

2. Array of `void*`.
   - Store ptrs to `Book`, `Comic`, `Text`, converted to `void*`.

Not good solutions - subverts the type system
**Rather, observe:** `Texts` & `Comics` are kinds of `Books`

- They're books with extra features.

**Base class (or superclass)**

```c++
class Book{
	string title, author;
	int numPages;
  public:
	Book(____);
	...
};
```

**Derived classes (subclasses)**

```c++
class Text: public Book {
	string topic;
  public:
	Text(____);
	...
};

class Comic: public Book {
	string hero;
  public:
	Comic(____);
	...
};
```

Derived classes _inherit_ fields and methods from the base class. So, `Text`, `Comic`, get `title`, `author`, `numPages`.

Any method that can be called on `Book` can be called on `Text`, `Comic`.

Who can see the fields?
`title`, `author`, `numPages` - private in `Book`, so outsiders can't see them.

Can `Text` and `Comic` see them? NO - even sublcasses can't see them.

How do you initialize `Text`? We need `title`, `author`, `numPages`, `topic`.

You can _try_:

```c++
class Text:public Book {
	...
	public:
		Text(string title, string author, int numPages, string topic):
			title{title}, author{author}, numPages{numPages}, topic{topic} {}
};
```

But it won't compile! This is wrong for 2 reasons:

1. `title`, `author`, `numPages` are not fields of Text - not allowed in MIL
2. When an object is constructed:
   1. Space is allocated
   2. Superclass part is constructed **\*NEW\***
   3. Fields constructed
   4. ctor body runs

and 2. doesn't work - Book has no default ctor.

**Fix:** Invoke Book's ctor in Text's MIL.

```c++
class Text: public Book {
	...
	public:
		Text(string title, string author, int numPages, string topic):
			Book{title,author,numpages}, topic{topic}{}
			...
};
```

If superclass has no default ctor, the subclass _must_ call a superclass ctor in the MIL.

Good reasons to keep superclass fields inaccessible to subclasses.

If you want to give subclasses access to certain members, you can use _protected_ visibility.

```c++
class Book {
  protected: // accessible to Book and its subclasses, no one else.
		string title, author;
		int numPages;
  public:
		...
};

class Text: public Book{
	...
  public:
	...
	void addAuthor(string newAuthor){author += newAuthor;} // OK
};
```

It is not a good idea to give subclasses unlimited access to fields.

**Better:** make fields private, but provide protected accessor/mutator methods.

```c++
class Book {
	string title, author;
	int numPages;
  protected:
	string getTitle() const;
	void setAuthor(string newAuthor);
  public:
	Book(____);
	bool isItHeavy() const;
};
```

Relationship among `Text`, `Comic`, `Book`, is called "is-a"

- a `Text` is a `Book`
- a `Comic` is a `Book`

UML:
![](/images/lectures/CS246/7-5.png)

Visibility for protected: `#`

Method `isItHeavy` - when is a Book heavy?

- for ordinary Books: > 200 pages
- for Texts: > 500 pages
- for Comics: > 30 pages

```c++
class Book {
	...
  public:
	...
	bool isItHeavy() const {return numPages > 200;}
};

class Text:public Book {
	...
  public:
	...
	bool isItHeavy() const {return numPages >500;}
};

class Comic:public Book {
	...
  public:
	...
	bool isItHeavy() const {return numPages >30;}
};

Book b {"A small book", "____", 50};
Comic c {"A big comic", "____", 40};

cout << b.isItHeavy() //false
	 << c.isItHeavy(); //true
```

Since inheritance models is-a, we can do this:

```c++
Book b = Comic{"A big Comic", "____", 40, "_____"};
```

**Question:** is `b` heavy?

- `b.isItHeavy` - true or false?
- Which isItHeavy runs? `Book::isItHeavy` or `Comic::isItHeavy`

**Answer:** No, `b` is not heavy - `Book::isItHeavy` runs. Why?

![](/images/lectures/CS246/7-6.png)

`Book b = Comic{_____};`

- Tries to fit a `Comic` object where there is only space for a `Book` obj
  What happens? `Comic` is _sliced_
- `hero` field chopped off
- `Comic` coerced into being a `Book`

So `Book b = Comic{_____};`converts the `Comic` into a `Book` and `Book::isitHeavy` runs.

When accessing objects through a pointer, slicing is unnecessary and doesn't happen.

```c++
Comic c{____, ____, 40, ___};
Book *pb = &c;
Comic *pc = &c;
cout << pc->isitHeavy() // True
	 << pb->isitHeavy(); // False
```

- and still `Book::isItHeavy` runs when we call `pb->isItHeavy`.

Same object behaves differently depending on what type of ptr points to it.

Compiler uses the type of the _pointer_ (or reference) to decide which `isItHeavy` to run - does not consider the actual type of the object.

Means a `Comic` is only a `Comic` when a `Comic` ptr (or ref) points to it - probably not what we want.

How do we make `Comic` act like a `Comic`, even when pointed at by a `Book` ptr?

Declare the method _virtual_.

```c++
class Book {
	string title, author;
  protected:
	int numPages;
  public:
	Book(____);
	Virtual bool isItHeavy() const {
		return numPages > 200;
	}
};

class Comic:public Book{
	...
  public:
	...
	bool isItHeavy() const override {
		return numPages > 30;
	}
};

Comic c {__, __, 40, __};
Book *pb = &c;
Book &rb = c;
Comic *pc = &c;

cout << pc->isItHeavy() // true
	 << pb->isItHeavy() // true
	 << rb.isItHeavy(); // true
```

`Comic::isItHeavy` runs in each case.

Virtual methods - choose which class' method to run based on the actual type of the object at runtime.

e.g. MyBookCollection

```c++
Book *myBooks[20];
...
for(int i = 0; i < 20; ++i) {
	cout << myBooks[i]->isItHeavy() << endl; // uses Book::isItHeavy for Books,
											 // Comic::isItHeavy for comics,
											 // Text::isItHeavy for Texts
}
```

Accommodates multiple types under one abstraction: **polymorphism** ("many forms").

_Note:_ this is why a f'n void f(istream &in) can be passed an ifstream - ifstream is a subclass of istream.

### DANGER

Consider:

```c++
class One{
	int x,y;
  public:
	One(int x=0, int y=0):x{x},y{y} {}
};

class Two:public one{
	int z;
  public:
	Two(int x=0; int y=0, int z=0):
		One{x,y}, z{z} {}
};

void f(One *a) {
	a[0] = {6, 7};
	a[1] = {8, 9};
}

Two myArray[2] = {{1, 2, 3}, {4, 5, 6}};

f(myArray);
```

What happens:
![](/images/lectures/CS246/7-7.png)

Data is misaligned.

**NEVER** use arrays of objects polymorphically. If you want a polymorphic array, use an array of ptrs.
