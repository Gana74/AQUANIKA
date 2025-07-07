// Боковая панель
export class Sidebar {
  constructor() {
    this.init();
  }

  init() {
    console.log("Инициализация боковой панели");
  }
}

// Функция инициализации
export function initSidebar() {
  console.log("Запуск инициализации боковой панели");
  return new Sidebar();
}
