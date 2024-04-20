import { Component } from '@/types/Component'
import { useEffect, useState } from 'react'
import ComponentCard from '../ComponentCard'

const MainComponentsInterface = (): JSX.Element => {
  const [components, setComponents] = useState<Component[]>()

  useEffect(() => {
    const fetchingComponents = async (): Promise<void> => {
      const fetchedComponents = await window.db.db.fetchComponents()
      setComponents(fetchedComponents)
    }

    fetchingComponents()
  }, [])

  return (
    <ul className="bg-red-500 p-4 max-h-fit grid grid-flow-row grid-cols-3 gap-4 max-lg:grid-cols-2">
      {components &&
        components.map(({ id, catalogId, name, type, description, data }) => (
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
  )
}

export default MainComponentsInterface
