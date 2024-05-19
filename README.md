## Nuove Funzionalità
#### 🛍 Possibilita di aggiungere prodotti 
#### 🎆 Ogni prodotto ha un'immagine 
#### 💸 Possibilità di acquistare prodotti tramite stripe
#### 📋 Poter vedere gli ordini effettuati
#### 🎉 Nuova UI per le varie pagine

## Come iniziare

Prima di poter iniziare a sviluppare è necessario installare le dipendenze del progetto. Per farlo è necessario avere installato [Node.js](https://nodejs.org/en/) e [npm](https://www.npmjs.com/).
Come alternativa per npm c'è [bun](https://bun.sh/).

Dopo aver installato npm o bun, installare le dipendenze del progetto con il comando:
```bash
npm install
# or
bun install
```

Successivamente è necessario creare un file `.env` nella root del progetto con il seguente contenuto:
```.dotenv
# chiave segreta per l'autenticazione, si può generare con il comando `openssl rand -base64 32`
AUTH_SECRET=

# Chiavi per i vari provider di autenticazione
# - Google
# - GitHub

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Chiave per il serzivizio di invio email
RESEND_API_KEY=


# Prefisso per le tabelle del database
DB_PREFIX=next_auth_

# Se si utilizza un database locale
# (per rendere effettive i cambiamenti bisogna modificare il codice in db/index.ts e in drizzle.config.ts)
DB_HOST=127.0.0.1
DB_PORT=3306
USER=root
DATABASE=next-auth
DB_PREFIX=
PASSWORD=
LOCAL_DATABASE_URL=mysql://root:@localhost:3306/next-auth

# Se si utilizza turso come database remoto
TURSO_CONNECTION_URL
TURSO_AUTH_TOKEN=

# Chiavi per uploadthing (servizio di upload immagini)
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# Chiavi per stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_KEY=
```

### Link per ottenere le chiavi
- [Google](https://console.cloud.google.com/)
- [GitHub](https://github.com/settings/apps)
- [Uploadthing](https://uploadthing.com/)
- [Resend](https://resend.com/)
- [Turso](https://turso.tech/)
- [Stripe](https://docs.stripe.com/keys)

Come URL di callback per i provider di autenticazione bisogna inserire `http://localhost:3000/api/auth/callback/<provider>`.

Se si vuole utilizzare online per stripe bisogna attivare il webhook `checkout.session.completed`.

### Database
Prima di generare la struttura assicurarsi che non ci siano file generati nella path `src/lib/db/migrations/*`.
Per creare la struttura nel database è necessario eseguire il comando:
```bash
npm run db:generate & npm run db:migrate
# or
bun run db:generate & bun run db:migrate
```

#### Inizializzare prodotti stripe
Per inizializzare i prodotti stripe bisogna utilizzare il comando 
```bash
bun run db:init-stripe
```
Prima di utilizzare il comando bisogna modificare il file `src/lib/db/init/stripe.ts` con le seguenti modifiche:
- modificare l'id statico quando si crea un prodotto (se si vuole assegnare i prodotti a una specifica persona)
- in caso modificare l'url del database


## Sviluppo
Per avviare il server di sviluppo è necessario eseguire il comando:
```bash
npm run dev
# or
bun dev
```
Successivamente aprire il browser all'indirizzo [http://localhost:3000](http://localhost:3000).

### Bug noti in sviluppo
- Quando si verifica un token nella route `/new-verification` la pagina viene ricaricata 2 volte. Nel primo caso il token viene verificato e cancellato, nel secondo caso non esistendo più il token viene mostrato un errore. La sessione viene creata quindi non è un problema. Inoltre questo problema non si presenta in produzione.


## Build
Per generare la build del progetto è necessario eseguire il comando:
```bash
npm run build
# or
bun build
```
# Informazioni
## Struttura del progetto
Il progetto è diviso in nelle seguenti cartelle:
- `src/app`: ogni file chiamato page.tsx in questa cartella rappresenta una pagina del sito.
- `src/lib`: contiene le librerie utilizzate dal progetto.
- `src/components`: contiene i componenti riutilizzabili utilizzati in questo progetto.
- `src/actions`: contiene tutte le server action, ovvero le funzioni che vengono eseguite dal server.
- `src/hooks`: contiene tutti gli hooks custom utilizzati in questo progetto.

## Librerie utilizzate
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle](https://orm.drizzle.team/)
- [Auth.js](https://authjs.dev/)
- [Uploadthing](https://uploadthing.com/)
- [Resend](https://resend.com/)
- [Turso](https://turso.tech/)
- [Bun](https://bun.sh/)
- [Stripe](https://stripe.com/)

comando per reindirizzare il traffico da stripe a localhost. Per poter utilizzare stripe bisogna scaricare la cli di stripe e fare il login.
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhooks --skip-verify
o
bun run stripe
```

Avviare il database in fase di sviluppo
```bash
turso dev --db-file sqlite.db
o
bun run db:start
```

# Docker
Purtroppo a causa di drizzle-studio i certificati ssl non vengono caricati correttamente. Per ovviare questo problema non si può utilizzare docker quando si vuole utilizzare drizzle-studio.
Per poter utilizzare docker è necessario modificare `src/lib/db/index.ts` e `drizzle.config.ts` e impostare url a `http://db:8080`e non `http://localhost:8080`.
