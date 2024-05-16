import { SafeHtml } from "@angular/platform-browser";
import { StyleProperty } from "./app/services/color-update.service";

export interface Option {
    title: string;
    content:Content,
    selected?:boolean
}

export interface Content {
    type:string,
}

export interface Header {
    content:SafeHtml
}

export interface Footer {
    content:SafeHtml
}

export interface Main {
    content:SafeHtml
}

export interface Calculatietabel {
    content: SafeHtml
}

export interface ColorOption {
    id: string;
    variable: string;
    value: string;
    label: string;
    selector: string;
    styleProperty: StyleProperty; 
  }