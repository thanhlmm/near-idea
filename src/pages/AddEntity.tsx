import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Big from 'big.js';

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const DEFAULT_BOUNTY = 3;

const AddEntityPage = () => {
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [bounty, setBounty] = useState(DEFAULT_BOUNTY);
  const [isLoading, setLoading] = useState(false);

  const handleAndEntity = () => {
    setLoading(false);
    window.contract.addEntity(
      {
        url,
        detail
      },
      BOATLOAD_OF_GAS,
      Big(bounty || '0').times(10 ** 24).toFixed()
    ).then((data) => {
      console.log(data);
      // Reset the form
      setDetail("");
      setUrl("");
      setBounty(DEFAULT_BOUNTY);
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <div className="p-4">
      <div className="mt-6 border border-gray-200 rounded shadow">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  className="flex-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Near blockchain"
                />
              </div>
            </div>

            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                Detail
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows={8}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="The Near environment is awesome! How do you think?"
                  onChange={e => setDetail(e.target.value)}
                  value={detail}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Brief detail about your needed
              </p>
            </div>

            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                Bounty (in NEAR)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  value={bounty}
                  onChange={e => setBounty(Number(e.target.value))}
                  className="flex-1 block border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="3"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Give the best contributor a reward
              </p>
            </div>

            <button
              onClick={handleAndEntity}
              disabled={isLoading}
              className="px-3 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-70"
            >
              Submit
            </button>
          </div>
          <div className="mt-10 prose">
            <h1>{url}</h1>
            <div>
              <ReactMarkdown>
                {detail}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEntityPage;
