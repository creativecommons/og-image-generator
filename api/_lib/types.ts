export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';
export type BackgroundType = 'pattern' | 'image';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    theme: Theme;
    backgroundType: BackgroundType;
    md: boolean;
    fontFamily: string;
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];
}
