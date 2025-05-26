import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { INITIAL_PAGE, INITIAL_PER_PAGE, TOTAL_ITEMS } from './constants';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(INITIAL_PAGE, TOTAL_ITEMS).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (!searchParams.has('page')) {
      params.set('page', INITIAL_PAGE.toString());
    }

    if (!searchParams.has('perPage')) {
      params.set('perPage', INITIAL_PER_PAGE.toString());
    }

    setSearchParams(params);
  }, []);

  const currentPage = +(searchParams.get('page') || INITIAL_PAGE);
  const perPage = +(searchParams.get('perPage') || INITIAL_PER_PAGE);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('perPage', e.target.value);
    params.set('page', INITIAL_PAGE.toString());

    setSearchParams(params);
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentPageItems = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${Math.min(endIndex, TOTAL_ITEMS)} of ${TOTAL_ITEMS})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
          >
            {[3, 5, 10, 20].map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination />

      <ul>
        {currentPageItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
