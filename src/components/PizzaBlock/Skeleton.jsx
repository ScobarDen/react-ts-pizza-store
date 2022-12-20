import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={455}
    viewBox="0 0 280 455"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="130" cy="125" r="125" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="308" rx="10" ry="10" width="280" height="82" />
    <rect x="0" y="418" rx="10" ry="10" width="91" height="27" />
    <rect x="127" y="408" rx="15" ry="15" width="151" height="44" />
  </ContentLoader>
);

export default Skeleton;
