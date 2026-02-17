import './Tracker.css';

interface TrackerProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export function Tracker({ count, setCount }: TrackerProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        width: '90px',
        height: '30px',
      }}
    >
      <button
        className="counter"
        onClick={() => {
          setCount(count - 1);
        }}
        disabled={count === 1}
      >
        -
      </button>
      <text>{count}</text>
      <button
        className="counter"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
