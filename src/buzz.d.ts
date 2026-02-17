// Type definitions for Buzz.js
// Project: http://buzz.jaysalvat.com/
// Definitions by: Jay Salvat

export as namespace buzz;

export interface BuzzOptions {
    autoplay?: boolean;
    crossOrigin?: string | null;
    duration?: number;
    formats?: string[];
    loop?: boolean;
    placeholder?: string;
    preload?: 'auto' | 'metadata' | 'none' | boolean;
    volume?: number;
    webAudioApi?: boolean;
    document?: Document;
}

export interface BuzzDefaults extends Required<BuzzOptions> {}

export interface BuzzTypes {
    [key: string]: string;
}

export type BuzzCallback = (this: BuzzSound) => void;

export interface TimeRange {
    start: number;
    end: number;
}

export interface BuzzSound {
    load(): this;
    play(): this;
    togglePlay(): this;
    pause(): this;
    isPaused(): boolean | null;
    stop(): this;
    isEnded(): boolean | null;
    loop(): this;
    unloop(): this;
    mute(): this;
    unmute(): this;
    toggleMute(): this;
    isMuted(): boolean | null;
    setVolume(volume: number): this;
    getVolume(): number;
    increaseVolume(value?: number): this;
    decreaseVolume(value?: number): this;
    setTime(time: number): this;
    getTime(): number | string;
    setPercent(percent: number): this;
    getPercent(): number | string;
    setSpeed(duration: number): this;
    getSpeed(): number | null;
    getDuration(): number | string;
    getPlayed(): TimeRange[] | null;
    getBuffered(): TimeRange[] | null;
    getSeekable(): TimeRange[] | null;
    getErrorCode(): number;
    getErrorMessage(): string | null;
    getStateCode(): number | null;
    getStateMessage(): string | null;
    getNetworkStateCode(): number | null;
    getNetworkStateMessage(): string | null;
    set(key: string, value: any): this;
    get(key?: string): any;
    bind(types: string, func: BuzzCallback): this;
    unbind(types: string): this;
    bindOnce(type: string, func: BuzzCallback): this;
    trigger(types: string, detail?: any): this;

    // Promise/callback overloads
    fadeTo(to: number, callback: BuzzCallback): this;
    fadeTo(to: number, duration: number, callback: BuzzCallback): this;
    fadeTo(to: number, duration?: number): Promise<this>;

    fadeIn(callback: BuzzCallback): this;
    fadeIn(duration: number, callback: BuzzCallback): this;
    fadeIn(duration?: number): Promise<this>;

    fadeOut(callback: BuzzCallback): this;
    fadeOut(duration: number, callback: BuzzCallback): this;
    fadeOut(duration?: number): Promise<this>;

    fadeWith(sound: BuzzSound, duration?: number): this;

    whenReady(func: BuzzCallback): void;
    whenReady(): Promise<this>;

    addSource(src: string): HTMLSourceElement;

    sound: HTMLAudioElement;
    volume: number;
}

export interface BuzzGroup {
    getSounds(): BuzzSound[];
    add(...sounds: BuzzSound[]): void;
    remove(...sounds: BuzzSound[]): void;
    load(): this;
    play(): this;
    togglePlay(): this;
    pause(time?: number): this;
    stop(): this;
    mute(): this;
    unmute(): this;
    toggleMute(): this;
    setVolume(volume: number): this;
    increaseVolume(value?: number): this;
    decreaseVolume(value?: number): this;
    loop(): this;
    unloop(): this;
    setSpeed(speed: number): this;
    setTime(time: number): this;
    set(key: string, value: any): this;
    bind(type: string, func: Function): this;
    unbind(type: string): this;
    bindOnce(type: string, func: Function): this;
    trigger(type: string): this;
    fade(from: number, to: number, duration?: number, callback?: Function): this;
    fadeIn(duration?: number, callback?: Function): this;
    fadeOut(duration?: number, callback?: Function): this;
}

export interface Buzz {
    defaults: BuzzDefaults;
    types: BuzzTypes;
    sounds: BuzzSound[];
    el: HTMLAudioElement;
    audioCtx?: AudioContext;

    getAudioContext(): AudioContext | null;
    sound(src: string | string[], options?: BuzzOptions): BuzzSound;
    group(sounds: BuzzSound | BuzzSound[]): BuzzGroup;
    all(): BuzzGroup;
    isSupported(): boolean;
    isOGGSupported(): boolean;
    isWAVSupported(): boolean;
    isMP3Supported(): boolean;
    isAACSupported(): boolean;
    toTimer(time: number, withHours?: boolean): string;
    fromTimer(time: string): number;
    toPercent(value: number, total: number, decimal?: number): number;
    fromPercent(percent: number, total: number, decimal?: number): number;
}

declare const buzz: Buzz;
export default buzz;
