# Specialisterne Uge 10

![Version](https://img.shields.io/github/package-json/v/Hulle107/specialisterne-week-10?style=for-the-badge)
![License](https://img.shields.io/github/license/Hulle107/specialisterne-week-10?style=for-the-badge)

## 📚 Indholdsfortegnelse

- [Specialisterne Uge 10](#specialisterne-uge-10)
  - [📚 Indholdsfortegnelse](#-indholdsfortegnelse)
  - [ℹ️ Beskrivelse](#ℹ️-beskrivelse)
  - [🧰 Teknologier og værktøjer](#-teknologier-og-værktøjer)
  - [📂 Projektstruktur](#-projektstruktur)
    - [Brugerflade](#brugerflade)
    - [Controllers](#controllers)
    - [Services](#services)
    - [Repositories](#repositories)
    - [Database](#database)
  - [📑 Modeler](#-modeler)
    - [Task](#task)
    - [User](#user)
  - [📦 Krav](#-krav)
  - [🔧 Tilføj environment fil](#-tilføj-environment-fil)
  - [🚀 Kom i gang](#-kom-i-gang)
    - [🌐 Produktion / Fuldt Docker-miljø](#-produktion--fuldt-docker-miljø)
    - [🛠️ Start udviklingsmiljø](#️-start-udviklingsmiljø)
  - [🔄 Version historie](#-version-historie)
  - [📝 Noter](#-noter)

## ℹ️ Beskrivelse

Formålet med dette projekt er at udvikle en komplet full-stack applikation, der demonstrerer forståelsen for moderne webudvikling, softwarearkitektur og integration mellem database, backend og frontend.

Jeg har valgt at udvikle en To-Do List applikation, som giver brugeren mulighed for at oprette, se, opdatere og slette opgaver.

Projektet er udviklet fra bunden med fokus på **lagdeling**, **SOLID-principperne** og **Clean Code**.

## 🧰 Teknologier og værktøjer

Applikationen er udviklet med følgende teknologier:

**Frontend**

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

**Backend**

- Next.js API Routes
- Service-lag og Repository-lag
- Prisma ORM

**Database**

- PostgreSQL

## 📂 Projektstruktur

Applikationen vil være bygget efter en layered architecture, hvilket sikrer en ren opdeling af ansvar og høj testbarhed.

### Brugerflade

Består af Next.js pages og React-komponenter.

**Forside**

- Login
- Oprette ny bruger

**Opgaver**

- Se nuværrende opgaver
- Udføre en opgave
- Redigere en opgave (hvis man er ejeren)
- Slette en opgave (hvis man er ejeren)
- Oprette ny opgave

### Controllers

Next.js API routes fungerer som "controllers", der modtager HTTP-requests og returnerer data til UI’et.

### Services

Al logik og validering håndteres i services.

### Repositories

Repositories kommunikerer direkte med databasen via Prisma.

> De indeholder ingen logik – kun **CRUD-funktioner**.

### Database

SQLite-databasen administreres via Prisma migrations.

## 📑 Modeler

### Task

| Felt | Type | Beskrivelse |
| :--- | :--- | :---------- |
|id|Int|Primærnøgle|
|owner_id|Int|ID på ejeren|
|assigned_id|Int|ID på opgaveansvarlige|
|name|String|Navn på opgaven|
|description|String?|Beskrivelse på opgaven|
|published_at|DateTime?|Dato for udgivelse|
|deadline_at|DateTime?|Dato for skæringstidspunkt|
|completed_at|DateTime?|Dato for færdiggørelse|
|updated_at|DateTime?|Dato for ændring|
|created_at|DateTime|Dato for oprettelse|

### User

| Felt | Type | Beskrivelse |
| :--- | :--- | :---------- |
|id|Int|Primærnøgle|
|username|String|Brugernavn|
|email|String|Email på brugeren|
|password|String|Hashed+salt kodeord på brugeren|
|updated_at|DateTime?|Dato for ændring|
|created_at|DateTime|Dato for oprettelse|

## 📦 Krav

Før du går i gang, skal du have installeret:

- [Node.js](https://nodejs.org/) (version 16 eller nyere)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🔧 Tilføj environment fil

Lav en fil ved navn `.env` i rodmappen.

```ini
POSTGRES_USER=YourUsername
POSTGRES_PASSWORD=YourSecretPassword
POSTGRES_DB=YourDatabaseName

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
```

Udfyld alle felter med de nødvændige oplysninger.

## 🚀 Kom i gang

Dette projekt bruger Docker til at køre en PostgreSQL-database og tilbyder to måder at starte projektet på:

- Produktion / fuldt miljø – både Next.js og PostgreSQL køres i Docker
- Udviklingsmiljø – kun PostgreSQL kører i Docker, mens Next.js kører lokalt (fx med hot-reload)

### 🌐 Produktion / Fuldt Docker-miljø

**Byg og start alle services (Next.js + PostgreSQL):**

```shell
docker compose up --build
```

> Kør følgende kommando fra projektets rodmappe (hvor `docker-compose.yml` ligger)

**Dette vil:**

- Bygge Docker-images
- Starte Next.js-applikationen
- Starte PostgreSQL
- Oprette netværk og links mellem services

**Applikationen vil typisk være tilgængelig på:**

```shell
http://localhost:3000
```

**Stop miljøet igen:**

```shell
docker compose down -v
```

### 🛠️ Start udviklingsmiljø

> I udvikling er det ofte nemmere at køre PostgreSQL i Docker og Next.js lokalt (med hot reload)

**Start kun PostgreSQL-containeren:**

```shell
docker compose up -d postgres
```

- `-d` starter containeren i baggrunden
- `postgres` skal matche navnet på din database-service i `docker-compose.yml`

**Installer afhængigheder:**

```shell
npm install
```

**Start Next.js i udviklingstilstand:**

```shell
npm run next:dev
```

## 🔄 Version historie

Ingen historie endnu.

## 📝 Noter

Ingen noter endnu.