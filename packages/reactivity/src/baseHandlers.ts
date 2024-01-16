import { ReactiveFlags, TrackOpTypes, TriggerOpTypes } from './constants'
import { toRaw, type Target } from './reactive'
import { track } from './reactiveEeffect'

// 1.4
class BaseReactiveHandler {
  constructor (
  ) {}

  get (target: Target, key: string | symbol) {
    const res = Reflect.get(target, key)
    track(target, TrackOpTypes.GET, key)
  }
}

// 1.10
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor () {
    super()
  }

  set (target: object, key: string | symbol, value: unknown, receiver: object) {
    let oldValue = (target as any)[key]
    oldValue = toRaw(oldValue)
    value = toRaw(value)
    const result = Reflect.set(target, key, value)
    trigger(target, TriggerOpTypes.SET, key, value, oldValue)
    return result
  }
}
