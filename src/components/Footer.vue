<script setup lang="ts">
</script>

<template>
  <footer class="footer">
    <span class="footer-text">Hugo Lemieux &copy; 2025</span>
    <span class="footer-sep">/</span>
    <a href="/politique-de-confidentialite" class="footer-link">Politique de confidentialité</a>
  </footer>
</template>

<style lang="css" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  height: 3rem;
  border-top: 1px solid var(--border);
  margin-top: 4rem;
}

.footer-text {
  font-family: var(--font-text);
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.footer-sep {
  font-family: var(--font-text);
  color: var(--border-bright);
  font-size: 0.75rem;
}

.footer-link {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--primary);
}
</style>
