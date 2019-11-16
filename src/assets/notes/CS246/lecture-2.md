# Lecture 2

## Shell Scripts

Files containing sequences of commands, executed as programs

e.g. Print `date`, current `user`, current `dir`.

`my_script`

```bash
#!/bin/bash
date
whoami
pwd
```

`#!/bin/bash` - shebang line, tells shell to execute this as a bash script.

Before running the file, execute permission: `chmod u+x mys_script`
Then, run the file: `./myscript`. `./` means current `dir`.

## Variables

```bash
x=1
```

Notice that there no spaces, will think x is a program.
`echo $x` will get the value `1`

**Note:**

- Use `$` when fetching the variable
- No `$1` when setting a variable
- Good practice: `${x}`
- All variables contains `string`s: x is the **`string`** `1`.

**e.g.**

```bash
dir=~/cs246
echo $dir
ls $dir
```

Some "global" vars available:

- **Important:** `PATH` - list of dirs \* When you type a command, the shell searches these dirs, in order, for a program with that name.

```bash
echo "$PATH"
echo '$PATH'
```

The `$` expansion happens in double quotes, but not in single quotes.

Special vars for scripts: `$1`, `$2`, `$3`, etc.

**e.g.** Check whether a word is in the dictionary

```bash
#!/bin/bash
egrep "$1" /usr/share/dict/words
```

Prints nothing if the word is not found, prints word if found

**e.g.** A good password shouldn't be in the dictionary. Answer whether a word is a good password.

```bash
egrep "^$1$" /usr/share/dict/words > /dev/null #suppresses output
if [ $? -eq 0 ]; then # [...] is a function!
	echo Bad password
else
	echo Maybe a good password
fi
```

**Note:** Every program returns a status code when finished. `egrep` returns `0` if found, `1` if not found. (In Linux, `0` = success, non-zero = failure)
`$?` = status of most recently executed command

**e.g.** Verify # of args, print error msg if wrong.

```bash
#!/bin/bash

usage() {
	echo "Usage: $0 password" > &2 # $0: name of script, &2 sends stderr
}
if [ $# -ne 1 ]; then
	usage
	exit 1
fi
...as before
```

## If Statements in Bash

```bash
if [ cond ]; then
	...
elif [ cond ]; then
	...
else
	...
fi
```

