# Lecture 1

## Linux Shell

**Definition:** Shell
* Interface to the operating system (OS)
* How you get the OS to do things:
	* Run programs
	* Manage files, etc.
* Two types:
	* Graphical (click, use mouse/touch with finger)
	* Command Line (type commands at a prompt)
		* Powerful and more versatile
* In this course, we use Bash.
* Make sure you are using Bash:
	* Log in and type `echo $0`. Should say bash.

### Linux file system
`cat` - desplays the contents of a file

**e.g.** `cat /usr/share/dict/words`

`/usr/`: root/top directory
`/share/dict`: directories (contains files) also known as "folders"
`/words`: file

In Linux, a directory is considered a kind of file. (Notion of file includes directory)

`ctrl+C` - kills the program

`ls` - list the files in the current directory (non-hidden files)
`ls -a` - show all files, including hidden files. (their name starts with `.`)
Hidden files are configuration info, history (last things I've typed), etc.

`pwd` - present working directory (tells you where you are) -> prints the current directory

`~` stands for home directory

What if you just type `cat`?
* Prints everything you type
* How is this useful?
	* Maybe, if we capture the output in a file
	* **e.g.** `cat > output.txt`
	* To stop: `ctrl+D` at the beginning of a line sends an "EOF" symbol to `cat`
		* `ctrl+C` is too powerful, we don't want to kill the program... we just want the program to die on its own.

In general: `command args > file` executes `command args` and captures the output in `file` instead of sending it to the screen.

This is called **output redirection.**

**Input redirection:** `cat < infile.txt`
* File replaced input from the keyboard
* Takes input from infile.txt instead of keyboard
* Displays infile.txt

`cat < infile.txt` seems equivalent to `cat infile.txt`. What's the difference?
* `cat infile.txt` - passes the name infile.txt as an argument to `cat`, `cat` opens the file and displays it
* `cat < infile.txt` - the *shell* opens the file and passes contents to `cat` in place of input. (`cat` doesn't know where the content is coming from, shell just feeds it to `cat`)

The output is the same for `cat`, but not for other commands!

**e.g.**
`wc` - word count

output.txt:
```bash
some words
some more words
```

```bash
wc output.txt`:
2 5 27 output.txt #(Lines, words, characters)
```

VS

```bash
wc < output.txt
2 5 27
```

Also: `cat *.txt` - **globbing pattern**
`*` = match any sequence of characters
Shell finds all files in the current directory that matches the pattern and substitutes them into command line (before `cat` is executed)

In principle, it does this: `cat a.txt b.txt c.txt ...`

For more globbing patterns, see the [Linux sheet](https://www.student.cs.uwaterloo.ca/~cs246/common/linuxCommands.pdf).

We can do both input/output redirection: `cat < in.txt > out.txt` copies everything in `in.txt`, and places them in `out.txt`.

Every process is attached to 3 streams:
![](http://i.markdownnotes.com/2_9Pjy2XT.PNG)
By default:
stdin - keyboard
sterr, stdout - screen

Redirection:
stdin: `<`
stdout `>`
stderr `2>`

stderr:
* A separate output stream for error messages
* stream is separate: so that output and error messages don't go to the same place
* So that  error messages don't clutter output file and corrupt formatting

Also: stdout may be **buffered**

* System may wait to accumulate output before actually displaying (flushing the buffer)
* stderr is never buffered
	* Get your messages immediately

### Pipes

Uses output (stdout) of one program is input (stdin) of another

**e.g.** How many words occur in the first 20 lines of myfile.txt?

Tools:
`head -n file` gives first n lines of file
`wc` counts lines, words, characters
`wc -w` only outputs words

```bash
head -20 myfile.txt | wc -w
```

or:

```bash
cat myfile.txt | head -20 | wc -w
```

**e.g.** Suppose words1.txt, words2.txt, etc. contains lists of words, one per line. Print duplicate-free list of all words that occur in any of these files.

Tools:
`uniq` - removes adjacent duplicate entries
`sort` - sorts the file

```bash
cat words*.txt | sort | uniq
```

Can we use the output of one program as a parameter of another?

**e.g.**

```bash
echo "Today is $(date) and I am $(whoami)"
```

Shell executes the `date` and `whoami` and substitutes the result into the command line.

Do the quotations matter?
* Without the quotations, you are passing 7 distinct arguments.
* With the quotes, it is one argument.

**CAREFUL:** Single quotes (`'` `'`) are absolutely literal. No substitution will be made.

`echo *` prints all the files
`echo '*'` prints \*
`echo "*"` prints *
Both `""` and `''` surpress globbing.

### Pattern Matching in Text Files

`egrep` ("extended global regular expression print")

Syntax: `egrep pattern file`
Prints every line in `file` that contains `pattern`

**e.g.** Every line in `index.html` that contains `CS246`

```bash
egrep CS246 index.html
```

How many lines in `index.html` contains CS246 or cs246?
```bash
egrep "CS246|cs246" index.html | wc -l # Notice the quotations because you want | to be an or, not a pipe
```

or

```bash
egrep "(CS|cs)246" index.html | wc -l
```

Available patterns: called regular expressions (different from globbing patterns)

`(c|C)(s|S)246"` also matches cS246, Cs246

Another way of writing it:

`[cC][sS]246`

In general:

`[....]` - any character between `[` and `]`

`[^...]` - any character *except* `...`

How about `CS 246` vs `CS246`?
Add optional spaces: `[cC][sS] ?246`

* `?` - 0 or 1 of the preceding expression
* `*` - 0 or more of the preceding
	* **e.g.** `(cs)*246` matches `246`, `cs246`, `cscs246`, etc...
* `.` - any one character
* `.*` - anything
	**e.g.** `egrep "cs.*246" index.html` matches lines containing "CS(anything)246"
* `+` - 1 or more occurrences
	* **e.g.** `egrep ".+" index.html` returns any non-blank line
* `^`, `$` - Beginning and end of the line
	* **e.g.** `^cs246` - lines that start with cs246, `^cs246$` - lines exactly equal to cs246
	* **e.g.** Lines of even length: `^(..)*$`
	* **e.g.** Lines that are blank: `^$`
	* **e.g.** Files in the current directory whose names contain exactly one a: `ls | egrep "^[^a]*a[^a]*$"`
* **e.g.** All words in the global directory that start with e and have 5 characters: `egrep "^e....$" /usr/share/dict/words`

### Permissions

`ls -l`: long form listing

Format:
`-rw-r----- 1 j2smith j2smith 25 Sep 9 15:27 abc.txt`

`-`: Type
`rw-r-----`: Permissions
`1`: # of links
`j2smith`: Owner
`j2smith`: Group
`25`: Size
`Sep 9 15:27`: Last modified time
`abc.txt`: Name

**Groups:**
* A user can belong to one or more groups
* A file can be associated with one group

**Type:**
* `-`: ordinary file
* `d`: directory

**Permissions:** 3 x 3 bits
Usually of the form `rwx` `rwx` `rwx` - user, group, other, respectively. User is the owner, group is the file's group, and other is everyone else.

`r` - read bit
`w` - write bit
`x` - execute bit

| Bit | Meaning for Ordinary Files | Meaning for dir |
|---| ---| --- |
| r| file's content can be read | directory's contents can be read (e.g. `ls` works, globbing works)
|w|file's content can be modified|directory's contents can be modified (can add/remove files)
|x| file can be executed as a program | directory can be navigated (i.e., can `cd` into the directory)

What if `r` is not set, but `x` bit is?
You can't read the contents, but if you know what the files are, you can use them (like walking into a dark room)

What if the dir's `x` bit is not set? No access *at all* to the dir, nor to any file within it, nor to any subdir.


### Changing Permissions
```bash
chmod mode file
```
**Mode:**

| User Types | Operator | Permissions |
| ----- | -------- | ------------|
|`u` - user | `+` add permission | `r` - read |
|`g` - group | `-` subtract permission | `w` - write |
|`o` - other | `=` set permission exactly | `x` - execute |
|`a` - all |

**e.g.** Give other read permissions: `chmod o+r file`

**e.g** Make everyone's permissions rx: `chmod a=rx file`

**e.g.** Give the owner full control `chmod u+rwx file` or `chmod u=rwx file`
