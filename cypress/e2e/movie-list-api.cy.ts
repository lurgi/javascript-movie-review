describe('API 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    const popularMovieUrl =
      Cypress.env('POPULAR_MOVIES_URL') +
      '?' +
      new URLSearchParams({
        api_key: Cypress.env('TMDB_API_KEY'),
        language: 'ko-KR',
        page: '1',
      });

    console.log(Cypress.env('TMDB_API_KEY'));
    cy.request('GET', popularMovieUrl).as('popularMovies');
    cy.get('@popularMovies').its('status').should('eq', 200);
    cy.get('@popularMovies').its('body.results').should('have.length', 20);
  });
});
