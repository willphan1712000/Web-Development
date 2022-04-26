const menuBtn = document.querySelector('.menu-btn');
let open = false;
menuBtn.addEventListener('click', ()=> {
   if (!open) {
      menuBtn.classList.add('open');
      open = true;
   }
   else {
      menuBtn.classList.remove('open');
      open = false;
   }
});