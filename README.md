# IT2810 Prosjekt 4, alternativ A

I dette prosjektet har gruppen arbeidet videre med prosjekt 3 og satt opp prosjektet i React Native.

## Kjøre prosjektet

1. Kjør `npm install` fra rotmappen  (/prosjekt4)
2. kjør `npm start` fra rotmappen (/prosjekt4) for å starte Expo klienten i nettleseren 
3. Last ned Expo fra app-store
4. Åpne Expo applikasjonen
5. Fra applikasjonen, scan QR koden gitt i Expo klienten (i nettleseren)

Dersom QR koden ikke fungerer, må du bytte connection i Expo klienten i nettleseren fra LAN til Tunnel. En ny QR kode blir da generert etter noen sekunder. 

## Krav til applikasjonens innhold og funksjonalitet

### Søkegrensesnitt

### Paginering
Paginering er en ny funksjon som vi ikke rakk å implementere ferdig i prosjekt 3. Denne koden er dermed ikke gjenbrukt fra tidligere, men helt ny. Når vi henter spill-objekter fra databasen får vi en liste med alle spill-objektene som passer søkekriteriene. Dersom man ikke søker på en spesifikk spilltittel, vil listen inneholde alle spill-objektene som finnes i databasen. I App.tsx har vi opprettet to funksjoner, nextButton() og prevButton(), som håndterer inkrementering og dekrementering av variabelen pageNum, som er antall sider vi ønsker å skippe på. Funksjonene håndterer også statene prevBtnDisabled og nextBtnDisabled som kan ha verdien true eller false. Når disse statene har verdien true, blir den respektive knappen disabled (Det går ikke ann å trykke seg videre, noe som indikeres ved at knappen endrer farge fra blå til grå). I App.tsx ligger det også en variabel som henter ut lengden av listen med spill som blir etterspurt. Denne variabelen brukes for å holde rede på om vi har nådd siste spill-objekt i listen.

Funksjonene og statene definert i App.tsx blir sendt ned til komponenten Pagination.js. Det er i denne komponenten knappene for previous og next er definert, og dermed her vi kaller på funksjonene nextButton() og prevButton() fra.

### Detaljert visning
Når man trykker på et av spillene i søkeresultatet kommer det opp en modal som viser mer informasjon om pris, sjanger og utgivelsesdato til spillet. I prosjekt 3 brukte vi Bootstrap sin modal komponent til å vise dette. Bootstrap er imidlertid ikke kompatibelt med React Native og vi ble derfor nødt til å velge en annen løsning for dette prosjektet. Valget falt på React Native sin innebygde modal komponent ettersom bruken av denne på mange måter ligner på Bootstrap sin modal, noe som gjorde det enkelt å gjenbruke deler av koden vår fra prosjekt 3. Vi har likevel valgt å gjøre en del endringer på designet til modalen for å tilpasse visningen til en mobilskjerm. I tillegg har vi også valgt å legge modalen i en egen komponent for å gjøre koden litt mer oversiktlig.

### Søkeresultat med sortering og filtrering

## Krav til bruk av teknologi, koding, testing, dokumentasjon, levering

### React Native og Expo

### Typescript og koding

### Tredjepartskomponenter

### Manuell e2e testing
Til dette prosjektet har vi gjennomført manuell end-to-end testing i henhold til kravet til testing. Vi har testet applikasjonen på en Adroid enhet og en iOS enhet for å dekke de vanligste mobile enhetene. Under er det lagt ved en grafisk representasjon som viser forventet oppførsel og visning når en bruker interagerer med applikasjonen.

![image](/uploads/0277fe16684730b56138509200bd43f3/image.png)

**Testing på Android enhet**

**Testing på iOS-enhet**

### Git og GitLab