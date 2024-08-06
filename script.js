document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://fakestoreapi.com/products';
    const productSlider = document.querySelector('.product-slider');
    const productList = document.querySelector('.product-list');

    axios.get(apiURL)
        .then(response => {
            console.log('API response:', response);
            const products = response.data;

            if (!Array.isArray(products)) {
                throw new TypeError('Expected an array of products');
            }

            // Populate the product slider
            let sliderHTML = '<div class="swiper-container"><div class="swiper-wrapper">';
            products.slice(0, 5).forEach(product => {
                sliderHTML += `
                    <div class="swiper-slide">
                        <img src="${product.image}" alt="${product.title}">
                        <h2>${product.title}</h2>
                        
                        <span class="price">$${product.price}</span>
                    </div>
                `;
            });
            sliderHTML += '</div><div class="swiper-pagination"></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div></div>';
            productSlider.innerHTML = sliderHTML;

            // Initialize the slider
            new Swiper('.swiper-container', {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                slidesPerView: 1,
                spaceBetween: 10,
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                }
            });

            // Populate the product list
            let productListHTML = '';
            products.forEach(product => {
                productListHTML += `
                    <div class="product-item">
                        <img src="${product.image}" alt="${product.title}">
                        <h2>${product.title}</h2>
                        
                        <span class="price">$${product.price}</span>
                        <div class="buttons">
                            <a href="#" class="button">Add to Cart</a>
                            <a href="#" class="button">View Details</a>
                        </div>
                    </div>
                `;
            });
            productList.innerHTML = productListHTML;
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});
