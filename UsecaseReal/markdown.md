# Javascript Kyselysovellus

## Käyttötapaus: Kyselysovellus

### Käyttäjät
- **Käyttäjä**: Yksinkertainen käyttäjä, joka voi äänestää kyselyissä.
- **Admin**: Hallinnoi kyselyitä sekä voi lisätä ja poistaa kyselyitä.

### Laukaisija
- **Käyttäjä**: Kirjautuu sisään ja osallistuu äänestykseen.
- **Admin**: Kirjautuu sisään ja hallinnoi kyselyitä tai osallistuu itse äänestykseen.

### Esiehto
- Käyttäjät tarvitsevat voimassa olevan käyttäjänimen ja salasanan kirjautuakseen. (tässä tapauksessa vain user: user)
- Kyselyt ovat valmiina, ja niiden on oltava saatavilla jotta niitä voidaan äänestää.

### Jälkiehto
- Käyttäjän tai adminin on oltava kirjautuneena sisään.
- Adminin on oltava sisäänkirjautuneena, jotta hän voi lisätä tai poistaa kyselyitä.

### Käyttötapauksen kulku
1. **Kirjautuminen**:
    - Käyttäjä syöttää käyttäjätunnuksen ja salasanan.
    - Sovellus tarkistaa käyttäjän tiedot ja roolin.
    - Onnistuneen kirjautumisen jälkeen näytetään sovelluksen pääsivu.
   
2. **Kyselyjen näyttäminen**:
    - Kun käyttäjä on kirjautunut, kyselyt ladataan ja näytetään listana.
    - Käyttäjä voi klikata kyselyä nähdäksesi sen yksityiskohdat ja äänestää.

3. **Äänestys**:
    - Käyttäjä voi klikata vaihtoehtoa äänestääkseen.
    - Äänet päivitetään ja kyselyn yksityiskohdat näytetään uudelleen.
    - Käyttäjä voi palata kyselyn täyttämisen jälkeen takaisin vastaamaan toiseen kyselyyn halutessaan.

4. **Admin-toiminnot**:
    - Admin voi lisätä uusia kyselyitä syöttämällä kyselyn ja vastausvaihtoehdot.
    - Admin voi poistaa olemassa olevan kyselyn.
    
5. **Poistuminen**:
    - Käyttäjä tai admin voi palata kirjautumissivulle tai kyselysivulle painamalla takaisin-nappia.

### Poikkeuksellinen toiminta
- Jos käyttäjänimi tai salasana on virheellinen, näytetään virheilmoitus.
- Jos admin yrittää lisätä kyselyn ilman tarvittavia tietoja, näytetään myös virheilmoitus.