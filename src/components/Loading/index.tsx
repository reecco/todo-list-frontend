import './styles.scss';

type Size = {
  width: string,
  height: string,
  borderRadius?: string
}

function Loading({ width, height, borderRadius }: Size) {
  const style = {
    width,
    height,
    borderRadius
  }

  return <div style={style} className="loading"></div>;
}

export default Loading;