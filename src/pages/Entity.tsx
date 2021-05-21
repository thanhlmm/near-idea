import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation, useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { entity, reviews } from '../atoms/index';
import { getNormalNear } from '../helper';
import IdeaForm from '../components/IdeaForm';
import className from 'classnames';

const EntityPage = () => {
  const params = useLocation();
  const url = decodeURI(params.hash.replace('#', ''));
  const data = useRecoilValue(entity(url));
  const listReview = useRecoilValue(reviews(url)); // TODO: Sort by upvote
  const [listVoteError, setListVoteError] = useState<number[]>([])

  const handleUpVoting = (reviewId: number) => {
    window.contract.upVote({reviewId}).then(() => {
      // TODO: Fetch data instead of reload
      window.location.reload();
    }).catch(error => {
      setListVoteError((value) => [...value, reviewId]);
    })
  }

  const handleDownVoting = (reviewId: number) => {
    window.contract.downVote({reviewId}).then(() => {
      // TODO: Fetch data instead of reload
      window.location.reload();
    }).catch(() => {
      setListVoteError((value) => [...value, reviewId]);
    })
  }

  const handleRewardBounty = (reviewId) => {
    if (!data) {
      return;
    }

    window.contract.rewardBounty({ url: data.url, reviewId }).then(() => {
      window.location.reload();
    });
  }

  if (!data) {
    return <div className="flex items-center justify-center w-screen h-screen">
      <h1 className="text-4xl">Not found</h1>
    </div>
  }

  const isRewardable = useMemo(() => {
    return window.accountId === data.author && Number(data.rewardedFor) < 0;
  }, [data])

  return (
    <div className="p-4 mt-6">
      <div className="p-4 mb-6 border border-gray-300 rounded">
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
      
      <div className="mt-8">
        <h1 className="text-lg font-medium">🌟 Ideas</h1>

        <div>
          <IdeaForm url={url} />
        </div>

        <div className="space-y-4 divide-y">
          {listReview.map(item => (
            <div key={item.id} className={className("space-y-3 p-3 rounded", {
              'bg-green-100 border border-green-300': data.rewardedFor === item.id
            })}>
              {data.rewardedFor === item.id && <div>
                🏆  This idea has claimed <strong className="font-semibold">{getNormalNear(data.bounty)}</strong> Ⓝ from {data.author}
              </div>}
              
              <div className="prose max-w-none">
                <small> — by {item.author}</small>
                <ReactMarkdown>
                  {item.detail}
                </ReactMarkdown>
              </div>

              {isRewardable && (<div>
                <button
                  className="px-3 py-2 rounded ring-2 ring-indigo-600 hover:ring-indigo-700"
                  onClick={() => handleRewardBounty(item.id)}
                >
                  Give this idea the bounty 💰
                </button>
              </div>)}

              <div className="flex flex-row items-center space-x-3 text-sm">
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

                {/* TODO: Map to right error return from the contract */}
                {listVoteError.includes(item.id) && <div className="inline-block text-red-500">You have already voted for this idea</div>}
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
