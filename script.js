document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // كلما قل الرقم زادت السرعة

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            // حساب مقدار الزيادة في كل خطوة
            const increment = target / speed;

            if (count < target) {
                // إضافة الزيادة وتحديث النص
                counter.innerText = Math.ceil(count + increment);
                // تكرار العملية كل 15 مللي ثانية
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
});



/* --- برمجة الخريطة العالمية - إعداد: بشاير --- */
var map;

function initLocationMap() {
    // 1. إعداد الخريطة والتركيز على المنطقة الشرقية
    const mapElement = document.getElementById('interactiveMap');
    
    if (mapElement) {
        map = L.map('interactiveMap', {
            zoomControl: false 
        }).setView([26.35, 49.95], 9); 

        // 2. تحميل الخرائط العالمية
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // 3. إضافة علامة الموقع
        L.marker([26.45, 49.90]).addTo(map)
            .bindPopup("<b>محافظة البيضاء</b>")
            .openPopup();

        // تحديث الحجم لضمان الظهور الأول
        setTimeout(() => { map.invalidateSize(); }, 500);
    }
}

// تشغيل الخريطة عند تحميل الصفحة
window.addEventListener('load', initLocationMap);

// وظائف التكبير والتصغير
function zoomInMap() { if(map) map.zoomIn(); }
function zoomOutMap() { if(map) map.zoomOut(); }

// وظيفة ملء الشاشة مع تحديث أبعاد الخريطة لمنع البياض
function toggleFullScreen() {
    var elem = document.getElementById("mapWrapper");
    
    if (!document.fullscreenElement) {
        elem.requestFullscreen().then(() => {
            // تحديث الحجم فور الدخول لملء الشاشة
            setTimeout(() => { if(map) map.invalidateSize(); }, 300);
        }).catch(err => {
            console.error(`خطأ: ${err.message}`);
        });
    } else {
        document.exitFullscreen().then(() => {
            // تحديث الحجم عند العودة للوضع الطبيعي
            setTimeout(() => { if(map) map.invalidateSize(); }, 300);
        });
    }
}



/* برمجة السلايدر التلقائي - بشاير */
let slideIndex = 0;
let slideTimer;

// تشغيل السلايدر عند التحميل
showSlides();

// وظيفة التنقل اليدوي بالأزرار
function plusSlides(n) {
    clearTimeout(slideTimer); // إيقاف المؤقت عند الضغط اليدوي لتجنب التداخل
    slideIndex += n;
    let slides = document.getElementsByClassName("slide");
    
    if (slideIndex > slides.length) { slideIndex = 1 }
    if (slideIndex < 1) { slideIndex = slides.length }
    
    updateSlidesDisplay(slideIndex);
    startTimer(); // إعادة تشغيل المؤقت
}

// وظيفة التنقل عبر النقاط
function currentSlide(n) {
    clearTimeout(slideTimer);
    slideIndex = n;
    updateSlidesDisplay(slideIndex);
    startTimer();
}

// الوظيفة الرئيسية لعرض الصور
function showSlides() {
    slideIndex++;
    updateSlidesDisplay(slideIndex);
    startTimer();
}

function startTimer() {
    slideTimer = setTimeout(showSlides, 5000); // تغيير كل 5 ثوانٍ
}

function updateSlidesDisplay(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}



/* برمجة تفاعل البطاقات - بشاير */

function flipCard(button) {
    // هذا السطر يبحث عن حاوية البطاقة اللي فيها الزر اللي انضغط
    const innerCard = button.closest('.project-card-inner');
    innerCard.classList.add('flipped');
}

function unflipCard(button) {
    // هذا السطر يرجع البطاقة لوضعها الطبيعي
    const innerCard = button.closest('.project-card-inner');
    innerCard.classList.remove('flipped');
}



function moveSlider(input) {
    const slider = input.closest('.comparison-slider');

    const beforeImage = slider.querySelector('.img-before');
    const sliderLine = slider.querySelector('.slider-line');

    let value = input.value;

    // تحريك الصورة
    beforeImage.style.width = value + '%';

    // تحريك الخط
    sliderLine.style.left = value + '%';
}