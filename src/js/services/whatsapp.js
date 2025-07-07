export class WhatsAppService {
  constructor(phoneNumber) {
    this.phoneNumber = this.formatPhoneNumber(phoneNumber);
  }

  // Форматирование номера телефона
  formatPhoneNumber(phone) {
    // Удаляем все нецифровые символы
    return phone.replace(/\D/g, '');
  }

  // Отправка сообщения
  sendMessage(message) {
    // Кодируем сообщение для URL
    const encodedMessage = encodeURIComponent(message);
    
    // Формируем URL для WhatsApp
    const url = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
    
    // Открываем WhatsApp в новом окне
    window.open(url, '_blank');
  }

  // Отправка сообщения с предварительно заполненной формой
  sendBookingRequest(service, date, time) {
    const message = `Здравствуйте! Хочу записаться на ${service} ${date} в ${time}.`;
    this.sendMessage(message);
  }

  // Отправка вопроса
  sendQuestion(question) {
    const message = `Здравствуйте! У меня есть вопрос: ${question}`;
    this.sendMessage(message);
  }

  // Отправка отзыва
  sendReview(rating, review) {
    const message = `Здравствуйте! Хочу оставить отзыв (${rating}/5 звезд): ${review}`;
    this.sendMessage(message);
  }
} 