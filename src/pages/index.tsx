import React from 'react';
import { Link } from 'react-router-dom';
import ListEntities from '../components/ListEntities';
const HomePage = () => {
  
  
  return (
    <div className="p-4">
      <div className="flex flex-col items-center mb-6 md:flex-row">
        <div>
          <p
            className="mb-4 prose"
          >
            <strong>Near💡 Idea</strong> is a place to get community idea with bounty built by Near block-chain technology
          </p>

          <Link
            to="/add"
            className="px-3 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Get idea
          </Link>
        </div>
        <div>
          <img className="w-auto h-60" src="/idea.svg" alt="Idea image" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded shadow">
          <h1 className="mb-5 text-lg font-medium">💡 Contribute idea and get bounty</h1>
          <React.Suspense fallback={<div>Loading...</div>}>
            <ListEntities />
          </React.Suspense>
        </div>

        <div className="p-4 border border-gray-200 rounded shadow">
          <h1 className="mb-5 text-lg font-medium">🔝 Top vote idea</h1>
          <p>Comming soon</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage;
