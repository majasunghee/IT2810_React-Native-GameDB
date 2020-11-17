# IT2810 Prosjekt 4, alternativ A

I dette prosjektet har gruppen arbeidet videre med egen kode fra prosjekt 3 og satt dette opp i React Native. 

## Kjøre prosjektet

1. Kjør `npm install` fra rotmappen  (/prosjekt4)
2. kjør `npm start` fra rotmappen (/prosjekt4) for å starte Expo klienten i nettleseren 
3. Last ned Expo fra app-store
4. Åpne Expo applikasjonen
5. Fra applikasjonen, scan QR koden gitt i Expo klienten (i nettleseren)

Dersom QR koden ikke fungerer, må du bytte connection i Expo klienten i nettleseren fra LAN til Tunnel. En ny QR kode blir da generert etter noen sekunder. 

## Krav til applikasjonens innhold og funksjonalitet

### Søkegrensesnitt
Søkegrensesnittet har blitt delvis gjenbrukt fra prosjekt 3. Søkekomponenten består av en ikon- og en inputkomponent som endrer søkeord-staten når en bokstav blir tastet inn. I prosjekt 3 ble dette løst ved å ha en form-komponent med en formcontrol som lagret inputen i en ref, og ref-en endret staten når "submit"-knappen ble trykket på. I React Native bruker søkekomponenten native-base komponenter som er et komponentbibliotek for rect-native. 

Selve implementasjonen av søk er den samme som brukt prosjekt 3. Når staten endres med et nytt søkeord, vil fetchen rendres og hente spillene som matcher tittelen som blir søkt på.

### Paginering
Paginering er en ny funksjon som vi ikke rakk å implementere ferdig i prosjekt 3. Denne koden er dermed ikke gjenbrukt fra tidligere, men helt ny. Når vi henter spill-objekter fra databasen får vi en liste med alle spill-objektene som passer søkekriteriene. Dersom man ikke søker på en spesifikk spilltittel, vil listen inneholde alle spill-objektene som finnes i databasen. Vi har definert antall spill-objekter som kan vises på én side til 6 elementer per side. I App.tsx har vi opprettet to funksjoner, nextButton() og prevButton(), som håndterer inkrementering og dekrementering av variabelen pageNum, som er antall sider vi ønsker å skippe på. Funksjonene håndterer også statene prevBtnDisabled og nextBtnDisabled som kan ha verdien true eller false. Når disse statene har verdien true, blir den respektive knappen disabled (Det går ikke ann å trykke seg videre, noe som indikeres ved at knappen endrer farge fra blå til grå). I App.tsx ligger det også en variabel som henter ut lengden av listen med spill som blir etterspurt. Denne variabelen brukes for å holde rede på om vi har nådd siste spill-objekt i listen. Funksjonene og statene definert i App.tsx blir sendt ned til komponenten Pagination.js. Det er i denne komponenten knappene for previous og next er definert, og dermed her vi kaller på funksjonene nextButton() og prevButton() fra.

Gjennom mye testing har vi opplevd at paginerings-funksjonen stort sett skal funke, men den kan til tider henge litt etter. Dette vil fremstå for eksempel dersom du trykker på "next" knappen fort flere ganger etter hverandre. Dersom du søker på et ord hvor 6 eller mindre spill matcher søket, f.eks "Mario", kan det hende at "next" knappen er blå selv om den skal være grået ut og disabled. Dette har vi hovedsakelig opplevd skje dersom vi typer for fort i søkefeltet, og det fremstår ikke som et problem dersom vi typer litt saktere slik at input blir registrert ordentlig.

### Detaljert visning
Når man trykker på et av spillene i søkeresultatet kommer det opp en modal som viser mer informasjon om pris, sjanger og utgivelsesdato til spillet. I prosjekt 3 brukte vi Bootstrap sin modal komponent til å vise dette. Bootstrap er imidlertid ikke kompatibelt med React Native og vi ble derfor nødt til å velge en annen løsning for dette prosjektet. Valget falt på React Native sin innebygde modal komponent ettersom bruken av denne på mange måter ligner på Bootstrap sin modal, noe som gjorde det enkelt å gjenbruke deler av koden vår fra prosjekt 3.
Vi har likevel valgt å gjøre en del endringer på designet til modalen for å tilpasse visningen til en mobilskjerm. I tillegg har vi også valgt å legge modalen i en egen komponent for å gjøre koden litt mer oversiktlig.

### Søkeresultat med sortering og filtrering

## Krav til bruk av teknologi, koding, testing, dokumentasjon, levering

### React Native og Expo

Fronted i prosjektet er laget med React Native og Typescript. For å sette opp prosjektetet har vi brukt kommandoen 'expo init prosjekt4'. Vi har også brukt expo underveis i prosjektet til å kjøre appen på mobil eller i nettleseren.
Vi har bevvist prøvd å bruke om igjen så mye som mulig av koden vår fra prosjekt 3 og fokuset har altså vært på å gjøre endringer der det trengs for å tilpasse koden til React Native. Likevel har vi i dette prosjektet også skrevet en del ny kode da vi har lagt til funksjoner som vi ikke fikk implementert i porosjekt 3. Dette har vi gjort fordi vi ikke følte at funksjonaliteten i appen vår var tilstrekkelig for å få vist kunnskap i utvikkling av app for mobil og React Native. 

