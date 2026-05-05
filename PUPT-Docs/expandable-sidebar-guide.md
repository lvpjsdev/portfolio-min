# Выдвижное боковое меню (Expandable Sidebar)

## Обзор

Реализована система выдвижного бокового меню, вдохновленная дизайном сайта geettrivedi.com. Меню имеет два состояния:

1. **Collapsed (Свернутое)** - узкая панель с навигационными точками (64px)
2. **Expanded (Развернутое)** - широкая панель с точками и текстовыми метками (240px)

## Компоненты

### 1. Sidebar (ID: cBOTB)
**Свернутое состояние**
- Ширина: 64px
- Высота: 800px
- Содержит: 6 навигационных точек (NavDot)
- Цвет фона: `$color-sidebar` (#372248)
- Layout: vertical, gap: 20px, padding: [32, 0]

### 2. Sidebar Expanded (ID: Evmgl)
**Развернутое состояние (при наведении)**
- Ширина: 240px
- Высота: 800px
- Содержит: 6 элементов NavItem с текстом
- Цвет фона: `$color-sidebar` (#372248)
- Layout: vertical, gap: 32px, padding: [32, 20]
- Эффект: тень (shadow) для глубины
- Выравнивание: alignItems: "start"

### 3. NavDot (ID: ftirY)
**Навигационная точка**
- Размер: 10x10px
- Форма: круг (cornerRadius: 9999)
- Цвет: `$color-nav-dot` (#f46036)
- Используется в свернутом состоянии

### 4. NavItem (ID: vwaMs)
**Элемент навигации с текстом**
- Содержит: NavDot + текстовая метка
- Layout: horizontal, gap: 10px
- Padding: [8, 0]
- Текст: fontSize: 16, fontWeight: "500"
- Цвет текста: `$color-text-secondary-dark` (#bbbcc4)

### 5. NavItem Hover (ID: V4SLD)
**Состояние при наведении**
- Точка: белая (`$color-nav-dot-active`)
- Текст: белый (`$color-text-primary-dark`), fontWeight: "600"

## Использование в экранах

Все основные экраны обновлены:
- ✅ 01 — Home (Dark) - navbar удален
- ✅ 02 — About Me - navbar удален
- ✅ 03 — Work Experience - navbar удален
- ✅ 04 — Skills - navbar удален
- ✅ 05 — Contact - navbar удален
- ✅ 04 — Projects - navbar удален

Каждый экран теперь использует только боковое меню (sidebar) без верхнего navbar.

## Демонстрационные экраны

### Sidebar States Demo (ID: lzKEM)
Показывает оба состояния sidebar рядом для сравнения:
- Collapsed State (слева)
- Expanded State (справа) с подсказкой "← Hover to expand"

### Interactive Menu States (ID: u2CdkV)
Демонстрирует три состояния элементов меню:
- **Normal** - обычное состояние
- **Hover** - при наведении (белая точка и текст)
- **Active** - активная страница (жирный текст)

### Full Page Demo (ID: r0iENG)
Полноценный пример страницы с боковым меню:
- Sidebar в свернутом состоянии
- Основной контент справа
- Заголовок "Portfolio"
- Подсказка о hover-эффекте

## Цветовая схема

```
$color-sidebar: #372248          // Фон sidebar
$color-nav-dot: #f46036          // Обычная точка (оранжевый)
$color-nav-dot-active: #ffffff   // Активная точка (белый)
$color-text-primary-dark: #ffffff
$color-text-secondary-dark: #bbbcc4
$color-bg-dark: #171123
$color-bg-surface: #372248
```

## Принцип работы

1. **По умолчанию**: Sidebar показывается в свернутом состоянии (только точки)
2. **При наведении**: Sidebar расширяется, показывая текстовые метки
3. **Hover на элементе**: Точка и текст становятся белыми
4. **Активная страница**: Точка белая, текст жирный

## Технические детали

- Переход между состояниями должен быть плавным (CSS transition)
- Sidebar имеет фиксированную позицию слева
- Основной контент начинается после sidebar (64px отступ)
- При расширении sidebar накладывается поверх контента (z-index)

## Рекомендации по реализации

1. Использовать CSS transitions для плавного расширения
2. Добавить hover-эффекты на элементы меню
3. Реализовать активное состояние на основе текущей страницы
4. Добавить accessibility (ARIA labels, keyboard navigation)
5. Рассмотреть мобильную версию (возможно, drawer/hamburger menu)
