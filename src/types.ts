import { SafeHtml } from "@angular/platform-browser";

export interface Option {
    title: string;
    content:Content,
    showContent:boolean
}

export interface Content {
    type:string,
}

export interface Header {
    id:number,
    headerContent:SafeHtml
}

export interface Footer {
    id:number,
    footerContent:string
}