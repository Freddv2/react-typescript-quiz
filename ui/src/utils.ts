export const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5)

export const getValuesOfNumericEnum1 = (enu: any) => Object.values(enu)
    .filter(val => typeof val === 'number')

export function getValuesOfNumericEnum<T>(enu: T): number[] {
    return Object.values(enu).filter(val => typeof val === 'number')
}