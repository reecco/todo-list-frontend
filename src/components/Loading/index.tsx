import './styles.scss';

type Size = {
  width: string,
  height: string
}

function Loading({ width, height }: Size) {
  const style = {
    width,
    height
  }

  return <div style={style} className="loading"></div>;
}

export default Loading;