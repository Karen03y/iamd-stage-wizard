  import { Component, OnInit } from '@angular/core';
  import {MatInputModule} from '@angular/material/input';
  import {MatFormFieldModule} from '@angular/material/form-field';
  import {MatSelectModule} from '@angular/material/select';
  import { FormsModule } from '@angular/forms';

  @Component({
    selector: 'app-algemene-voorwaarden',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
    templateUrl: './algemene-voorwaarden.component.html',
    styleUrl: './algemene-voorwaarden.component.css'
  })
  export class AlgemeneVoorwaardenComponent implements OnInit{
    termsText: string = '';
    selectedColumns: number = 1;
    formattedTerms: string = '';

    constructor() { }

    ngOnInit(): void {
      this.termsText = `## Algemene Voorwaarden

      Dit zijn de algemene voorwaarden van [bedrijfsnaam].
      
      **Artikel 1: Definities**
      
      In deze voorwaarden hebben de volgende termen de volgende betekenis:
      
      * **Algemene Voorwaarden:** deze algemene voorwaarden;
      * **Klant:** de natuurlijke of rechtspersoon die met [bedrijfsnaam] een overeenkomst aangaat;
      * **Overeenkomst:** de overeenkomst tussen [bedrijfsnaam] en de Klant, waarop deze Algemene Voorwaarden van toepassing zijn;
      * **Producten:** de producten en/of diensten die [bedrijfsnaam] aanbiedt;
      * **Website:** de website van [bedrijfsnaam], te vinden op [websiteadres].
      
      **Artikel 2: Toepasselijkheid**
      
      Deze Algemene Voorwaarden zijn van toepassing op alle aanbiedingen, overeenkomsten en bestellingen van [bedrijfsnaam].`;
    }

    formatTerms(): void {
    // 1. Haal de tekst op uit termsText
    const text = this.termsText;

    // 2. Splits de tekst in paragrafen
    const paragraphs = text.split('\n');

    // 3. Genereer HTML-kolommen
    let formattedHTML = '';
      for (let i = 0; i < paragraphs.length; i++) 
        {
          if (i % this.selectedColumns === 0) 
            
              formattedHTML += '<div class="kolom">';
            
          formattedHTML += `<p>${paragraphs[i]}</p>`;
          if ((i + 1) % this.selectedColumns === 0) 
            
              formattedHTML += '</div>';
            
        }
        this.formattedTerms = formattedHTML;
      }    
  }