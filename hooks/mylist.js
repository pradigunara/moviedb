import { useLocalStorageState } from 'ahooks'

export function useMyList() {
  const [myList, setMyList] = useLocalStorageState('mylist', {
    defaultValue: new Map(),
    serializer: value => JSON.stringify(Array.from(value.entries())),
    deserializer: value => new Map(JSON.parse(value))
  })

  const add = (movie) => {
    if (myList.has(movie?.id)) {
      return
    }

    myList.set(movie?.id, movie)
    setMyList(new Map([...myList.entries()]))
  }

  const remove = ({ id } = {}) => {
    myList.delete(id)
    setMyList(new Map([...myList.entries()]))
  }

  const has = (key) => myList.has(key)
  const values = () => [...myList.values()]

  return { add, remove, has, values }
}
