
export const kakaoBotControllers: {
    [s: string]: string | symbol,
} = {};

export function KakaoContextController(context: string): MethodDecorator {
    return (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): void => {
        kakaoBotControllers[context] = propertyKey;
    };
}
