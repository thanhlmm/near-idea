import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { reviews } from '../../atoms/index';

const EntityStatus = ({entity}: {entity: string}) => {
  const data = useRecoilValue(reviews(entity));

  return (
    <Link
      to={{
        pathname: '/detail',
        hash: encodeURI(entity)
      }}
      className="inline-flex flex-row items-center px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
    >
      💬 &nbsp;{data.length} ideas
    </Link>
  );
}

export default EntityStatus;