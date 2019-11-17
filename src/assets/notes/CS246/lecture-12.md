# Lecture 12

With dynamic casting, we can solve the polymorphic assignment problem.

```c++
Text & Text::operator=(const Book & other) { // virtual
	Text & textother = dynamic_cast<Text &> (other);
	if (this == &textother) return *this;
	Book::operator=(other);
	topic = textother.topic;
	return *this;
}
```

## How Virtual Methods Work

```c++
class Vec {
	int x, y;
	int doSomething();
	...
};

class Vec2 {
	int x, y;
	virtual int doSomething();
	...
};
```

What's the difference?

```c++
Vec v {1, 2};
Vec2 w {1, 2};
```

Do they look the same in memory?

```c++
cout << sizeof(v) << ' ' << sizeof(w);
// we get 8 bytes for v, and 16 bites for w
```

First note: 8 = space for 2 ints
Also:

- no space for the `doSomething` method.
- compiler turns methods into ordinary f'ns and stores them with other f'ns.

Recall:

```c++
Book *pb = new /*Book/Text/Comic*/;
pb->isItHeavy();
```

Virtual - choice of which version of `isItHeavy` to run is based on the type of the actual object - which the compiler can't know in advance.

Correct `isItHeavy` must be chosen at runtime. How?

For each class with virtual methods, the compiler creates a table of f'n pointers (the **vtable**)

**e.g.**

```c++
class C {
	int x, y;
	virtual int f();
	virtual int g();
	int h();
	virtual ~C();
};

C c, d;
```

![](/images/lectures/CS246/12-1.png)
(diagrams courtesy of vivian!)

Objects of type C have an extra ptr (the vptr) that pts to C's vtable.

![](/images/lectures/CS246/12-2.png)
![](/images/lectures/CS246/12-3.png)

Calling a virtual method:

- follow vptr to vtable
- fetch ptr to the actual method the table
- follow the f'n ptr + call the f'n

∴ virtual f'n calls incur a small overhead cost

Also - having $\geq$ 1 virtual f'n adds a vptr to every object

∴ classes w/ no virt. f'ns produce smaller objects than if some method was virtual

We need to know whose vtable we have because that's how `dynamic_cast` works! (`dynamic_cast` can be costly)

Fun fact: `static_cast` and `const_cast` are $O(0)$. They cost nothing.

Concretely, how is an object laid out? Compiler-dependent.
Let's see what g++ does.

![](/images/lectures/CS246/12-4.png)

```c++
class A {
	int a, c;
	virtual int f();
};
class B : public A {
	int b, d;
};
```

![](/images/lectures/CS246/12-5.png)

## Multiple Inheritance

A class can inherit from more than one class.

```c++
class A {
public:
	int a;
};

class B {
public:
	int b;
};

class C: public A, public B {
	void f() {
		cout << a << ' ' << b;
	}
};

```

![](/images/lectures/CS246/12-6.png)

Challenges: Suppose
![](/images/lectures/CS246/12-7.png)

B and C both inherit from A.

```c++
class D: public B, public C {
public:
	int d;
};

D d;
d.a; // Compiler rejects this because there are two 'a's. Which a is this? Ambiguous.

// instead:
d.B::a;
// or
d.C::a;
```

But if `B` & `C` inherit from `A`, should there be one `A` part of `D`, or two (the default)? i.e., should `B::a`, `C::a` be the same, or different?

What if we want
![](/images/lectures/CS246/12-8.png)

also known as the "Deadly Diamond of Death"

Make `A` a _virtual base class_, employ _virtual inheritance_.

```c++
class B: virtual public A;
class C: virtual public A;
```

**e.g.** IO stream library
![](/images/lectures/CS246/12-9.png)

How this will be laid out:
![](/images/lectures/CS246/12-10.png)
![](/images/lectures/CS246/12-11.png)

What does g++ do?
![](/images/lectures/CS246/12-12.png)
BUT NOT REALLY??

![](/images/lectures/CS246/12-13.png)
So the distance from an object to its superclass part is not always the same.

Solution: distance to base class object is stored in the vtable.

Diagram doesn't look like all of A, B, C, D simultaneously.

- But slices of it look like A, B, C, D.

```c++
D d;
A *a = &d; // changes the address to point at the A part.
```

∴ pointer assignment among A, B, C, D, changes address stored in the ptr.

Similarly, `static/dynamic/const_cast` under multiple inheritance also change the value of the ptr.

`reinterpret_cast` does not.

## Template Functions

```c++
template <typename T> T min(T x, T y) {
	return x < y ? x : y;
}

int x = 1, y = 2;
int z = min(x, y); // T = int.
```

Note: we don't need to say `min<int>`. C++ infers `T = int` from the types of `x` and `y`.
This does not apply to class templates.

If C++ can't determine T, you can always tell it explicitly: `z = min<int>(x, y)`

