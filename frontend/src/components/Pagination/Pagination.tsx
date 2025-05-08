import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';

interface Props {
  onSetCurrentPage: (num: number) => void;
  nPages: number;
  currentPage: number;
  pathname: string;
}

const Pagination: React.FC<Props> = ({
  onSetCurrentPage,
  nPages,
  currentPage,
  pathname,
}) => {
  const params = useParams() as { pageNum: string };
  const router = useRouter();
  const pageNumbers: number[] = Array.from(
    { length: nPages },
    (_, index) => index + 1,
  );
  const primaryPages = pageNumbers.slice(
    0,
    currentPage === 1 ? 3 : currentPage === 2 ? 4 : currentPage === 3 ? 5 : 0,
  );
  const midPages = pageNumbers.slice(currentPage - 3, currentPage + 2);

  useEffect(() => {
    if (params) {
      onSetCurrentPage(parseInt(params.pageNum));
    }
    if (
      router.pathname === `${pathname}/pageNum]` &&
      params &&
      !pageNumbers.includes(parseInt(params.pageNum))
    ) {
      void router.push(`${pathname}1`);
    }
  }, [params, onSetCurrentPage, pageNumbers, router, pathname]);

  const onPageClick = (value: string, pgNumber: number) => {
    void router.push(value);
    onSetCurrentPage(pgNumber);
  };

  return (
    <>
      <nav>
        <ul className="pagination">
          {currentPage > 1 && (
            <li
              className="page-item pagination-arrow"
              onClick={() => onPageClick(`${pathname}${1}`, 1)}
            >
              &laquo;
            </li>
          )}
          {currentPage > 1 && (
            <li
              className="page-item pagination-arrow pagination-back"
              onClick={() =>
                onPageClick(`${pathname}${currentPage - 1}`, currentPage - 1)
              }
            >
              &lsaquo;
            </li>
          )}
          {(currentPage === 1 || currentPage === 2 || currentPage === 3) && (
            <>
              {primaryPages.map((pgNumber) => (
                <li
                  onClick={() => {
                    onPageClick(`${pathname}${pgNumber}`, pgNumber);
                  }}
                  key={pgNumber}
                  className={`page-item ${
                    currentPage == pgNumber ? 'page-link-active' : ''
                  } `}
                >
                  <a className="page-link">{pgNumber}</a>
                </li>
              ))}
              {pageNumbers.length > 3 && (
                <>
                  <li> ...</li>
                  <li
                    onClick={() => {
                      onPageClick(
                        `${pathname}${pageNumbers[pageNumbers.length - 1]}`,
                        pageNumbers[pageNumbers.length - 1],
                      );
                    }}
                    key={pageNumbers[pageNumbers.length - 1]}
                    className={`page-item ${
                      currentPage == pageNumbers[pageNumbers.length - 1]
                        ? 'page-link-active'
                        : ''
                    } `}
                  >
                    <a className="page-link">
                      {pageNumbers[pageNumbers.length - 1]}
                    </a>
                  </li>
                </>
              )}
            </>
          )}

          {currentPage > 3 && (
            <>
              <li
                onClick={() => {
                  onPageClick(`${pathname}${1}`, 1);
                }}
                key={1}
                className={`page-item ${
                  currentPage == 1 ? 'page-link-active' : ''
                } `}
              >
                <a className="page-link">1</a>
              </li>
              <li> ...</li>
              {midPages.map((pgNumber) => (
                <li
                  onClick={() => {
                    onPageClick(`${pathname}${pgNumber}`, pgNumber);
                    onSetCurrentPage(pgNumber);
                  }}
                  key={pgNumber}
                  className={`page-item ${
                    currentPage == pgNumber ? 'page-link-active' : ''
                  } `}
                >
                  <a className="page-link">{pgNumber}</a>
                </li>
              ))}
              {currentPage < pageNumbers.length - 2 && (
                <>
                  <li> ...</li>
                  <li
                    onClick={() => {
                      onPageClick(
                        `${pathname}${pageNumbers[pageNumbers.length - 1]}`,
                        pageNumbers[pageNumbers.length - 1],
                      );
                    }}
                    key={pageNumbers[pageNumbers.length - 1]}
                    className={`page-item ${
                      currentPage == pageNumbers[pageNumbers.length - 1]
                        ? 'page-link-active'
                        : ''
                    } `}
                  >
                    <a className="page-link">
                      {pageNumbers[pageNumbers.length - 1]}
                    </a>
                  </li>
                </>
              )}
            </>
          )}
          {currentPage < pageNumbers.length && (
            <li
              className="page-item pagination-arrow pagination-forward"
              onClick={() =>
                onPageClick(`${pathname}${currentPage + 1}`, currentPage + 1)
              }
            >
              &rsaquo;
            </li>
          )}
          {currentPage < pageNumbers.length && (
            <li
              className="page-item pagination-arrow"
              onClick={() =>
                onPageClick(
                  `${pathname}${pageNumbers.length}`,
                  pageNumbers.length,
                )
              }
            >
              &raquo;
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
