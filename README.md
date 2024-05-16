# IAMD Document Wizard

De IAMD Document Wizard is een Angular-applicatie waarmee je eenvoudig documenten kunt samenstellen en aanpassen. Het biedt een gebruiksvriendelijke interface voor het selecteren en wijzigen van verschillende elementen van documentsjablonen, het toevoegen van logo's, het aanpassen van stijlen (kleuren en lettertypen) en formatteren van algemene voorwaarden. De applicatie biedt de mogelijkheid om de HTML en CSS code van de gemaakte sjablonen te kopiëren.

## Functies

### Sjabloonselectie

- **Header, main en footer** : kies uit verschilllende vooraf ontworpen sjablonen voor de verschillende secties van het document.
- **Algemene voorwaarden** : voeg onopgemaakte tekst in en formatteer naar 1, 2 of 3 kolommen.

### Styling

- **Kleuren** : pas tekst- en achtergrondkleuren aan voor verschillende secties van het document.
- **Fonts** : selecteer een font uit de lijst of voeg je eigen Google Fonts toe door de import-URL te plakken.

### Logo uploaden

- upload eenvoudig je eigen logo om deze in het document op te nemen.

### HTML/CSS

- exporteer de HTML en CSS van je aangepast document.

## Componenten

- **AppComponent** : hoofdcomponent die de layout van de applicatie beheert, verschillende componenten samenbrengt en interactie tussen componenten coördineert.
- **StylingComponent** : biedt opties voor het aanpassen van kleuren en lettertypen van het document.
- **LogoUploadComponent** : maakt het mogelijk om een logo te uploaden en in het document in te voegen.
- **HeaderComponent** : maakt het mogelijk om een header te selecteren uit een lijst van voorziene headers.
- **MainComponent** : maakt het mogelijk om een main te selecteren uit een lijst van voorziene mains. De mains zijn opgesplitst in verschillende tabbladen volgens functie.
- **FooterComponent** : maakt het mogleijk om een footer te selecteren uit een lijst van voorziene footers.
- **AlgemeneVoorwaardenComponent** : voorziet een inputveld om onopgemaakte algemene voorwaarden te plakken, die vervolgens kunnen geformatteerd worden naar verschillende kolommen/opmaak.
- **HtmlDialogComponent** : geeft een dialoogvenster weer voor het kopiëren van de gegenereerde HTML- en CSS-code.
- **OptionButtonComponent** : zorgt voor knoppen om door de verschillende opties te navigeren.

## Aanvullende opmerkingen

- Deze applicatie maakt gebruik van CSS-variabelen (`--header-text-color`, etc) om de stijl van het gegenereerde document te beheren.

- De CSS voor het voorbeelddocument wordt automatisch gegenereerd op basis van de geselecteerde opties en wordt opgenomen in de gekopieerde code.

### Elementen toevoegen

Je kan eenvoudig nieuwe headers, mains en footers toevoegen aan de applicatie. Plaats de HTML-bestanden van je headers in de map src/assets/headers, de HTML-bestanden van je mains in de map src/assets/mains/VF, src/assets/mains/AF of src/assets/mains/Offertes,... (afhankelijk van het type document) en de HTML-bestanden van je footers in de map src/assets/footers.
Voeg vervolgens de naam van de bestanden toe aan de lijst in src/assets/fileNames.json
