import { Component } from '@/types/Component'
import { useEffect, useState } from 'react'
import ComponentCard from '../ComponentCard'

const SearchInterface = (): JSX.Element => {
  const [components, setComponents] = useState<Component[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    const fetchingComponents = async (): Promise<void> => {
      const fetchedComponents = await window.db.db.fetchComponents()
      setComponents(fetchedComponents)
    }

    fetchingComponents()
  }, [])

  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-red-500 p-4 max-h-fit">
      <input
        type="text"
        placeholder="Search"
        className="bg-red-900 text-white mb-4 focus:outline-none w-full p-4 hover:bg-red-950 focus:bg-red-950"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul className="grid grid-flow-row grid-cols-3 gap-4 max-lg:grid-cols-2">
        {filteredComponents.map(({ id, catalogId, name, type, description, data }) => (
          <ComponentCard
            key={id}
            catalogId={catalogId}
            id={id}
            name={name}
            description={description}
            type={type}
            data={data}
          />
        ))}
      </ul>
    </div>
  )
}

export default SearchInterface
