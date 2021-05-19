import React, { useState } from 'react';

const IdeaForm = ({ url }: { url: string}) => {
  const [isLoading, setLoading] = useState(false);
  const [detail, setDetail] = useState("");

  const handleAndReview = () => {
    setLoading(true);
    window.contract.addReview({ url, detail }).then((data) => {
      console.log(data);
      setDetail("");
    }).catch(error => console.error(error))
  }
  
  return (
    <div>
      <div className="py-5 space-y-6 bg-white">
        <div>
          <label htmlFor="about" className="block text-sm font-medium text-gray-700">
            Share your idea to earn the bounty 💰
          </label>
          <div className="mt-1">
            <textarea
              id="about"
              name="about"
              rows={10}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="I think..."
              onChange={e => setDetail(e.target.value)}
              value={detail}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            You can input in markdown format
          </p>
        </div>

        <button
          onClick={handleAndReview}
          disabled={isLoading}
          className="px-3 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-70"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default IdeaForm;