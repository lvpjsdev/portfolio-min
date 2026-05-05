# UI Component Library

Библиотека базовых компонентов для портфолио-сайта.

---

## 🎯 Компоненты

### 1. NavDot

**ID:** `ftirY`  
**Назначение:** Навигационная точка в боковом меню

**Свойства:**
- Размер: 10×10px
- Форма: круг (border-radius: 9999px)
- Цвет: `#f46036` (accent)
- Активное состояние: `#ffffff` (white)
- Неактивное: `#414770` (twilight-indigo)

**Использование:**
```
Отображается в вертикальном сайдбаре (6 точек для 6 страниц)
Активная страница подсвечивается белым цветом
```

**CSS пример:**
```css
.nav-dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background: #414770;
  transition: all 0.2s;
}

.nav-dot--active {
  background: #ffffff;
}
```

---

### 2. SkillTag

**ID:** `T0CeS`  
**Назначение:** Тег для отображения навыка

**Свойства:**
- Layout: horizontal
- Padding: 6px 12px
- Border radius: 6px
- Background: `#414770` (twilight-indigo)
- Text color: `#ffffff`
- Font size: 13px
- Акцентный вариант: background `#f46036`

**Использование:**
```
Группируются в горизонтальные ряды с gap: 10px
Используются на странице Skills для отображения технологий
```

**CSS пример:**
```css
.skill-tag {
  display: inline-flex;
  padding: 6px 12px;
  background: #414770;
  color: #ffffff;
  font-size: 13px;
  border-radius: 6px;
}

.skill-tag--accent {
  background: #f46036;
}
```

---

### 3. ExperienceCard

**ID:** `M0yF1`  
**Назначение:** Карточка опыта работы

**Свойства:**
- Layout: vertical
- Gap: 4-6px
- Padding: 20px 24px
- Border radius: 12px
- Background: `#372248` (dark-amethyst) или `#1e1535` (darker variant)
- Width: fill_container

**Содержимое:**
- Должность (18px, bold, white)
- Компания (14px, `#5b85aa`)
- Даты (13px, `#bbbcc4`)
- Опционально: бейдж "Current" (оранжевый)

**Использование:**
```
Отображается списком на странице Work Experience
Текущая позиция выделяется бейджем и более ярким фоном
```

**CSS пример:**
```css
.experience-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px 24px;
  background: #372248;
  border-radius: 12px;
}

.experience-card__role {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
}

.experience-card__company {
  font-size: 14px;
  color: #5b85aa;
}

.experience-card__dates {
  font-size: 13px;
  color: #bbbcc4;
}
```

---

### 4. ContactLink

**ID:** `kdgoz`  
**Назначение:** Карточка контактной ссылки

**Свойства:**
- Layout: horizontal
- Gap: 16px
- Padding: 20px 24px
- Border radius: 12px
- Background: `#372248`
- Width: 600px (или fill_container)
- Align items: center

**Содержимое:**
- Иконка (24×24px, Lucide, цвет `#f46036`)
- Текст (16px, white)

**Иконки:**
- Email: `mail`
- LinkedIn: `linkedin`
- GitHub: `github`
- Instagram: `instagram`

**Использование:**
```
Отображается вертикальным списком на странице Contact
При наведении можно добавить hover-эффект
```

**CSS пример:**
```css
.contact-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: #372248;
  border-radius: 12px;
  transition: transform 0.3s;
}

.contact-link:hover {
  transform: translateY(-2px);
}

.contact-link__icon {
  width: 24px;
  height: 24px;
  color: #f46036;
}

.contact-link__text {
  font-size: 16px;
  color: #ffffff;
}
```

---

### 5. Sidebar

**ID:** `cBOTB`  
**Назначение:** Боковое навигационное меню

**Свойства:**
- Layout: vertical
- Gap: 20px
- Width: 64px
- Height: 900px (fill_container)
- Background: `#372248`
- Align items: center
- Justify content: center

**Содержимое:**
- 6 NavDot компонентов (по одному на страницу)

**Использование:**
```
Фиксированное положение слева на всех страницах
Точки меняют цвет в зависимости от активной страницы
```

