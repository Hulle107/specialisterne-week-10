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
  - [💾 Installering](#-installering)
  - [🔧 Tilføj environment fil](#-tilføj-environment-fil)
  - [🏃 Start udviklingsmiljø](#-start-udviklingsmiljø)
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

## 💾 Installering

```shell
# Downloader & installere alle nødvendige filer
npm install -y
```

## 🔧 Tilføj environment fil

Lav en fil ved navn `.env` i rodmappen.

```ini
POSTGRES_USER=YourUsername
POSTGRES_PASSWORD=YourSecretPassword
POSTGRES_DB=YourDatabaseName
```

Udfyld alle felter med de nødvændige oplysninger.

## 🏃 Start udviklingsmiljø

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔄 Version historie

Ingen historie endnu.

## 📝 Noter

Ingen noter endnu.