import { type Dep } from './dep'

export let activeEffect: ReactiveEffect | undefined
export const shouldTrack = true
export class ReactiveEffect<T = any> {
  _trackId = 0
  _depsLength = 0
  active = true
  deps: Dep[] = []
  constructor () {}
}
// 1.6
// 建立effect和dep之间的联系
export function trackEffect (effect: ReactiveEffect, dep: Dep) {
  // 如果dep未收集该effect
  if (dep.get(effect) !== effect._trackId) {
    // 向dep中添加effect
    dep.set(effect, effect._trackId)
    const oldDep = effect.deps[effect._depsLength]
    // 如果dep
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect)
      }
      // 向effect中添加dep
      effect.deps[effect._depsLength++] = dep
    } else {
      effect._depsLength++
    }
  }
}

// 1.7
function cleanupDepEffect (dep: Dep, effect: ReactiveEffect) {
  const trackId = dep.get(effect)
  if (trackId !== undefined && effect._trackId !== trackId) {
    dep.delete(effect)
    if (dep.size === 0) {
      dep.cleanup()
    }
  }
}