**CSS пример:**
```css
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 64px;
  height: 100vh;
  background: #372248;
}
```

---

### 6. ThemeToggle

**ID:** `FIo1C`  
**Назначение:** Переключатель темы

**Свойства:**
- Layout: horizontal
- Gap: 6px
- Padding: 7px 14px
- Border radius: 20px
- Background: `#414770`
- Align items: center

**Содержимое:**
- Иконка луны (16×16px, Lucide)
- Текст "Dark" (13px, white)

**Использование:**
```
Размещается в правой части навбара
При клике переключает между светлой и тёмной темой
```

**CSS пример:**
```css
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  background: #414770;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s;
}

.theme-toggle:hover {
  background: #5a5a8a;
}

.theme-toggle__icon {
  width: 16px;
  height: 16px;
}

.theme-toggle__text {
  font-size: 13px;
  color: #ffffff;
}
```

---

### 7. NavItem

**ID:** `vwaMs`  
**Назначение:** Элемент текстовой навигации

**Свойства:**
- Layout: horizontal
- Gap: 10px
- Padding: 8px 0
- Align items: center

**Содержимое:**
- NavDot (опционально)
- Текст (14px)
- Активная ссылка: bold, `#f46036`
- Неактивная: normal, `#bbbcc4`

**Использование:**
```
Используется в горизонтальном навбаре сверху
Активная страница выделяется жирным шрифтом и акцентным цветом
```

**CSS пример:**
```css
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  font-size: 14px;
  color: #bbbcc4;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-item--active {
  font-weight: 700;
  color: #f46036;
}

.nav-item:hover {
  color: #ffffff;
}
```

---

## 🎨 Цветовая палитра компонентов

| Элемент | Цвет | Hex |
|---------|------|-----|
| Фон страницы | Midnight Violet | `#171123` |
| Фон карточек | Dark Amethyst | `#372248` |
| Акцент | Tiger Flame | `#f46036` |
| Вторичный акцент | Dusty Denim | `#5b85aa` |
| Теги/кнопки | Twilight Indigo | `#414770` |
| Основной текст | White | `#ffffff` |
| Вторичный текст | Silver Mist | `#bbbcc4` |

---

## 📏 Размеры и отступы

### Padding
- Карточки: 20-24px
- Теги: 6-12px
- Кнопки: 7-14px

### Gap
- Между карточками: 16px
- Между тегами: 10px
- Внутри компонентов: 4-16px

### Border Radius
- Карточки: 12px
- Теги/кнопки: 6-20px
- Точки навигации: 9999px (круг)

---

## 🔤 Типографика

### Шрифт
Ubuntu (fallback: system fonts)

### Размеры
- Hero: 96px (bold)
- H1: 48px (bold)
- H2: 36px (bold)
- H3: 18-20px (bold)
- Body: 16px
- Small: 13-14px

### Line Height
- Заголовки: 1.0-1.2
- Текст: 1.4-1.7

---

## 🚀 Рекомендации по использованию

1. **Консистентность:** Используйте компоненты из библиотеки, не создавайте новые варианты
2. **Токены:** Всегда используйте дизайн-токены вместо хардкода цветов
3. **Адаптивность:** При адаптации под мобильные устройства сохраняйте пропорции
4. **Доступность:** Обеспечьте достаточный контраст текста (WCAG AA)
5. **Hover-эффекты:** Добавьте интерактивность для ссылок и кнопок

---

## 📦 Экспорт компонентов

Все компоненты помечены как `reusable: true` в Pencil и могут быть:
- Экспортированы в SVG для веба
- Использованы как React/Vue компоненты
- Интегрированы в Storybook для документации

---

## 🎯 Итоги

Создано **7 переиспользуемых компонентов**, которые покрывают все потребности дизайна портфолио-сайта:

✅ Навигация (NavDot, NavItem, Sidebar)  
✅ Контент (ExperienceCard, SkillTag, ContactLink)  
✅ UI-элементы (ThemeToggle)

Все компоненты следуют единой дизайн-системе и используют дизайн-токены.
