import { type ComputedRefImpl } from './computed'
import { type ReactiveEffect } from './effect'

export type Dep = Map<ReactiveEffect, number> & {
  cleanup: () => void
  computed?: ComputedRefImpl<any>
}
export const createDep = (
  cleanup: () => void,
  computed?: ComputedRefImpl<any>
): Dep => {
  const dep = new Map() as Dep
  dep.cleanup = cleanup
  dep.computed = computed
  return dep
}