For what types T can `min` be used?

- For what types T will the body of the function compile? \* any type for which operator < is defined.

Recall:

```c++
void for_each(AbstractIterator start, AbstractIterator finish, void (*f)(int)) {
	while (start != finish) {
		f(* start);
		++ start;
	}
}
```

- works as long as
  _ `AbstractIterator` supports `_`,`!=`,`++`*`f` can be called as a function

Make these template arguments:

```c++
template <typename Iter, typename Func>
	void for_each(Iter start, Iter finish, Func f) {
		while (start != finish) {
			f(*start);
			++start;
		}
	}
```

Now `Iter` can be _any_ type that supports `*`, `!=`, `++` (including raw ptrs!)

```c++
void f(int n) { cout << n << endl; }
int a[] = {1, 2, 3, 4, 5}
for_each(a, a+5, f); // prints the array
```

## STL <algorithm>

- suite of template functions, many of which work over iterators

**e.g.** `for_each` (as given above)

`find`:

```c++
template <typename Iter, typename T>
	Iter find (Iter first, Iter last, const T &val) {
		/* - returns iterator to the first item in [first, last) matching val.
		   -if not found, return last. */
	}
```

`count` - like find, but returns # occurrences of val

`copy`:

```c++
template <typename InIter, typename OutIter>
	OutIter copy(InIter first, InIter last, OutIter result) {
		/* - copies one container range [first, last) to another,
		starting at result */
	}
```

Note: `copy` does not allocate memory. You have to be sure that the second container has enough space in it.

**e.g.**

```c++
vector <int> v {1, 2, 3, 4, 5, 6, 7};
vector <int> w(4); // notice the round brackets! this means space for 4 ints
copy(v.begin() + 1, v.begin()+5, w.begin());
// w = 2, 3, 4, 5
```

`transform`:

```c++
template <typename InIter, typename OutIter, typename Func>
	OutIter transform(InIter first, InIter last, OutIter result, Func f) {
		while (first != last) {
			*result = f(*first);
			++first;
			++result;
		}
	}
```

**e.g.**

```c++
int add1(int n) {return n + 1;}
vector <int> v {2, 3, 5, 7, 11};
vector <int> w (v.size());
transform(v.begin(), v.end(), w.begin(), add1);
// w = 3, 4, 6, 8, 12
```

This is just like map from racket! #throwback

How general is this code?

1. What can we use for `Func`?
2. What can we use for `InIter`, `OutIter`?

1) `Func` - how is f used? `f(*start)`
   f is anything that can be called as a f'n
   Can write operator() for objects.
   **e.g.**

```c++
class Plus1{
public:
	int operator() (int n) {return n + 1;}
};
Plus 1 p;
p(4); // produces 5
transform(v.begin(), v.end(), w.begin(), Plus1());
```

**Generalize:**

```c++
class Plus {
	int m;
public:
	Plus(int m): m {m}{}
	int operator() (int n) {return n + m; }
}
transform(v.begin(), v.end(), w.begin(), Plus{1});
```

`Plus1`, `Plus` objects - called **function objects**
Advantage of function objects - can maintain state.

```c++
class IncreasingPlus {
	int m = 0;
public:
	int operator()(int n) { return n + (m++)};
	void reset() { m = 0; }
};
vector <int> v (5, 0); // 0 0 0 0 0
vector < int> w(v.size());
transform(v.begin(), v.end(), w.begin(), IncreasingPlus());
// w = 0, 1, 2, 3, 4
```

Consider: How many ints in a vector are even?

```c++
vector < int> v = {...}
bool even(int n) {return n % 2  == 0;}
int x = count_if(v.begin(), v.end(), even);
```

Seems a waste to explicitly create the f'n even
If this were Racket, we would use `lambda`.
Do the same here:

```c++
int x = count_if(v.begin(), v.end(), [](int n) {return n % 2 == 0;});
```

```c++
auto f = [](int n) {return n % 2 == 0;} // we don't know the type of our lambda
```

```c++
void doSomething(decltype(f) g) {...} // the type of f is the type that I want
```

2. Iterators - apply the notion of iteration to other sources of data, e.g. streams

```c++
#include <iterator>
vector <int> v{1, 2, 3, 4, 5}
ostream_iterator<int> out {cout, ", "}
copy(v.begin(), v.end(), out); // prints 1, 2, 3, 4, 5,
```

```c++
vector <int> w; // space was not given
copy(v.begin(), v.end(), w.begin()); // segfault - copy doesn't allocate space
```

`copy` can't allocate space - it doesn't even know that `w.begin()` iterates over a vector!
But what if we had an iterator whose assignment operator inserts a new item?

```c++
copy(v.begin(), v.end(), back_inserter(w));
```

This copies `v` into `w`, and allocates space if necessary. Valid for any container that has a `push_back` method.
