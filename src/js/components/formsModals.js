// formsModals.js — модальные формы (заказать звонок, задать вопрос, оставить отзыв)
//  Формы отправляются на Formspree.

let inited = false;

function createMarkup() {
  if (document.getElementById("formsModalOverlay")) return;

  // Утилита для создания элементов
  const el = (tag, className, attrs = {}, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    for (const [k, v] of Object.entries(attrs)) {
      if (v === undefined || v === null) continue;
      node.setAttribute(k, String(v));
    }
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const wrapper = el("div", "modal-overlay", { id: "formsModalOverlay" });

  const subjectMap = {
    callback: "AQUANIKA: Заказать звонок",
    question: "AQUANIKA: Вопрос",
    review: "AQUANIKA: Отзыв",
  };

  // Хелперы дл�� полей формы
  const createRequiredMark = () => el("span", "form__req", {}, "*");

  const addInputRow = (form, labelText, required, inputAttrs) => {
    const row = el("div", "form__row");
    const label = el("label", "form__label");
    label.append(document.createTextNode(labelText));
    if (required) label.append(createRequiredMark());
    const input = el("input", "form__input", inputAttrs);
    if (required) input.required = true;
    label.append(input);
    row.append(label);
    form.append(row);
    return input;
  };

  const addSelectRow = (form, labelText, required, name, options) => {
    const row = el("div", "form__row");
    const label = el("label", "form__label");
    label.append(document.createTextNode(labelText));
    if (required) label.append(createRequiredMark());
    const select = el("select", "form__input", { name });
    options.forEach((opt) => {
      const o = document.createElement("option");
      if (typeof opt === "object") {
        if (opt.value !== undefined) o.value = String(opt.value);
        o.textContent = opt.text !== undefined ? String(opt.text) : String(opt.value ?? "");
      } else {
        o.textContent = String(opt);
      }
      select.append(o);
    });
    label.append(select);
    row.append(label);
    form.append(row);
    return select;
  };

  const addTextareaRow = (form, labelText, required, attrs) => {
    const row = el("div", "form__row");
    const label = el("label", "form__label");
    label.append(document.createTextNode(labelText));
    if (required) label.append(createRequiredMark());
    const ta = el("textarea", "form__textarea", attrs);
    if (required) ta.required = true;
    label.append(ta);
    row.append(label);
    form.append(row);
    return ta;
  };

  const addConsent = (form) => {
    const agree = el("div", "form__agree");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "consent";
    checkbox.required = true;
    const span = document.createElement("span");
    span.textContent = "Соглашаюсь с обработкой персональных данных";
    label.append(checkbox, span);
    agree.append(label);
    form.append(agree);
  };

  const addActions = (form) => {
    const actions = el("div", "form__actions");
    const btn = el("button", "button button--primary", { type: "submit" }, "Отправить");
    actions.append(btn);
    form.append(actions);
  };

  const addHidden = (form, type) => {
    const hType = el("input", null, { type: "hidden", name: "type", value: type });
    const hPage = el("input", null, { type: "hidden", name: "page", value: "" });
    const hSubject = el("input", null, { type: "hidden", name: "_subject", value: subjectMap[type] || "AQUANIKA" });
    const honeypot = el("input", null, { type: "text", name: "_gotcha", tabindex: "-1", autocomplete: "off", style: "display:none" });
    form.append(hType, hPage, hSubject, honeypot);
  };

  const buildModal = (type, titleText, buildFields) => {
    const modal = el("div", "forms-modal", { "data-modal": type, "aria-hidden": "true", role: "dialog", "aria-modal": "true" });
    const content = el("div", "forms-modal__content");
    const closeBtn = el("button", "forms-modal__close", { "aria-label": "Закрыть" }, "×");
    const title = el("h3", "forms-modal__title", {}, titleText);

    const form = el("form", "modal__form", { action: "https://formspree.io/f/mgvnzqgl", method: "POST" });

    addHidden(form, type);
    buildFields(form);
    addConsent(form);
    addActions(form);

    content.append(closeBtn, title, form);
    modal.append(content);
    wrapper.append(modal);
  };

  // Заказать звонок
  buildModal("callback", "Заказать звонок", (form) => {
    addInputRow(form, "Имя", true, { type: "text", name: "name", placeholder: "Ваше имя" });
    addInputRow(form, "Телефон", true, { type: "tel", name: "phone", placeholder: "+7 (___) ___-__-__" });
    addSelectRow(
      form,
      "Удобное время",
      false,
      "preferred_time",
      [
        { value: "", text: "Не важно" },
        { value: "10:00 - 12:00" },
        { value: "12:00 - 15:00" },
        { value: "15:00 - 18:00" },
        { value: "18:00 - 21:00" },
      ]
    );
    addTextareaRow(form, "Комментарий", false, { name: "message", rows: "4", placeholder: "Опишите вопрос" });
  });

  // Задать вопрос
  buildModal("question", "Задать вопрос", (form) => {
    addInputRow(form, "Имя", true, { type: "text", name: "name", placeholder: "Ваше имя" });
    addInputRow(form, "Email", false, { type: "email", name: "email", placeholder: "name@example.com" });
    addInputRow(form, "��елефон", false, { type: "tel", name: "phone", placeholder: "+7 (___) ___-__-__" });
    addTextareaRow(form, "Сообщение", true, { name: "message", rows: "5", placeholder: "Ваш вопрос" });
  });

  // Оставить отзыв
  buildModal("review", "Оставить отзыв", (form) => {
    addInputRow(form, "Имя", true, { type: "text", name: "name", placeholder: "Ваше имя" });
    addSelectRow(form, "Оценка", false, "rating", [
      { value: "", text: "—" },
      { value: "5" },
      { value: "4" },
      { value: "3" },
      { value: "2" },
      { value: "1" },
    ]);
    addTextareaRow(form, "Отзыв", true, { name: "message", rows: "5", placeholder: "Ваш отзыв" });
  });

  document.body.appendChild(wrapper);
}

function disableScroll() {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.dataset.prevOverflow = document.body.style.overflow || "";
  document.body.dataset.prevPaddingRight = document.body.style.paddingRight || "";
  document.body.style.overflow = "hidden";
  if (scrollBarWidth > 0) {
    document.body.style.paddingRight = scrollBarWidth + "px";
  }
}

function enableScroll() {
  document.body.style.overflow = document.body.dataset.prevOverflow || "";
  document.body.style.paddingRight = document.body.dataset.prevPaddingRight || "";
  delete document.body.dataset.prevOverflow;
  delete document.body.dataset.prevPaddingRight;
}

function setPageHiddenValue() {
  const forms = document.querySelectorAll('#formsModalOverlay form input[name="page"]');
  forms.forEach((inp) => (inp.value = window.location.href));
}

function openModal(type) {
  const overlay = document.getElementById("formsModalOverlay");
  if (!overlay) return;
  setPageHiddenValue();

  const modals = overlay.querySelectorAll(".forms-modal");
  modals.forEach((m) => m.setAttribute("aria-hidden", "true"));

  const target = overlay.querySelector(`.forms-modal[data-modal="${type}"]`);
  if (!target) return;

  overlay.classList.add("is-open");
  target.setAttribute("aria-hidden", "false");
  disableScroll();
}

function closeModal() {
  const overlay = document.getElementById("formsModalOverlay");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  overlay.querySelectorAll(".forms-modal").forEach((m) => m.setAttribute("aria-hidden", "true"));
  enableScroll();
}

function bindEvents() {
  const overlay = document.getElementById("formsModalOverlay");
  if (!overlay) return;

  // Закрытие по клику по фону
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  // Делегирование на кнопки закрытия
  overlay.addEventListener("click", (e) => {
    const btn = e.target.closest(".forms-modal__close");
    if (btn) {
      closeModal();
    }
  });

  // ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      closeModal();
    }
  });

  // Триггеры открытия
  document.addEventListener("click", (e) => {
    const sidebarBtn = e.target.closest(".sidebar__button");
    if (sidebarBtn && sidebarBtn.dataset.action) {
      e.preventDefault();
      openModal(sidebarBtn.dataset.action);
      return;
    }

    const contactBtn = e.target.closest(".contacts-message-btn");
    if (contactBtn) {
      e.preventDefault();
      openModal("question");
      return;
    }

    const mobileAskBtn = e.target.closest(".mobile-nav__action-btn");
    if (mobileAskBtn) {
      e.preventDefault();
      openModal("question");
      return;
    }
  });
}

export function initFormsModals() {
  if (inited) return;
  createMarkup();
  bindEvents();
  inited = true;
  console.log("Модальные формы инициализированы");
}

export default { initFormsModals };
