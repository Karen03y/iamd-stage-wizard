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
    content:SafeHtml
}

export interface Footer {
    content:SafeHtml
}

export interface Main {
    content:SafeHtml
}