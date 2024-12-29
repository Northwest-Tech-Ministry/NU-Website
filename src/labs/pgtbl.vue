<template>
  <div class="container">

<h1>Lab: Page Tables [<a href="">GitHub Classroom Link</a>]</h1>

<p> In this lab you will explore page tables and modify them to
  implement common OS features.</p>

<div class="prereq">
<p>Before you start coding, read Chapter 3 of
  the <router-link to="/xv6-book">xv6 Book</router-link>, and related files:</p>

  <ul>
   <li> <tt>kernel/memlayout.h</tt>, which captures the layout of memory.</li>
	  
    <li> <tt>kernel/vm.c</tt>, which contains most virtual memory (VM) code.</li>

    <li> <tt>kernel/kalloc.c</tt>, which contains code for allocating and
    freeing physical memory.</li>
  
  </ul>
  
It may also help to consult the <a href="readings/priv-isa-asciidoc.pdf">RISC-V privileged architecture manual</a>.

</div>

<p>The lab is divided into 3 tasks:</p>
 <ul>
      <li><router-link to="#inspect">Inspect a user-process page table</router-link></li>
      <li><router-link to="#speed">Speed up system calls</router-link></li>
      <li><router-link to="#print">Print a page table</router-link></li>
 </ul>

  <h2 id="inspect">Inspect a user-process page table (<span class="easy">easy</span>)</h2>

<p>
To help you understand RISC-V page tables, your first task is to explain
the page table for a user process.</p>

<p>Run <tt>make qemu</tt> and run the user program <tt>pgtbltest</tt>.
The <tt>print_pgtbl</tt> functions prints out the page-table entries
for the first 10 and last 10 pages of the <tt>pgtbltest</tt> process
using the <tt>pgpte</tt> system call that we added to xv6 for this
lab. The output looks as follows:</p>
  <pre>
va 0 pte 0x21FCF45B pa 0x87F3D000 perm 0x5B
va 1000 pte 0x21FCE85B pa 0x87F3A000 perm 0x5B
...
va 0xFFFFD000 pte 0x0 pa 0x0 perm 0x0
va 0xFFFFE000 pte 0x21FD80C7 pa 0x87F60000 perm 0xC7
va 0xFFFFF000 pte 0x20001C4B pa 0x80007000 perm 0x4B
 </pre>

<div class="question">
For every page table entry in the <tt>print_pgtbl</tt> output, explain
what it logically contains and what its permission bits are. Figure
3.4 in the xv6 book might be helpful, although note that the figure
might have a slightly different set of pages than process that's being
inspected here.  Note that xv6 doesn't place the virtual pages
consecutively in physical memory.
</div>

<h2 id="speed">Speed up system calls (<span class="easy">easy</span>)</h2>

<p>
Some operating systems (e.g., Linux) speed up certain system calls by sharing
data in a read-only region between userspace and the kernel. This eliminates the
need for kernel crossings when performing these system calls.  To help you learn
how to insert mappings into a page table, your first task is to implement this
optimization for the <tt>getpid()</tt> system call in xv6.</p>

<div class="required">
When each process is created, map one read-only page at USYSCALL (a
virtual address defined
in <tt>memlayout.h</tt>). At the start of this page, store a <tt>struct
usyscall</tt> (also defined in <tt>memlayout.h</tt>), and initialize it to store
the PID of the current process. For this lab, <tt>ugetpid()</tt> has been
provided on the userspace side and will automatically use the USYSCALL mapping.
You will receive full credit for this part of the lab if the <tt>ugetpid</tt> test
case passes when running <tt>pgtbltest</tt>.
</div>

<p>Some hints:</p>
<ul>
  <li>Choose permission bits that allow userspace to only read the page.</li>
  <li>There are a few things that need to be done over the lifecycle of a new page.
      For inspiration, understand the trapframe handling in <tt>kernel/proc.c</tt>.</li>
</ul>
 
<div class="question">
Which other xv6 system call(s) could be made faster using this shared page?
Explain how.
</div>

<h2 id="print">Print a page table (<span class="easy">easy</span>)</h2>

<p>
To help you visualize RISC-V page tables, and perhaps
to aid future debugging, your next task is to write a function
that prints the contents of a page table.</p>

<div class="required">
  We added a system call <tt>kpgtbl()</tt>, which calls
  <tt>vmprint()</tt> in <tt>vm.c</tt>. It takes
a <tt>pagetable_t</tt> argument, and your job is to print that pagetable
in the format described below.
</div>

<p>
  When you run <tt>print_kpgtbl()</tt> test, your implementation
  should print the following output:</p>

  <pre>
page table 0x0000000087f22000
 ..0x0000000000000000: pte 0x0000000021fc7801 pa 0x0000000087f1e000
 .. ..0x0000000000000000: pte 0x0000000021fc7401 pa 0x0000000087f1d000
 .. .. ..0x0000000000000000: pte 0x0000000021fc7c5b pa 0x0000000087f1f000
 .. .. ..0x0000000000001000: pte 0x0000000021fc70d7 pa 0x0000000087f1c000
 .. .. ..0x0000000000002000: pte 0x0000000021fc6c07 pa 0x0000000087f1b000
 .. .. ..0x0000000000003000: pte 0x0000000021fc68d7 pa 0x0000000087f1a000
 ..0xffffffffc0000000: pte 0x0000000021fc8401 pa 0x0000000087f21000
 .. ..0xffffffffffe00000: pte 0x0000000021fc8001 pa 0x0000000087f20000
 .. .. ..0xffffffffffffd000: pte 0x0000000021fd4c13 pa 0x0000000087f53000
 .. .. ..0xffffffffffffe000: pte 0x0000000021fd00c7 pa 0x0000000087f40000
 .. .. ..0xfffffffffffff000: pte 0x000000002000184b pa 0x0000000080006000
  </pre>

The first line displays the argument to <tt>vmprint</tt>.
After that there is a line for each PTE, including PTEs that
refer to page-table pages deeper in the tree.
Each PTE line is indented by a number of <tt>" .."</tt> that indicates its
depth in the tree.
Each PTE line shows its virtual addresss, the pte bits, and the
physical address extracted from the PTE.
Don't print PTEs that are not valid.  In the above example, the
top-level page-table page has mappings for entries 0 and 255.  The next
level down for entry 0 has only index 0 mapped, and the bottom-level
for that index 0 has a few entries mapped.

<p>
Your code might emit different physical addresses than those shown above.
The number of entries and the virtual addresses should be the same.
</p>

<p>Some hints:</p>
<ul>
  <li>Use the macros at the end of the file kernel/riscv.h.</li>
  <li>The function <tt>freewalk</tt> may be inspirational.</li>
  <li>Use <tt>%p</tt> in your printf calls to print out full 64-bit hex PTEs and addresses as shown in the example.</li>
</ul>

<div class="question">
For every leaf page in the <tt>vmprint</tt> output, explain what it logically
contains and what its permission bits are, and how it relates to the
output of the earlier <tt>print_pgtbl()</tt> exercise above.
Figure 3.4 in the xv6 book might be helpful, although note that the figure might
have a slightly different set of pages than the process that's being inspected here.
</div>

<h2>Submit the lab</h2>

<p>Please run <kbd>make grade</kbd> to ensure that your code passes all of the tests.</p>

<p>You should submit using GitHub Desktop and then check the website to ensure all the code was pushed.</p>
</div>
</template>

<script>
export default {
name: 'Pgtbl',
};


</script>

<style scoped>
/* Add any relevant CSS here */
</style>

