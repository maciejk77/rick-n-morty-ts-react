import React from 'react';
import { IEpisode } from './interfaces';

export default function EpisodesList(props: any): Array<JSX.Element> {
  const { episodes, toggleFavAction, favourites } = props;
  return episodes.map((episode: IEpisode) => (
    <section key={episode.id} style={{ padding: 10 }}>
      <img src={episode.image.medium} alt={`Rick and Morty ${episode.name}`} />
      <div>{episode.name}</div>
      <section>
        Season: {episode.season} Number: {episode.number}
      </section>
      <button type="button" onClick={() => toggleFavAction(episode)}>
        {favourites.find((fav: IEpisode) => fav.id === episode.id)
          ? 'Unfav'
          : 'Fav'}
      </button>
    </section>
  ));
}
