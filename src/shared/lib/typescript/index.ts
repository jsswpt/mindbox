export type EnumKey<T extends Record<string, string>> = keyof T

export type EnumValue<T extends Record<string, string>> = T[EnumKey<T>]

export type Nullable<T extends Record<string, unknown>> = Record<
    keyof T,
    null | T[keyof T]
>
