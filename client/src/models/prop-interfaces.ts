export interface CompletableSlide {
    onSlideComplete: (canContinue: boolean) => void;
}