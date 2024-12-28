<template>
  <div class="container">

    <h1>Reading Materials</h1>


    <h2>UNIX</h2>
    <ul>
      <li>
        <a href="https://www.youtube.com/watch?v=tc4ROCJYbm0">Youtube Unix intro</a>
      </li>

      <li>
        <a href="readings/ritchie78unix.pdf">
          The UNIX Time-Sharing System</a>,
        <a href="http://cm.bell-labs.com/who/dmr/">Dennis M. Ritchie</a>
        and
        <a href="http://cm.bell-labs.com/who/ken/">Ken L.Thompson</a>, Bell System Technical Journal 57, number 6, part
        2
        (July-August 1978) pages 1905-1930.
      </li>

      <li>
        <a href="http://www.read.seas.harvard.edu/~kohler/class/aosref/ritchie84evolution.pdf">
          The Evolution of the Unix Time-sharing System</a>, Dennis M. Ritchie, 1979.
      </li>

      <li>
        <i>The C programming language (second edition)</i> by
        Kernighan and Ritchie. Prentice Hall, Inc., 1988. ISBN
        0-13-110362-8, 1998.
      </li>
    </ul>

    <h2>RISC-V Emulation</h2>
    <ul>
      <li>
        <a href="http://www.qemu.org/">QEMU</a> - A fast and popular
        RISC-V platform and CPU emulator.
        <ul>
          <li>
            <a href="http://wiki.qemu.org/Qemu-doc.html">User manual</a>
          </li>
        </ul>
      </li>

      <li>
        <a href="readings/FU540-C000-v1.0.pdf">SiFive FU540-C000 Manual</a>
      </li>

      <li>
        <a href="readings/virtio-v1.1-csprd01.pdf">Virtual I/O Device (VIRTIO)</a>
      </li>
    </ul>

    <h2>RISC-V</h2>

    <ul>
      <li>
        <i>The RISC-V Reader: An open architecture atlas</i> by D.
        Patterson and A. Waterman, Strawberry Canyon, 2017.
      </li>

      <li>
        <a href="readings/unpriv-isa-asciidoc.pdf">RISC-V unprivileged instructions</a>
      </li>

      <li>
        <a href="readings/priv-isa-asciidoc.pdf">RISC-V privileged instructions</a>
      </li>

      <li>
        <a href="readings/riscv-calling.pdf">Calling conventions</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Reference',
};
</script>

<style scoped>
/* Add any relevant CSS here */
</style>