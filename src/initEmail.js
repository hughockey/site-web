import emailjs from '@emailjs/browser'
(function(){
  emailjs.init({
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  });
})();