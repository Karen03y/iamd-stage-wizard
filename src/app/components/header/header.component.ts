import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../../../types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() headerChange: EventEmitter<Header> = new EventEmitter<Header>();

  headers: Header[] = [
    { id: 1, headerContent: `<header>
    <table>
      <tbody>
        <tr>
          <td
            rowspan="2"
            style="
              height: 150px;
              width: 55%;
              text-align: left;
              vertical-align: middle;
            "
          >
            <div>
              <h1>LOGO</h1>
            </div>
          </td>
          <td class="label" style="width: 22, 5%">
            <strong>Contact</strong> <br />Demo bedrijf
            <div>Verantwoordelijke</div>
            <div>03/000 00 00</div>
            <div>info@demobedrijf.be</div>
            www.demobedrijf.be
          </td>
          <td class="label">
            <strong>Adres</strong> <br />Straat 1 <br />0000 Stad <br />BE
            0000.000.000
          </td>
        </tr>
      </tbody>
    </table>
  </header>
  ` },
    { id: 2, headerContent: `<header>
    <table>
      <tbody>
        <tr>
          <td
            rowspan="2"
            style="
              height: 150px;
              text-align: left;
              width: 60%;
              vertical-align: middle;
            "
          >
            <div>
              <h1>LOGO</h1>
            </div>
          </td>
        </tr>
        <tr>
          <td style="width: 40%">
            [VERKOOPFACTUUR_NAAM] <br />[VERKOOPFACTUUR_ADRESREGEL]
            <br />[VERKOOPFACTUUR_POSTCODE] [VERKOOPFACTUUR_PLAATS]
            <br />[VERKOOPFACTUUR_LAND] <br />[VERKOOPFACTUUR_BTW_NUMMER]
          </td>
        </tr>
      </tbody>
    </table>
  </header>
  ` }
  ];

  selectedHeader: Header = this.headers[0];

  onHeaderChange(header: Header) {
    this.selectedHeader = header;
    this.headerChange.emit(header); 
    
  }

}
