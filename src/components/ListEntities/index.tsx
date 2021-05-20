import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useRecoilValue } from "recoil";
import { entities } from '../../atoms/index';
import EntityStatus from '../EntityStatus';
import { Link } from 'react-router-dom';
import { getNormalNear } from '../../helper';

const ListEntities = () => {
  const data = useRecoilValue(entities);

  return (
    <div className="space-y-2 divide-y divide-gray-200">
      {data.map(entity => (
        <div key={entity.url}>
          <div className="prose max-w-none">
            <Link
              to={{
                pathname: '/detail',
                hash: encodeURI(entity.url)
              }}
            >
              <h1>{entity.url}</h1>
            </Link>
            <small> — by {entity.author} {getNormalNear(entity.bounty) > 1 && <span>with <strong>{getNormalNear(entity.bounty)}</strong> Ⓝ of bounty</span>}</small>
            <div>
              <ReactMarkdown>
                {entity.detail}
              </ReactMarkdown>
            </div>
          </div>
          <div className="mb-3">
            <EntityStatus entity={entity.url} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListEntities;