<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import Typed from "typed.js";
import Modal from "./Modal.vue";
import emailjs from "@emailjs/browser";
import { useToast, TYPE } from "vue-toastification";
import { cardsData } from "../data/cardsData.js";

// Typed.js setup
const typedEl = ref<HTMLElement | null>(null);
let typed: Typed | null = null;

onMounted(() => {
  typed = new Typed(typedEl.value!, {
    strings: [
      "développeur frontend depuis 7 ans.",
      "pigiste.",
      "passionné de web &amp; d'automatisation.",
    ],
    typeSpeed: 45,
    backSpeed: 25,
    backDelay: 2500,
    loop: true,
    showCursor: true,
    cursorChar: "█",
  });
});

onBeforeUnmount(() => {
  typed?.destroy();
});

// Contact form
const toast = useToast();
const politique_checkbox = ref(false);
const contactForm = ref<HTMLFormElement>();
let title = ref<string>("");
let message = ref<string>("");
const error = ref<boolean>(true);
const honeypot = ref("");

const validateField = (e: Event) => {
  error.value = false;
  const inputElement = e.target as HTMLInputElement;
  if (
    inputElement.value === "" ||
    inputElement.value === null ||
    !politique_checkbox.value
  ) {
    error.value = true;
  }
};

const resetFields = () => {
  contactForm.value?.reset();
};

const sendEmail = async () => {
  if (honeypot.value !== "") {
    toast.error("Something went wrong...", { type: TYPE.ERROR });
    return;
  }
  if (!error.value) {
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        contactForm.value ?? "",
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY } as any
      )
      .then(
        () => {
          toast.success("Message envoyé avec succès!", {
            type: TYPE.SUCCESS,
            timeout: 5000,
          });
          resetFields();
        },
        (err: any) => {
          toast.error("Un problème est survenu, veuillez réessayer plus tard...", {
            type: TYPE.ERROR,
          });
          console.log(err);
        }
      );
  }
};

// Modal
const modalComponent = ref<InstanceType<typeof Modal>>();
const clickedCardId = ref<string>("");

const showModal = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement;
  clickedCardId.value = target.dataset.text || "";
  const cardInfos = cardsData.filter((card: any) => card.id === clickedCardId.value);
  title.value = cardInfos[0].title;
  message.value = cardInfos[0].message;
  modalComponent.value?.openDialog();
};

const services = [
  { id: "appWeb", label: "Applications web personnalisées" },
  { id: "siteWeb", label: "Création de site web" },
  { id: "rd", label: "Appui à la R&D" },
];

const steps = [
  { id: "step1", num: "01", label: "Rencontre initiale" },
  { id: "step2", num: "02", label: "Envoi de la soumission" },
  { id: "step3", num: "03", label: "Développement" },
  { id: "step4", num: "04", label: "Ajustements & livraison" },
];
</script>

<template>
  <!-- Hero -->
  <section
    class="hero"
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }"
  >
    <div class="hero-label">
      <span class="label-dot"></span>
      <span class="label-text">Disponible pour de nouveaux projets</span>
    </div>
    <h1>
      Salut, moi c'est<br />
      <span class="gradient-text">Hugo Lemieux.</span>
    </h1>
    <p class="hero-sub">
      Développeur depuis 10 ans —&nbsp;<span ref="typedEl"></span>
    </p>
    <div class="hero-actions">
      <a href="/projects" class="btn-primary">Voir mes projets</a>
    </div>
  </section>

  <!-- Services -->
  <section class="content-section" ref="services-section">
    <div
      class="section-header"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    >
      <span class="section-tag">// services</span>
      <h2>Qu'est-ce que j'offre?</h2>
      <p>Mon expertise à votre service pour réaliser vos projets.</p>
    </div>
    <div class="cards-grid">
      <div
        v-for="(service, index) in services"
        :key="service.id"
        class="card"
        :data-text="service.id"
        @click="showModal($event)"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { delay: index * 120, duration: 600 } }"
      >
        <div class="card-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="16 18 22 12 16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="8 6 2 12 8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>{{ service.label }}</h3>
        <div class="card-footer">
          <span class="card-more">En savoir plus</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  </section>

  <!-- Process steps -->
  <section class="content-section">
    <div
      class="section-header"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    >
      <span class="section-tag">// processus</span>
      <h2>Les étapes du projet</h2>
      <p>Tous les projets sont personnalisés selon vos besoins et votre réalité.</p>
    </div>
    <div class="steps-grid">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        class="step-card"
        :data-text="step.id"
        @click="showModal($event)"
        v-motion
        :initial="{ opacity: 0, x: -20 }"
        :visibleOnce="{ opacity: 1, x: 0, transition: { delay: index * 100, duration: 550 } }"
      >
        <span class="step-num">{{ step.num }}</span>
        <div class="step-body">
          <h3>{{ step.label }}</h3>
          <span class="step-more">Voir les détails →</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section class="content-section" id="contact">
    <div
      class="section-header"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    >
      <span class="section-tag">// contact</span>
      <h2>On travaille ensemble?</h2>
      <p>Parlez-moi de votre projet et je vous reviens rapidement.</p>
    </div>
    <div
      class="form-wrapper"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 150, duration: 600 } }"
    >
      <form class="contact-form" ref="contactForm" @submit.prevent="sendEmail">
        <div class="form-row">
          <input
            required
            type="text"
            placeholder="Nom"
            name="contact_name"
            @blur="validateField($event)"
          />
          <input
            required
            type="email"
            placeholder="Courriel"
            name="contact_email"
            @blur="validateField($event)"
          />
        </div>
        <textarea
          required
          placeholder="Message"
          name="message"
          rows="5"
          @blur="validateField($event)"
        ></textarea>
        <label class="consent-label">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            v-model="politique_checkbox"
            @change="validateField"
            required
          />
          <span>
            En cochant cette case, j'autorise Hugo Lemieux à conserver et traiter mes
            renseignements personnels afin de répondre à ma demande.
            <a href="/politique-de-confidentialite">Politique de confidentialité</a>.
          </span>
        </label>
        <input type="text" name="website" autocomplete="off" tabindex="-1" class="honeypot" v-model="honeypot" />
        <button type="submit" class="submit-btn">Soumettre</button>
      </form>
    </div>
  </section>

  <Modal page="home" ref="modalComponent">
    <template #title>
      <h2>{{ title }}</h2>
    </template>
    <template #content>
      <p class="modal">{{ message }}</p>
    </template>
  </Modal>
