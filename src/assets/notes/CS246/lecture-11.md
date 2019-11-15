# Lecture 11

Difficulty with RAII:
``` c++
class C {...};
unique_ptr<c> p {new C{...}};
unique_ptr<c> q = p;
```

What happens when a `unique_ptr` is copied - don't want to delete the same ptr twice!
Instead - copying is disabled for `unique_ptrs`. They can only be moved.

Sample implementation (the one in the STL is a little more fancy):
```c++
template <typename T> class unique_ptr {
	T *ptr;
 public:
 	unique_ptr(T *p): ptr{p} {}
	~unique_ptr() { delete ptr; }
	unique(const unique_ptr <T> & other) = delete; // disables it
	unique_ptr<T> &operator= (const unique_ptr<T> & other) = delete;
	unique_ptr(unique_ptr<T> && other): ptr {other.ptr} {
		other.ptr = nullptr;
	}
	unique_ptr<T> &operator= (unique_ptr<T> && other) {
		std::swap(ptr, other.ptr);
		return *this;
	}
	T &operator*() { return *ptr; }
};
```

If you need to be able to copy smart ptrs, use `std::shared_ptr`

```c++
{ auto p1 = std::make_shared<MyClass>();
	...
	if (...) {
		auto p2 = p1;
		// p2 is popped, but the ptr is not deleted.
	}
// p1 is popped, and the ptr is deleted.
}
```

`shared_ptrs` maintain a **reference count** - a count of all shared_ptrs pointing at the same object.
Memory is freed when the # of `shared_ptr`s pointing to it reaches 0.

"Blast to the Past"

```scheme
(define l1 (cons 1 (cons 2 (cons 3 empty))))
(define l2 (cons 4 (rest l1)))
```

Everything here gets freed easily with shared ptrs!

tl;dr: use smart ptrs. **Dramatically** fewer opportunities for leaks.

### 3 levels of exception safety for a f'n f:
1. Basic guarantee - if an exn ocurs, the program will be in a valid state.
	Nothing is leaked, no corruption, class invariants are maintained.
2. Strong guarantee - if an exn is raised while executing f, the state of the program will be as it was before f was called
3. No-throw guarantee - f will never throw an exn, and **always accomplishes its task.**

**Example**
```c++
class A {...}
class B {...}
class C {
	A a;
	B b;
	void f() {
		a.method1(); // Might throw (strong guarantee)
		b.method2(); // Might throw (strong guarantee)
	}
};
```

Is `c::f` exn safe?
* if `method1` throws - nothing has happened yet - OK
* if `method2` throws - effects of method 1 must be undone to offer the strong guarantee
	* very hard or impossible if method 1 has non-local side effects.

∴ No, probably not exn safe.

If `method1`, `method2` do not have non-local side-effects, can use copy/swap idiom.

```c++
class C {
	A a;
	B b;
	void f() {
		A atemp = a; // If these throw, a, b, still intact
		B btemp = b;
		atemp.method1(); // If these throw, original
		btemp.method2(); // a, b still intact
		a = atemp; // but...
		b = btemp; // what if these throw?
	}
};
```

Better if the swap was no-throw. Copying ptrs can't throw.

Solution: pImpl idiom (this is my least favourite name)

```c++
struct CImpl {
	A a;
	B b;
};

class C {
	unique_ptr<CImpl> pImpl;
	...
	void F() {
		auto temp = make_unique<CImpl> (* pImpl);
		temp->a.method1();
		temp->b.method2();
		std::swap(temp, pImpl); // No-throw.
	} // Strong guarantee.
};
```

if `method1` or `method2` offer no exn safety guarantee, then neither can f.

**NEVER** let a dtor emit an exn.
* if the dtor was executed during stack unwinding while dealing with another exn, you now have *two* active, unhandled exns, and the program will abort *immediately.*

### Exception Safety and the STL
`vector`: encapsulates a heap array
* follows RAII - when a stack-allocated vector goes out of scope, the internal heap array is freed.

```c++
void f() {
	vector<MyClass> v;
	...
} // v goes out of scope - array is freed,
  // MyClass dtor runs on all objects in the vector
```


BUT
```c++
void g() {
	vector <MyClass *> v;
	...
} // array is freed, ptrs don't have dtors, so any objs pointed at by ptrs in v
  // are not deleted.
```

