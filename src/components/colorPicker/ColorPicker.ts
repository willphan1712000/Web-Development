export type ColorPickerOptions = {
    default: string,
}

export interface ColorPicker {
    getColor(): string;
}