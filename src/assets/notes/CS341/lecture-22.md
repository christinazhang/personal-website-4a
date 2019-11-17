# Lecture 22

November 23, 2017

## Circuit-SAT

![](/images/lectures/CS341/22-1.png)

- $y_1 = \lnot x_3$
- $y_2 = x_1 \lor y_1$
- $y_3 = x_2 \lor x_3$
- $y_4 = y_2 \lor x_3$
- $y_5 = \lnot y_3$
- $y_6 = y_4 \lor y_5$

We want to convert this to a 3-SAT problem.
