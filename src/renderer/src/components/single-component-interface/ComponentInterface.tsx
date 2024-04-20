import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../Button'
import { Component } from '@/types/Component'

const ComponentInterface = (): JSX.Element => {
  const { componentId } = useParams()
  const [component, setComponent] = useState<Component>({
    id: '',
    catalogId: '',
    name: '',
    type: 'CODE',
    description: '',
    data: '',
    frequency: 0,
    lastAccessed: new Date(),
    createdAt: new Date()
  })

  useEffect(() => {
    const fetchingComponent = async (): Promise<void> => {
      const fetchedComponent = await window.db.db.fetchSingleComponent(componentId)
      setComponent(fetchedComponent)
    }

    fetchingComponent()
  }, [componentId])

  return (
    <>
      <section className="text-white">
        <div className="flex justify-between">
          <Button text="Go Back" link="/" reactIcon={null} />
          <Button
            text="Delete Component"
            link={`/components/${component?.id}/delete-component`}
            reactIcon={null}
          />
        </div>
        <div className="flex gap-8 my-8 items-start">
          <div className="flex flex-col gap-12 w-full">
            <h1 className="text-5xl font-bold">{component?.name}</h1>
            <p className="text-zinc-200 w-full">{component.description}</p>
          </div>
          <code className="bg-gray-700 text-white w-full p-8">{component.data}</code>
        </div>
      </section>
    </>
  )
}

export default ComponentInterface
