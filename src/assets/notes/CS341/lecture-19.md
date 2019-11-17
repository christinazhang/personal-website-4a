# Lecture 19

Prof was sick for previous lecture - go over notes

**Polynomial time** - worst case runtime is $O(n^k)$ for some constant k = "efficient"

**Decision problem** - output is YES/NO

- Given a number, is it prime?
- Given an edge-weighted graph and $k \in \mathbb{N}$, is there a MST (or TSP) of weight $\leq k$

**P** = {decision problems with polynomial time algorithms}

**Reduction** - A $\subseteq$ B for problems A, B where "A is easier than B" or "A reduces to B"

- We can make an algorithm for A using an algorithm for B.
- We write $A \leq_{P}$ B meaning we can make a polynomial algorithm for A using a polynomial algorithm for B.

## Intro to NP

There is a large class of decision problems not known to be in P but all _equivalent_ in the sense that $A \leq_{P}$ B for all A, B in the class. i.e., polynomial time algorithm for one yields a polynomial time algorithm for all.

A few problems that we went over in class:

- TSP: given edge weighted graph, number k, is there a TSP tour of weight $\leq$ k?
- independent set

Common feature: if the answer is YES, there is some succinct info (a "certificate") to _verify_ it. In particular, the TSP tour, the indep. set. Contrast this with the NO answer. A _verification algorithm_ takes input and certificate, and checks it.

**Definition:** an algorithm A is a _verficiation algorithm_ for the decision problem X if

- A takes two inputs x, y, and outputs YES or NO
- For every input x for problem x, x is a YES for x if and only if there exists a y "certificate" such that $A(x, y)$ outputs YES.

Furthermore, A is a **polynomial time verification algorithm if** (prof is going too fast help)

**NP** = {decision problems that can be verified in polynomial time} i.e, we have polynomial time verification algorithms

NP stands for "non-deterministic polynomial time"

**Example:** Subset sum $\in$ NP

Given numbers $w_1, ... w_n$ and W, is there a subset $S \subseteq \{1, ..., n\}$ such that $\sum_{i \in S} w_i = W$ not finished fml

**Example:** TSP (decision version) $\in$ NP

Given graph G, weights on edges, number k, does G have a TSP tour of length $\leq k$? Certificate: the tour, i.e. permutation of vertices.

Poly time algorithm:

- Check if it's a verification
- Didn't finish again fml

**coNP** = {decision problems where the NO instances can be verified in polynomial time?}

**e.g.** Primes: given number n, is it prime? PRimes $\in$ coNP

It's easy to verify n is _not_ prime, show natural numbers $a, b \geq 2$ s.t. $a \cdot b$ = n.

**Open Questions**

1. P =? NP
2. NP =? coNP
3. P =? NP $\cap$ coNP

**Properties**

- $P \subseteq NP$, $P \subseteq coNP$
- Any problem in NP can be solved in $O(2^n^k)$ (try all certificates)

**Definition:** a decision problem is NP-complete if:

- $X \in NP$
- For every $Y \in NP, Y \leq pX$
- i.e, X is [one of] the hardest problems in NP.

Two important implications of X being NP-Complete:

- If $X\in P$ then $P = NP$
- If X canot be solved in polynomial time, then no NP-complete problem can be solved in polynomial time
- If $X \in coNP$ then $NP = coNP$ (this needs a proof)

The first NP-completeness proof is difficult - we must show that EVERY problem $Y \in NP$ reduces to X.

Subsequent NP-completeness proofs are easier, because $\leq p$ is transitive.

So to prove Z is NP complete, we just need to prove $X \leq_p Z$ where X is a known NP-complete problem.

**Independent Set Problem**

1. Independent Set $\in$ NP
   - Certificate: the set S
   - Verification:
     - check that no edge (u,v) with u, v $\in$ S
     - check $|S| \geq k$
     - We can do these in polynomial time
2. 3-SAT $\leq_p$ Independent Set

Suppose we have a (black box) polynomial algorithm for Ind. Set, give a polynomial algorithm for 3-SAT.

- Input: 3-SAT formula F, clauses $C_1...C_m$ with variables $x_1,...,x_n$
- $C_i = (l_{i1} \lor l_{i2} \lor l_{i3})$ e.g. $(x_1 \lor \lnot x_2 \lor x_3)$
  - Create ![](/images/lectures/CS341/19-1.png) for each clause $C_i$. We have 3m vertices.
  - Example: $(x_1 \lor \lnot x_2 \lor x_3) \land (x_1 \lor x_2 \lor \lnot x_3)$ ![](/images/lectures/CS341/19-2.png)
  - Connect $x_i$ to $\lnot x_i$ every time they appear.
  - The graph for $x_i$ is a complete bipartite graph.
- Claim: F has a satisfying truth table assignment iff G has independent set of size $\geq$ m.
- Whole idea of our algorithm for 3-SAT:
  - From F, construct G.
  - Give G, m to subroutine to solve Ind.Set \* Return answer (YES/NO) from the subroutine.
- Proof of Claim:
  - => Suppose f is satisfiable. Then every clause $C_i$ has a true literal. Choose corresponding vertex in the triangle. This gives m vertices, they form an independent set.
  - <= Suppose G has an independent set of size $\geq$ m. Each triangle has at least 1 vertex, so the independent set has size = m. Make those literals TRUE. This is valid truth-value-assignment (we never set both $x_i$ and $\lnot x_i$ to TRUE). And this satisfies all clauses. \* Note: any variable not yet assigned a value can be set arbitrarily.
