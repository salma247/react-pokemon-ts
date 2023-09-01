import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as GridList } from 'react-window';

type Props = {
    renderItem: any;
    data: any;
    columns: number;
    size: number;
}

function PokemonsList({ renderItem, data, columns, size }: Props) {
  return (
    <AutoSizer style={{ width: "100%", height: "100vh" }}>
    {({ height, width }: { height: number; width: number }) => {
      return (
        <GridList
          height={height}
          width={width}
          columnCount={columns}
          columnWidth={width / columns}
          rowCount={Math.ceil(size / columns)}
          rowHeight={100}
        >
          {renderItem}
        </GridList>
      );
    }}
  </AutoSizer>
  )
}

export default PokemonsList