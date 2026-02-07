# 📚 DEVELOPER.md - Руководство разработчика

## 🎨 Mantine + Astro: Полное руководство по интеграции

### 📋 Содержание
- [Обзор возможностей](#обзор-возможностей)
- [Установка и настройка](#установка-и-настройка)
- [Компоненты для блога](#компоненты-для-блога)
- [Примеры реализации](#примеры-реализации)
- [Отключение и откат](#отключение-и-откат)
- [Философия разработки](#философия-разработки)
- [Лучшие практики](#лучшие-практики)

---

## 🚀 Обзор возможностей

### Что такое Mantine?
**Mantine** - это современная библиотека React компонентов с:
- 🎨 **60+ компонентов** для любых задач
- 🌙 **Встроенная темная тема**
- 📱 **Полная мобильная адаптивность**
- 🎯 **TypeScript поддержка**
- 🎭 **Кастомизация тем**

### Почему Mantine + Astro?
- ⚡ **Производительность** - Astro оптимизирует рендеринг
- 🎨 **Современный дизайн** - Профессиональные компоненты
- 🔧 **Гибкость** - Можно использовать только нужное
- 🌍 **SEO дружелюбность** - Остается высоким
- 🔄 **Легко отключить** - Без последствий для проекта

---

## 📦 Установка и настройка

### 1. Пакеты в package.json
```json
{
  "dependencies": {
    "@mantine/core": "^7.13.2",      // Основные компоненты
    "@mantine/hooks": "^7.13.2",      // Полезные хуки
    "@mantine/notifications": "^7.13.2", // Уведомления
    "@astrojs/react": "^3.0.0",       // React интеграция
    "react": "^18.3.1",               // React
    "react-dom": "^18.3.1"            // React DOM
  }
}
```

### 2. Конфигурация Astro
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'

export default defineConfig({
  site: 'https://astro-blog-template.netlify.app',
  integrations: [mdx(), react(), svelte()],
  // ... остальная конфигурация
})
```

### 3. Установка зависимостей
```bash
npm install
```

---

## 🎯 Компоненты для блога

### 1. 📝 Интерактивные карточки постов

**Что делают:** Плавные hover эффекты, градиенты, анимации
**Где использовать:** Главная страница, страница блога, архивы

**Пример кода:**
```jsx
---
import { Card, Text, Badge, Group, useMantineTheme } from '@mantine/core'
---

<Card shadow="sm" p="lg" radius="md" withBorder>
  <Group justify="space-between" mb="xs">
    <Text fw={500}>{title}</Text>
    <Badge color="pink" variant="light">
      {category}
    </Badge>
  </Group>
  
  <Text size="sm" c="dimmed">
    {description}
  </Text>
</Card>
```

**Результат:** Карточки с тенями, градиентами, плавными переходами

---

### 2. 🔍 Поиск по блогу в реальном времени

**Что делает:** Мгновенная фильтрация постов при вводе
**Где использовать:** Навигация, отдельная страница поиска

**Пример кода:**
```jsx
---
import { TextInput, useMantineTheme } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useState, useEffect } from 'react'
---

const [search, setSearch] = useState('')
const [debounced] = useDebouncedValue(search, 200)

<TextInput
  placeholder="Поиск по постам..."
  value={search}
  onChange={(event) => setSearch(event.currentTarget.value)}
  size="md"
  radius="md"
/>
```

**Результат:** Современное поле поиска с автодополнением

---

### 3. 🏷️ Система тегов с фильтрацией

**Что делает:** Интерактивные теги для фильтрации контента
**Где использовать:** Боковая панель, под постами

**Пример кода:**
```jsx
---
import { Chip, Group } from '@mantine/core'
---

<Group>
  <Chip checked={selectedTags.includes('react')} 
        onClick={() => toggleTag('react')}>
    React
  </Chip>
  <Chip checked={selectedTags.includes('astro')} 
        onClick={() => toggleTag('astro')}>
    Astro
  </Chip>
</Group>
```

**Результат:** Цветные pills с анимацией при клике

---

### 4. 🖼️ Модальные окна для изображений

**Что делает:** Открытие изображений в полном размере
**Где использовать:** Внутри постов, галереи

**Пример кода:**
```jsx
---
import { Modal, Image, Button } from '@mantine/core'
import { useState } from 'react'
---

<Modal opened={opened} onClose={() => setOpened(false)} size="auto">
  <Image src={imageSrc} alt={imageAlt} />
</Modal>

<Button onClick={() => setOpened(true)}>
  Открыть изображение
</Button>
```

**Результат:** Плавное появление с затемнением фона

---

### 5. 🔔 Уведомления (Notifications)

**Что делает:** Всплывающие уведомления о действиях
**Где использовать:** Подписка, комментарии, сохранение

**Пример кода:**
```jsx
---
import { notifications } from '@mantine/notifications'
import { Button } from '@mantine/core'
---

<Button onClick={() => 
  notifications.show({
    title: 'Успешно!',
    message: 'Вы подписались на рассылку',
    color: 'green',
  })
}>
  Подписаться
</Button>
```

**Результат:** Современные toast-уведомления

---

### 6. 🧭 Улучшенная навигация

**Что делает:** Мегаменю, breadcrumbs, мобильное меню
**Где использовать:** Шапка сайта, навигация

**Пример кода:**
```jsx
---
import { AppShell, Navbar, Header } from '@mantine/core'
---

<AppShell
  navbar={<Navbar>{/* Навигация */}</Navbar>}
  header={<Header>{/* Шапка */}</Header>}
>
  {/* Контент */}
</AppShell>
```

**Результат:** Профессиональная навигация как на крупных сайтах

---

### 7. 📋 Формы с валидацией

**Что делает:** Формы с анимацией ошибок и подсказок
**Где использовать:** Подписка, контакты, комментарии

**Пример кода:**
```jsx
---
import { TextInput, Button, useForm } from '@mantine/form'
---

const form = useForm({
  initialValues: { email: '' },
  validate: {
    email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неверный email'),
  },
});

<TextInput {...form.getInputProps('email')} placeholder="Email" />
<Button onClick={() => form.onSubmit(handleSubmit)()}>
  Отправить
</Button>
```

**Результат:** Современные формы с мгновенной валидацией

---

### 8. 🌙 Улучшенная темная тема

**Что делает:** Профессиональная темная тема с переходами
**Где использовать:** Весь сайт

**Пример кода:**
```jsx
---
import { MantineProvider, ColorScheme } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
---

<MantineProvider theme={{ colorScheme: 'dark' }}>
  {/* Компоненты */}
</MantineProvider>
```

**Результат:** Плавные переходы между темами

---

## 🎨 Примеры реализации

### Пример 1: Карточка поста с Mantine
```jsx
---
// src/components/PostCard.jsx
import { Card, Text, Badge, Group, Avatar, ActionIcon } from '@mantine/core'
import { IconHeart, IconMessageCircle, IconShare } from '@tabler/icons-react'

export default function PostCard({ post }) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={500} size="lg">{post.title}</Text>
        <Badge color="blue" variant="light">
          {post.category}
        </Badge>
      </Group>
      
      <Text size="sm" c="dimmed" mb="md">
        {post.description}
      </Text>
      
      <Group>
        <Avatar src="/assets/avatar.jpg" radius="xl" size="sm" />
        <div>
          <Text size="sm">{post.author}</Text>
          <Text size="xs" c="dimmed">{post.date}</Text>
        </div>
      </Group>
      
      <Group mt="md">
        <ActionIcon variant="subtle" color="red">
          <IconHeart size="1rem" />
        </ActionIcon>
        <ActionIcon variant="subtle" color="blue">
          <IconMessageCircle size="1rem" />
        </ActionIcon>
        <ActionIcon variant="subtle" color="green">
          <IconShare size="1rem" />
        </ActionIcon>
      </Group>
    </Card>
  )
}
```

### Пример 2: Поиск с фильтрацией
```jsx
---
// src/components/SearchBar.jsx
import { TextInput, Container, SimpleGrid } from '@mantine/core'
import { useDebouncedValue, useInputState } from '@mantine/hooks'
import { useState, useEffect } from 'react'
import PostCard from './PostCard'

export default function SearchBar({ posts }) {
  const [search, setSearch] = useInputState('')
  const [debounced] = useDebouncedValue(search, 200)
  const [filteredPosts, setFilteredPosts] = useState(posts)

  useEffect(() => {
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(debounced.toLowerCase()) ||
      post.description.toLowerCase().includes(debounced.toLowerCase())
    )
    setFilteredPosts(filtered)
  }, [debounced, posts])

  return (
    <Container size="lg">
      <TextInput
        placeholder="Поиск по постам..."
        value={search}
        onChange={setSearch}
        size="md"
        radius="md"
        mb="xl"
      />
      
      <SimpleGrid cols={3} spacing="lg">
        {filteredPosts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </SimpleGrid>
    </Container>
  )
}
```

---

## 🔄 Отключение и откат

### Способ 1: Полное удаление пакетов
```bash
npm uninstall @mantine/core @mantine/hooks @mantine/notifications @astrojs/react react react-dom
```

### Способ 2: Отключение в конфигурации
```javascript
// astro.config.mjs - убрать react()
export default defineConfig({
  integrations: [mdx(), svelte()], // Удалить react()
})
```

### Способ 3: Замена компонентов
1. Удалить Mantine компоненты из .astro файлов
2. Заменить на обычный HTML/CSS
3. Удалить импорты Mantine

### Важно!
- **Никаких последствий** для ядра Astro
- **Сохраняется структура** проекта
- **Можно вернуть** в любой момент
- **Работает без** перезагрузки сервера

---

## 🤝 Философия разработки

**Принцип "Напарники":**
Мы не просто пишем код, мы учимся. Каждое серьезное изменение должно сопровождаться объяснением:
1.  **Что** мы делаем?
2.  **Зачем** это нужно?
3.  **Как** это работает?

Цель: Полное понимание проекта разработчиком, а не слепое копирование решений ИИ.

---

## 💡 Лучшие практики

### 1. Начинайте с малого
```jsx
// Начните с простого компонента
import { Button } from '@mantine/core'

<Button variant="filled" color="blue">
  Нажми меня
</Button>
```

### 2. Используйте темы
```jsx
// Создайте свою тему
const theme = {
  colors: {
    brand: ['#E5F3FF', '#C1E2FF', '#97CEFF', '#6DB9FF', '#43A4FF'],
  },
  fontFamily: 'Fira Sans, sans-serif',
}

<MantineProvider theme={theme}>
  {/* Ваше приложение */}
</MantineProvider>
```

### 3. Оптимизируйте импорты
```jsx
// Импортируйте только нужное
import { Button, Text } from '@mantine/core'
// НЕ import * as Mantine from '@mantine/core'
```

### 4. Используйте хуки
```jsx
import { useDebouncedValue, useWindowScroll } from '@mantine/hooks'

const [debounced] = useDebouncedValue(value, 200)
const [scroll] = useWindowScroll()
```

### 5. Кастомизируйте компоненты
```jsx
import { Button, createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.brand[6],
    '&:hover': {
      backgroundColor: theme.colors.brand[7],
    },
  },
}))

<Button classNames={useStyles().classes}>
  Кастомная кнопка
</Button>
```

---

## 🚀 Следующие шаги

1. **Установите зависимости:** `npm install`
2. **Создайте первый компонент:** Начните с Button
3. **Добавьте карточки постов:** Улучшите главную страницу
4. **Реализуйте поиск:** Добавьте функциональность
5. **Настройте тему:** Адаптируйте под ваш дизайн
6. **Тестируйте:** Проверьте на разных устройствах

---

## 📞 Поддержка и ресурсы

- **Документация Mantine:** https://mantine.dev/
- **Astro + React:** https://docs.astro.build/en/guides/integrations-guide/react/
- **Примеры:** https://mantine.dev/examples/
- **GitHub:** https://github.com/mantinedev/mantine

---

**Помните:** Mantine - это инструмент, а не замена вашему контенту. Используйте его для улучшения UX, а не для усложнения!

---

*Создано: 2026-02-03*
*Обновлено: 2026-02-03*
