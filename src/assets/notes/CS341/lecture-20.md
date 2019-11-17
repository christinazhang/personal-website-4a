# Lecture 20

**Definition:** Problem X is \_NP-complete- if:

1. $X \in NP$
2. $Y \leq_p X$ for all Y in NP.

**Satisfiability:** 3-SAT is NP-complete.

To show that problem Z is NP-complete:

1. $Z \in NP$
2. $X \leq_p Z$ for some known NP-complete problem X.

Last lecture, we showed that the Independent Set is NP-complete via 3-SAT $\leq_p$ Independent Set.

Independent Set: Given graph $G, k \in \mathbb{N}$ does $G$ have an independent set of size $\geq k$? ![](/images/lectures/CS341/20-1.png)

Clique: Given graph $G, k \in \mathbb{N}$, does $G$ have a clique of size $\geq$ k? ![](/images/lectures/CS341/20-2.png)

**Theorem:** Clique problem is NP-complete

**Proof:**

1. Clique $\in$ NP.

- certificate: vertices of clique
- verification algorithm:
  - check $\geq k$ vertices
  - check every pair joined by edge \* can be done in polynomial time

2. $X \leq_p$ Clique.

- For X a known NP-complete problem, (X = Independent Set) \* Prove that if there is a polynomial algorithm for Clique, then there is a polynomial time algorithm for Independent Set.
- Algorithm for Independent Set (Using subroutine for Clique)
  - Input: Graph G, $k \in \mathbb{N}$
  - Idea: find a Clique in the complement of G. I will not be drawing a complement of G, because I don't hate myself.
  - Construct $G^c$ - complement of G where we replace edges by non-edges
  - $(u, v) \in E(G)$ iff $(u, v) \notin E(G^c)$
  - Give $G^c, k$ to the Clique subroutine.
  - Return the YES/NO answer.
- This algorithm takes polynomial time.
- Correctness: \* Claim: G has independent set of size $\geq k$ iff $G^c$ has a clique of size $\geq k$. Proof: see notes

**Vertex Cover:** Given graph $G, k \in \mathbb{n}$, does G have a \_vertex cover- of size $\leq k$. Vertex cover - a set of vertices $C$ such that $\forall$ edges (u,v) $u \in c$ or $v\in C$ (or both)

**Theorem:** Vertex Cover is NP-Complete.

**Proof:**

1. Vertex Cover $\in$ NP

- Certificate: set of vertices C
- Verification: $|C| \leq k$
  - and for every edge at least one endpoint is in C
  - This can be done in poly time.

2. Independent Set $\leq_p$ Vertex Cover

- Suppose we have a polynomial time algorithm for Vertex Cover, we will create a polynomial time algorithm for Independent Set.
- Claim: C is a vertex cover iff V \ C is an independent set. (proof is an exercise)
- Algorithm:
  - Give G, n-k as input to Vertex Cover subroutine
  - Return YES/NO answer. \* Poly time algorithm

Road map of NP-completeness:

- Circuit-SAT $\leq_p$:
  - 3-SAT $\leq_p$:
  - Independent Set $\leq_p$:
  - Clique
  - Vertex Cover
  - Hamiltonian Cycle $\leq_p$:
  - TSP \* Subset Sum

**Directed Hamiltonian Cycle**

- Input: digraph
- Question: is there a directed cycle going through every vertex once
  **Theorem:** Directed Hamiltonian Cycle is NP-compete

Proof:

1. Directed Hamiltonian Cycle $\in$ NP
   - Certificate: the ordered list of vertices
   - Verification:
     - Every vertex appears once
     - All edges between consecutive pairs & last vertex to first vertex
       - This can be done in polynomial time
2. 3-SAT $\leq_p$ Directed Hamiltonian Cycle
   - Suppose we have a polynomial time algorithm for Directed Hamiltonian Cycle. Design an algorithm for 3-SAT
     - Input: Clauses $C_1, C_2, ..., C_m, C_i = (l_{i1} \lor l_{i2} \lor l_{i3})$ Variables $x_1 .. x_n$
     - Claim: Any directed Hamiltonian Cycle follwos $x_i$ chain of bubbles forward or backward
     - We must add structure for clauses.
     - Idea: for the Hamiltonian cycle to visit C, it must use a forward $x_1$ bubble ($x_1 is true) or a backward $x\*2$ bubble ($x_2$ false) or forward $x_3$ bubble ($x_3\$ true)
     - For details of proof and all the crazy bubble diagrams I did not draw, see notes.
       \- Claim: this graph has directed Hamiltonian cycle iff the 3-SAT input is satisfiable.

**Theorem:** undirected Hamiltonian Cycle is NP-complete

**Proof:**

1. $\in$ NP
2. Directed Hamiltonian Cycle $\leq_p$ Undirected Hamiltonian Cycle

**Idea:** Replace each vertex with a 2-edge
