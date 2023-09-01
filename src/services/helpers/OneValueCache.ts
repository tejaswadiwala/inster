class OneValueCache<T> {
  private cachedValue: T | null = null

  setValue(value: T) {
    this.cachedValue = value
  }

  getValue(): T | null {
    return this.cachedValue
  }

  clear() {
    this.cachedValue = null
  }
}

export default OneValueCache
