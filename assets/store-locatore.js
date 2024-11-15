window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    let header = document.querySelector('#shopify-section-header');
    let storeLocatorWrapper = document.querySelectorAll('.store-locator--wrapper');
    storeLocatorWrapper.forEach(locator => {
      let trigger = locator.querySelector('.store-locator--header'),
          target = locator.querySelector('.store-locator--content'),
          popCloseBtn = locator.querySelector('.store-locator--back');
  
          target.style.top = `${header.clientHeight}px`;
          target.style.height = `calc(100dvh - ${header.clientHeight}px)`;
  
          trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.currentTarget.classList.add('active');
            target.classList.add('active');
            window.scrollTo({left:0,top: (window.scrollY - 1)})
  
          })
  
          popCloseBtn.addEventListener('click', () => {
            target.classList.remove('active');
            trigger.closest('.store-locator--content').classList.remove('active');
          })
    });
  }
})