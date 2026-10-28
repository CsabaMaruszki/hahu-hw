# 1. Feladat
## a)
Az irányítószám mező ürességének validálása máshogy működik, mint a többi mezőé. Ha belekattintunk, majd ki kattintunk belőle nem történik validálás, a többi mezőnél viszont igen.
## b)
**Probléma:** A cloudeFlare captcha blokkolja az automatizáció validálását, de ez gondolom teszt környezetekben nem probléma.

**Megoldás:** Megoldás lehet a responseok mockolása, ezzel alacsonyabb szintre víve a tesztesetet.

---

**Probléma:** Nem tudom, hogy ez-e az elvárt működés, de az automatizáció blokkolása miatt 403 response jön, ami érthető, viszont a Regisztráció gomb megnzomása a Sikeres regisztráció oldalra navigál át ebben az esetben is. Nem tudom, hogy például, ha valamiét mondjuk a valóságban is 4xx vagy 5xx responst ad az API akkor is ez történik-e egy valós regisztrációnál.

**Megoldás:** A fenti le nem kezelt hibák megoldása valószínűleg fejlesztést igényelne a hibás regisztrációs esetek lefedésére.

# 2. Feladat
## a)
- Teljes képernyős galéria megnyitása
- Állapotfelmérés megnyitása
- Megosztás popupban link másolása
- Money.hu ajánlat megjelenése
- Hirdetés bejelentése

## c)
Rendszeres futtatásnál dinamikusan válsztanék hirdetést, nem statikussal dolgoznék, így production környezetben is futtatható smoke teszt jelleggel akár release után, akár időközönként ütemezve. Valamint a futás utáni cleanup, hogy töröljuk az autót a parkolóból.