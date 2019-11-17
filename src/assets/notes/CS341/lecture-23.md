# Lecture 23

November 28, 2017

## Major Open Question: $P ?= NP$

If $P = NP$:
all the NP problems can be done in polynomial time.

If $P \neq NP$:
None of the NP-complete problems can be done in polynomial time.

Almost all "natural" problems in NP are known to be in P or NP-complete.

Exceptions open in Garey & Johnston '79 (very famous book on NP-completeness)

- Linear Programming (in P in 1980)
- Primality (in P in 2002)
- Graph Isomorphism - Still open
  - Given to graphs $G_1 = (V_1, E_1), G_2=(V_2, E_2)$ are they the same graph up to relabelling?

**Some interesting NP-complete problems**

1. Edge colouring:

- Colour edges of graph s.t. incident edges have different colours
- If we have degree d => need d colours
- $\delta$ = max degree => need $\delta$ colours
- Theorem (by Vizing) that minimum number of colours is either $\delta$ or $\delta + 1$

2. Eric Demaine et al. 2012

- Nintendo games are NP-hard
  - Reductions from 3-SAT

3. Minimum weight triangulation is NP-hard.

- Mulzer & Role J.ACM 2008
- Given points in plane and $k \in \mathbb{N}$ is there a triangulation with sum of edge lengths $\leq k$?

**Open Problems:** Are the following problems NP-complete?

1. Given two binary search trees on leaves 1, ..., n, and given $k \in \mathbb{N}$, can we get from one to the other using $\leq k$ rotations?
2. Given an $n \times n \times n$ Rubik's cube, can we solve it in $\leq k$ moves? - PROVED TO BE COMPLETE IN 2017!
   - "Move" - rotating a slice
   - Note: for $3 \times 3 \times 3$ the question of polynomial time algorithm is moot, because there's a finite set of possibilities.

## What to do with NP-Hard Problems

- Exhaustive search
  - These are exponential time, but try to cut down on work
- Heuristics
- Pseudo-polynomial time - not very useful
- Approximation algorithms - much more applicable!

### Approximation Algorithms

#### Example 1: Travelling Salesman

For points in a plane with Euclidean distances

![](/images/lectures/CS341/23-1.png) Complete graph, weight of edge = Euclidean distance between the points

![](/images/lectures/CS341/23-2.png) The crucial property we need: the triangle inequality from high school! $|ab| + |bc| \geq |ac|$

In general graph, the triangle inequality does not always hold: ![](/images/lectures/CS341/23-3.png)

**Approximation Algorithm:**

- Find a minimum spanning tree (using Kruskal or Prim's algorithm)
- Walk around it (traverse each edge twice)
- Take shortcuts to avoid visiting a vertex more than once

This constructs a tour in polynomial time.

![](/images/lectures/CS341/23-4.png)

Let $l$ be the length of tour found by this algorithm, and $l_{\text{TSP}}$ be the length of the minimum Travelling Salesman tour.

**Claim:** $l \leq 2l_{\text{TSP}}$

- So in polynomial time we find a tour $\leq$ 2 * minimum tour. This is an *approximation factor\* of 2 (we can improve this to 1.5)

**Proof of Claim:**

- Let $l_{\text{MST}}$ be the length of minimum spanning tree.
- $l_{\text{TSP}} \leq l_{\text{MST}}$
- Even removing an edge of the TSP tour still connects all points, and MST is still minimum weight
- $l \leq 2l_{\text{MST}}$ since we walk the MST twice and then take shortcuts.
- Then we combine: $l \leq 2l_{\text{MST}} \leq 2l_{\text{TSP}}$

#### Example 2: Vertex Cover

Pick set of vertices $C$ such that $\forall$ edges $(u, v)$, $u \in C$ or $v \in C$ or both, and minimize $|C|$

**Approximation Algorithm:**

- $C \leftarrow \emptyset, F \leftarrow E$ (F is the uncovered edges)

```none
while F is not empty
  pick e = (u, v) in F
  put u and v in C
  remove from F all edges incident to u or v
end
```

This algorithm is polynomial time. Let $C$ = vertex cover found by the algorithm, $C_{\text{OPT}}$ = a minimum vertex cover (not necessarily unique)

**Claim:** $|C| \leq 2|C_{\text{OPT}}|$

**Proof:**

- The set of edges e used by the algorithm is a _matching_ - no two edges incident to the same vertex. Let $M$ = this matching.
- $|C| = 2|M|$
- $|M| \leq |C_{\text{OPT}}|$ because each edge in M needs a different vertex to cover it.
- Combining, $|C| \leq 2|C_{\text{OPT}}|$
- So we have an approximation factor of 2.

This 2-approximation does not extend to Independent Set or Clique. (If we could, then _Theorem_ P = NP)

---

Sometimes, we can prove that a polynomial time approximation algorithm would imply that $P = NP$

**Example:** General TSP (without the triangle inequality)

Suppose there is a polynomial time algorithm for TSP that gurantees a tour of length $\leq k \cdot l_{\text{TSP}}$.

Use this to give a polynomial time algorithm for Hamiltonian Cycle

- Input: graph G, does G have a Hamiltonian Cycle?
- Make a complete graph
  - $w(u, v) = \begin{cases} 1 \text{ if } (u,v) \in E(G) \\ \text{really large if } (u, v) \notin E(G) \end{cases}$

**Claim:** G has a Hamiltonian cycle iff G' has a TSP tour of length n. From this, we can finish the proof (Anna ran out of time! See notes)