</template>

<style scoped lang="css">
/* ── Hero ── */
.hero {
  min-height: calc(100vh - 68px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.hero-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.label-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 8px var(--primary);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--primary); }
  50% { opacity: 0.6; box-shadow: 0 0 16px var(--primary); }
}

.label-text {
  font-family: var(--font-text);
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.hero h1 {
  font-size: clamp(2.5rem, 6vw, 5rem);
  color: var(--text);
  line-height: 1.1;
}

.hero-sub {
  font-size: 1.1rem;
  color: var(--text-dim);
  min-height: 1.8em;
  margin: 0;
}

.hero-sub :deep(.typed-cursor) {
  color: var(--primary);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.btn-primary {
  font-family: var(--font-title);
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--background);
  background: var(--primary);
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  transition: background 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  background: #67e8f9;
  box-shadow: 0 0 24px var(--primary-glow-strong);
  color: var(--background);
}

/* ── Content sections ── */
.content-section {
  max-width: 1200px;
  margin: 0 auto 8rem;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.section-tag {
  font-family: var(--font-text);
  font-size: 0.8rem;
  color: var(--primary);
  letter-spacing: 0.1em;
}

.section-header p {
  max-width: 520px;
  text-align: center;
}

/* ── Service cards ── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1.75rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
}

.card:hover {
  border-color: var(--primary);
  box-shadow: 0 0 30px var(--primary-glow);
  transform: translateY(-3px);
}

.card-icon {
  color: var(--primary);
  width: 40px;
  height: 40px;
  background: var(--primary-glow);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card h3 {
  color: var(--text);
  font-size: 1rem;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--primary);
}

.card-more {
  font-family: var(--font-text);
  font-size: 0.8rem;
}

.card-footer svg {
  color: var(--primary);
  transition: transform 0.2s;
}

.card:hover .card-footer svg {
  transform: translateX(4px);
  filter: none;
}

/* ── Steps ── */
.steps-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 680px;
  margin: 0 auto;
}

.step-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1.25rem 1.75rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.step-card:hover {
  border-color: var(--primary);
  box-shadow: 0 0 20px var(--primary-glow);
}

.step-num {
  font-family: var(--font-text);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  opacity: 0.4;
  min-width: 2.5rem;
}

.step-body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.step-body h3 {
  font-size: 1rem;
}

.step-more {
  font-family: var(--font-text);
  font-size: 0.75rem;
  color: var(--text-muted);
  transition: color 0.2s;
}

.step-card:hover .step-more {
  color: var(--primary);
}

/* ── Contact form ── */
.form-wrapper {
  max-width: 680px;
  margin: 0 auto;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.contact-form input[type="text"],
.contact-form input[type="email"],
.contact-form textarea {
  width: 100%;
}

.consent-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
}

.consent-label input[type="checkbox"] {
  width: auto;
  margin-top: 0.2rem;
  flex-shrink: 0;
  accent-color: var(--primary);
}

.consent-label span {
  font-family: var(--font-text);
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.consent-label a {
  font-size: 0.75rem;
}

.submit-btn {
  align-self: flex-end;
}

.honeypot {
  display: none;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
