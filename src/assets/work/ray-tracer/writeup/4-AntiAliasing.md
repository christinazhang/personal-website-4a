#

Within each pixel, several rays are sent out (according to a jittered pattern) and the colours are compared against one another. If the difference between two colours is greater than a defined threshold, then the grid is subdivided and sampled from again.

This feature plagued my Google search history with queries such as "How to tell two colours are different," which only led me to colour blindness tests. But _eventually_, I got term I was looking for: [colour difference](https://en.wikipedia.org/wiki/Color_difference).

The 2nd and 4th images are regular supersampling and adaptive supersampling on a 4x4 grid, respectively. While virtually indistinguishable, the render time for the regularly supersampled image was 45.49 seconds, while the adaptively supersampled one was just 15.93 seconds.

## Depth of Field
