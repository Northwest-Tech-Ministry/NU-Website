<template>
  <div class="container">

    <h1>Lab guidance</h1>

    <h2>Hardness of assignments</h2>

    <p>Each assignment indicates how difficult it is:</p>
    <ul>
      <li>
        <p>
          <span id="easy" class="easy">Easy</span>: less than an hour. These
          exercise are typically often warm-up exercises for
          subsequent exercises.
        </p>
      </li>

      <li>
        <p><span id="moderate" class="moderate">Moderate</span>: 1-2 hours.</p>
      </li>
      <li>
        <p>
          <span id="hard" class="hard">Hard</span>: More than 2 hours. Often
          these exercises don't require much code, but the code is
          tricky to get right.
        </p>
      </li>
    </ul>
    These times are rough estimates of our expectations. For some of the
    optional assignments we don't have a solution and the hardness is a
    wild guess. If you find yourself spending more time on an assignment
    than we expect, please reach out on piazza or come to office hours.

    <p>
      The exercises in general require not many lines of code (tens to
      a few hundred lines), but the code is conceptually complicated
      and often details matter a lot. So, make sure you do the
      assigned reading for the labs, read the relevant files through,
      consult the documentation (the RISC-V manuals etc. are on the
      <router-link  to="/reference">reference page</router-link>) before you write
      any code. Implement your solution in small steps (the
      assignments often suggest how to break the problem down) and
      test whether each step works before proceeding to the next one.
    </p>

    <div class="warning">
      <p>
        Warning: don't start a lab the night before it is due; it's
        more time-efficient to spread the work over multiple days.
        The manifestation of a bug in operating system kernel can be
        bewildering and may require much thought and careful
        debugging to understand and fix.
      </p>
    </div>

    <h2>Debugging tips</h2>

    Here are some tips for debugging:
    <ul>
      <li>
        <p>
          Make sure you understand C and pointers. The book "The C
          programming language (second edition)" by Kernighan and
          Ritchie is a succinct description of C. Have a look at
          this example
          <a href="lec/pointers.c">code</a>
          and make sure you understand why it produces the results
          it does.
        </p>

        <p>
          A few common pointer idioms are particularly worth
          remembering:
        </p>
        <ul>
          <li>
            If <code>int *p = (int*)100</code>, then
            <code>(int)p + 1</code> and
            <code>(int)(p + 1)</code> are different numbers: the
            first is <code>101</code> but the second is
            <code>104</code>. When adding an integer to a
            pointer, as in the second case, the integer is
            implicitly multiplied by the size of the object the
            pointer points to.
          </li>

          <li>
            <code>p[i]</code> is defined to be the same as
            <code>*(p+i)</code>, referring to the i'th object in
            the memory pointed to by p. The above rule for
            addition helps this definition work when the objects
            are larger than one byte.
          </li>
          <li>
            <code>&amp;p[i]</code> is the same as
            <code>(p+i)</code>, yielding the address of the i'th
            object in the memory pointed to by p.
          </li>
        </ul>

        <p>
          Although most C programs never need to cast between
          pointers and integers, operating systems frequently do.
          Whenever you see an addition involving a memory address,
          ask yourself whether it is an integer addition or
          pointer addition and make sure the value being added is
          appropriately multiplied or not.
        </p>
      </li>

      <li>
        <p>
          If you have an exercise partially working, checkpoint
          your progress by committing your code. If you break
          something later, you can then roll back to your
          checkpoint and go forward in smaller steps. To learn
          more about Git, take a look at the
          <a href="http://www.kernel.org/pub/software/scm/git/docs/user-manual.html">Git user's manual</a>, or this
          <a href="http://eagain.net/articles/git-for-computer-scientists/">CS-oriented overview of Git</a>.
        </p>
      </li>

      <li>
        <p>
          If your code fails a test, make sure you understand why.
          Insert print statements until you understand what is
          going on.
        </p>
      </li>

      <li>
        <p>
          You may find that your print statements produce a lot of
          output that you would like to search through; one way to
          do that is to run <tt>make qemu</tt> inside of
          <tt>script</tt> (run <kbd>man script</kbd> on your
          machine), which logs all console output to a file, which
          you can then search. Don't forget to exit
          <tt>script</tt>.
        </p>
      </li>

      <li>
        <p>
          Print statements are often a sufficiently powerful
          debugging tool, but sometimes being able to single step
          through some assembly code or inspect variables on the
          stack is helpful. To use gdb with xv6, run make
          <kbd>make qemu-gdb</kbd> in one window, run
          <kbd>gdb-multiarch</kbd> (or
          <kbd>riscv64-linux-gnu-gdb</kbd> or
          <kbd>riscv64-unknown-elf-gdb</kbd>) in another window
          (if you are using Athena, make sure that the two windows
          are on the same Athena machine), set a break point,
          followed by 'c' (continue), and xv6 will run until it
          hits the breakpoint. See
          <a href="lec/gdb_slides.pdf">Using the GNU Debugger</a>
          for helpful GDB tips. (If you start gdb and see a
          warning of the form 'warning: File ".../.gdbinit"
          auto-loading has been declined', edit ~/.gdbinit to add
          "add-auto-load-safe-path...", as suggested by the
          warning.)
        </p>
      </li>

      <li>
        <p>
          If you want to see what assembly code the compiler
          generates for the xv6 kernel or find out what
          instruction is at a particular kernel address, see the
          file <tt>kernel/kernel.asm</tt>, which the Makefile
          produces when it compiles the kernel. (The Makefile also
          produces <tt>.asm</tt> for all user programs.)
        </p>
      </li>

      <li>
        <p>
          If the kernel causes an unexpected fault (e.g. uses an
          invalid memory address), it will print an error message
          that includes the program counter ("sepc") at the point
          where it crashed; you can search <tt>kernel.asm</tt> to
          find the function containing that program counter, or
          you can run
          <kbd>addr2line -e kernel/kernel <i>pc-value</i></kbd>
          (run <kbd>man addr2line</kbd>
          for details). If you want a backtrace, restart using
          gdb: run 'make qemu-gdb' in one window, run gdb (or
          riscv64-linux-gnu-gdb) in another window, set breakpoint
          in panic ('b panic'), followed by followed by 'c'
          (continue). When the kernel hits the break point, type
          'bt' to get a backtrace.
        </p>
      </li>

      <li>
        <p>
          If your kernel hangs, perhaps due to a deadlock, you can
          use gdb to find out where it is hanging. Run run 'make
          qemu-gdb' in one window, run gdb (riscv64-linux-gnu-gdb)
          in another window, followed by followed by 'c'
          (continue). When the kernel appears to hang hit Ctrl-C
          in the qemu-gdb window and type 'bt' to get a backtrace.
        </p>
      </li>

      <li>
        <tt>qemu</tt> has a "monitor" that lets you query the state
        of the emulated machine. You can get at it by typing
        control-a c (the "c" is for console). A particularly useful
        monitor command is <tt>info mem</tt> to print the page
        table. You may need to use the <tt>cpu</tt> command to
        select which core <tt>info mem</tt> looks at, or you could
        start qemu with <tt>make CPUS=1 qemu</tt> to cause there to
        be just one core.
      </li>
    </ul>

    It is well worth the time learning the above-mentioned tools.
  </div>
</template>

<script>
export default {
  name: 'Guidance',
};
</script>

<style scoped>
</style>