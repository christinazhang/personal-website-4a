# Lecture 6

September 26, 2017

## Greedy Algorithms

### Making Change

Say we want to make change for \$3.47. (Pennies still exist in this example) We would use:

- 1 x \$2
- 1 x \$1
- 1 x 25 cents
- 2 x 10 cents
- 2 x 1 cent

This is an example of the greedy algorithm - where we use as many of the biggest denomination we can, and work down from there. This results in _7 coins_. Can we use fewer than 7 coins?

With the Canadian/US Coin system, the greedy algorithm will always result in the minimum amount of coins. Proof is left as a (very difficult) exercise.

What about other coin systems? Consider a world where there are only 1, 3, and 4 cent coins. If we wanted to make change for 6 cents, the greedy algorithm would do 1 x 4 cents and 2 x 1 cent, which is 3 coins.

The optimal solution, however, would be to use 2 x 3 cent coins.

### Interval Scheduling

Given a set of activities, each with start, end times, select maximum subset, such that no 2 overlap.

![](/images/lectures/CS341/6-1.png)

The maximum we can choose here is 3.

**Greedy approaches to this problem**

- Pick shortest activity first
  - Counterexample:
    ![](/images/lectures/CS341/6-2.png)
  - The above is not optimal.
- Sort by start time
  - Counterexample: The bike trip in the first image would be chosen first.
- Sort by end time
  - This works on our example - we'll prove that this gives the maximum number of activities.
- Pick the interval with fewest conflicts
  - Counterexample:
    ![](/images/lectures/CS341/6-3.png)

**Proof that sorting by end time works:**

Let $A = \{a_1, a_2, ... a_k\}$ be the solution we get from greedy, sorted by end time. Compared to any other solution $B = \{b_1, b_2, ..., b_l\}$ sorted by end time. We will show that $k \geq l$.

A's are always "ahead" or better.

_Claim:_ $\forall i a_1,  ..., a_i, b_{i+1}, ..., b_l$ is a solution by induction on $i$.

_Basis:_ $i = 1$ $a_1, b_2, b_3, ... b_l$ is a solution.

![](/images/lectures/CS341/6-4.png)

$a_1$ ends $\leq$ b_1 ends, so $a_1, b_2, b_3, ... b_l$ is a solution.

_General Case:_
Suppose $a_i,...,a{i-1},b{i},...$ is a solution.

![](/images/lectures/CS341/6-5.png)

$a_i$ starts after $a{i-1}$ ends before $b_i$ So $a_1...a_i,b_{i+1}...$ is a solution.

At the end of induction we get the solution with all a's i.e. we run out of b's so $k \geq l$.

The proof in the notes is done by contradiction, which may be clearer. Gist:

Assume $k < l$, then swapping gives $a_1, ... a_k, b_{k+1}, ... b_l$ so greedy could keep going, a contradiction.

**Pseudocode:**

Sort activities $a_1, ..., a_n$

$A \leftarrow \phi$

```none
for i = 1 ... n
	if a_1 does not overlap with any activities in A (only check the last one)
	then A <- A U {a_i}
```

$\Theta(n \log n) \text{ (sort) } + \Theta(n) \text{ (for loop)} = \Theta(n \log n)$

### Scheduling to Minimize Lateness

Imagine we have some assignments:

| Assignments | Time required | Due         |
| ----------- | ------------- | ----------- |
| CS341       | 4 hours       | in 9 hours  |
| Philosophy  | 3 hours       | in 14 hours |
| CS350       | 10 hours      | in 25 hours |

We will not be taking sleep or eating into account for this example :'( Can you do everything by its deadline?

As optimization: allows lateness but minimize maximum lateness of any assignment. Then all assignments are done by deadline if and only if optimization is 0.

![](/images/lectures/CS341/6-6.png) $d_i$ = deadline for job $i$

For given ordering of jobs, $l(i)$ = lateness of job i

Objective: min max $\{l(i)\}$

Possibilities:

- Swapping jobs
- Do all jobs in order by earliest deadline

Claim: Doing jobs in order by earliest deadline is the best solution. How do we prove this? Some advice: always start small. Let's first look at 2 jobs.

Consider the above example:

$l_G$ - lateness with greedy, $l_O$ - lateness with other solution

$l_G = \max \{l_G(1), l_G(2)\}$

$l_O = \max \{l_O(1), l_O(2)\}$

Goal: $l_G \leq l_O$

$l_G(1) \leq l_O(1)$ because G does job 1 first.

$l_G(2) \leq l_O(1)$ because $d_1 \leq d_2$

$l_G = max\{l_G(1), l_G(2)\} \leq l_O(1) \leq \max\{l_O(1), l_O(2)\} = l_O$

**General Proof:** This is known as an "exchange" proof.

Convert any solution to Greedy Solution such that max lateness never goes up

Let $1, ..., n$ be order of jobs by greedy, i.e. $d_1 \leq d_2 \leq ... \leq d_n$

Consider any other ordering.

Claim: We can get to greedy by swappign 2 jobs i, j - consecutive in current order but with $d_j < d_i$

Aside: Can sort by swapping adjacent pairs (Bubble sort!)

So we just need to analyze what happens when we swap 2 consecutive jobs.

![](/images/lectures/CS341/6-7.png)

$l_N(j) \leq l_O(j)$ because j is now earlier

$l_N(i) \leq l_O(j)$ because $d_1 \leq d_2$

Other jobs have the same lateness. $l_N \leq l_O$

QED
