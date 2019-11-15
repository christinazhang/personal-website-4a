# Lecture 9

## Observer Pattern (ct'd from Lecture 8)

![](http://i.markdownnotes.com/2_g2dRaMe.PNG)


```c++
class Observer {
public:
	virtual void notify()=0;
	virtual ~Observer();
};

class HorseRace:public Subject {
	ifstream in; // source of data
	string lastWinner;
public:
	HorseRace(const string & source): in {source}{}
	bool runRace(); // true if successful
	string getState() {return lastWinner;}
};

class Bettor: public Observer {
	HorseRace *hr; // subject
	string name, myHorse;
public:
	Bettor(____):____ { hr->attach(this); }
	~Bettor() { hr->detach(this); }
	void notify() {
		string winner = hr->getState();
		if (winner == myHorse) {
			cout << "Yipee!" ;
		}
		else cout << "Double or nothing!";
		}
	};

```		

**main.cc:**

```c++
HorseRace hr;
Bettor Larry(&hr, "Larry", "RunsLikeACow");
...

while ((hr.runRace()) {
	hr.notifyObservers();
}

```

## Decorator Pattern

Want to enhance an object at runtime - add functionality/features

**e.g.** Windowing system

* Start with a basic window
* Add a scrollbar (when text gets too long)
* Add a menu (when your cursor gets to the top)

Want to choose enhancements at runtime.

![](http://i.markdownnotes.com/2_MIsG1co.PNG)

Class Component:
* defines the interface
* operations your objects will provide

ConcreteComponent:
* implements the interface
* inherits from Component

Every decorator **is a** component AND every decorator **has a** component.
**e.g.** Window with Scrollbar is a kind of Window, and HAS a ptr to the underlying plain Window

Window w/ scrollbar & menu is a window, has a ptr to a window w/ scrollbar, which has a ptr to a basic window.

All inherit from AbstractWindow, so window methods can be used polymorphically on all of them.

**e.g. Pizza**

![](http://i.markdownnotes.com/2_5EgG2Hk.PNG)

A basic `Pizza` is crust and sauce.

```c++
class Pizza {
public:
	virtual float price() const = 0;
	virtual string desc() const = 0;
	virtual ~Pizza();
}

class CrustAndSauce: public Pizza {
public:
	float price() const override { return 5.99; }
	string desc() const override { return "Pizza"; }
};

```

Turns out nobody likes just sauce and bread! Let's add enhancements.

![](http://i.markdownnotes.com/2_Fq7OUbd.PNG)

```c++
class Decorator: public Pizza {
protected:
	Pizza * component;
public:
	Decorator (Pizza *p): component{p}{}
	Virtual ~Decorator(){delete component;}
};

class Topping:public Decorator {
	string theTopping;
public:
	Topping(string t, Pizza *p): Decorator{p}, theTopping{t}{}
	float price() const override{
		return component->price()+.75; // THESE ARE SOME EXPENSIVE ASS PIZZAS
	}
	string desc() const override {
		return component->desc()+" with "+ theTopping;
	}
};

// The rest is left as an exercise to the reader
```

**Use:**
```c++
Pizza *p1 = new CrustAndSauce;
p1 = new Topping("Cheese", p1);
p1 = new Topping("Fungus", p1); // i have strange classmates
p1 = new StuffedCrust(p1);

cout << p1->desc() << ' ' << p1->price();

delete p1;
```

## Inheritance and Copy/Move


```c++
class Book {
	//defines copy/move ctor/assign
};

class Text:public Book {
	// does not define copy/move ctor/assign
};

Text t{"Algorithms", "CLRS", 500, "CS"};

Text t2 = t; // No copy ctor in Text
			 // - what happens?
			 // - calls Book's copy ctor
			 // - then goes field-by-field (i.e. default behaviour) for the Text part
			 // - same for other ops
```


To write your own operations:
```c++
// Copy ctor
Text::Text(const Text &other):Book{Other},topic{other.topic}{};
```
```c++
// Copy assignment operator
Text & Text::operator=(const Text &other) {
	Book::operator=(other);
	topic = other.topic;
	return *this;
}
```
```c++
// Move ctor
Text::Text(Text && other):Book{other},topic{other.topic} {}
```

The above implementation of the move ctor is wrong! It's a copy construction, not a move construction.

`other` is pointing at an rvalue, but `other` istelf is an lvalue (general rule: if it has a name, it's an lvalue)

`other.topic` is also an lvalue!


```c++
// Move ctor
Text::Text(Text && other):
	Book{std::move(other)},topic{std::move(other.topic)},{}
}
```

```c++
// Move assignment operator
Text & Text::operator=(Text && other) {
	Book::operator=(std::move(other));
	topic = std::move(other.topic);
	return *this;
}
```

**Summary:** Even though `other` "points" at an rvalue, other itself is an lvalue (so is `other.topic`)

`std::move(x)` forces an lvalue `x` to be treated as an rvalue, so that "move" versions of the operations run.

The operations we just wrote are equivalent to the built-in.

Now consider:
```c++
Text t1{...}, t2{...};
Book *p1 = &t1, *p2 = &t2;
```
What if we do `*p1 = *p2`?
*Partial assignment* - it copies only the Book part.
`Book::operator=` runs. How can we fix this? Try making `operator=` virtual.

```c++
class Book {
	...
public:
	virtual Book &operator= (const Book &other);
};

class Text:public Book {
	...
public:
	Text &operator= (const Text &other) override;
};
```

This doesn't compile. Why?

`Text &operator= (const Text &other) override;` doesn't work because the signatures don't match.

Can we change it to `Text &operator= (const Book &other) override;`?

**Note:** different return types are OK (as long as you return a subclass ref/ptr) but param types *must* be the same, or it's not an override, won't compile, and violates is-a.

Therefore, assignment of a `Book` object to a `Text` var would be allowed:

```c++
Text t {...};
Book b {...};
Text *pt = &t;
Book *pb = &b;
*pt = *pb;
```

This compiles! But this uses a `Book` to assign a `Text` - BAD

Also:
```c++
Comic c{...};
Comic *pc = &c;
*pt = *pc;
```

This compiles too! BUT IT'S REALLY BAD

If `operator=` is non-virtual: partial assignment through base class ptrs.
If it is virtual - compiler allows mixed assignment.

**Recommendation:** all superclasses should be **abstract.**

Rewrite Book hierarchy:
![](http://i.markdownnotes.com/2_n3fcdEp.PNG)

```c++
class AbstractBook {
	string title, author;
	int numPages;
protected:
	AbstractBook &operator=(const AbstractBook &other);
	// prevents assignment through base class ptrs from compiling,
	// but implementation still available to subclasses
public:
	...
};

class NormalBook: public AbstractBook {
public:
	...
	NormalBook &operator= (const NormalBook &other) {
		AbstractBook::operator=(other);
		return *this;
	}
};

//other classes - exercise.
```

```c++
Text t1{...}, t2{...};
AbstractBook *pa1 = &t1, *pa2 = &t2;
*pa1 = *pa2;
```

Does not compile - because `AbstractBook &operator=(const AbstractBook &other);` is protected. This prevents partial and mixed assignment.

## Factory Method Pattern

Write a video game with 2 kinds of enemies - turtles and bullets. System randomly sends turtles and bullets, but bullets become more frequent later in the game.

![](http://i.markdownnotes.com/2_ReOFTAT.PNG)

Never know exactly which enemy comes next, so can't call turtle/bullet ctors directly.

Put a **factory method** in `Level` that creates enemies.

```c++
class Level {
	...
public:
	virtual Enemy *createEnemy() = 0;

	};

class NormalLevel: public Level {
public:
	Enemy *createEnemy() override {/* create mostly turtles */}
};

class Castle:public Level {
public:
	Enemy *createEnemy() override {/* create mostly bullets */}
};
```

Client:
```c++
Level *l = new NormalLevel;
Enemy *e = l->createEnemy();
```

## Template Method Pattern
### THIS HAS NOTHING TO DO WITH C++ TEMPLATES

Want subclasses to override superclass behaviour, but some aspects must stay the same.

**e.g.** There are red turtles and green turtles

```c++
class Turtle {
public:
	void draw () { // the template method
		drawHead();
		drawShell();
		drawFeet();
	}
private:
	void drawHead();
	void drawFeet();
	virtual void drawShell() = 0;
};

class redTurtle:public Turtle {
	void drawShell override {/* draw red shell */}
};

class greenTurtle:public Turtle {
	void drawShell override {/* draw green shell */}
};
```

Subclasses can't change the way a turtle was drawn, (head, then shell, then feet), but can change how the shell is drawn.

**Expansion:** The **Non-Virtual Interface (NVI)** idiom

* a public virtual method is really two things:
	* an interface to the client
		* indicates provided behaviour, with pre/post conditions
	* an interface to subclasses
		* a "hook" to insert specialized behaviour

* Hard to separate these ideas if they are tied to the same functions.
	* what if you want to later separate the customizable behaviour into two functions, with some unchanging code in between, while still providing the same public interface?
* How could you make sure overriding functions conform to the pre/post conditions?

The NVI idiom says: all public methods should be non-virtual.
* all virtual methods should be private, or at least protected
* except the dtor.

**e.g.**
```c++
class DigitalMedia {
 public:
 	virtual void play() = 0;
};
```

translated into NVI:

```c++
class DigitalMedia {
 public:
 	void play() { doPlay(); } // can add before/after code now:
							  // e.g. copyright check, update play count
 private:
 	virtual void doPlay() = 0;
};
```

Generalizes Template Method:
* puts *every* virtual function call inside a template method

## STL Map - for creating dictionaries

**e.g.** "arrays" that map string to int
```c++
#include <map>

map<string, int> m;
m["abc"] = 1;
m["def"] = 4;

cout << m["ghi"]; // if the key is not present, it is inserted and the value is
				  // default constructed (for ints: 0)
cout << m["abc"]; // 1

m.erase("abc"); // removes from dictionary

if (m.count("abc")) ... // 0 = not found, 1 = found

// iterating over a map happens in sorted key order
for (auto &p : m) {
	cout << p.first << ' ' << p.second << endl;
}
```

`p`'s type is `std::pair<string, int>` (`<utility>`)
