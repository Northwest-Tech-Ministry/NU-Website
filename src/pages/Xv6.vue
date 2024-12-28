<template>
  <div class="container">
    <h1>Xv6, a simple Unix-like teaching operating system</h1>

    <h2>Introduction</h2>

    Xv6 is a teaching operating system developed in the summer of 2006
    by MIT and subsequently ported to RISC-V.

    <h2>Xv6 sources and text</h2>

    The xv6 source and text are available via
    <pre>git clone https://github.com/mit-pdos/xv6-riscv.git</pre>
    and
    <pre>git clone https://github.com/mit-pdos/xv6-riscv-book.git</pre>

    <a name="v6"></a>
    <h2>Unix Version 6</h2>

    <p>xv6 is inspired by Unix V6 and by:</p>

    <ul>
      <li>
        Lions' <i>Commentary on UNIX' 6th Edition</i>, John Lions,
        Peer to Peer Communications; ISBN: 1-57398-013-7; 1st
        edition (June 14, 2000).
        <ul>
          <li>
            An on-line version of the
            <a href="http://www.lemis.com/grog/Documentation/Lions/">Lions commentary</a>, and
            <a href="http://v6.cuzuco.com/">the source code</a>.
          </li>

          <li>
            The v6 source code is also available
            <a href="http://minnie.tuhs.org/cgi-bin/utree.pl?file=V6">online</a>
            through
            <a href="http://www.tuhs.org/">The Unix Heritage Society</a>.
          </li>
        </ul>
      </li>
    </ul>

    The following are useful to read the original code:
    <ul>
      <li>
        <i> The PDP11/40 Processor Handbook</i>, Digital Equipment
        Corporation, 1972.
        <ul>
          <li>
            A
            <a href="http://pdos.csail.mit.edu/6.828/2005/readings/pdp11-40.pdf">PDF</a>
            (made from scanned images, and not text-searchable)
          </li>

          <li>
            A
            <a href="http://pdos.csail.mit.edu/6.828/2005/pdp11/">web-based version</a>
            that is indexed by instruction name.
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Xv6',
};
</script>

<style scoped>
/* Add any relevant CSS here */
</style>