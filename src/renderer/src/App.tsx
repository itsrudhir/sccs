import Button from './components/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shadcn/components/ui/tabs'
import { useState } from 'react'
import SearchInterface from './components/main-interfaces/SearchInterface'
import MainComponentsInterface from './components/main-interfaces/MainComponentsInterface'

function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState('components')

  return (
    <>
      <h1 className="text-center text-3xl font-semibold text-white mb-8">
        Software Component Cataloguing System
      </h1>
      <Button text={'Create Component'} link="/components/new-component" reactIcon={null} />
      <Tabs defaultValue="components" className="flex mt-8 flex-row w-full gap-8 items-start">
        <TabsList className="bg-red-500 flex flex-col justify-between text-white font-semibold p-2 gap-2 min-w-64">
          <TabsTrigger
            className={`w-full text-lg py-4 ${activeTab === 'components' ? 'bg-red-800' : 'bg-red-500'}`}
            value="components"
            onClick={() => setActiveTab('components')}
          >
            Components
          </TabsTrigger>
          <TabsTrigger
            className={`w-full text-lg py-4 ${activeTab === 'search' ? 'bg-red-800' : 'bg-red-500'}`}
            value="search"
            onClick={() => setActiveTab('search')}
          >
            Search
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="components"
          className="overflow-y-auto min-h-[28rem] scrollbar-none scrollbar-thumb-red-500 scrollbar-track-red-500 w-full"
        >
          <MainComponentsInterface />
        </TabsContent>
        <TabsContent
          value="search"
          className="overflow-y-auto max-h-[28rem] scrollbar-none scrollbar-thumb-red-500 scrollbar-track-red-500 w-full"
        >
          <SearchInterface />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default App
