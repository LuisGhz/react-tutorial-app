import './index.css';

export function Square(props) {
  let value;
  if (!props.winner) value = props.value;
  else value = <span className="winner">{ props.value }</span>

  return (
    <button className="square" onClick={ props.onClick }>
      { value }
    </button>
  );
}