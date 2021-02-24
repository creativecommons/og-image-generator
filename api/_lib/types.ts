export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';
export type BackgroundType = 'pattern' | 'image';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    theme: Theme;
    md: boolean;
    fontFamily: string;
    backgroundType: BackgroundType;
    imageUrl: string;
    attribution: string;
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];
}
