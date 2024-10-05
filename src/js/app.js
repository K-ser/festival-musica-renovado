document.addEventListener('DOMContentLoaded', function() {
  navegacionFija();
  scrollNav();
  crearBtnHeader(); 
  crearGarleria();
  resaltarEnlace();
  scrollTop();
});

function navegacionFija() {
  const header = document.querySelector('.header');
  const festival = document.querySelector('.festival');

  document.addEventListener('scroll', function() {
    if (festival.getBoundingClientRect().bottom < 1) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    } 

  // Con operador ternario
    // festival.getBoundingClientRect().bottom < 1 ?
    // header.classList.add('fixed') : header.classList.remove('fixed')
  });
};

function crearBtnHeader() {
  const header = document.querySelector('.header');
  console.log(header.clientWidth)
  // if(window.innerWidth >= 768) {
  //   return;
  // }
  if(window.matchMedia('(min-width: 768px)').matches) {
    return;
  }

  const contenedorHeader = document.querySelector('.contenido-header');
  const navPrincipal = document.querySelector('.contenido-header nav');
  const btnHeader = document.createElement('IMG');
  btnHeader.src = 'btnMobile.svg';
  btnHeader.classList.add('btn-header');
  contenedorHeader.insertBefore(btnHeader, navPrincipal);
  
  btnHeader.addEventListener('click', () => {
    navPrincipal.classList.toggle('navegacion-principal')
    navPrincipal.classList.toggle('inactivo');
  })
  ocultarNavPrincipal();
}

function crearGarleria() {
  const CANTIDAD_IMAGENES = 16;
  const galeria = document.querySelector('.galeria-imagenes');

  for(let i = 1; i <= CANTIDAD_IMAGENES; i++) {
    const imagen = document.createElement('PICTURE');
    imagen.innerHTML = `
      <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
      <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
      <img loading="lazy" width="300" height="200" src="build/img/gallery/thumb/${i}.jpg" alt="Imagen de la galeria">
    `;

    imagen.onclick = function() {
      mostrarImagen(i);
    }
    galeria.appendChild(imagen);
  }
}

function mostrarImagen(i) {
  // Crear imagen
  const imagen = document.createElement('PICTURE');
  imagen.innerHTML = `
      <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
      <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
      <img loading="lazy" width="300" height="200" src="build/img/gallery/full/${i}.jpg" alt="Imagen de la galeria">
    `;

  // Crear modal
  const modal = document.createElement('DIV');
  modal.classList.add('modal');
  modal.onclick = removerModal;

// Buton cerrar modal
  const btnCerrar = document.createElement('BUTTON');
  btnCerrar.textContent = 'X';
  btnCerrar.classList.add('btn-cerrar');
  btnCerrar.onclick = removerModal;

  modal.appendChild(imagen);
  modal.appendChild(btnCerrar);

  // Insertar el modal en el cuerpo del documento
  const body = document.querySelector('body');
  body.classList.add('overflow-hidden');
  body.appendChild(modal);
}

function removerModal() {
  const modal = document.querySelector('.modal');
  modal?.classList.add('fade-out');

  setTimeout(() => {
    // El signo de interrogacion nos permite preguntar si hay un modal
    // tal como si lo hicieramos dentro del un If
    modal?.remove();

    const body = document.querySelector('body');
    body.classList.remove('overflow-hidden');
  }, 500);
}

function resaltarEnlace() {
  document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLInks = document.querySelectorAll('.navegacion-principal a');

    let actual = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
        actual = section.id;
      }
    })

    navLInks.forEach(link => {
      link.classList.remove('active-link');
      if(link.getAttribute('href') === '#' + actual) {
        link.classList.add('active-link')
      }
    })
  })
}

function scrollTop() {
  const title = document.querySelector('.contenido-header h1');
  title.addEventListener('click', () => {
    const video = document.querySelector('.video');
    video.scrollIntoView({behavior: 'smooth'});
  })
}

function scrollNav() {
  const navLinks = document.querySelectorAll('.navegacion-principal a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionScroll = link.getAttribute('href');
      const section = document.querySelector(sectionScroll);
      section.scrollIntoView({behavior: "smooth"});
      if(window.matchMedia('(max-width: 768px)').matches) {
        ocultarNavPrincipal();
      }
    })
  })
}

function ocultarNavPrincipal() {
  const navPrincipal = document.querySelector('.contenido-header nav');
  navPrincipal.classList.remove('navegacion-principal');
  navPrincipal.classList.add('inactivo');
}