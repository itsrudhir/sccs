import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Component } from '@/types/Component'

const EditComponentInterface = (): JSX.Element => {
  const { componentId } = useParams()
  const [error, setError] = useState('')
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
  const navigate = useNavigate()

  useEffect(() => {
    const fetchingComponent = async (): Promise<void> => {
      const fetchedComponent = await window.db.db.fetchSingleComponent(componentId)
      setComponent(fetchedComponent)
    }

    fetchingComponent()
  }, [componentId])

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault()
    if (!component.name) {
      setError('Name is required')
      return
    }

    if (!component.data) {
      setError('Code is required')
      return
    }

    try {
      await window.db.db.updateComponent(JSON.stringify(component))
    } catch (error) {
      console.error('Error updating component:', error)
    } finally {
      navigate(`/components/${component.id}`)
    }
  }

  return (
    <div className="flex items-center justify-center h-full p-12">
      <div className="bg-red-500 p-8 w-full">
        <h2 className="text-2xl font-bold text-white mb-4">Edit Component</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-red-100 mb-2 text-lg font-semibold">
              Name {error && <i className="text-red-500 text-sm mt-1">*</i>}
            </label>
            <input
              type="text"
              id="name"
              value={component.name}
              placeholder="Component name"
              onChange={(e) => setComponent((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-red-800 text-white mb-4 focus:outline-none w-full p-4 hover:bg-red-900 focus:bg-red-900"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-red-100 mb-2 text-lg font-semibold">
              Code {error && <i className="text-red-500 text-sm mt-1">*</i>}
            </label>
            <textarea
              id="description"
              value={component.data}
              placeholder="Insert code here"
              onChange={(e) => setComponent((prev) => ({ ...prev, data: e.target.value }))}
              className="bg-red-800 text-white mb-4 focus:outline-none w-full p-4 hover:bg-red-900 focus:bg-red-900"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-red-100 mb-2 text-lg font-semibold">
              Description
            </label>
            <textarea
              id="description"
              value={component.description}
              placeholder="Catalog description"
              onChange={(e) => setComponent((prev) => ({ ...prev, description: e.target.value }))}
              className="bg-red-800 text-white mb-4 focus:outline-none w-full p-4 hover:bg-red-900 focus:bg-red-900"
            ></textarea>
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="text-white bg-red-900 px-8 py-3 block text-center font-semibold hover:bg-white hover:text-red-700 focus:outline-none active:text-white active:bg-red-800 w-full"
            >
              Edit
            </button>
            <Link
              type="button"
              to={`/components/${component.id}`}
              className="text-red-700 bg-red-200 px-8 py-3 block text-center font-semibold hover:bg-red-900 hover:text-white focus:outline-none active:text-red-700 active:bg-red-200 w-full"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditComponentInterface
