import { type TriggerOpTypes, type TrackOpTypes } from './constants'
import { createDep, type Dep } from './dep'
import { activeEffect, shouldTrack, trackEffect } from './effect'

type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<object, KeyToDepMap>()
// 1.5
export function track (target: object, type: TrackOpTypes, key: unknown) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = createDep(() => depsMap.delete(key))))
    }
    trackEffect(activeEffect, dep)
  }
}
export function trigger (target: object, type: TriggerOpTypes, key?: unknown, newValue?: unknown, oldValue?: unknown, oldTarget?: Map<unknown, unknown> | Set<unknown>) {

}
