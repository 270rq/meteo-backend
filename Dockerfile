# Используем официальный образ Node.js
FROM node:20

# Установка Yarn

# Установка рабочей директории в /app
WORKDIR /app

# Копирование зависимостей
COPY package.json ./
COPY yarn.lock ./

# Установка зависимостей с использованием Yarn
RUN yarn install --frozen-lockfile

# Копирование остальных файлов проекта
COPY . .

# Экспозиция порта, если нужно
# EXPOSE 3000
RUN yarn prisma generate
# Команда для запуска приложения
CMD [ "yarn", "start"]