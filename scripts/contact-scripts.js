function register(event) {

  const el = event.target.elements;
  event.preventDefault();
  params = {
    from_name: 'facurmedina@gmail.com',
    userName: el.userName.value,
    user_email: el.user_email.value,
    tel_number: el.tel_number.value,
    business: el.business.value,
    comments: el.comments.value,
  };

  emailjs.send('service_cocsh87', 'template_jbus0xp', params)
    .then((resp) => swal('El mensaje ha sido enviado correctamente.', 'En breve nos pondremos en contacto para resolver su consulta', 'success'))
    .catch((error) => swal('Error', 'No se pudo enviar el correo, por favor verifique los datos', 'error'));
}