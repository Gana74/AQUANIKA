export class YClientsAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.widgetUrl = 'https://w.yclients.com/';
    this.apiUrl = 'https://api.yclients.com/api/v1/';
  }

  // Открыть виджет записи
  openBookingWidget() {
    const script = document.createElement('script');
    script.src = `${this.widgetUrl}widget/init?company_id=${this.apiKey}`;
    document.body.appendChild(script);
  }

  // Получить список услуг
  async getServices() {
    try {
      const response = await fetch(`${this.apiUrl}services?company_id=${this.apiKey}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  }

  // Получить список мастеров
  async getStaff() {
    try {
      const response = await fetch(`${this.apiUrl}staff?company_id=${this.apiKey}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching staff:', error);
      throw error;
    }
  }

  // Получить свободное время для записи
  async getAvailableTime(serviceId, staffId, date) {
    try {
      const response = await fetch(`${this.apiUrl}available_times?company_id=${this.apiKey}&service_id=${serviceId}&staff_id=${staffId}&date=${date}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching available times:', error);
      throw error;
    }
  }

  // Создать запись
  async createBooking(data) {
    try {
      const response = await fetch(`${this.apiUrl}bookings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          company_id: this.apiKey,
          ...data
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  // Отменить запись
  async cancelBooking(bookingId) {
    try {
      const response = await fetch(`${this.apiUrl}bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error canceling booking:', error);
      throw error;
    }
  }
} 