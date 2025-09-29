# Scenariobeskrivning

## Bakgrund

Chas Advance vill ta fram en prototyp för ett system som övervakar klimatkontrollerade transporter.
Systemet riktar sig till branscher som livsmedel, läkemedel och kemikalier där temperatur och luftfuktighet är avgörande.

## Roller i systemet

### Avsändare

Avsändaren packar godset med sensorer och registrerar en fraktsedel med QR-/streckkod.
I prototypen förenklas detta steg. Avsändaren ska kunna se en datavy där paketets position, temperatur och luftfuktighet presenteras.
Som förbättringar kan notiser vid avvikelser, historik över värden och en startsida med flera paket läggas till.

### Transportör / Förare

Transportören ansvarar för transporten.
Föraren skannar paketets kod i sin app, vilket kopplar paketet till lastbilen och startar loggningen.
Transportören behöver främst ett system för att få varningar vid avvikelser i temperatur eller luftfuktighet, men kan även se data för enskilda paket.

### Mottagare (beställaren)

Mottagaren beställer klimatkontrollerad transport (utanför prototypens omfång) och kan följa sina paket i en vy liknande avsändarens, men endast för egna transporter.
När paketet tas emot scannas fraktsedeln i mobilappen, loggningen avslutas och mottagaren får ett leveranskvitto med temperatur- och fuktdata.

### Logistikansvarig

Den logistikansvariga hos beställaren har en mer avancerad roll.
Här ingår översikter per lastbil, kund och tidsperiod, samt filtrering på t.ex. brutna kylkedjor.
Denna roll är inte prioriterad i prototypen, men kan utvecklas vidare eller anpassas från avsändarens/mottagarens vyer.

postgres
PoctGres!23
