<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Modal from './Modal.vue';
import emailjs from '@emailjs/browser'
import { useToast, TYPE } from 'vue-toastification';
import { cardsData } from '../data/cardsData.js'

const sections = ref<NodeListOf<HTMLElement> | null>(null)
onMounted(() => {
  sections.value = document.querySelectorAll('.fade-animation') as NodeListOf<HTMLElement>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    })
  }, {
    threshold: 0.5
  })

  sections.value.forEach((section) => {
    observer.observe(section); // Observe each section
  });
})

const toast = useToast()

const contactForm = ref<HTMLFormElement>()
let title = ref<string>('')
let message = ref<string>('')
const error = ref<boolean>(true)

const validateField = (e: FocusEvent) => {
  error.value = false
  const inputElement = e.target as HTMLInputElement
  if (inputElement.value === '' || inputElement.value === null) {
    error.value = true
  }
}

const resetFields = () => {
  contactForm.value?.reset()
}

const sendEmail = () => {
  if (!error.value) {
    emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, contactForm.value ?? '', {publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY}).then(() => {
      toast.success('Message envoyé avec succès!', {
        type: TYPE.SUCCESS,
        timeout: 20000000
      })
      resetFields()
    }, (error: any) => {
      toast.error('Un problème est survenu, veuillez réessayer plus tard...', {
        type: TYPE.ERROR
      })
      console.log(error)
    })
  }
}

const modalComponent = ref<InstanceType<typeof Modal>>()
const clickedCardId = ref<string>('')

const showModal = (e: MouseEvent) => {
  const target = e.currentTarget as SVGElement;
  clickedCardId.value = target.dataset.text || '';
  const cardInfos = cardsData.filter((card: any) => card.id === clickedCardId.value )
  title.value = cardInfos[0].title
  message.value = cardInfos[0].message
  modalComponent.value?.openDialog();    
}