See the [Linux sheet](https://www.student.cs.uwaterloo.ca/~cs246/common/linuxCommands.pdf) for comparisons and other conditions.

## Loops in Bash

**e.g.** Print #s from `1` to `$1`

```bash
#!/bin/bash
x=1
while [ x -le $1 ]; do
	echo $x
	x=$((x + 1)) # _$((_)) for arithmetic
done
```

### Looping over a list

**e.g.** Rename all `.cpp` files to `.cc`

```bash
#!/bin/bash
for name in *.cpp; do # globbing - *.cpp is replaced with all matching files
	mv ${name} ${name%cpp}cc # ${_%x} produces value without x
done
```

**e.g.** How many times does word `$1` occur in file `$2`?

```bash
#!/bin/bash
x=0
for word in $(cat $2); do
	if [ "$word" = "$1" ]; then # put vars in quotation marks because you don't
								# know what could be in it
		x=$((x+1))
	fi
done
echo $x
```

**e.g.** Payday is the last Friday of the month. When is this month's payday?

Tasks:

- Compute payday
- Report answer

```bash
#!/bin/bash

answer() {
	if [ $1 -eq 31 ]; then # inside a fn - $1, $2 are the params of the fn
		echo "This month: the 31st"
	else
		echo "This month: the ${1}th"
	fi
}
answer $(cal | awk '{print $6}' | egrep "[0-9]" | tail -1)
```

Generalized to any month: `cal October 2016` gives Oct's `cal`

Let `./payday October 2016` give Oct's payday:

```bash
answer () {
	if [$2]; then
		preamble = $2
	else
		preamble = "This month "
	fi
	if [ $1 -eq 31 ]; then
		echo "${preamble}: the 31st"
	else
		echo "${preamble}: the {$1}th"
	fi
}

answer $(cal $1 $2 | awk '{print $6}' | egrep "[0-9]" | tail -1) $1
```

## SE Topic: Testing

- Essential part of program development
- Ongoing
  _ Not just at the end
  _ Begins before you start coding \* Test suites - expected behaviour
- Is _not_ debugging - cannot debug without first testing
- Cannot guarantee correctness (only wrongness)

**Human Testing:** humans look over code, find flaws

- Code inspection, walkthroughs (not in this course)

**Machine Testing:** run the program on selected input, check against spec

- Can't check everything - choose your test cases carefully!

**Black/White/Grey Box Testing:** no/full/some knowledge of program implementation

- Start with black box, supplement with white box
  _ Various classes of input - numeric ranges, positive vs. negative
  _ Boundaries of valid data ranges (edge cases)
  _ Multiple simultaneous boundaries
  _ Intuition/experience - guess at likely errors \* Extreme cases

* White box:
  _ Execute all logical paths through the program
  _ Make sure every fn runs

**Performance Testing:** is the program efficient enough?

**Regression Testing:** make sure changes to the program don't break old test cases.

- Test suites, testing scripts

## C++

Hello world in C:

```c
#include <stdio.h>

int main() {
	printf("Hello world!\n");
	return 0;
}
```

in C++:

```c++
#include <iostream>
using namespace std;

int main() {
	cout << "Hello World" << endl;
	return 0;
}
```

**Notes:**

- Main must return `int` in C++ (if `return 0` is left out, it returns 0 anyway)
- `stdio.h` and `printf` are still available in C++ \* Preferred C++ I/O header: `<iostream>`
- Output:
  \_ `std::cout<<___<<___<<____`
  \_ `std::endl` = end of line
- `using namespace std` lets you say `cout`/`endl` instead of `std::cout`/`std::endl`

### Compiling C++

```bash
g++-5 -std=c++14 program.cc -o program

OR

g++14 program.cc -o program
```

### Input/Output

There are 3 I/O streams:

- `cin` - reading from `stdin`
- `cout`,`cerr` - printing to `stdout`, `stderr`

I/O operators:

- `<<` "put to" (output) \* `cerr << x`
- `>>` "get from" (input) \* `cin >> x`
- Operator "points" in the direction of inflow

**e.g.** add 2 numbers

```c++
#include <iostream>
using namespace std; // above two lines will be omitted in future examples

int main() {
	int x, y;
	cin >> x >> y;
	cout << x + y << endl;
	}
```

**Note:**

- `cin >>` ignores whitespace
- `cin >> x >> y` gets 2 `int`s from`stdin`, ignoring whitespace

What if the next input isn't an int? The var is undefined.

What if the input is exhausted before we get 2 ints? (same as above)

If the read failed, `cin.fail()` will be true.
If we get `EOF`, then `CN.eof()` will also be true, but not until the attempted read fails!

**e.g.** read all ints from `stdin` & `echo` them, one per line, to `stdout`

```c++
int main () {
	int i;
	while (true) {
		cin >> i;
		if (cin.fail()) break;
		cout << i << endl;
	}
}
```

**Note:** there is an implicit conversion from `cin` to `bool` - lets `cin` be used as a condition

**e.g. Version 2.0**

```c++
int main () {
	int i;
	while (true) {
		cin >> i;
		if (!cin) break;
			cout << i << endl;
	}
}
```

**Note:** `>>` is C's **right bitshift operator**, `a >> b` shifts `a`'s bits `b` spots to the right.

**e.g.** `21 >> 3`
21: 10101 -> move 3 spots to the right = 10 = 2, so `21 >> 3 == 2`

but when the lefthand operand is `cin`, `>>` is the "get from" operator

Operator `>>`:

- Input: `cin` (istream and data)
- Output: returns `cin` (istream)
- This is why we can write `cin >> x >> y >> z`

**e.g. Version 3.0**

```c++
int main () {
	int i;
	while (true) {
		if (!(cin >> i)) break;
		cout << i << endl;
	}
}
```

**e.g. Version 4.0**

```c++
int main () {
	int i;
	while (cin >> i) {
		cout << i << endl;
	}
}
```

**e.g.** Read all `int`s and `echo` to `stdout` until `EOF`, and skip non-integer input.

```c++
int main () {
	while (true) {
		if (!(cin >> i)) {
			if (cin.eof()) break;
			cin.clear(); // clears the fail bit
			cin.ignore(); // throws away current input
	}
	else cout << i << endl // read was OK
}
```