* `v` doesn't know whether the ptrs in the array own the objects they point at
* if they do, you have to delete them yourself.
	* `for (auto x:v) delete x;`

BUT
```c++
void h() {
	vector<shared_ptr<MyClass>> v;
	...
} // array is freed, shared_ptr dtors run, so objs are deleted, if no other shared_ptr
  // points at them.
```

* no explicit deallocation

`vector<T>::emplace_back` - offers the strong guarantee.
* if the array is full (i.e. `size == cap`)
	* allocate a new array
	* copy objects over (copy ctor)
		* if a copy ctor throws:
			* destroy the new array
			* old array still intact
			* strong guarantee
	* delete the old array

BUT
* copying is expensive & the old data will be thrown away
* wouldn't moving the objs be more efficient?
	* allocate new array
	* move the objs over (move ctor)
		* if move ctor throws, can't offer the strong guarantee
		* original no longer intact
	* delete old array

If the move ctor offers the no-throw guarantee, `emplace_back` will use the move ctor; else, it will use the copy ctor, which will be slower.

So your move ops should provide the no-throw guarantee, and you should indicate that they do.

```c++
class MyClass {
 public:
 	MyClass(MyClass &&other) noexcept : ... {}
	MyClass &operator= (MyClass &&other) noexcept;
};
```

If you know that a function will never throw or propagate an exn, declare it `noexcept` - facilitates optimization.

At minimum: swaps and moves should be `noexcept`.

## Casting
In C:
```c
Node n;
int *ip = (int *)(&n); // cast - forces C to treat a Node * as an int *.
```

C-style casts should be avoided in C++. If you *must* cast, use a C++-style cast.

**4 Kinds:**
* `static_cast` - "sensible casts
	* e.g. double->int
	```c++
	double d;
	void f(int i);
	void f(double d);
	f(static_cast<int>(d));
	```
	* e.g. superclass ptr -> subclass ptr
	```c++
	Book *b = new Text{...}
	Text *t = static_cast<Text *>(b);
	```
		* you are taking responsibility that `b` actually points at a `Text`. "Trust me."
* `reinterpret_cast` - unsafe, implementation-specific "weird" casts.
```
Student s;
Turtle *t = reinterpret_cast<Turtle *>(&s);
```
* `const_cast` - for converting between const and non-const
	* the only C++ cast that can "cast away const"
	```c++
	void g(int *p); // given to you.
	void f(const int *p) { // suppose g doesn't actually change *p,
		...				  // but this was left out of the signature
		g(const_cast<int *>(p));
		...
	}
	```
* `dynamic_cast` - is it safe to convert a `Book *` to a `Text *`?
	```c++
	Book *pb;
	...
	static_cast <Text *>(b)->getTopic(); // safe?
	```
	Depends on what `pb` actually points at.
	Better to do a tentative cast

	```c++
	Text *pt = dynamic_cast<Text *>(pb);
	```
	If the cast works, (i.e. `pb` really points at a Text or at a subclass `Text`), `pt` points at the object.
	If the cast fails, pt will be a `nullptr`.
	```c++
	if (pt) cout << pt->getTopic();
	else cout << "Not a Text";
	```

Can we use these on smart pointers? Yes.
* `static_pointer_cast`
* `const_pointer_cast`
* `dynamic_pointer_cast`

These cast `shared_ptrs` to `shared_ptrs`.

Can use dynamic casting to make decisions based on an object's RTTI (run-time type information).

```c++
void whatIsIt(shared_ptr(<Book> b){
	if (dynamic_pointer_cast<comic>(b)) cout << "Comic";
	else if (dynamic_pointer_cast<text>(b)) cout << "Text";
	else cout << "Normal Book";
}
```

Code like this is highly coupled to the Book hierarchy, and may indicate bad design.

Better options:
* virtual methods
* write a visitor

Dynamic casting also works with references:
```c++
Text t {...};
Book &b = t;
Text &t2 = dynamic_cast<Text &>(b);
```
If `b` "points to" a `Text`, then `t2` is a ref to the same `Text`.

If not...? (No such thing as a null reference)
It raises the exception `bad_cast`

**Note:** dynamic casting only works on classes with at least one virtual method.