</script>
<template>
  <section class="presentation-section fade-animation">
    <div class="presentation-section-content max-content-width">
      <div class="presentation-section-description">
        <h1>Salut, moi c'est <span>Hugo</span>.</h1>
        <p>Développeur depuis 9 ans, développeur frontend depuis 6 ans et maintenant <span>pigiste</span>.</p>
      </div>
      <img alt="cartoon représentant Hugo" src="../assets/images/Avatar.png"  />
    </div>
  </section>
  <section class="fade-animation">
    <div class="max-content-width">
      <div>
        <h1>Qu'est-ce j'offre?</h1>
        <p>J'offre mon expertise pour vous accompagner dans la réalisation de vos projets comme:</p>
      </div>
      <div class="cards-list-container">
        <div class="cards-list three-boxes-line">
          <div class="card">
            <p>La création d'applications web personnalisées</p>
            <svg @click="showModal($event)" data-text="appWeb" width="24" xmlns="http://www.w3.org/2000/svg" height="24" fill="none"><g data-testid="plus-square"><g class="fills"><rect rx="0" ry="0" width="24" height="24" class="frame-background"/></g><g class="frame-children"><g data-testid="svg-rect"><rect width="18" height="18" x="3" style="fill: none;" ry="2" rx="2" y="3" class="fills"/><g stroke-linejoin="round" stroke-linecap="round" class="strokes"><rect rx="2" ry="2" x="3" y="3" width="18" height="18" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="M8 12h8" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M8 12h8" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="M12 8v8" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M12 8v8" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g></g></g></svg>
          </div>
          <div class="card">
            <p>La création de votre site web</p>
            <svg @click="showModal($event)" data-text="siteWeb" width="24" xmlns="http://www.w3.org/2000/svg" height="24" fill="none"><g data-testid="plus-square"><g class="fills"><rect rx="0" ry="0" width="24" height="24" class="frame-background"/></g><g class="frame-children"><g data-testid="svg-rect"><rect width="18" height="18" x="3" style="fill: none;" ry="2" rx="2" y="3" class="fills"/><g stroke-linejoin="round" stroke-linecap="round" class="strokes"><rect rx="2" ry="2" x="3" y="3" width="18" height="18" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="M8 12h8" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M8 12h8" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="M12 8v8" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M12 8v8" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g></g></g></svg>
          </div>
          <div class="card">
            <p>Appui à la R&D d'une entreprise</p>
            <svg @click="showModal($event)" data-text="rd" width="24" xmlns="http://www.w3.org/2000/svg" height="24" fill="none"><g data-testid="plus-square"><g class="fills"><rect rx="0" ry="0" width="24" height="24" class="frame-background"/></g><g class="frame-children"><g data-testid="svg-rect"><rect width="18" height="18" x="3" style="fill: none;" ry="2" rx="2" y="3" class="fills"/><g stroke-linejoin="round" stroke-linecap="round" class="strokes"><rect rx="2" ry="2" x="3" y="3" width="18" height="18" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="M8 12h8" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M8 12h8" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="M12 8v8" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M12 8v8" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g></g></g></svg>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="fade-animation">
    <div class="max-content-width">
      <div>
        <h1>Comment ça se passe pour les projets?</h1>
        <p>Tous les projets sont personnalisés selon vos besoins et votre réalité:</p>
      </div>
      <div class="cards-list-container">
        <div class="cards-list">
          <div class="card">
            <p>Étape 1: Rencontre initiale</p>
            <svg @click="showModal($event)" data-text="step1" width="24" xmlns="http://www.w3.org/2000/svg" height="24" fill="none"><g data-testid="plus-square"><g class="fills"><rect rx="0" ry="0" width="24" height="24" class="frame-background"/></g><g class="frame-children"><g data-testid="svg-rect"><rect width="18" height="18" x="3" style="fill: none;" ry="2" rx="2" y="3" class="fills"/><g stroke-linejoin="round" stroke-linecap="round" class="strokes"><rect rx="2" ry="2" x="3" y="3" width="18" height="18" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="M8 12h8" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M8 12h8" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="M12 8v8" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M12 8v8" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g></g></g></svg>
          </div>
          <div class="card">
            <p>Étape 2: Envoi de la soumission</p>
            <svg @click="showModal($event)" data-text="step2" width="24" xmlns="http://www.w3.org/2000/svg" height="24" fill="none"><g data-testid="plus-square"><g class="fills"><rect rx="0" ry="0" width="24" height="24" class="frame-background"/></g><g class="frame-children"><g data-testid="svg-rect"><rect width="18" height="18" x="3" style="fill: none;" ry="2" rx="2" y="3" class="fills"/><g stroke-linejoin="round" stroke-linecap="round" class="strokes"><rect rx="2" ry="2" x="3" y="3" width="18" height="18" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="M8 12h8" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M8 12h8" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="M12 8v8" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M12 8v8" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g></g></g></svg>
          </div>
          <div class="card">
            <p>Étape 3: Développement</p>
            <svg @click="showModal($event)" data-text="step3" width="24" xmlns="http://www.w3.org/2000/svg" height="24" fill="none"><g data-testid="plus-square"><g class="fills"><rect rx="0" ry="0" width="24" height="24" class="frame-background"/></g><g class="frame-children"><g data-testid="svg-rect"><rect width="18" height="18" x="3" style="fill: none;" ry="2" rx="2" y="3" class="fills"/><g stroke-linejoin="round" stroke-linecap="round" class="strokes"><rect rx="2" ry="2" x="3" y="3" width="18" height="18" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="M8 12h8" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M8 12h8" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="M12 8v8" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M12 8v8" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g></g></g></svg>
          </div>
          <div class="card">
            <p>Étape 4: Derniers ajustements et livraison</p>
            <svg @click="showModal($event)" data-text="step4" width="24" xmlns="http://www.w3.org/2000/svg" height="24" fill="none"><g data-testid="plus-square"><g class="fills"><rect rx="0" ry="0" width="24" height="24" class="frame-background"/></g><g class="frame-children"><g data-testid="svg-rect"><rect width="18" height="18" x="3" style="fill: none;" ry="2" rx="2" y="3" class="fills"/><g stroke-linejoin="round" stroke-linecap="round" class="strokes"><rect rx="2" ry="2" x="3" y="3" width="18" height="18" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="M8 12h8" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M8 12h8" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="M12 8v8" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M12 8v8" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g></g></g></svg>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="fade-animation" ref="contact-section">
    <div class="max-content-width">
      <h1>
        On travaille ensemble?
      </h1>
      <div class="contact-form-container">
        <form class="contact-form" ref="contactForm" @submit.prevent="sendEmail">
          <input required type="text" placeholder="Nom" name="contact_name" @blur="validateField($event)"/>
          <input required type="email" placeholder="Courriel" name="contact_email" @blur="validateField($event)"/>
          <textarea required placeholder="Message" name="message" @blur="validateField($event)"></textarea>
          <button type="submit" class="contact-form-submit__button">Soumettre</button>
        </form>
      </div>
    </div>
  </section>
  <Modal ref="modalComponent">
    <template #title>
      <h2>{{ title }}</h2>
    </template>
    <template #content>
      <p class="modal">{{ message }}</p>
    </template>
  </Modal>
</template>
<style scoped lang="css">


section {
  min-height: calc(100vh - 80px);
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 165px;
  display: grid;
  place-items: center;
}

span {
  color: var(--primary-light);
}

.cards-list-container {
  display: flex;
  justify-content: center;
}

.cards-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 800px;
  justify-content: center;
}

.card {
  width: 220px;
  height: 200px;
  border: 1px solid var(--gray);
  border-radius: 5px;
  padding: 30px;
  margin: 10px 10px 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: filter 0.3s;
}

.card:hover {
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
}

svg {
  align-self: flex-end;
}

.contact-form-container {
  display: flex;
  justify-content: center;
}

.contact-form {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  flex-shrink: 1;
}

input {
  height: 30px;
  padding-left: 5px;
  border-radius: 5px;
}

input::placeholder {
  font-family: var(--font-text);
}

textarea {
  height: 100px;
  padding-left: 10px;
  padding-top: 6px;
  border-radius: 5px;
}

textarea::placeholder {
  font-family: var(--font-text);
}

.contact-form-submit__button {
  align-self: flex-end;
}

.three-boxes-line {
  max-width: 900px;
}
</style>