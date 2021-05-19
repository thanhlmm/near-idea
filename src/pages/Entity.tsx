import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation, useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { entity, reviews } from '../atoms/index';
import { getNormalNear } from '../helper';
import IdeaForm from '../components/IdeaForm';

const EntityPage = () => {
  const params = useLocation();
  const url = decodeURI(params.hash.replace('#', ''));
  const data = useRecoilValue(entity(url));
  const listReview = useRecoilValue(reviews(url)); // TODO: Sort by upvote

  console.log(listReview);

  const handleUpVoting = (reviewId: number) => {
    window.contract.upVote({reviewId}).then(console.log)
  }

  const handleDownVoting = (reviewId: number) => {
    window.contract.downVote({reviewId}).then(console.log)
  }

  if (!data) {
    return <div className="flex items-center justify-center w-screen h-screen">
      <h1 className="text-4xl">Not found</h1>
    </div>
  }

  return (
    <div className="p-4 mt-6">
      <div className="p-4 mb-6 border border-gray-200 rounded shadow">
        <div className="prose max-w-none">
          <h1>{data.url}</h1>
          <small> — by {data.author} {getNormalNear(data.bounty) > 1 && <span>with <strong>{getNormalNear(data.bounty)}</strong> Ⓝ of bounty</span>}</small>
          <div>
            <ReactMarkdown>
              {data.detail}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      
      <div>
        <h1 className="mb-5 text-lg font-medium">🌟 Ideas</h1>

        <div>
          <IdeaForm url={url} />
        </div>

        <div className="space-y-4 divide-y">
          {listReview.map(item => (
            <div key={item.id}>
              <div className="mb-3 prose max-w-none">
                <small> — by {item.author}</small>
                <ReactMarkdown>
                  {item.detail}
                </ReactMarkdown>

              </div>
              <div className="space-x-3 text-sm">
                <button
                  className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-200"
                  onClick={() => handleUpVoting(item.id)}
                >
                  <span className="mr-1">👍</span> {item.upVote.length > 0 ? item.upVote.length : null}
                </button>
                <button
                  className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-200"
                  onClick={() => handleDownVoting(item.id)}
                >
                  <span className="mr-1">👎</span> {item.downVote.length > 0 ? item.downVote.length : null}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const EntityPageLoader = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <EntityPage />
    </React.Suspense>
  )
}


export default EntityPageLoader;
