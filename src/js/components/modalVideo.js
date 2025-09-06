// modalVideo.js

export function initVideoModal() {
    // Получаем элементы DOM с проверкой на существование
    const videoBlock = document.getElementById('videoBlock');
    const playButton = document.getElementById('playButton');
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('aboutVideo');
    const closeModalBtn = document.getElementById('closeModal');
    
    // Если элементы не существуют на этой странице - выходим
    if (!videoBlock || !playButton || !modal || !video || !closeModalBtn) {
        return;
    }
    
    // Функция открытия модального окна
    function openVideoModal() {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = getScrollbarWidth() + 'px';
        
        // Автовоспроизведение при открытии модального окна
        setTimeout(() => {
            video.play().catch(e => {
                console.log("Автовоспроизведение не разрешено: ", e);
            });
        }, 300);
    }
    
    // Функция закрытия модального окна
    function closeVideoModal() {
        video.pause();
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = '';
    }
    
    // Функция для расчета ширины scrollbar
    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }
    
    // Обработчик для клика по блоку видео
    videoBlock.addEventListener('click', function(e) {
        // Предотвращаем срабатывание, если кликнули на кнопку (чтобы не дублировать)
        if (e.target !== playButton && !playButton.contains(e.target)) {
            openVideoModal();
        }
    });
    
    // Обработчик для кнопки воспроизведения
    playButton.addEventListener('click', openVideoModal);
    
    // Обработчик для кнопки закрытия
    closeModalBtn.addEventListener('click', closeVideoModal);
    
    // Обработчик для клика вне модального окна
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeVideoModal();
        }
    });
    
    // Обработчик для клавиши ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && modal.style.display === "block") {
            closeVideoModal();
        }
    });
    
    // Останавливаем всплытие события для элементов внутри модального окна
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    console.log('Modal video initialized successfully');
}