export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  color: string;
}

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Cyber Drift',
    artist: 'AI Synthesis Engine v1',
    album: 'Future Waves',
    duration: '3:45',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200&h=200',
    color: 'text-cyan-400 gap-shadow-cyan'
  },
  {
    id: '2',
    title: 'Neon Rain',
    artist: 'Neural Network v2',
    album: 'Silicon Dreams',
    duration: '4:12',
    cover: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=200&h=200',
    color: 'text-fuchsia-400 gap-shadow-fuchsia'
  },
  {
    id: '3',
    title: 'Static Pulse',
    artist: 'Core Logic AI',
    album: 'Obsidian Code',
    duration: '2:58',
    cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=200&h=200',
    color: 'text-lime-400 gap-shadow-lime'
  }
];

export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
export const INITIAL_DIRECTION = { x: 0, y: -1 };
