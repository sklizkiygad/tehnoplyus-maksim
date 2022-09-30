import ContentLoader from 'react-content-loader';

const SearchResultLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={212}
    height={100}
    viewBox="0 0 212 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#eaeaea"
    {...props}
  >
    <rect x="8" y="8" rx="6" ry="6" width="80" height="80" />
    <rect x="112" y="29" rx="6" ry="6" width="100" height="12"/>
    <rect x="112" y="55" rx="6" ry="6" width="60" height="12"/>
  </ContentLoader>
);

export default SearchResultLoader;
