export type Combinator<TType1, TType2, KType1 extends string = 'a', KType2 extends string = 'b'> =
  Record<KType1, TType1> & Record<KType2, TType2>;

export type ChangeCombinator<TType> = Combinator<TType, TType, 'cur', 'prev'>;

export function newCombinedValue<TType1, TType2>
(valueA: TType1, valueB: TType2): Combinator<TType1, TType2> {
  return {
    a: valueA,
    b: valueB
  };
}
