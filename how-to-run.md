# Для запуска приложения fitfriends необходимо создать контейнеры для серверной части приложения и для клиентской

# приложения находятся в репозиториях:

# Серверная часть:

репозиторий: https://github.com/postfm/fitfriends-backend

# клиентская часть:

репозиторий: https://github.com/postfm/fitfriends-frontend

# Дальнейшая инструкция предназначена для серверной части приложения

# Запуск контейнеров Docker с помощью файла

```
./fitfriends-backend/docker-compose.dev.yml
$ docker compose -f "docker-compose.dev.yml" up -d --build
```

или, при наличии расширения Docker для VSCode - правой кнопкой мыши по файлу
и выбрать пункт меню "Compose Up"
