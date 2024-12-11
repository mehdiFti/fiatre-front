declare module 'nuxt-storage' {
    export function useStorage(): any;
}

declare module 'nuxt-storage/local-storage' {
    export function getData(key: string): any;
    export function setData(key: string, value: any): void;
  }