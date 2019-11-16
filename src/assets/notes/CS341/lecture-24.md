# Lecture 24

November 30, 2017

## Undecidability

So far in this course, we've covered:

- Algorithms, efficiency, polynomial vs. exponential time
- Bad news: some problems seem to have only exponential time algorithms (NP-complete problems)

Next in this course we have worse news: some problems have _no_ algorithms.

### Examples

1. **Program Equivalence:** Given two programs, do they do the same thing? (i.e. produce the same output for the same input)
2. **Tiling:** Given a finite set of tiles with coloured edges, can you tile the plane? Colours must match when tiles touch. You can't rotate tiles, and you can use infinitely many copies of each tile.
3. **Halting Problem:** Given a program, does it halt?

**Definition:** A decision problem is _undecideable_ if it has no algorithm.

**Definition:** (More general, not just for decision problems) a problem is _unsolvable_ if it has no algorithm.

What is an algorithm? As we discussed before, any of the following are all equivalent

- Java/C programs
- Pseudocode
- Random Access Machine
- Turing Machine

We will be studying some undecideable problems.

## History of Undecideability

- Gottlob Frege
  - Tried to put all of mathematics on a firm foundation
  - Foiled by Russell's paradox
  - Tried to formulate a set of axioms (Peano arithmetic, set theory, etc) such that every true mathematic statement could be proved from the axioms using basic rules of logic
- Russel's Paradox
  - Let $S$ = the set of all sets that do not contain themselves
  - Is $S$ a member of itself?
  - Either Yes or No gives a contradiction.
- Once a system is powerful enough, you can get self-references that lead to contradictions.
  - Set theory - what is a set? collection of things? too powerful!
- Anna thinks they should make a movie about Betrand Russell :)
  - Had 3 wives
  - Went to jail for being a pacifist
  - Wrote math in jail
- Hilbert
  - Is mathematics complete?
  - Is mathematics consistent?
  - Is mathematics decidable?
- Goedel
  - Every sufficiently powerful mathematical system is either inconsistent or incomplete
  - Such a system cannot be proved consistent within its own axioms
  - Last one remained open
- Alan Turing

## Proof of the Halting Problem

Given an algorithm/program A and input w, does A halt on w?

Main idea used in the proof: self reference to get a contradiction as in Russell's paradox.

**Proof** by contradiction:

- Suppose there is a program H for the halting problem.
  - Input for H: program A and input w.
  - Output: YES/NO, does A halt on w.
- Can we have a program as input? Sure, compilers do it all the time.
- Out of H, we can make a new program H'
  - Input for H': a program B:
  ```none
  begin
    call H(B,B)
    if it returns NO then halt
    else loop forever
  end
  ```
  - H' is like Russell's set S.
  - Russel's question (Does S contain S?) becomes: Does H' halt on input H'?

---

**Theorem:** Let P, Q be decision problems. If P is undicidable and $P \leq Q$ then Q is undecideable.

## More Undecideable Problems

- The **Halt-no-input** problem: Given a program A (no input), does A halt?
  - **Theorem:** Halt-no-input is undecidable
  - Proof: We will show Halting Problem $\leq$ Halt-no-input
    - Suppose we have an algorithm X to decide Halt-no-input.
      - i.e. Input for X: program A
      - Output: YES/NO - does A halt?
    - Input: Program B, input w
    - Output: YES/NO - does B halt on input W
    ```none
    begin
      modify the code to make a program B' that has w hardcoded inside it and runs B on w.
      call X(B')
      output the YES/NO answer
    end
    ```
- **Program Verification** - given a program and specification of inputs and corresponding outputs, does the program meet the specifications? Note that we need a finite specification of inputs and outputs.
  - Theorem: Program Verification is undecidable.
  - Proof: Halt-no-input $\leq$ Program Verification
    - Assume we have an algorithm V that decides Program Verification.
    - Input: program + input/output specs
    - Output: YES/NO - does the program meet the specs?
  - We want an algorithm to decide Halt-no-input
    - Input: program A
    - Output YES/NO - does A halt?
    - Algorithm:
      1. Modify program A as follows: (don't run it, just change the code)
      - read input (and ignore it)
      - call A (with no input)
      - output 1
      2. Call V(A', specs: output is 1 for all input)
      3. Output the YES/NO answer.
    - Correctness:
      - Claim: This algorithm correctly deicdes Halt-no-input. i.e., V(A', output is 1 for all input) = YES iff A halts.
      - Proof: V outputs YES => A' outputs 1 for any input => A halts
      - A halts => A' outputs 1 for any input => V outputs YES

### Other Undecidable Problems (no proofs)

1. Given a finite set $L$ of 3x3 matrices over $\mathbb{Z}$ can the 0 matrix can be written as a product (duplicates allowed) of matrices from L?
2. Recall Context-Free Grammars

- Sentence: noun-phase, verb-phrase
- Noun-phrase: adjectives, noun
- Noun: car | house | flower
- Adjectives: Adjective, Adjectives | empty
- Adjective: red | big | blue
- Used to specify syntax of programming languages and as a basis for parsing
- Undecidable: given two CFGs, do they generate the same set of strings?

3. Hilbert's 10th problem: given a polynomial $P(x_1, ..., x_n)$ in n variables with integer coefficients, does $P(x_1, ..., x_n) = 0$ have a solution in integers?

---

Are there interesting classes between P and decidable?

$P \subseteq NP \subseteq$ Polynomial Space (PSPACE) $\subseteq$ Exponential time (EXP TIME) $\subsetneq$ decidable

Known: $P \neq EXP$, but everything else is open.

Is P = PSPACE?
