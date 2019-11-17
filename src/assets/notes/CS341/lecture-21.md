# Lecture 21

November 21, 2017

**Recall:** To show problem Z (decision problem) is NP-complete

1. $Z \in NP$
2. $X \leq_p Z$ for some known NP-complete $X$

$Z$ is NP-hard if (2) above, but not necessarily (1).

## Subset Sum

- Input: numbers $w_1, w_2, ... w_n$ and $W$
- Problem: Is there a subset $S \subseteq \{1, 2, ..., n\}$ such that $\sum_{i \in S} w_i = W$?
- Input size: $\sum_{i=1}^{n} \log w_i + \log W$
- Summary: dynamic programming algorithm $O(nW)$ ("pseudo polynomial")
- Branch and bound algorithm $O(2^n)$

**Theorem:** Subset Sum is NP-complete.

- Proof: 1. Subset Sum $\in$ NP
  - Certificate: set S
  - Verification: compute $\sum_{i \in S} w_i$ and check if that = W.
  - This takes polynomial time.
  - For input $w_1, ... w_n, W$, the answer is YES if and only if there exists a certificate that verifies the YES. 2. Show that 3-SAT $\leq_p$ Subset Sum
  - Suppose we have a polynomial time algorithm for Subset Sum.
  - Make a polynomial time algorithm for 3-SAT
  - Input: Variables $x_1, .., x_n$ and clauses $C_1, ..., C_m$
  - Idea: Transform $x_i$'s, $C_j$'s to binary numbers
  - Create a 0-1 matrix: ![](/images/lectures/CS341/21-1.png)
  - $M[x_i, C_j]$ is if $C_j$ has $x_i$
  - Issues:
    1. Ensure we pick $row x_i$ or $\neg x_i$
    2. Handle target $\geq 1$ in each column.
  - Slack row: $S_j^1$ has 1 in column $C_j$, 0's elsewhere
  - $S_j^2$ has 2 in column $C_j$, 0's elsewhere
  - Finally: W = bottom target ows as base 10 number
  - $w_i$'s: one number for each row, in base 10
  - #w's: $2n+2m$
  - #base 1- digits: $n + m$
  - Claim: The $w_i$'s and W have poly size and can be constructed in poly time
  - Claim: original formula $F$ is satisfiable iff there is subset S of $w_i$'s with sum $W$.
  - =>:
  - If $x_i$ is True then choose row $x_i$
  - If x\*i = Falsle, choose row $\lnot x_i$
  - Choose slack rows to get target $4 \forall C*j$.
  - If $C_j$ has 1 true literal, choose $S_j^1$ and $S^2_j$ - sum 4
  - If $C_j$ has 2 true literals - choose $S^2_j$ = 2 - sum 4
  - If $C_j$ has 3 true literals - choose $S_j^2(-)$
    - Then these rows sum to W.
    - <=:
      - Suppose we can choose rows to get sum W. Observe that all column sums are $\leq 6$, so no carries (base 10). Because of right columns, we must pick $x_i$ or $\lnot x_i$ row.
      - Since $\forall C_j$, slacks add to $\leq 3$ so we must have chosen a literal in $C_j\$. Therefore, truth value assignment satisfying F.

Note: All of our NP-completeness reductions use the subroutine **once** only, and return YES/NO. Do this on assignments.

## Circuit Satisfiability

Circuit-directed acyclic graph: ![](/images/lectures/CS341/21-2.png)

One **sink** (no edges out) = output

**Sources** (no edges in) labeled with variables 0 or 1.

Internal nodes:
![](/images/lectures/CS341/21-3.png)

Given 0-1 values for variables, curcuit computes 0 or 1.

**Circuit-SAT**

- Input: Circuit
- Problem: Is there an assignment of 0-1 to variables so Circuit outputs 1?

**Theorem:** Circuit SAT is NP-Complete.

1. Circuit SAT $\in$ NP - easy.
2. We must prove X $\leq_p$ Circuit-SAT for every problem X in NP.
   - Want: for every problem $X \in NP$ and input I for X, construct (in poly time) a circuit $C_I$ such taht $I$ has YES for problem X if and only if $C_I$ is satisfiable.
   - $X \in NP$:
     - So there is a verification algorithm A, taking input I for X and certificate R such that I is YES for X if and only if $\exists$ R, size($) $\leq\$ poly. size such taht A(I, R) outputs YES, and A runs in poly time.
     - Algorithm A with known input I and unknown input R can be converted to a circuit C with input variables = bits of R, such that C is satisfiable iff $\exists R$ such that $A(I, R)$ outputs YES
