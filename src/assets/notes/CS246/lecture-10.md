# Lecture 10

## Visitor Pattern

For implementing **double dispatch.** Choose action based on 2 objects.

![](/images/lectures/CS246/10-1.png)

Want something like
`virtual void(Enemy,Weapon):: strike();` (this is purely fictional, it doesn't exist)

If virtual in `Enemy` - choose version of strike based on the type of Enemy, but not the type of Weapon.

If virtual in `Weapon` - choose based on weapon, not on enemy.

Trick to get dispatch based on both

- combine overriding and overloading.

```c++
class Enemy {
	virtual void beStruckBy(Weapon &w) = 0;
};
class Turtle: public Enemy {
	void beStruckBy(Weapon &w) override {
		w.strike(*this);
	}
};

class Bullet: public Enemy {
	void beStruckBy(Weapon &w) override {
		w.strike(*this);
	}
};
```

Even though `beStruckBy(Weapon &w)` looks the same for both Turtle and Bullet, `w.strike(*this);` is where it differs - we have to overload it:

```c++
class Weapon {
	virtual void strike(Turtle &t) = 0;
	virtual void strike(Bullet &b) = 0;
};

class Stick: public Weapon {
	void strike(Turtle &t) override {
		// strike turtle with stick
	}
	void strike (Bullet &b) override {
		// strike bullet with stick
	}
};

// Rock - exercise
```

Client:

```c++
Enemy *e = new Bullet{...};
Weapon *w = new Rock{...};

e->beStruckBy(*w);
```

What happens when `e->beStruckBy(w)` is executed?

- virtual - resolves to `Bullet::beStruckBy(Weapon &)
- Calls `Weapon::strike`, `*this` is a Bullet
- So calls `Weapon::strike(Bullet &)`, which is also virtual
- `Rock::strike(Bullet &)`

`Visitor` can be used to add functionality to existing classes without changing or recompiling them.

**e.g.** add a visitor to the Book hierarchy: (going back to the old Book hierarchy)

```c++
class Book { // basically Enemy
 public:
 	virtual void accept(BookVisitor &v) {v.visit(*this);} // beStruckBy
};

class Text: public Book {
 void accept(BookVisitor &v) override {v.visit(*this);}
};

// etc.

class BookVisitor{ // basically Weapon
	virtual void visit (Book &b) = 0; // strike
	virtual void visit (Text &t) = 0;
	virtual void visit (Comic &c) = 0;
};
```

**Application:** Track how many of each type of `Book` I have.

- `Book`s: by Author
- `Text`s: by Topic
- `Comic`s: by Hero

**Note:** if you don't have a default constructor, `map` doesn't work.

Use a `map<string, int>`
Could add a `virtual void updateMap()` to each class
Or write a visitor:

```c++
class Catalogue: public BookVisitor {
	map<string, int> theCatalogue;
 public:
 	map<string, int> getResult(){return theCatalogue;}
	void visit(Book &b) override{ ++theCatalogue[b.getAuthor()];}
	void visit(Book &t) override{ ++theCatalogue[t.getTopic()];}
	void visit(Comic &c) override { ++theCatalogue[c.getHero()];}
};
```

SURPRISE. THIS DOESN'T COMPILE (BRAD WHY)

`main.cc` -> includes `book.h` -> includes `BookVisitor.h` -> includes `text.h` -> includes `book.h` (?)

What went wrong? The include guard stopped `text.h` from including `book.h`. So `book.h` was under `text.h`

Are these includes really needed?

## Compilation Dependencies - include vs. forward declare

Consider: `class A {...};`

Which one of `class A, B, C, D` doesn't need `include`? i.e, where can you get away with a forward declaration?

```c++
#include "a.h"
class B: public A {
	...
};
```

Include - needs the fields of A

```c++
#include "a.h"
class C {
	A myA;
};
```

Include - you need the size of A to build C

```c++
class A;
class D {
	A *myAp;
};
```

Forward declare - pointers are the same size, so you can use forward declare.

```c++
class A;
class E {
	A f(A a);
};
```

Forward declare - allows you to typecheck A (we aren't the client, who needs to know the size of it)

`class B` and `class C` need to know how big A is to know how big they are.

If there is no compilation dependency necessitated by the code, don't create one with unnecessary includes.

Now, in the implementations of D, E:

**`d.cc`**

```
#include "a.h"

void D::f() {
	myAp->someMethod(); // Need to know about class A here - a true compilation dependency
}
```

Do the include in the .cc instead of the .h, where possible.

Now consider the Xwindow class:

```c++
class Xwindow {
	Display *d;
	Window w;
	int s;
	GC gc;
	unsigned long colours[10]
 public:
 	...
};
```

This is private data: Yet we can look at it. Do we know what it means? Do we care? (CS with a side of attitude with Brad)

"Why should I be forced to lay eyes on something that does me no good? Why must I look at stuff that means nothing to me?" (Lushman, 2016)

What if we add/change these fields? All clients must recompile. Would be better to hide these details away.

**Solution:** use the pimpl idiom ("pointer to implementation")

Create a second class called `XWindowImpl`
**XWindowImpl.h**

```c++
#include <X11/Xlib.h>
struct XWindowImpl {
	Display d;
	Window w;
	int s;
	GC gc;
	unsigned long colours[10]
};
```

**window.h:**

```c++
class XWindowImpl; // No #include Xlib
				   // forward declare the Impl class
class XWindow {
	XWindowImpl * pImpl;
 public:
 	... // no change
}
```

No compilation dependency on `XWindowImpl.h`, Clients don't depend on `XWindowImpl.h`

**`window.cc`**

```c++
#include "window.h"
#include "XWindowImpl.h"

XWindow::XWindow():pImpl{new XwindowImpl{...}}{...}
// Other methods: replace d, w, s, etc. with pImpl->d, pImpl->w, pImpl->s, etc.
```

If you confine all private fields to `XWindowImpl`, only `window.cc` needs to be recompiled if you change `Xwindow`'s implementation.

**Generalization:** What if there are other window implementations, `YWindow`s. Then make `ImplStruct` a superclass:

![](/images/lectures/CS246/10-2.png)

Class hierarchy of `Impl` and `pImpl` is called the** Bridge Pattern.**

## Measures of Design Quality

- Coupling and cohesion
  - **Coupling:** degree to which distinct modules depend on each other
  - low coupling (gets higher with each example):
  - modules communicate via function calls with basic basic params/results
  - modules pass arrays/structs back and forth
  - modules affect each other's control flow
  - modules share global data
  - high coupling:
  - modules have access to each other's implementation (friends)
  - there's no tighter relationship than friendship - you know everything about each other! :)
  - perfect coupling: everything is in the same module (this is an extreme and is terrible cohesion)
  - **Cohesion:** how closely elements of the module are related to each other. (recall Dave's battery example)
  - low cohesion (gets higher with each example):
  - arbitrary grouping of unrelated elements (e.g. `<utility>`)
  - elements share a common theme, but otherwise unrelated, perhaps share some base code (e.g. `<algorithm>`)
  - elements manipulate state over the lifetime of an object (e.g. open/read/close files)
  - elements pass data to each other
  - high cohesion:
  - elements cooperate to perform exactly one task
  - perfect cohesion: put everything in its own module (this makes terrible coupling)
  - high coupling: changes to one module require greater changes to other modules
  - harder to reuse individual modules
  - low cohesion: poorly organized code
  - hard to understand
  - hard to maintain

**Goal:** low coupling, high cohesion

## Decoupling the Interface (MVC)

Your primary program should not be printing things.

**e.g.**

```c++
class ChessBoard {
	...
	cout << "Your move" << endl;
};
```

Bad design - inhibits code reuse.
What if you want to reuse `ChessBoard`, but not have it communicate via stdout?

One solution: give the class stream objects with which it can do I/O

```c++
class ChessBoard {
	std::istream &in;
	std::ostream &out;
 public:
 	ChessBoard(istream &in, ostream &out):in{in}, out{out} {...}
	...
	out << yourmove << endl;
};
```

Better - what if you don't want to use streams at all?

**Your ChessBoard class should not be communicating at all.**

**Single Responsibility Principle:** "A class should only have one reason to change."

- game state and communication are _2 reasons._

**Better:** Communicate with the `ChessBoard` via params & results.

- confine user communication to outside the game class.

**Q:** So should `main` do all the communication and then call `ChessBoard` methods?
**A:** No - it's hard to reuse main.

You should have a class to manage interaction.that is separate from the game state class.

**Pattern:** Model-View-Controller (MVC)

Separate the distinct notions of

**Model** - data you are manipulating (e.g. game state)
**View** - how the model is displayed to the user
**Controller** - how the model is manipulated

![](http://i.markdownnotes.com/2_1X6Vnof.PNG)

Model:

- can have multiple views (e.g. text and graphics)
- doesn't need to know about their details
- classic observer pattern (or could communicate via the controller)

Controller:

- mediates control flow through model and view
- may encapsulate turn taking, or full game rules
- may fetch user input (or this could be the view)

Decoupling presentation and control -> MVC promotes reuse.

## Exception Safety

**Consider:**

```c++
void f() {
	MyClass *p = new MyClass;
	Myclass mc;
	g();
	delete p;
}
```

No leaks - but what if `g()` raises an exception?

What is guaranteed?

- During stack unwinding, all stack-allocated data is cleaned up - dtors run, memory is reclaimed
- mc is properly reclaimed
- heap-allocated memory is not freed

∴ if g throws, p is leaked.

```c++
void f() {
	MyClass *p = new MyClass;
	Myclass mc;
	try {
		g();
	}
	catch (...) {
		delete p;
		throw;
	}
	delete p;
}
```

But this is tedious, error-prone, and it duplicates code. How else can we guarantee something (e.g. `delete p` will happen, no matter how we exit f? (normally or by exception)?

In some languages - "finally" causes guarantee certain final actions - not in C++.

The only thing you can count on in C++ - dtors for stack allocated data will run.

∴ Use stack-allocated data with dtors as much as possible.
Use this guarantee to your advantage!

C++ idiom: **RAII** - Resource Acquisition Is Initialization
Every resource should be wrapped in a stack-allocated object, whose dtor frees it.

**e.g.** files

```c++
{
  ifstream f{"name"}; // Acquiring the resource ("name") = initializing the object (f)
  // the file is guaranteed to be released when f is popped from the stack.
}
// f's dtor runs, object destroyed, file is closed
```

Can do the same with dynamic memory.
`class std::unique_ptr<T>` takes a `T*` in the ctor, the dtor will delete the ptr.
in between - can dereference, just like a ptr.

```c++
void f() {
	auto p = std::make_unique<MyClass>(/* ctor args if needed */);
	MyClass mc;
	g();
}
```

This has no leaks. Guaranteed.