Ettersom CSS ikke er støttet i React Native har vi brukt StyleSheet-objekter for å style de ulike komponentene og gi appen et fint og brukervennlig design. Vi har ikke lagt til rette for at appen skal være brukervennlig i nettlesere ettersom prosjektet ikke er ment for dette.





### Tredjepartskomponenter
I dette prosjektet brukes Native Base. Native Base er et UI-bibliotek for React Native, som gjør det enkelt å implementere vanlige mobilapplikasjonsfunksjonaliteter. Vi har blandt annet brukt Native Base til å hente ut et kryss-ikon for å lukke modalen og til å vise spillene som blir hentet ut i en liste....  

### Manuell e2e testing
Til dette prosjektet har vi gjennomført manuell end-to-end testing i henhold til kravet til testing. Vi har testet applikasjonen på en Adroid enhet og en iOS enhet for å dekke de vanligste mobile enhetene. Alle gruppemdelemmene har Android enheter, og vi har dermed kunnet utvikle og teste applikasjonen kontinuerlig for denne enheten. Under utvikling var den minste enheten vi har testet med en enhet med 5.5" skjermstørrelse, og vi har ikke testet at applikasjonen er like responsiv for enheter minde enn det. For å få testet applikasjonen på en iOS enhet fikk vi en bekjent til å teste applikasjonen. For å kunne sammenligne forventet oppførsel og funksjonalitet i applikasjonen på to ulike enheter, har vi opprettet noen veiledende testoppgaver som ble utført av testpersonene.

**Testoppgaver**
1. Åpne applikasjonen.
2. Trykk på et spillene på fremsiden for å få opp en modal med flere detaljer om spillet.
3. Test søkefelt og paginering.
     1. Søk på "Mario" 
          - Resultat: Alle 6 spillene med "Mario" i tittelen blir vist. 
          - Previous og next knappene blir grået ut og disabled siden det ikke finnes flere elementer å bla mellom.
     2. Søk på "En".
          - Resultat: Alle spill med "En" i tittlen blir vist.
          - Bruk previous og next knappene for å teste ut paginering (dette kan gjøres fra andre sider og, men ved å søke på "En" får du en passe stor liste med objekt. Dersom du paginerer fra fremsiden må du gjennom ganske mange sider før du kan se hvordan siste side ser ut).
5. Test filtreingsfunksjon
    1. Velg filter
          - Resultat: Listen med spill endres avhengig av filteret
    2. Clear filter
          - Resultat: Filterspesifikasjon fjernes, og opprinnelig liste med spill vises

Nederst er det lagt ved en grafisk representasjon som viser forventet oppførsel og visning når en bruker interagerer med applikasjonen. 

**Testing på Android enhet**

Gruppen har gjennomført testoppgavene på en Android enhet med 5.5" skjermstørrelse.
Vi startet med å åpne applikasjonen og kom rett til forsiden som vist i den grafiske representasjonen under. Herfra prøvde vi å trykke på alle de 6 spill-objektene i liste-visningen. For hvert objekt fikk vi opp en modal som inneholdt flere detaljer om det tilhørende spillet. Alle modalene viste den detaljerte informasjonen på samme måte. 

Deretter testet vi ut søkefeltet og pagineringen. Først søkte vi på "Mario" og fikk opp 6 spill som inneholdt søkeordet i tittelen. Mens vi typet bokstavene i søkefeltet kunne vi se at "next" knappen ble grået ut, noe som tilsier at antall spill-objekter som inneholdt søkeordet var færre enn 7 elementer. Både "previous" og "next" knappen var altså grået ut, og vi kunne ikke paginere framover eller bakover, som var forventet resultat for paginering når alle spill-objektene kan vises på én side. Vi kunne også se at resultatet fra søket var dynamisk - liste-visningen endret seg og ble mindre ettersom vi typet inn flere bokstaver og gjorde søket mer spesifikt. Vi prøvde også å søke på "En", som fikk opp lang flere resultater. Her var "next" knappen blå, som signaliserte at vi kunne bla fremover. Etter å ha trykket på knappen 3 ganger, kom vi til siste side med resultater, og her var "next" knappen grået ut. Dette stemmer også godt overens med forventet resultat - "previous" knappen er grået ut og disabled når du er på første side og "next" knappen er grået ut og disabled når du er på siste side. Så lenge du kan bla fremover eller bakover, vil knappene være blå.

Til slutt testet vi filtreringsfunksjonen. Her byttet vi mellom ulike filtrerings-options. Når vi byttet mellom ulike options, kunne vi se at liste-visningen endret seg. I tillegg trykte vi på spill-objektene for å få opp detaljert visning, og observerte at den filtrerte verdien stemte overens med verdien gitt i den detaljerte visningen. 

**Testing på iOS-enhet**

![image](/uploads/2ff9bda46afbfb6bad30f604471f7de3/image.png)

