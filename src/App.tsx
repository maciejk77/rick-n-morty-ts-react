import React, { Fragment, useContext, useEffect, lazy } from 'react';
import { Store } from './Store';
import { IAction, IEpisode } from './interfaces';

const EpisodeList = lazy<any>(() => import('./EpisodesList'));

const App = (): JSX.Element => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  const fetchDataAction = async (): Promise<IAction> => {
    const URL =
      'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';
    const data = await fetch(URL);
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes,
    });
  };

  const toggleFavAction = (episode: IEpisode): IAction => {
    const episodeInFav = state.favourites.includes(episode);

    let dispatchObj = {
      type: 'ADD_FAV',
      payload: episode,
    };
    if (episodeInFav) {
      const favWithoutEpisode = state.favourites.filter(
        (fav: IEpisode) => fav.id !== episode.id
      );
      dispatchObj = {
        type: 'REMOVE_FAV',
        payload: favWithoutEpisode,
      };
    }
    return dispatch(dispatchObj);
  };

  const props = {
    episodes: state.episodes,
    favourites: state.favourites,
    toggleFavAction,
  };

  return (
    <Fragment>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1>Rick and Morty</h1>
          <p>Pick your favourite episode!</p>
        </div>
        <div style={{ alignSelf: 'center' }}>
          Favourite(s):{` ${state.favourites.length}`}
        </div>
      </header>

      <React.Suspense fallback={<div>loading...</div>}>
        <section style={{ display: 'flex', flexWrap: 'wrap' }}>
          <EpisodeList {...props} />
        </section>
      </React.Suspense>
    </Fragment>
  );
};

export default App;
