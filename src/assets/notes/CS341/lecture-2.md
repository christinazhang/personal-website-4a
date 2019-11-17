# Lecture 2

September 12, 2017

## Models of Computing

General purpose models ( can do anything a real computer can)

**I. Pseudocode, each line counts as 1 step.**

Careful: e.g., initializing an array might be 1 line of pseudocode, but we should count it as the length of the array.

This reflects reality _so long as the numbers are not too big._

e.g. Fibonacci numbers (0, 1, 2, 3, 5, 8, ...)

To compute $f_n = f_{n-1} + f_{n-2}$ (use n variables, don't use recursion)
n steps, _but_ the numbers grow so quickly that this is not a good measure. For example, n = 47 will cause overflow 32-bit words.

Example: a \* b: how many bits are in a? $\lfloor log_2(a) + 1 \rfloor$

Takes $O((\log a)(\log b))$ bit operations. We will see a better methods.

To be more formal:

**II. RAM - Random Access Machine - abstracts assembly language**

"Random access" - access memory location i at unit cost.
word RAM - each memory location holds 1 word, each word with >= log_n bits, where n=input size

**III. Circuit Family - abstract circuitry**

**IV. Turing machine - abstracts human computing with pencil & paper**

#### Special purpose models

e.g.

- Sorting using only comparisons
- Arithmetic models

**Our model in this course:** pseudocode & be careful about large numbers.

## Running Time

![](/images/lectures/CS341/2-1.png)

for #4 - Different inputs of size n may take different time

We start with 4. to define things:

4: $T_{A = \text{algorithm}}(I = \text{input})$ - running time (= # steps of pseudocode) on input I.

3: Worst case analysis

$T_A(n = \text{size of input})$ = $max{(T_A(I))}$: I is an input of size n

Average case analysis - replace Max by Avg

Expected case analysis of randomized algos - will define later

### Asymptotic Analysis

How to get to model 1. We want an easy expression, like $n^2$.

Want machine independent, so $5n^2 = 100n^2$.

Thus $100n^2 + 21n \leq 100n^2 + 21n^2 = 121n^2$ Remember that we ignore lower order terms.

**Definition:** Big-O
Let $f(n), g(n)$ be functions from $\mathbb{N} \to \mathbb{R}_{\geq 0}$

$f(n) \text{is} O(g(n))$ if there exists constants $c, n_o$ such that $f(n) \leq c \times g(n) \forall n \geq n_0$.

**Notation:** $f(n) \in O(g(n))$ is preferred.

Examples:

- $5n^2 + 3n - 25 \in O(n^2)$
- $10^{100}n \in O(n)$
- $\log n \in O(n)$, but $n \notin O(\log n)$
- $2^{n+1} (= 2^n(2) \in O(2^n)$
- $(n+1)! \notin O(n!)$

Properties:
$f(n) + g(n) \in O(\max{(f(n), g(n))})$

$f(n) \in O(g(n))$ and $g(n) \in O(h(n))$ then $f(n) \in O(h(n))$

Examples:

- $5n^2 + 3n - 25 \in O(n^2)$
- $n^2 \in O(5n^2 + 3n - 25)$

**Definitions**

$f(n)$ is $\Omega(g(n))$ if $\exists c, n_0$ such that $f(n) \geq c \times g(n), \forall n \geq n_0$

$f(n)$ is $\Theta(g(n))$ if $f(n)$ is $O(g(n))$ AND $\Omega(g(n))$

$f(n)$ is $o(g(n))$ if for every constant $c$, there is an $n_0$ such that $f(n) \geq c \times g(n) \forall n \geq n_0$

Equivalently, $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$

Quick ref:

- $O$ is like $\leq$
- $\Omega$ is like $\geq$
- $\Theta$ is like $=$
- $o$ is like $<$

One difference: For any 2 numbers $x, y$ $x \leq y$ OR $y \geq x$

BUT there are $f(n), g(n)$ such that

- $f(n) \notin O(g(n))$
- $g(n) \notin O(f(n))$

## Comparing Algorithms

If Algo A has worst case run time $O(n^2)$ and Algo B has worst case run time $O(n \log(n))$

Which algorithm is better? We don't know. Like $x \leq 5, y \leq 10$, which is smaller?

To compare algorithms, we need $\Theta$ bounds.

**Typical run times and how they compare:**

$n^2, n \log n, \log n, n^3, n!, 2^n$

Use $f << g$ to mean $f$ is $o(g)$.

$1 << \log n << \log^2(n) << \sqrt{n} << n << n \log n << n^2 << n^3 << 2^n << n!$
