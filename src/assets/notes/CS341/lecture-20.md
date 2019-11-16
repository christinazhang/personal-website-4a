# Lecture 20

**Definition:** Problem X is _NP-complete_ if:

1. $X \in NP$
2. $Y \leq_p X$ for all Y in NP.

**Satisfiability:** 3-SAT is NP-complete.

To show that problem Z is NP-complete:

1. $Z \in NP$
2. $X \leq_p Z$ for some known NP-complete problem X.

Last lecture, we showed that the Independent Set is NP-complete via 3-SAT $\leq_p$ Independent Set.

Independent Set: Given graph $G, k \in \mathbb{N}$ does $G$ have an independent set of size $\geq k$? ![](https://i.imgur.com/G68BSQN.png)

Clique: Given graph $G, k \in \mathbb{N}$, does $G$ have a clique of size $\geq$ k? ![](https://i.imgur.com/t0DgSFf.png)

**Theorem:** Clique problem is NP-complete

**Proof:**

1. Clique $\in$ NP.

- certificate: vertices of clique
- verification algorithm:
  _ check $\geq k$ vertices
  _ check every pair joined by edge \* can be done in polynomial time

2. $X \leq_p$ Clique.

- For X a known NP-complete problem, (X = Independent Set) \* Prove that if there is a polynomial algorithm for Clique, then there is a polynomial time algorithm for Independent Set.
- Algorithm for Independent Set (Using subroutine for Clique)
  _ Input: Graph G, $k \in \mathBB{N}$
  _ Idea: find a Clique in the complement of G. I will not be drawing a complement of G, because I don't hate myself.
  _ Construct $G^c$ - complement of G where we replace edges by non-edges
  _ $(u, v) \in E(G)$ iff $(u, v) \notin E(G^c)$
  _ Give $G^c, k$ to the Clique subroutine.
  _ Return the YES/NO answer.
- This algorithm takes polynomial time.
- Correctness: \* Claim: G has independent set of size $\geq k$ iff $G^c$ has a clique of size $\geq k$. Proof: see notes

**Vertex Cover:** Given graph $G, k \in \mathbb{n}$, does G have a _vertex cover_ of size $\leq k$. Vertex cover - a set of vertices $C$ such that $\forall$ edges (u,v) $u \in c$ or $v\in C$ (or both)

**Theorem:** Vertex Cover is NP-Complete.

**Proof:**

1. Vertex Cover $\in$ NP

- Certificate: set of vertices C
- Verification: $|C| \leq k$
  _ and for every edge at least one endpoint is in C
  _ This can be done in poly time.

2. Independent Set $\leq_p$ Vertex Cover

- Suppose we have a polynomial time algorithm for Vertex Cover, we will create a polynomial time algorithm for Independent Set.
- Claim: C is a vertex cover iff V \ C is an independent set. (proof is an exercise)
- Algorithm:
  _ Give G, n-k as input to Vertex Cover subroutine
  _ Return YES/NO answer. \* Poly time algorithm

Road map of NP-completeness:

- Circuit-SAT $\leq_p$:
  _ 3-SAT $\leq_p$:
  _ Independent Set $\leq_p$:
  _ Clique
  _ Vertex Cover
  _ Hamiltonian Cycle $\leq_p$:
  _ TSP \* Subset Sum

**Directed Hamiltonian Cycle**

- Input: digraph
- Question: is there a directed cycle going through every vertex once
  **Theorem:** Directed Hamiltonian Cycle is NP-compete

Proof:

1. Directed Hamiltonian Cycle $\in$ NP
   - Certificate: the ordered list of vertices
   - Verification:
     _ Every vertex appears once
     _ All edges between consecutive pairs & last vertex to first vertex \* This can be done in polynomial time
2. 3-SAT $\leq_p$ Directed Hamiltonian Cycle
   - Suppose we have a polynomial time algorithm for Directed Hamiltonian Cycle. Design an algorithm for 3-SAT
     _ Input: Clauses $C_1, C_2, ..., C_m, C_i = (l_i_1 \lor \l_i_2 \lor l_i_3)$ Variables $x_1 .. x_n$
     _ Claim: Any directed Hamiltonian Cycle follwos $x_i$ chain of bubbles forward or backward
     _ We must add structure for clauses.
     _ Idea: for the Hamiltonian cycle to visit C, it must use a forward $x_1$ bubble ($x_1 is true) or a backward $x_2$ bubble ($x_2$ false) or forward $x_3$ bubble ($x_3\$ true)
     _ For details of proof and all the crazy bubble diagrams I did not draw, see notes.
     _ Claim: this graph has directed Hamiltonian cycle iff the 3-SAT input is satisfiable.

**Theorem:** undirected Hamiltonian Cycle is NP-complete

**Proof:**

1. $\in$ NP
2. Directed Hamiltonian Cycle $\leq_p$ Undirected Hamiltonian Cycle

**Idea:** Replace each vertex with a 2-edge thing (draw later)
