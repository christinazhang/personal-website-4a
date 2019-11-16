# Lecture 17

## Exhaustive Search Techniques

Many practical problems seem to have no efficient algorithms - for example:

- 0-1 Knapsack
- Travelling Salesman
- Shortest simple path (maybe in a graph of negative cycles)

Options:

- Use heuristics
- Approximation algorithms
- Exact solutions - take a long time
  _ $O(2^n)$ or $O(n!)$
  _ (needed to experiment with options above)

### Backtracking

(Not the same as the one we did for dynamic programming!)

Backtracking is a systematic way to try all solutions, which is used for decision problems.

**Example:** Subset Sum - a simple decision version of knapsack.

Given elements 1, 2, ..., n with weights $w_1, ..., w_n$ and target $W$, Is there a $S \subseteq \{1, ..., n\}$ s.t. $\sum \{w_i : i \in S\} = W$?

Using the dynamic programming approach gives $O(n \cdot W)$. Today, our algorithm will give $O(2^n)$. Which is better? Depends on $W$. If $W$ has $n$ bits, then $W \approx 2^n$ so $O(2^n)$ is better.

Nobody knows a polynomial time algorithm (e.g. $O(n^3), O(n^{12})$)

Explore all subsets S:

![](/images/lectures/CS341/17-1.png)

Will add weights:

General configuration:

- $C = S, R$
- $S \subseteq \{1, ... i-1\} R = \{i, ..., n\}$

C has 2 children: ![](/images/lectures/CS341/17-2.png)

General Backtracking Algorithm - Search tree

- A = set of "active" configurations initially just the root
- $S = \emptyset, R = \{1, ..., n\}$
- while $A \neq \emptyset$
  _ $C \leftarrow$ remove configuration from A
  _ Explore C
- if C solves problem - Success
- if C is a dead end - discard it
- else generate children of C and add them to A

Our options for A:

- As a stack - DFS
  _ Size of A = height of tree
  _ For subset sum = n
- As a queue - BFS
  _ Size of A = width of tree
  _ For subset sum = $2^n$

To reduce space, we use DFS, and explore "best" configurations first - using a priority queue.

Back to Subset Sum, when is a configuration a dead end?

- if $\sum_{i \in S}w_i > W$ - discard $C$
- if $\sum_{i \in S}w_i + \sum_{i \in R}w_i < W$ - discard $C$

This completes the algorithm. Possible improvements include:

- Pick C from A more cleverly
- Pick next item from R more cleverly

---

To explore all orderings of {1, 2, ... n} (e.g. for Travelling Salesman) = permutations. n! of them.

### Branch and Bound

For optimization problems

- Want min or max solution
- Explore "best" configuration first
- "Branch" - generate children
- "Bound" - compute lower bound $l_c$
- for configuration $C$
- if $l_c >$ current min \* discard $C$

**General Branch & Bound**

```none
A - set of active configurations
keep - best solution (so far), minimum cost (so far)
while A != emptyset
  C <- remove "most promising" configuration in A
  generate children c_1, ... c_t of C
  for i = 1 ... t
    if c_i is a solution then
      if cost(c_i) < minimum cost
        update minimum cost
      else if c_i is a dead end then
        discard c_i
      else l_c_i < minimum cost
        then add c_i to A
```

**Example:** Travelling Salesman Problem

Given a graph $G = (v, E)$, weights on E, find a simple cycle that goes through every vertex and has min. sum of weights.

e.g. V = points in plane, w(e) = Euclidean distance

![](/images/lectures/CS341/17-3.png)

There are lots of contests, lots of algorithms - check out Bill Cook's website! (He did one on Pokemon Go :D)

Many approaches:

- Try permutations of vertices
- Try subsets of edges (we will be doing this one)

Branch and Bound based on choosing edges

- Configuration C = (I, E)
  _ $I \subseteq E$ - edges included
  _ $X \subseteq E$ - edges excluded \* $I \cap X = \emptyset$

![](/images/lectures/CS341/17-4.png)

Conditions for a dead end:

- I has a cycle of size < n
- I has a vertex of degree greater than 2
- E \ X - must be connected
- and more...

How to "bound" - what lower bound should we use?

- 1-tree
  _ Take MST in G \ {1}
  _ Add 2 minimum weight edges incident to 1 \* Can be found efficiently, even given I, X
- Claim for C = (I, X) \* w(min TSP tour for C) $\geq$ w(min 1-tree for C) because a TSP tour is a 1-tree.
